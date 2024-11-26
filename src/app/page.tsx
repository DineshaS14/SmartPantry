/* src/app/page.tsx */
'use client';
import { useContext } from 'react';

import WelcomePage from './welcomePage/page';
import AuthContext from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  if (authContext?.isLoggedIn) {
    router.push('dashboard/');
  }
  return (
    <div className='h-screen'>
      {!authContext?.isLoggedIn && (
      <WelcomePage/>)}
      
    </div>
  );
};

export default HomePage;
