import React, { useState } from 'react';
import { RefreshCw, Users, Calendar, ShoppingCart } from 'lucide-react';
import { DayMeal, ShoppingListItem } from './types';
import { generateWeeklyMealPlan, generateShoppingList } from './utils/mealPlanGenerator';
import { DayCard } from './components/DayCard';
import { ShoppingList } from './components/ShoppingList';

function App() {
  const [mealPlan, setMealPlan] = useState<DayMeal[] | null>(null);
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [shoppingListItems, setShoppingListItems] = useState<ShoppingListItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateNewPlan = () => {
    setIsGenerating(true);
    console.log('Generating new meal plan...');
    
    const newPlan = generateWeeklyMealPlan();
    console.log('Generated meal plan:', newPlan);
    
    setMealPlan(newPlan);
    
    // Если список покупок был открыт, обновляем его с новым планом
    if (showShoppingList) {
      const newShoppingList = generateShoppingList(newPlan);
      console.log('Updated shopping list:', newShoppingList);
      setShoppingListItems(newShoppingList);
    }
    
    setIsGenerating(false);
  };

  const toggleShoppingList = () => {
    console.log('toggleShoppingList called, current state:', { showShoppingList, mealPlan: !!mealPlan });
    
    if (!showShoppingList && mealPlan) {
      console.log('Generating shopping list from meal plan...');
      const newShoppingList = generateShoppingList(mealPlan);
      console.log('Generated shopping list:', newShoppingList);
      console.log('Shopping list length:', newShoppingList.length);
      setShoppingListItems(newShoppingList);
    } else if (!mealPlan) {
      console.warn('Cannot generate shopping list: meal plan is null');
      return;
    }
    
    setShowShoppingList(!showShoppingList);
    console.log('showShoppingList will be:', !showShoppingList);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-yellow-400 to-yellow-300 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Генератор рациона питания
          </h1>
          <div className="flex justify-center items-center gap-4 text-white text-lg">
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6" />
              <span>3 человека</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              <span>на неделю</span>
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <button
            onClick={generateNewPlan}
            disabled={isGenerating}
            className={`${isGenerating ? 'bg-orange-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 hover:scale-105'} text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 shadow-lg`}
          >
            <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Генерируется...' : (mealPlan ? 'Сгенерировать заново' : 'Генерировать рацион')}
          </button>
          
          {mealPlan && (
            <button
              onClick={toggleShoppingList}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              {showShoppingList ? 'Скрыть список покупок' : 'Список покупок'}
            </button>
          )}
        </div>

        {/* Meal Plan */}
        {mealPlan && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {mealPlan.map((dayMeal, index) => (
              <DayCard key={index} dayMeal={dayMeal} />
            ))}
          </div>
        )}

        {/* Shopping List */}
        {showShoppingList && mealPlan && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Список покупок и меню по дням
            </h3>
            
            <div className="space-y-6">
              {mealPlan.map((dayMeal, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">
                    {dayMeal.day}
                  </h4>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">🌅</span>
                        <h5 className="font-semibold text-yellow-800">Завтрак</h5>
                      </div>
                      <p className="font-medium text-gray-800 mb-2">{dayMeal.breakfast.name}</p>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        dayMeal.breakfast.cuisine === 'Русская' ? 'bg-blue-500 text-white' :
                        dayMeal.breakfast.cuisine === 'Европейская' ? 'bg-green-500 text-white' :
                        'bg-red-500 text-white'
                      }`}>
                        {dayMeal.breakfast.cuisine}
                      </span>
                    </div>
                    
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">☀️</span>
                        <h5 className="font-semibold text-orange-800">Обед</h5>
                      </div>
                      <p className="font-medium text-gray-800 mb-2">{dayMeal.lunch.name}</p>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        dayMeal.lunch.cuisine === 'Русская' ? 'bg-blue-500 text-white' :
                        dayMeal.lunch.cuisine === 'Европейская' ? 'bg-green-500 text-white' :
                        'bg-red-500 text-white'
                      }`}>
                        {dayMeal.lunch.cuisine}
                      </span>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">🌙</span>
                        <h5 className="font-semibold text-purple-800">Ужин</h5>
                      </div>
                      <p className="font-medium text-gray-800 mb-2">{dayMeal.dinner.name}</p>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        dayMeal.dinner.cuisine === 'Русская' ? 'bg-blue-500 text-white' :
                        dayMeal.dinner.cuisine === 'Европейская' ? 'bg-green-500 text-white' :
                        'bg-red-500 text-white'
                      }`}>
                        {dayMeal.dinner.cuisine}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h6 className="font-semibold text-gray-800 mb-3">Список покупок на этот день:</h6>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {[...new Set([
                        ...dayMeal.breakfast.ingredients,
                        ...dayMeal.lunch.ingredients,
                        ...dayMeal.dinner.ingredients
                      ])].sort((a, b) => a.localeCompare(b, 'ru')).map((ingredient, idx) => (
                        <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border">
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {shoppingListItems.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-xl font-bold text-gray-800 mb-4">
                  Общий список покупок на неделю ({shoppingListItems.length} позиций)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {shoppingListItems.map((item, index) => (
                    <div 
                      key={index}
                      className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-800">{item.ingredient}</span>
                        <span className="text-sm text-gray-600 font-semibold">
                          {item.displayCount}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Welcome Message */}
        {!mealPlan && (
          <div className="text-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 max-w-2xl mx-auto shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Добро пожаловать!
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Нажмите кнопку "Генерировать рацион", чтобы создать недельный план питания из 100+ рецептов русской, европейской и итальянской кухни. Система автоматически подберёт завтрак, обед и ужин на каждый день недели и поможет составить список покупок.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;