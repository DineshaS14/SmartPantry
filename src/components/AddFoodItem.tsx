/* src/components/AddFoodItem.tsx */
'use client';

import { useState, useContext } from 'react';
import FoodItemsContext from '../context/FoodItemsContext';
import { useRouter } from 'next/navigation';

const AddFoodItem: React.FC = () => {
  const [title, setTitle] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const foodItemsContext = useContext(FoodItemsContext);
  const router = useRouter();

  if (!foodItemsContext) {
    return <div>Loading...</div>;
  }

  const { addFoodItem } = foodItemsContext;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addFoodItem({ title, imgSrc });
    setTitle('');
    setImgSrc('');

    // Redirect to home page after adding the item
    router.push('/');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 mt-10 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add a New Food Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700">
            Food Name
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter food name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="imgSrc" className="block text-gray-700">
            Image URL
          </label>
          <input
            type="url"
            id="imgSrc"
            placeholder="Enter image URL"
            value={imgSrc}
            onChange={(e) => setImgSrc(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Add Food
        </button>
      </form>
    </div>
  );
};

export default AddFoodItem;
