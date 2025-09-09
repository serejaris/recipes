import { recipes } from '../data/recipes';
import { DayMeal, Recipe, ShoppingListItem } from '../types';

const daysOfWeek = [
  'Понедельник',
  'Вторник', 
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье'
];

function getRandomRecipe(category: 'Завтрак' | 'Обед' | 'Ужин'): Recipe {
  const categoryRecipes = recipes.filter(recipe => recipe.category === category);
  return categoryRecipes[Math.floor(Math.random() * categoryRecipes.length)];
}

export function generateWeeklyMealPlan(): DayMeal[] {
  return daysOfWeek.map(day => ({
    day,
    breakfast: getRandomRecipe('Завтрак'),
    lunch: getRandomRecipe('Обед'),
    dinner: getRandomRecipe('Ужин')
  }));
}

export function generateShoppingList(mealPlan: DayMeal[]): ShoppingListItem[] {
  console.log('generateShoppingList called with:', mealPlan);
  
  if (!mealPlan || mealPlan.length === 0) {
    console.warn('Meal plan is empty or null');
    return [];
  }
  
  const ingredientCounts: { [key: string]: number } = {};

  // Собираем все ингредиенты из плана
  mealPlan.forEach(dayMeal => {
    if (!dayMeal) {
      console.warn('Day meal is null or undefined');
      return;
    }
    
    [dayMeal.breakfast, dayMeal.lunch, dayMeal.dinner].forEach(recipe => {
      if (!recipe || !recipe.ingredients) {
        console.warn('Recipe or ingredients is null/undefined:', recipe);
        return;
      }
      
      recipe.ingredients.forEach(ingredient => {
        if (!ingredient || typeof ingredient !== 'string') {
          console.warn('Invalid ingredient:', ingredient);
          return;
        }
        
        const cleanIngredient = ingredient.trim();
        if (cleanIngredient) {
          ingredientCounts[cleanIngredient] = (ingredientCounts[cleanIngredient] || 0) + 1;
        }
      });
    });
  });

  console.log('Ingredient counts:', ingredientCounts);
  
  if (Object.keys(ingredientCounts).length === 0) {
    console.warn('No ingredients found in meal plan');
    return [];
  }

  // Умножаем на 3 (для 3 человек) и создаем список покупок
  const shoppingList = Object.entries(ingredientCounts).map(([ingredient, count]) => {
    const totalCount = count * 3;
    return {
      ingredient,
      count: totalCount,
      displayCount: totalCount > 7 ? 'много' : `${totalCount} раз`
    };
  });

  console.log('Generated shopping list before sorting:', shoppingList);

  // Сортируем по алфавиту
  const sortedList = shoppingList.sort((a, b) => a.ingredient.localeCompare(b.ingredient, 'ru'));
  
  console.log('Final sorted shopping list:', sortedList);
  return sortedList;
}