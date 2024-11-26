/* src/app/page.tsx */
'use client';
import { useContext, useEffect} from 'react';

import WelcomePage from './welcomePage/page';
import AuthContext from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (authContext?.isLoggedIn) {
      router.push('/dashboard');
    }
  }, [authContext?.isLoggedIn, router]);
  return (
    <div className='h-screen'>
      {!authContext?.isLoggedIn && (
      <WelcomePage/>)}
      
    </div>
  );
};

export default HomePage;
