import React from 'react';
import DishCard from './Dishcard';
import { FaAngleUp } from 'react-icons/fa';

const DishList = ({ dishes, selectedDishes, onToggle, onViewIngredients, onReadMore }) => {
  return (
    <div className="flex-1 overflow-y-auto">
        <div className='m-4 flex justify-between items-center'>
             <h2 className='font-semibold'>North Indian</h2>
             <div className='h-4 w-4'>
                <FaAngleUp/> 
             </div>
        </div>
      {dishes.map((dish) => (
     
        <DishCard
          key={dish.id}
          dish={dish}
          isSelected={selectedDishes.includes(dish.id)}
          onToggle={onToggle}
          onViewIngredients={onViewIngredients}
          onReadMore={onReadMore}
        />
      ))}
    </div>
  );
};

export default DishList;