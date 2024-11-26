/* src/app/page.tsx */
'use client';
import { useContext } from 'react';

import WelcomePage from './welcomePage/page';
import AuthContext from '../context/AuthContext';

const HomePage = () => {
  const authContext = useContext(AuthContext);

  return (
    <div className='h-screen'>
      {!authContext?.isLoggedIn && (
      <WelcomePage/>)}
      {authContext?.isLoggedIn && (
        <div>Hello This is Dashboard</div>
      )}
    </div>
  );
};

export default HomePage;
