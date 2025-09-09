import { ShoppingListItem } from '../types';

interface ShoppingListProps {
  items: ShoppingListItem[];
}

export function ShoppingList({ items }: ShoppingListProps) {
  console.log('ShoppingList component rendered with items:', items);
  
  if (!items || items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Список покупок
        </h3>
        <div className="text-center text-gray-600">
          <p>Список покупок пуст</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Список покупок ({items.length} позиций)
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
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
  );
}