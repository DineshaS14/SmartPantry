/* src/context/AuthContext.tsx */
'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import * as cookie from 'cookie';

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadAuthState = () => {
      try {
        const cookies = cookie.parse(document.cookie || '');
        setIsLoggedIn(!!cookies.token); // Set logged-in state based on token presence
      } catch (err) {
        console.error('Error parsing cookies:', err);
        setIsLoggedIn(false);
      }
    };

    loadAuthState();
  }, []);

  const logout = () => {
    document.cookie = 'token=; Max-Age=0; path=/;'; // Clear token cookie
    setIsLoggedIn(false); // Reset state
    if (typeof window !== 'undefined') {
      window.location.href = '/'; // Redirect to home page
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
