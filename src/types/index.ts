export interface DayMeal {
  day: string;
  breakfast: Recipe;
  lunch: Recipe;
  dinner: Recipe;
}

export interface Recipe {
  id: number;
  name: string;
  category: 'Завтрак' | 'Обед' | 'Ужин';
  cuisine: 'Русская' | 'Европейская' | 'Итальянская';
  ingredients: string[];
}

export interface ShoppingListItem {
  ingredient: string;
  count: number;
  displayCount: string;
}