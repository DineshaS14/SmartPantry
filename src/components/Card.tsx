'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CardProps {
  item: {
    _id: string;
    title: string;
    quantity: number;
    url?: string;
    description?: string;
    type?: string;
    expiryDate: string;
  };
}

const Card: React.FC<CardProps> = ({ item }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/deleteItem/${item._id}/route`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include credentials (cookies) for authentication
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      // Optionally, refresh the page to remove the deleted item
      router.refresh();
      window.location.reload();
    } catch (err) {
      console.error('Error deleting item:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = () => {
    router.push(`/update-item/${item._id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border-2 border-[#E38E49] p-4 flex flex-col items-start">
      {item.url && (
        <img
          src={item.url}
          alt={item.title}
          className="w-full h-32 object-cover rounded-md mb-3 border-2 border-black"
        />
      )}
      <h2 className="text-xl font-bold text-[#0A3981] mb-2">{item.title}</h2>
      <p className="text-gray-600 mb-1">Quantity: {item.quantity}</p>
      {item.type && <p className="text-gray-600 mb-1">Type: {item.type}</p>}
      <p className="text-gray-600 mb-1">Expiry Date: {item.expiryDate}</p>
      {item.description && (
        <p className="text-gray-600 mb-3">Description: {item.description}</p>
      )}

      <div className="flex space-x-2 mt-auto">
        <button
          onClick={handleUpdate}
          className="bg-[#E38E49] drop-shadow-[0_5px_2px_rgba(0,0,0,1)] text-white hover:bg-[#1F509A] border-2 border-black px-3 py-1 rounded-md text-sm font-medium"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`${
            isDeleting ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-red-700 drop-shadow-[0_5px_2px_rgba(0,0,0,1)] bg-[#E38E49]'
          } text-red-900 px-3 py-1 rounded-md text-sm font-medium`}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default Card;
