import { NextApiRequest, NextApiResponse } from 'next';
import Groq from 'groq-sdk';

// Initialize Groq client on server-side to keep key secure
const groqAPI = process.env.NEXT_PUBLIC_GROQ_API_KEY; // Use server-side key (not public)
if (!groqAPI) {
  throw new Error('The GROQ_API_KEY environment variable is missing or empty');
}

const groq = new Groq({
  apiKey: groqAPI,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { inventory, searchQuery } = req.body;

      // Construct the detailed prompt for Groq API
      const chatPrompt = `
        Act as a professional chef creating recipes for a smart pantry app.
        Ingredients available: ${inventory.join(', ')}
        Dietary restrictions/preferences: ${searchQuery || 'None'}
        
        Please provide creative recipes that:
        1. Use the available ingredients
        2. Are clear and concise
        3. Include a brief cooking method
        4. Consider any specified dietary restrictions
        
        Generate 3 unique recipe suggestions.
      `;

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: chatPrompt,
          },
        ],
        model: 'llama3-8b-8192',
        max_tokens: 500,
      });

      const responseContent = chatCompletion.choices[0]?.message?.content || 'No recipes found.';
      const generatedRecipes = responseContent
        .split('\n')
        .filter((recipe) => recipe.trim() !== '');

      return res.status(200).json({ recipes: generatedRecipes });
    } catch (err) {
      console.error('Error generating recipes:', err);
      return res.status(500).json({ error: 'Failed to generate recipes. Please try again.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
