'use client';

import { useEffect, useState } from 'react';
import Card from '../../components/Card';
import { FiSidebar } from "react-icons/fi";
import Link from 'next/link';
import TypeButtons from '../../components/TypeButtons';
import GroqSearch from '../../components/GroqSearch';

interface Item {
  _id: string;
  title: string;
  quantity: number;
  url?: string;
  description?: string;
  type?: string;
  expiryDate: string;
}

const DashboardPage = () => {
  // State to hold all items fetched from the server
  const [items, setItems] = useState<Item[]>([]);

  // State to hold filtered items based on query or type selection
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  // State to hold item titles for inventory display
  const [inventory, setInventory] = useState<string[]>([]);

  // State to handle error messages
  const [error, setError] = useState('');

  // Toggles for showing/hiding left and right sidebars
  const [toggleLeft, setToggleLeft] = useState<boolean>(false);
  const [toggleRight, setToggleRight] = useState<boolean>(false);

  // State to handle type filtering
  const [selectedType, setSelectedType] = useState<string>('');

  // State to handle search query input
  const [query, setQuery] = useState<string>('');

  // State to track if the screen size is small
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Function to handle type selection from the sidebar
  const handleTypeSelect = (type: string) => {
    setSelectedType(type === 'All' ? '' : type); // Clear type for "All" selection or set the specific type
  };

  // Effect to monitor and track screen size changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)'); // Check if screen width is 768px or smaller

    const handleMediaChange = () => {
      setIsSmallScreen(mediaQuery.matches); // Update `isSmallScreen` if screen size matches the query
    };

    handleMediaChange(); // Initial check for current screen size

    // Add an event listener to track screen size changes
    mediaQuery.addEventListener('change', handleMediaChange);

    // Cleanup the event listener on component unmount
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  // Effect to fetch items from the API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/getItems/route', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // Include credentials for secure API calls
        });

        if (!response.ok) throw new Error('Failed to fetch items'); // Throw error if API call fails

        const data = await response.json(); // Parse JSON response
        setItems(data.items); // Set the items from API response
        setInventory(data.items.map((item: Item) => item.title)); // Extract item titles for inventory
      } catch (err) {
        console.error('Error fetching items:', err);
        setError('Could not load items. Please try again later.'); // Display error message
      }
    };

    fetchItems(); // Call the fetch function on component mount
  }, []);

  // Effect to filter items based on query and selected type
  useEffect(() => {
    const filtered = items.filter((item) => {
      const matchesType = selectedType ? item.type === selectedType : true; // Check if item matches the selected type
      const matchesQuery = query ? item.title.toLowerCase().includes(query.toLowerCase()) : true; // Check if item title matches the query
      return matchesType && matchesQuery; // Include items that match both conditions
    });
    setFilteredItems(filtered); // Update filtered items state
  }, [items, selectedType, query]); // Re-run filter logic when items, type, or query changes

  // Function to handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

  // Function to delete an item from the list
  const handleItemDelete = (id: string) => setItems((prevItems) => prevItems.filter((item) => item._id !== id));

  return (
    <div className="p-8 bg-[#D4EBF8] h-screen overflow-auto">
      {/* Header Section */}
      <div className="flex flex-col w-full sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 mb-4 sticky items-center sm:justify-between">
        {/* Toggle Left Sidebar */}
        <button
          onClick={() => setToggleLeft((prev) => !prev)} // Toggle left sidebar state
          className="bg-[#E38E49] text-white hover:bg-[#1F509A] flex flex-row px-3 py-2 rounded-md text-sm justify-center items-center font-medium border-2 border-black w-full sm:w-auto md:w-auto lg:w-auto"
        >
          <FiSidebar /> {!toggleLeft && (<span className='font-medium px-2 drop-shadow-[0_4px_2px_rgba(0,0,0,1)]'>Filter Buttons</span>)}{/* Sidebar icon */}
        </button>

        {/* Title and Search/Add Section */}
        <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 w-full sm:w-5/6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#E38E49] text-center drop-shadow-[0_4px_2px_rgba(0,0,0,1)]">
            Dashboard {/* Page title */}
          </h1>
          <input
            className="rounded-md border-2 border-black px-3 py-2 w-full sm:w-auto"
            type="text"
            placeholder="Search By Name..." // Placeholder for search bar
            value={query} // Controlled input value
            onChange={handleSearchChange} // Update query state on change
          />
          <Link
            href="/add-food" // Link to add a new item
            className="bg-[#E38E49] text-white hover:bg-[#1F509A] px-3 py-2 rounded-md text-sm font-medium border-2 border-black w-full sm:w-auto text-center"
          >
            Add an Item
          </Link>
        </div>

        {/* Toggle Right Sidebar */}
        <button
          onClick={() => setToggleRight((prev) => !prev)} // Toggle right sidebar state
          className="bg-[#E38E49] text-white hover:bg-[#1F509A] px-3 flex flex-row justify-center items-center py-2 rounded-md text-sm font-medium border-2 border-black w-full sm:w-auto"
        >
          <FiSidebar /> {!toggleRight && (<span className='font-medium italic px-2 drop-shadow-[0_4px_2px_rgba(0,0,0,1)]'>Get Recipes</span>)}{/* Sidebar icon */}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{error}</p> {/* Display error message */}
        </div>
      )}

      {/* Main Container Section */}
      <div className="flex flex-col lg:flex-row w-full h-full space-y-2 lg:space-y-0 lg:space-x-2">
        {/* Toggle Left Sidebar Section */}
        <div
          className={`${toggleLeft ? 'block' : 'hidden'} w-full lg:w-2/6 bg-[#1F509A] p-10 max-h-fit sm:max-h-fit rounded-3xl transition-all duration-300 border-2 border-[#E38E49] overflow-y-auto`}
        >
          <TypeButtons onTypeSelect={handleTypeSelect} /> {/* Render buttons to filter by type */}
        </div>

        {/* Cards Section */}
        <div
          className={`h-[75vh] flex-grow w-full transition-all duration-300 ${toggleLeft ? 'ml-0 lg:ml-2' : 'ml-0'} ${
            toggleRight ? 'mr-0 lg:mr-2' : 'mr-0'
          }`}
        >
          {/* Render cards for small screens if right sidebar is not toggled */}
          {isSmallScreen && !toggleRight && (
            <div className="border-2 border-[#E38E49] p-3 rounded-lg justify-center max-h-[75vh] mx-auto grid px-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto">
              {filteredItems.map((item) => (
                <Card key={item._id} item={item} onDelete={handleItemDelete} /> 
              ))}
            </div>
          )}

          {/* Render cards for large screens regardless of toggle state */}
          {!isSmallScreen && (
            <div className="border-2 border-[#E38E49] p-3 rounded-lg justify-center max-h-[75vh] mx-auto grid px-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto">
              {filteredItems.map((item) => (
                <Card key={item._id} item={item} onDelete={handleItemDelete} /> 
              ))}
            </div>
          )}
        </div>

        {/* Toggle Right Sidebar Section */}
        <div
          className={`${toggleRight ? 'block' : 'hidden'} w-full lg:w-2/5 bg-[#1F509A] rounded-xl lg:ml-auto p-4 h-full transition-all duration-300`}
        >
          {toggleRight ? (
            <GroqSearch initialInventory={inventory} /> 
          ) : (
            <div className="lg:hidden flex items-center justify-center h-full text-white text-xl">
              <p>Right Sidebar</p> {/* Placeholder for right sidebar */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
