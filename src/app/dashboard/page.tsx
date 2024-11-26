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
  // State variables
  const [items, setItems] = useState<Item[]>([]); // Holds fetched items
  const [filteredItems, setFilteredItems] = useState<Item[]>([]); // Holds filtered items to be rendered
  const [inventory, setInventory] = useState<string[]>([]); // Holds item titles for the GeminiSearch
  const [error, setError] = useState(''); // Holds error messages
  const [toggleLeft, setToggleLeft] = useState<boolean>(false); // Controls left sidebar visibility
  const [toggleRight, setToggleRight] = useState<boolean>(false); // Controls right sidebar visibility
  const [selectedType, setSelectedType] = useState<string>(''); // Holds the currently selected type for filtering
  const [query, setQuery] = useState<string>(''); // Holds the current search query

  // Callback to handle type selection from buttons
  const handleTypeSelect = (type: string) => {
    if (type === 'All') {
      setSelectedType(''); // Clear selectedType for "All"
    } else {
      setSelectedType(type); // Set the selected type
    }
  };

  // Fetch items when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/getItems/route', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }

        const data = await response.json();
        setItems(data.items); // Set the items fetched from the server
        setInventory(data.items.map((item: Item) => item.title)); // Set the inventory array with item titles
      } catch (err) {
        console.error('Error fetching items:', err);
        setError('Could not load items. Please try again later.');
      }
    };

    fetchItems();
  }, []);

  // Effect to filter items based on the query and selected type
  useEffect(() => {
    // Filter items based on `query` and `selectedType`
    const filtered = items.filter((item) => {
      const matchesType = selectedType ? item.type === selectedType : true;
      const matchesQuery = query ? item.title.toLowerCase().includes(query.toLowerCase()) : true;
      return matchesType && matchesQuery;
    });

    setFilteredItems(filtered); // Set the filtered items
  }, [items, selectedType, query]); // Dependencies include items, selectedType, and query

  // Function to handle changes in the search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Function to handle item deletion and update state
  const handleItemDelete = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  return (
    <div className="p-8 bg-[#D4EBF8] h-screen overflow-hidden">
      {/* Header Section */}
      <div className='flex flex-row space-x-2 mb-4 sticky items-center justify-between'>
        {/* Toggle Left Sidebar */}
        <button onClick={() => setToggleLeft((previousValue) => !previousValue)}
          className='bg-[#E38E49] text-white hover:bg-[#1F509A] px-3 py-2 rounded-md text-sm font-medium border-2 border-black'>
          <FiSidebar />
        </button>

        {/* Title and Search/Add Section */}
        <div className='flex flex-row space-x-2'>
          <h1 className="text-3xl font-bold text-[#E38E49] text-center drop-shadow-[0_0px_2px_rgba(0,0,0,1)]">
            Dashboard
          </h1>
          <input
            className='rounded-md border-2 border-black px-3 py-2'
            type='text'
            placeholder='Search By Name...'
            value={query}
            onChange={handleSearchChange}
          />
          <Link
            href="/add-food"
            className="bg-[#E38E49] text-white hover:bg-[#1F509A] px-3 py-2 rounded-md text-sm font-medium border-2 border-black"
          >
            <span className="drop-shadow-[0_5px_2px_rgba(0,0,0,1)]">
              Add an Item
            </span>
          </Link>
        </div>

        {/* Toggle Right Sidebar */}
        <button onClick={() => setToggleRight((previousValue) => !previousValue)}
          className='bg-[#E38E49] text-white hover:bg-[#1F509A]  px-3 py-2 rounded-md text-sm font-medium border-2 border-black'>
          <FiSidebar />
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Main Container Section */}
      <div className="flex flex-row w-full h-full space-x-2">
  {/* Toggle Left Sidebar Section */}
  <div className={`${toggleLeft ? 'block' : 'hidden'} w-1/6 bg-[#1F509A] p-10 h-[65v] rounded-3xl transition-all duration-300 border-2 border-[#E38E49]`}>
    <TypeButtons onTypeSelect={handleTypeSelect} />
  </div>

  {/* Cards Section */}
  <div className={`flex-grow w-full transition-all duration-300 ${toggleLeft ? 'ml-2' : 'ml-0'} ${toggleRight ? 'mr-2' : 'mr-0'}`}>
    {/* Grid to display cards */}
    <div className="justify-center mx-auto grid px-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredItems.map((item) => (
        <Card key={item._id} item={item} onDelete={handleItemDelete} />
      ))}
    </div>
  </div>

  {/* Toggle Right Sidebar Section */}
  <div className={`${toggleRight ? 'block' : 'hidden'} w-2/5 bg-[#1F509A] rounded-xl ml-auto p-4 h-full transition-all duration-300`}>
    {/* Gemini Search Component */}
    <GroqSearch initialInventory={inventory} />
  </div>
</div>

    </div>
  );
};

export default DashboardPage;
