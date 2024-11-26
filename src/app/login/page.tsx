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
      <main className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <p className="text-red-600" aria-live="polite">
                {error}
              </p>
            )}
            <div>
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
