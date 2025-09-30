import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { mockDishes } from '../data/mockDishes';

const SummaryScreen = () => {
  const navigate = useNavigate();
  const [selectedDishes, setSelectedDishes] = useState(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem('selectedDishes');
    return saved ? JSON.parse(saved) : [];
  });

  // Update localStorage on selectedDishes change
  useEffect(() => {
    localStorage.setItem('selectedDishes', JSON.stringify(selectedDishes));
  }, [selectedDishes]);

  // Redirect to / if no dishes selected
  useEffect(() => {
    if (selectedDishes.length === 0) {
      navigate('/');
    }
  }, [selectedDishes, navigate]);

  // Compute selected dishes
  const allSelected = mockDishes.filter((dish) => selectedDishes.includes(dish.id));
  const totalSelected = allSelected.length;

  // Group by mealType
  const groupedByCategory = allSelected.reduce((acc, dish) => {
    const category = dish.mealType || 'UNKNOWN';
    if (!acc[category]) acc[category] = [];
    acc[category].push(dish);
    return acc;
  }, {});

  const handleBack = () => navigate('/');

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={handleBack} className="text-2xl mr-4">
          <FaChevronLeft />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Party Menu Summary</h1>
      </div>

      {/* Total */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <p className="text-lg font-semibold text-gray-700">Total Dishes: {totalSelected}</p>
      </div>

      {/* Grouped Sections */}
      <div className="space-y-6">
        {Object.entries(groupedByCategory).map(([category, dishes]) => (
          <div key={category} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
              {category.charAt(0).toUpperCase() + category.slice(1)} ({dishes.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dishes.map((dish) => (
                <div key={dish.id} className="flex flex-row p-3 bg-gray-50 rounded-md">
                  <img
                    src={dish.category.image || 'https://via.placeholder.com/64'}
                    alt={dish.name}
                    className="w-16 h-16 rounded-md object-cover mr-3"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{dish.name}</h3>
                    <p className="text-sm text-gray-600">{dish.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {totalSelected === 0 && (
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <p className="text-gray-600">No dishes selected.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryScreen;