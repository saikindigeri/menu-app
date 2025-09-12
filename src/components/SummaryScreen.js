import { FaChevronLeft } from 'react-icons/fa';
import React, { useLocation, useNavigate } from 'react-router-dom';

const SummaryScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedDishes, mockDishes } = location.state || { selectedDishes: [], mockDishes: {} };

  // Compute selected dishes with full data
  const allSelected = Object.values(mockDishes).flat().filter(dish => selectedDishes.includes(dish.id));
  const totalSelected = allSelected.length;

  // Group by category
  const groupedByCategory = {};
  Object.keys(mockDishes).forEach(cat => {
    groupedByCategory[cat.replace(/\b\w/g, l => l.toUpperCase())] = mockDishes[cat].filter(dish => selectedDishes.includes(dish.id));
  });

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header with Back Button */}
      <div className="flex items-center mb-6">
        <button
          onClick={handleBack}
          className="text-2xl mr-4 "
        >
         <FaChevronLeft/>
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
          dishes.length > 0 && (
            <div key={category} className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                {category} ({dishes.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dishes.map(dish => (
                  <div key={dish.id} className="flex flex-row p-3 bg-gray-50 rounded-md">
                    <img src={dish.image} alt={dish.name} className="w-16 h-16 rounded-md object-cover mr-3" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{dish.name}</h3>
                      <p className="text-sm text-gray-600">{dish.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default SummaryScreen;