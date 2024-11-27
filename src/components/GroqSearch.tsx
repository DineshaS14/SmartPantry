import React, { useState } from 'react';
import Groq from 'groq-sdk';

// Fetch the Groq API key from environment variables
const groqAPI = process.env.NEXT_PUBLIC_GROQ_API_KEY;

// Initialize Groq client
// IMPORTANT: In a production app, API calls should be moved to a secure backend to avoid exposing the API key
const groq = new Groq({
  apiKey: groqAPI, // API key for authenticating with the Groq API
  dangerouslyAllowBrowser: true, // Use with caution; exposes API key in client code
});

// Props interface for the GroqSearch component
interface GroqSearchProps {
  initialInventory?: string[]; // Optional list of initial inventory items
}

const GroqSearch: React.FC<GroqSearchProps> = ({ initialInventory = [] }) => {
  // State to manage the inventory items
  const [inventory] = useState<string[]>(initialInventory);

  // State to hold dietary restriction or user input query
  const [searchQuery, setSearchQuery] = useState('');

  // State to store the generated recipes
  const [recipes, setRecipes] = useState<string[]>([]);

  // State to hold any error message
  const [error, setError] = useState<string | null>(null);

  // State to manage loading indicator
  const [loading, setLoading] = useState<boolean>(false);

  // Handler for changes in the input field (dietary restrictions or preferences)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Update state with user input
  };

  // Handler for search button click, integrates with the Groq API
  const handleSearch = async () => {
    // Reset error, loading, and recipe states for a fresh search
    setError(null);
    setLoading(true);
    setRecipes([]);

    try {
      // Constructing a detailed prompt for the Groq API to generate creative recipes
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

      // Use Groq API to get recipe suggestions
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          { 
            role: 'user', // Specifies that the message is coming from the user
            content: chatPrompt // The prompt that we want to generate recipes for
          }
        ],
        model: 'llama3-8b-8192', // Specifies which Groq model to use
        max_tokens: 500, // Limit the number of tokens in the response
      });

      // Extracting the response content from the API
      const responseContent = chatCompletion.choices[0]?.message?.content || 'No recipes found.';

      // Processing the response to create an array of recipes
      const generatedRecipes = responseContent
        .split('\n') // Splitting the response by new lines
        .filter(recipe => recipe.trim() !== ''); // Removing any empty lines

      setRecipes(generatedRecipes); // Update state with the list of recipes
    } catch (err) {
      console.error("Error generating recipes:", err); // Log the error to the console
      setError('Failed to generate recipes. Please try again.'); // Display a user-friendly error message
    } finally {
      setLoading(false); // Stop the loading indicator, whether the request was successful or not
    }
  };

  return (
    <div className="p-6 mb-8 bg-white shadow-lg rounded-lg border-2 border-[#E38E49]">
      {/* Search Input and Button */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        {/* Input field for dietary restrictions or preferences */}
        <input
          type="text"
          placeholder="Add dietary restrictions or preferences"
          value={searchQuery} // Controlled input
          onChange={handleInputChange} // Update query state on input change
          className="w-full md:w-2/3 p-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F509A]"
        />
        
        {/* Search Button */}
        <button
          onClick={handleSearch} // Trigger handleSearch when clicked
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
          {error} {/* Display error if it occurs */}
        </div>
      )}

      {/* Recipes Display */}
      <div className="p-4 border-2 border-gray-400 rounded-md max-h-[75vh] h-[75vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-3 text-[#0A3981]">Recipes:</h3>
        <ul className="list-disc pl-5">
          {recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <li key={index} className="mb-2">
                {recipe} {/* Display each generated recipe */}
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
