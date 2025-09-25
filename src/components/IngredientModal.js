import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mockDishes } from '../data/mockDishes';  // Adjust path to your data file
import { FaChevronLeft } from 'react-icons/fa';

const IngredientModal = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(dish);
  console.log(mockDishes);

  useEffect(() => {
    const fetchDish = () => {
      if (!id) {
        setError('No dish ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Safety check: Ensure mockDishes is an object with arrays
        if (typeof mockDishes !== 'object' || mockDishes === null) {
          throw new Error('mockDishes is not a valid object – check your data export');
        }
        
        // Flatten all category arrays into one array
        const allDishes = Object.values(mockDishes).flat();
        
        // Now find the dish by id
        const foundDish = allDishes.find(d => d.id === parseInt(id, 10));
        console.log("start", foundDish);
        if (!foundDish) {
          throw new Error('Dish not found');
        }
        
        setDish(foundDish);
      } catch (err) {
        console.error('Fetch error:', err);  // Log for debugging
        setError(err.message);
      } finally {
        setLoading(false);
      } 
    };

    fetchDish();
  }, [id]);  // Re-run if id changes

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white min-h-screen flex flex-col justify-center">
        <p className="text-red-500 mb-4 text-center">Error: {error}</p>
        <button 
          onClick={() => navigate(-1)} 
          className="bg-blue-500 text-white px-4 py-2 rounded mx-auto"
        >
          Back
        </button>
      </div>
    );
  }

  if (!dish) {
    return (
      <div className="p-6 bg-white min-h-screen flex flex-col justify-center gap-5">
        <p className="mb-4 text-center">No dish data available</p>
        <button 
          onClick={() => navigate(-1)} 
          className="bg-blue-500 text-white px-4 py-2 rounded mx-auto"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-white overflow-y-auto gap-4 space-y-3 flex flex-col">
      <div className="p-4 sm:p-6 flex-1">
        {/* Header */}
        <div className="flex items-center mb-5">
          <button 
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-700 mr-3"
            aria-label="Back"
          >
            <FaChevronLeft className="text-xl" />
          </button>
          <h1 className="text-lg font-bold text-black flex-1">Ingredient List</h1>
        </div>

        {/* Main Content: Responsive Row Layout with Image on Top Right */}
        <div className="relative mb-6 space-y-3 gap-4 ">
         
          <div className="flex-1 flex flex-col justify-between gap-4 pr-0 sm:pr-4 mb-4 sm:mb-3 mt-3">
            {/* Dish Name and Description */}
            <div>
              <h2 className="text-[18px] lg:text-3xl font-bold text-black mb-2">{dish.name}</h2>
              <p className="text-gray-600 leading-relaxed text-xs">{dish.fullDescription.slice(0,100)}</p>
            </div>

            {/* Ingredients Section */}
            <div>
              <h3 className="text-[18px] font-bold text-black mb-2 font-sans">Ingredients</h3>
              <p className="text-sm text-gray-500 mb-3">For 2 people</p>
                  <hr className="borde-1 border-[#CECECE] mb-4" />
              <ul className="space-y-2">
                {dish.ingredients?.map((ingredient, index) => {
                  const parts = ingredient.split(": ");
                  return (
                    <li key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="font-semibold text-sm text-gray-800">{parts[0]}</span>
                      <span className="text-gray-600 text-sm">{parts[1]}</span>
                    </li>
                  );
                }) || <li className="text-gray-500">No ingredients available</li>}
              </ul>
            </div>
          </div>

       
          <div className="absolute top-0 right-0 w-32 h-32 sm:w-32 sm:h-32 lg:w-32 lg:h-32 xl:w-32 xl:h-32">
            <img 
              src={dish.image} 
              alt={dish.name} 
              className="w-full h-full object-cover rounded-lg shadow-md" 
            />
          </div>
        </div>

      
    
      </div>
    </div>
  );
};

export default IngredientModal;