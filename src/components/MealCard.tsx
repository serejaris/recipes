import { Recipe } from '../types';

interface MealCardProps {
  meal: Recipe;
  mealType: 'breakfast' | 'lunch' | 'dinner';
}

const mealConfig = {
  breakfast: {
    icon: '🌅',
    title: 'Завтрак',
  },
  lunch: {
    icon: '☀️',
    title: 'Обед',
  },
  dinner: {
    icon: '🌙',
    title: 'Ужин',
  }
};

export function MealCard({ meal, mealType }: MealCardProps) {
  const config = mealConfig[mealType];

  return (
    <div className="border-l-4 border-gray-200 pl-4 py-2">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{config.icon}</span>
        <h4 className="font-semibold text-gray-800">{config.title}</h4>
      </div>
      
      <h5 className="font-medium text-gray-800 mb-2">{meal.name}</h5>
      
      <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-700">
        {meal.cuisine}
      </span>
    </div>
  );
}