// src/context/FoodItemsContext.tsx
'use client';

import { createContext, useState, ReactNode } from 'react';

interface FoodItem {
  title: string;
  imgSrc: string;
}

interface FoodItemsContextType {
  foodItems: FoodItem[];
  addFoodItem: (item: FoodItem) => void;
}

const FoodItemsContext = createContext<FoodItemsContextType | undefined>(undefined);

export const FoodItemsProvider = ({ children }: { children: ReactNode }) => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([
    { title: 'Tomato', imgSrc: '/images/tomato.jpg' },
    { title: 'Carrot', imgSrc: '/images/carrot.jpg' },
    { title: 'Onion', imgSrc: '/images/onion.jpg' },
  ]);

  const addFoodItem = (item: FoodItem) => {
    setFoodItems((prevItems) => [...prevItems, item]);
  };

  return (
    <FoodItemsContext.Provider value={{ foodItems, addFoodItem }}>
      {children}
    </FoodItemsContext.Provider>
  );
};

export default FoodItemsContext;
