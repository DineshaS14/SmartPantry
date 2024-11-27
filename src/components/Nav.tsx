'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Header = () => {
  // Access authentication context to manage user login state
  const authContext = useContext(AuthContext);

  // Handle user logout and clear state/cookies
  const handleLogout = () => {
    if (authContext?.logout) {
      authContext.logout();
    }
  };

  return (
    // Header container with sticky positioning and background color
    <header className="bg-[#0A3981] sticky top-0 z-10">
      {/* Center the header content and add responsive padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and title section */}
          <div className="flex items-center space-x-3">
            {/* Team logo with shadow styling */}
            <Image
              className="drop-shadow-[0_5px_5px_rgba(227,142,73,1)]"
              src="/images/TeamLogo.PNG"
              alt="Team Logo"
              width={50} // Adjust width for responsiveness
              height={30} // Adjust height for responsiveness
            />
            {/* Title with responsive text size and shadow */}
            <h1 className="text-[#E38E49] text-lg sm:text-2xl italic font-bold drop-shadow-[0_5px_10px_rgba(0,0,0,1)]">
              <Link href="/">SmartPantry</Link>
            </h1>
          </div>

          {/* Navigation section */}
          <nav className="flex items-center space-x-2 sm:space-x-4">
            {/* Home link with responsive padding, text size, and hover effects */}
            <Link
              href="/"
              className="bg-[#E38E49] text-white hover:bg-[#1F509A] px-2 py-1 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium border-2 border-black"
            >
              <span className="drop-shadow-[0_0px_5px_rgba(0,0,0,1)]">Home</span>
            </Link>

            {/* Conditional rendering for logged-in vs logged-out states */}
            {authContext?.isLoggedIn ? (
              <>
                {/* Welcome message displaying the username */}
                <span className="text-white text-xs sm:text-sm font-medium px-2 sm:px-3">
                  Hello, {authContext.user?.username}
                </span>
                {/* Logout button with hover effects and responsive padding */}
                <button
                  onClick={handleLogout}
                  className="bg-[#E38E49] text-red-900 hover:bg-[#1F509A] px-2 py-1 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium border-2 border-red-900"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login and Signup links for unauthenticated users */}
                <Link
                  href="/login"
                  className="bg-[#E38E49] text-white hover:bg-[#1F509A] px-2 py-1 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium border-2 border-black"
                >
                  <span className="drop-shadow-[0_0px_5px_rgba(0,0,0,1)]">Login</span>
                </Link>
                <Link
                  href="/signup"
                  className="bg-[#E38E49] text-white hover:bg-[#1F509A] px-2 py-1 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium border-2 border-black"
                >
                  <span className="drop-shadow-[0_0px_5px_rgba(0,0,0,1)]">SignUp</span>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
