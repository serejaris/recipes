import { DayMeal } from '../types';
import { MealCard } from './MealCard';

interface DayCardProps {
  dayMeal: DayMeal;
}

export function DayCard({ dayMeal }: DayCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg hover:scale-105 transition-all duration-300">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
        {dayMeal.day}
      </h3>
      
      <div className="space-y-4">
        <MealCard meal={dayMeal.breakfast} mealType="breakfast" />
        <MealCard meal={dayMeal.lunch} mealType="lunch" />
        <MealCard meal={dayMeal.dinner} mealType="dinner" />
      </div>
    </div>
  );
}