import React, { useState } from 'react';
import Groq from 'groq-sdk';

// Initialize Groq client 
// IMPORTANT: In a production app, move API calls to a backend
const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true, // Use with caution
});

interface GroqSearchProps {
  initialInventory?: string[];
}

const GroqSearch: React.FC<GroqSearchProps> = ({ initialInventory = [] }) => {
  // State Management
  const [ inventory ] = useState<string[]>(initialInventory);
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Input Change Handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Search Handler with Groq API Integration
  const handleSearch = async () => {
    // Reset previous state
    setError(null);
    setLoading(true);
    setRecipes([]);

    try {
      // Construct detailed prompt for recipe generation
      const chatPrompt = `
        Act as a professional chef creating recipes for a smart pantry app.
        Ingredients available: ${inventory.join(', ')}
        Dietary restrictions/preferences: ${searchQuery || 'None'}
        
        Please provide creative recipes that:
        1. Primarily use the available ingredients
        2. Are clear and concise
        3. Include a brief cooking method
        4. Consider any specified dietary restrictions
        
        Generate 3 unique recipe suggestions.
      `;

      // Call Groq API to generate recipes
      const chatCompletion = await groq.chat.completions.create({
        messages: [{ 
          role: 'user', 
          content: chatPrompt 
        }],
        model: 'llama3-8b-8192',
        max_tokens: 500, // Adjust as needed
      });

      // Extract recipe content
      const responseContent = chatCompletion.choices[0]?.message?.content || 'No recipes found.';

      // Process and set recipes
      const generatedRecipes = responseContent
        .split('\n')
        .filter(recipe => recipe.trim() !== ''); // Limit to 3 recipes

      setRecipes(generatedRecipes);
    } catch (err) {
      console.error("Error generating recipes:", err);
      setError('Failed to generate recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mb-8 bg-white shadow-lg rounded-lg border-2 border-[#E38E49]">
      {/* Search Input and Button */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Add dietary restrictions or preferences"
          value={searchQuery}
          onChange={handleInputChange}
          className="w-full md:w-2/3 p-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F509A]"
        />
        
        <button
          onClick={handleSearch}
          className="w-full md:w-auto bg-[#E38E49] text-white hover:bg-[#1F509A] px-4 py-2 rounded-md text-sm font-medium border-2 border-black transition-colors duration-200"
        >
          Search Recipes
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center mt-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-sm text-[#1F509A]">Generating recipes...</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* Recipes Display max-h-[75vh] h-[75vh] keeps it within the screen*/}
      <div className="p-4 border-2 border-gray-400 rounded-md max-h-[75vh] h-[75vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-3 text-[#0A3981]">Recipes:</h3>
        <ul className="list-disc pl-5">
          {recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <li key={index} className="mb-2">
                {recipe}
              </li>
            ))
          ) : (
            <li className="text-gray-700">No recipes found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default GroqSearch;