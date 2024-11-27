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
    <header className="bg-[#0A3981] sticky">
      <div className="w-full px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex flex-row items-start">
            <Image
              className="drop-shadow-[0_5px_5px_rgba(227,142,73,1)]"
              src="/images/TeamLogo.PNG"
              alt="Team Logo"
              width={80}
              height={50}
            />

            <h1 className="text-[#E38E49] text-2xl italic font-bold drop-shadow-[0_5px_10px_rgba(0,0,0,1)]">
              <Link href="/">SmartPantry</Link>
            </h1>
          </div>
          <nav className="flex space-x-4">
            <Link
              href="/"
              className="bg-[#E38E49] text-white hover:bg-[#1F509A] px-3 py-2 rounded-md text-sm font-medium border-2 border-black"
            >
              <span className="drop-shadow-[0_0px_5px_rgba(0,0,0,1)]">Home</span>
            </Link>
            {authContext?.isLoggedIn ? (
              <>
               
                <span className="text-white px-3 py-2 text-sm font-medium">
                  Hello, {authContext.user?.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-[#E38E49] text-red-900 hover:bg-[#1F509A] px-3 py-2 rounded-md text-sm font-medium border-2 border-red-900"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-[#E38E49] text-white hover:bg-[#1F509A] px-3 py-2 rounded-md text-sm font-medium border-2 border-black"
                >
                  <span className="drop-shadow-[0_0px_5px_rgba(0,0,0,1)]">Login</span>
                </Link>
                <Link
                  href="/signup"
                  className="bg-[#E38E49] text-white hover:bg-[#1F509A] px-3 py-2 rounded-md text-sm font-medium border-2 border-black"
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
