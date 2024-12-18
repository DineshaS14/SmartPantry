import React, { useState } from 'react';

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

  // Handler for search button click, integrates with the API route
  const handleSearch = async () => {
    // Reset error, loading, and recipe states for a fresh search
    setError(null);
    setLoading(true);
    setRecipes([]);

    try {
      // Call the backend API route to generate recipes
      const response = await fetch('/api/getRecipes/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inventory,
          searchQuery,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate recipes');
      }

      const data = await response.json();
      setRecipes(data.recipes);
    } catch (err) {
      console.error('Error generating recipes:', err);
      setError('Failed to generate recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mb-8 bg-white shadow-lg rounded-lg border-2 overflow-y-scroll border-[#E38E49]">
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
      <div className="p-4 border-2 border-gray-400 rounded-md max-h-[75vh] h-[75vh] overflow-auto">
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
