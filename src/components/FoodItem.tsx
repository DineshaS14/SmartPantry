/* src/components/FoodItem.tsx */
import Image from 'next/image';
import { useState } from 'react';

interface FoodItemProps {
  item: {
    title: string;
    imgSrc: string;
  };
}

const FoodItem: React.FC<FoodItemProps> = ({ item }) => {
  const [imgSrc, setImgSrc] = useState(item.imgSrc);

  const handleError = () => {
    setImgSrc('/images/placeholder.png'); // Ensure you have a placeholder image in public/images
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-200">
      <Image
        src={imgSrc}
        alt={item.title}
        width={300}
        height={200}
        className="object-cover w-full h-48"
        onError={handleError}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
      </div>
    </div>
  );
};

export default FoodItem;
