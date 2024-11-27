'use client';

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthContext from '../../context/AuthContext';

const LoginPage = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Set user as logged in
        authContext?.setIsLoggedIn(true);

        // Store token if needed
        localStorage.setItem('token', data.token); 

        // Set user details in the context, including ID and username
        if (data.user) {
          authContext?.setUser({ id: data.user.id, username: data.user.username });
        }

        // Redirect to homepage
        router.push('/');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred while logging in.');
      console.error(err);
    }
  };

  return (
    <>
    <main className="flex justify-center items-center min-h-screen bg-[#D4EBF8]">
      <div className="max-w-md w-full bg-[#0A3981] p-8 mt-10 rounded-lg shadow-lg border-2 border-[#E38E49]">
        <h2 className="text-[#E38E49] text-2xl font-semibold italic mb-6 text-center drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700" aria-live="polite">{error}</p>
            </div>
          )}
  
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-white mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-[#E38E49] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F509A]"
            />
          </div>
  
          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-md transition-colors duration-200 bg-[#E38E49] hover:bg-[#1F509A] text-white border-2 border-black"
          >
            <span className='drop-shadow-[0_4px_2px_rgba(0,0,0,1)]'>Login</span>
          </button>
        </form>
      </div>
    </main>
  </>
  
  );
};

export default LoginPage;
