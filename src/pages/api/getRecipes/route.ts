import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// Ensure the Groq SDK is initialized with error handling
const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { inventory, dietaryRestrictions } = await request.json();

    // Validate input
    if (!inventory || inventory.length === 0) {
      return NextResponse.json({ 
        error: 'Inventory items are required.' 
      }, { 
        status: 400 
      });
    }

    // Construct the prompt for recipe generation
    const chatPrompt = `
      Act as a professional chef creating recipes for a smart pantry app.
      Ingredients available: ${inventory.join(', ')}
      Dietary restrictions/preferences: ${dietaryRestrictions || 'None'}
      
      Please provide a creative and delicious recipe that:
      1. Uses most of the available ingredients
      2. Is clear and concise
      3. Includes a brief cooking method
      4. Considers the dietary restrictions if specified
      
      Format your response as a single recipe description.
    `;

    // Generate recipe using Groq
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: chatPrompt }],
      model: 'llama3-8b-8192',
      max_tokens: 300, // Limit token usage
    });

    // Extract the recipe content
    const responseContent = chatCompletion.choices[0]?.message?.content || 'No recipe found.';

    // Split into multiple recipes if multiple are generated
    const recipes = responseContent
      .split('\n')
      .filter(recipe => recipe.trim() !== '')
      .slice(0, 3); // Limit to 3 recipes

    return NextResponse.json({ 
      recipes 
    }, { 
      status: 200 
    });
  } catch (error) {
    console.error('Error fetching recipes from Groq:', error);
    return NextResponse.json({ 
      error: 'Failed to retrieve recipes. Please try again.' 
    }, { 
      status: 500 
    });
  }
}

// Optional: Handle GET requests to provide API information
export async function GET() {
  return NextResponse.json({ 
    message: 'Recipes API - Use POST method to generate recipes' 
  });
}