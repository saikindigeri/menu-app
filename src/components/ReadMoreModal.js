import React from 'react';
import ingredient from '../ingredient.png'; 

const ReadMoreModal = ({ isOpen, dish, onClose, onToggle, selectedDishes ,onViewIngredients}) => {
  if (!isOpen || !dish) return null;

  const isSelected = selectedDishes.includes(dish.id);
  console.log(dish);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
   
      <div 
        className="bg-white w-full max-w-md rounded-t-3xl p-6 shadow-2xl transform transition-all duration-300 ease-in-out z-[60]"
        style={{ maxHeight: '50vh', overflowY: 'auto' }}
      >
        <img src={dish.image} alt={dish.name} className="w-full h-40 object-cover rounded-3xl mb-4" />
       
      
        <div className="flex justify-between items-center mb-4 relative">
         
          <div className="flex items-center space-x-2 flex-1">
            <h2 className="text-2xl font-bold text-gray-800">{dish.name}</h2>
            <button
              className={`flex items-center justify-center w-4 h-4 rounded-md border-2 font-medium transition-colors duration-200 
                ${dish.veg ? "border-green-500" : "border-red-500"}`}
            >
              <span
                className={`rounded-full w-2 h-2 inline-block transition-colors ${dish.veg ? "bg-green-500" : "bg-red-500"}`}
              ></span>
            </button>
          </div>
          
        
          <button
            onClick={() => onToggle(dish.id)}
            className={`px-3 py-2 shadow-md rounded-md bg-white font-semibold ml-4 ${isSelected ? 'text-[#FF941A]' : 'text-[#73AE78]'}`}
          >
            {isSelected ? 'Remove' : 'Add +'}
          </button>
        </div>
        
        <p className="text-gray-600 mb-4 font-sans"> <span className='font-bold text-black'>North Indian</span> {dish.description.slice(0, 120)}</p>
         <div className='p-1 flex items-center '>
            <img src={ingredient} alt="ingredeint" className='w-4 h-4 mr-2 inline-block' />
            <button className='text-[#FF8800] font-bold font-sans'  onClick={() => onViewIngredients(dish)}>Ingredient</button>
          
        </div>
      </div>
      

     
      <div 
        className="absolute inset-0 bg-black/70 z-[40]" 
        onClick={onClose}
      />
    </div>
  );
};

export default ReadMoreModal;