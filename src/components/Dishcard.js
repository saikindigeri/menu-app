import React from 'react';
import { useNavigate } from 'react-router-dom';
import ingredient from '../ingredient.png';

const DishCard = ({ dish, isSelected, onToggle, onViewIngredients, onReadMore }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between space-x-4 items-center m-4">
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <h1 className="font-bold text-sm tracking-normal text-black font-sans leading-none">
            {dish.name}
          </h1>
          <button
            className={`flex items-center justify-center w-4 h-4 rounded-md border-2 font-medium transition-colors duration-200 ${
              dish.type === 'VEG' ? 'border-green-500' : 'border-red-500'
            }`}
          >
            <span
              className={`rounded-full w-2 h-2 inline-block transition-colors ${
                dish.type === 'VEG' ? 'bg-green-500' : 'bg-red-500'
              }`}
            ></span>
          </button>
        </div>
        <h2 className="text-[#7E7E7E] text-xs">
          {dish.description.slice(0, 60)}{' '}
          <button onClick={() => onReadMore(dish)} className="font-semibold">
            ...ReadMore
          </button>
        </h2>
        <div className="p-1 flex items-center">
          <img src={ingredient} alt="ingredient" className="w-4 h-4 mr-2 inline-block" />
          <button
            onClick={() => {
              console.log('Navigating to ingredients for dish:', dish);
              navigate(`/dishes/${dish.id}/ingredients`);
            }}
            className="text-[#FF8800] font-bold font-sans text-xs"
          >
            Ingredient
          </button>
        </div>
      </div>
      <div className="relative inline-block">
        <img
          src={dish.category.image}
          alt={dish.name}
          className="max-w-[100px] h-[100px] rounded-[12px] object-cover object-center opacity-100 rotate-0"
        />
        <button
          onClick={() => onToggle(dish.id)}
          className={`absolute -bottom-[12px] left-1/2 -translate-x-1/2  px-3 py-2 rounded-md bg-white font-semibold shadow-lg whitespace-nowrap transition-colors z-10 ${
            isSelected ? 'text-[#FF941A]' : 'text-[#73AE78]'
          }`}
        >
          {isSelected ? 'Remove' : 'Add +'}
        </button>
      </div>
    </div>
  );
};

export default DishCard;