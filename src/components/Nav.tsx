/* src/components/Header.tsx */
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    if (authContext?.logout) {
      authContext.logout(); // Call logout to clear cookies and state
    }
  };

  return (
    <header className="bg-[#0A3981] shadow-md sticky ">
      <div className="w-full  px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex flex-row items-start">
          <Image 
            className='shadow-[#E38E49] drop-shadow-lg'
            src='/images/TeamLogo.PNG' 
            alt='Team Logo' 
            width={80} 
            height={50} 
        />

            <h1 className="text-[#E38E49] text-2xl font-bold">
              <Link href="/">SmartPantry</Link>
            </h1>
          </div>
          <nav className="flex space-x-4">
            <Link href="/" className="text-[#E38E49] hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            {authContext?.isLoggedIn ? (
              <>
                <Link href="/add-food" className="text-[#E38E49] hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                  Add Food
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link href="/signup" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                  Signup
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