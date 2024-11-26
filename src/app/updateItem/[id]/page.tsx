'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface FormData {
  title: string;
  quantity: number;
  url?: string;
  description?: string;
  type?: string;
  expiryDate: string;
}

const UpdateItem: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string }; // Explicitly casting to ensure TypeScript knows 'id' is a string
  const { isLoggedIn } = useAuth(); // Check if the user is logged in

  const [formData, setFormData] = useState<FormData>({
    title: '',
    quantity: 1,
    url: '',
    description: '',
    type: '',
    expiryDate: '',
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch the item data when the component mounts
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/updateItem/${id}/route`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include cookies for authentication
        });

        if (!response.ok) {
          throw new Error('Failed to fetch item');
        }

        const data = await response.json();
        setFormData({
          title: data.item.title,
          quantity: data.item.quantity,
          url: data.item.url || '',
          description: data.item.description || '',
          type: data.item.type || '',
          expiryDate: data.item.expiryDate,
        });
      } catch (err) {
        console.error('Error fetching item:', err);
        setError('Could not load item details. Please try again later.');
      }
    };

    fetchItem();
  }, [id, isLoggedIn, router]);

  // Handle input changes for text and number fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === 'quantity' ? Number(value) : value,
    }));
  };

  // Handle select change for dropdown
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      type: value,
    }));
  };

  // Handle form submission to update the item
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/updateItem/${id}/route`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include', // Include cookies for authentication
      });

      if (!response.ok) {
        throw new Error('Failed to update item');
      }

      // Redirect back to the dashboard after successful update
      router.push('/dashboard/');
    } catch (err) {
      console.error('Error updating item:', err);
      setError('An error occurred while updating the item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen max-w-md mx-auto bg-[#0A3981] p-8 rounded-lg shadow-lg border-2 border-[#E38E49]">
      <h2 className="text-[#E38E49] text-2xl font-semibold italic mb-6 text-center drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
        Update Item
      </h2>
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-white mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter item title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-[#E38E49] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F509A]"
          />
        </div>

        {/* Quantity Field */}
        <div>
          <label htmlFor="quantity" className="block text-white mb-1">
            Quantity <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="quantity"
            placeholder="Enter quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
            className="w-full px-3 py-2 border border-[#E38E49] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F509A]"
          />
        </div>

        {/* URL Field */}
        <div>
          <label htmlFor="url" className="block text-white mb-1">
            Image URL
          </label>
          <input
            type="url"
            id="url"
            placeholder="Enter image URL"
            value={formData.url}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#E38E49] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F509A]"
          />
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-white mb-1">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#E38E49] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F509A]"
          />
        </div>

        {/* Type Field - Dropdown */}
        <div>
          <label htmlFor="type" className="block text-white mb-1">
            Type <span className="text-red-500">*</span>
          </label>
          <select
            id="type"
            value={formData.type}
            onChange={handleSelectChange}
            required
            className="w-full px-3 py-2 border border-[#E38E49] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F509A] bg-white"
          >
            <option value="" disabled>
              Select type or category
            </option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Dairy">Dairy</option>
            <option value="Condiments">Condiments</option>
            <option value="Frozen Food">Frozen Food</option>
            <option value="Nuts & Seeds">Nuts & Seeds</option>
            <option value="Berries">Berries</option>
            <option value="Beans">Beans</option>
            <option value="Legumes">Legumes</option>
          </select>
        </div>

        {/* Expiry Date Field */}
        <div>
          <label htmlFor="expiryDate" className="block text-white mb-1">
            Expiry Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-[#E38E49] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F509A]"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 rounded-md transition-colors duration-200 ${
            isSubmitting ? 'bg-[#E38E49] cursor-not-allowed' : 'bg-[#E38E49] hover:bg-[#1F509A]'
          } text-white border-2 border-black`}
        >
          {isSubmitting ? 'Updating...' : 'Update Item'}
        </button>
      </form>
    </div>
  );
};

export default UpdateItem;
