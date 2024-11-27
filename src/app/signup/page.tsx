'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to sign up');
      }

      // Redirect to the login page after successful signup
      router.push('/login');
    } catch (err) {
      console.error('Signup error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-[#D4EBF8]">
    <div className="max-w-md w-full bg-[#0A3981] p-8 mt-10 rounded-lg shadow-lg border-2 border-[#E38E49]">
      <h2 className="text-[#E38E49] text-2xl font-semibold italic mb-6 text-center drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
        Sign Up
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-red-700" aria-live="polite">{error}</p>
          </div>
        )}
  
        {/* Username Field */}
        <div>
          <label htmlFor="username" className="block text-white mb-1">
            Username <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-[#E38E49] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F509A]"
          />
        </div>
  
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-white mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-[#E38E49] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F509A]"
          />
        </div>
  
        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-white mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full px-3 py-2 border border-[#E38E49] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F509A]"
          />
        </div>
  
        {/* Sign Up Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 rounded-md transition-colors duration-200 ${
            isSubmitting ? 'bg-[#E38E49] cursor-not-allowed' : 'bg-[#E38E49] hover:bg-[#1F509A]'
          } text-white border-2 border-black`}
        >
          {isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  </main>
  
  );
};

export default SignupPage;
