import React, { useState } from 'react';
import { RefreshCw, Users, Calendar, ShoppingCart } from 'lucide-react';
import { DayMeal, ShoppingListItem } from './types';
import { generateWeeklyMealPlan, generateShoppingList } from './utils/mealPlanGenerator';
import { DayCard } from './components/DayCard';
import { MealCard } from './components/MealCard';

function App() {
  const [mealPlan, setMealPlan] = useState<DayMeal[] | null>(null);
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [shoppingListItems, setShoppingListItems] = useState<ShoppingListItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateNewPlan = () => {
    setIsGenerating(true);
    const newPlan = generateWeeklyMealPlan();
    setMealPlan(newPlan);
    if (showShoppingList) {
      const newShoppingList = generateShoppingList(newPlan);
      setShoppingListItems(newShoppingList);
    }
    setTimeout(() => {
      setIsGenerating(false);
    }, 300);
  };

  const toggleShoppingList = () => {
    if (!showShoppingList && mealPlan) {
      const newShoppingList = generateShoppingList(mealPlan);
      setShoppingListItems(newShoppingList);
    } else if (!mealPlan) {
      return;
    }
    setShowShoppingList(!showShoppingList);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl text-gray-900 mb-2">
            Генератор рациона питания
          </h1>
          <div className="flex justify-center items-center gap-4 text-gray-500">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>3 человека</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>на неделю</span>
            </div>
          </div>
        </header>

        {/* Control Buttons */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          <button
            onClick={generateNewPlan}
            disabled={isGenerating}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-transform transform hover:scale-105 shadow-sm"
          >
            <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Генерируется...' : (mealPlan ? 'Сгенерировать заново' : 'Генерировать рацион')}
          </button>
          
          {mealPlan && (
            <button
              onClick={toggleShoppingList}
              className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-transform transform hover:scale-105 shadow-sm"
            >
              <ShoppingCart className="w-5 h-5" />
              {showShoppingList ? 'Скрыть список покупок' : 'Список покупок'}
            </button>
          )}
        </div>

        {/* Content Area */}
        <main>
          {showShoppingList && mealPlan ? (
            <section className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8">
              <h2 className="text-3xl text-gray-900 mb-8 text-center">
                Список покупок и меню
              </h2>

              {shoppingListItems.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl text-gray-900 mb-4 border-b border-gray-200 pb-3">
                    Общий список покупок ({shoppingListItems.length} поз.)
                  </h3>
                  <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-x-6">
                    {shoppingListItems.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-1 break-inside-avoid">
                        <span className="text-gray-800">{item.ingredient}</span>
                        <span className="text-gray-500 font-medium">{item.displayCount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-2xl text-gray-900 mb-4 border-b border-gray-200 pb-3">
                  Меню по дням
                </h3>
                <div className="space-y-8">
                  {mealPlan.map((dayMeal, index) => (
                    <div key={index} className={index > 0 ? "border-t border-gray-200 pt-8" : ""}>
                      <h4 className="text-xl text-gray-900 mb-4">{dayMeal.day}</h4>
                      <div className="space-y-6">
                        <MealCard meal={dayMeal.breakfast} mealType="breakfast" />
                        <MealCard meal={dayMeal.lunch} mealType="lunch" />
                        <MealCard meal={dayMeal.dinner} mealType="dinner" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : mealPlan ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mealPlan.map((dayMeal, index) => (
                <DayCard key={index} dayMeal={dayMeal} />
              ))}
            </div>
          ) : (
            <section className="text-center">
              <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-2xl mx-auto">
                <h2 className="text-2xl text-gray-900 mb-4">
                  Добро пожаловать!
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Нажмите кнопку "Генерировать рацион", чтобы создать недельный план питания из 100+ рецептов русской, европейской и итальянской кухни. Система автоматически подберёт завтрак, обед и ужин на каждый день недели и поможет составить список покупок.
                </p>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;