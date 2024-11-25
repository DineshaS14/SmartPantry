/* src/app/page.tsx */
'use client';
import { useContext } from 'react';
import FoodList from '../components/FoodList';
import FoodItemsContext from '../context/FoodItemsContext';
import WelcomePage from './welcomePage/page';
import AuthContext from '../context/AuthContext';

const HomePage = () => {
  const foodItemsContext = useContext(FoodItemsContext);
  const authContext = useContext(AuthContext);
//lklj
  if (!foodItemsContext) {
    return <div>Loading...</div>;
  }

  const { foodItems } = foodItemsContext;

  return (
    <div className='h-screen'>
      {!authContext?.isLoggedIn && (
      <WelcomePage/>)}
      {authContext?.isLoggedIn && (
      <main>
      
        <FoodList items={foodItems} />
      </main>
      )}
    </div>
  );
};

export default HomePage;
