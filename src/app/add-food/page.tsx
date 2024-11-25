/* src/app/add-food/page.tsx */
'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import AddFoodItem from '../../components/AddFoodItem';
import AuthContext from '../../context/AuthContext';

const AddFoodPage = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  if (!authContext?.isLoggedIn) {
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
    return null;
  }

  return (
    <>
      
      <main className="flex justify-center items-center min-h-screen bg-gray-100">
        <AddFoodItem />
      </main>
  
    </>
  );
};

export default AddFoodPage;
