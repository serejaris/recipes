import { Recipe } from '../types';

interface MealCardProps {
  meal: Recipe;
  mealType: 'breakfast' | 'lunch' | 'dinner';
}

const mealConfig = {
  breakfast: {
    icon: '🌅',
    title: 'Завтрак',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800'
  },
  lunch: {
    icon: '☀️',
    title: 'Обед',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-800'
  },
  dinner: {
    icon: '🌙',
    title: 'Ужин',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-800'
  }
};

const cuisineBadgeColors = {
  'Русская': 'bg-blue-500 text-white',
  'Европейская': 'bg-green-500 text-white',
  'Итальянская': 'bg-red-500 text-white'
};

export function MealCard({ meal, mealType }: MealCardProps) {
  const config = mealConfig[mealType];
  const cuisineColor = cuisineBadgeColors[meal.cuisine];

  return (
    <div className={`${config.bgColor} p-4 rounded-lg`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{config.icon}</span>
        <h4 className={`font-semibold ${config.textColor}`}>{config.title}</h4>
      </div>
      
      <h5 className="font-medium text-gray-800 mb-2">{meal.name}</h5>
      
      <span className={`inline-block px-2 py-1 text-xs rounded-full ${cuisineColor}`}>
        {meal.cuisine}
      </span>
    </div>
  );
}