/* src/components/FoodList.tsx */
import FoodItem from './FoodItem';

interface FoodListProps {
  items: {
    title: string;
    imgSrc: string;
  }[];
}

const FoodList: React.FC<FoodListProps> = ({ items }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <FoodItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FoodList;
