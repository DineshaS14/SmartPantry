'use client';

import { useEffect, useState } from 'react';
import Card from '../../components/Card';
import { FiSidebar } from "react-icons/fi";
import Link from 'next/link';

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
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState('');
  const [toggleLeft, setToggleLeft] = useState<boolean>(false);
  const [toggleRight, setToggleRight] = useState<boolean>(false);

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
        setItems(data.items);
      } catch (err) {
        console.error('Error fetching items:', err);
        setError('Could not load items. Please try again later.');
      }
    };

    fetchItems();
  }, []);

  // Function to handle item deletion and update state
  const handleItemDelete = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  return (
    <div className="p-8 bg-[#D4EBF8] h-screen">
      <div className='flex flex-row space-x-2 mb-4 sticky items-center justify-between '>
        <button onClick={() => setToggleLeft((previousValue) => !previousValue)}
          className='bg-[#E38E49] items-start text-white hover:bg-[#1F509A] px-3 py-2 rounded-md text-sm font-medium border-2 border-black'>
          <FiSidebar />
        </button>
        <div className='flex flex-row space-x-2'>
          <h1 className="text-3xl font-bold text-[#E38E49] text-center drop-shadow-[0_0px_2px_rgba(0,0,0,1)]">
            Dashboard
          </h1>
          <input className='rounded-md border-2 border-black' type='text' />
          <Link
            href="/add-food"
            className="bg-[#E38E49] text-white hover:bg-[#1F509A] px-3 py-2 rounded-md text-sm font-medium border-2 border-black"
          >
            <span className="drop-shadow-[0_5px_2px_rgba(0,0,0,1)]">
              Add an Item
            </span>
          </Link>
        </div>
        <button onClick={() => setToggleRight((previousValue) => !previousValue)}
          className='bg-[#E38E49] items-start text-white hover:bg-[#1F509A] px-3 py-2 rounded-md text-sm font-medium border-2 border-black'>
          <FiSidebar />
        </button>
      </div>
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      <div className='flex flex-row'>
        {toggleLeft && (
          <div className='w-1/6 bg-black'>Buttons</div>
        )}
        <div></div>
        <div className="justify-center mx-auto grid px-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <Card key={item._id} item={item} onDelete={handleItemDelete} />
          ))}
        </div>
        {toggleRight && (
          <div className='w-1/6 bg-black ml-auto'>Buttons</div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
