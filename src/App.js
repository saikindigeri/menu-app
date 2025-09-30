import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'; 
import { mockDishes } from './data/mockDishes';
import Filters from './components/Filters';
import DishList from './components/DishList';
import IngredientModal from './components/IngredientModal';
import ReadMoreModal from './components/ReadMoreModal';
import SummaryScreen from './components/SummaryScreen'; 

import { FaChevronRight } from 'react-icons/fa';



const MenuScreen = () => {
  const navigate = useNavigate();
  const categories = ['STARTER', 'MAIN COURSE', 'DESSERT', 'SIDES']; // Fixed case and DESERT typo
  const [currentCategory, setCurrentCategory] = useState('STARTER');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegFilter, setVegFilter] = useState(false);
  const [nonVegFilter, setNonVegFilter] = useState(false);
  const [selectedDishes, setSelectedDishes] = useState(() => {
    const saved = localStorage.getItem('selectedDishes');
    return saved ? JSON.parse(saved) : [];
  });
  const [showReadMoreModal, setShowReadMoreModal] = useState(false);
  const [modalDish, setModalDish] = useState(null);

  // Debug mockDishes
  useEffect(() => {
    console.log('mockDishes:', mockDishes);
  }, []);

  // Save selectedDishes to localStorage
  useEffect(() => {
    localStorage.setItem('selectedDishes', JSON.stringify(selectedDishes));
  }, [selectedDishes]);

  // Filter dishes by mealType
  const allDishes = mockDishes.filter((dish) => dish.mealType === currentCategory);

  const filteredDishes = useMemo(() => {
    let filtered = allDishes.filter((dish) =>
      dish.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (vegFilter) filtered = filtered.filter((dish) => dish.type === 'VEG');
    if (nonVegFilter) filtered = filtered.filter((dish) => dish.type === 'NON-VEG');
    return filtered;
  }, [allDishes, searchQuery, vegFilter, nonVegFilter]);

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    return categories.map((cat) =>
      mockDishes.filter((dish) => dish.mealType === cat && selectedDishes.includes(dish.id)).length
    );
  }, [selectedDishes]);

  const totalSelected = selectedDishes.length;

  const toggleDish = (id) => {
    setSelectedDishes((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const openReadMore = (dish) => {
    console.log('Opening ReadMoreModal with dish:', dish);
    setModalDish(dish);
    setShowReadMoreModal(true);
  };

  const closeReadMore = () => {
    console.log('Closing ReadMoreModal');
    setShowReadMoreModal(false);
    setModalDish(null);
  };

  const handleContinue = () => {
    if (totalSelected === 0) {
      alert('Please select at least one dish to continue!');
      return;
    }
    navigate('/summary', { state: { selectedDishes, mockDishes } });
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl flex flex-col min-h-screen">
      <div className="flex-1 overflow-hidden">
        <Filters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          vegFilter={vegFilter}
          nonVegFilter={nonVegFilter}
          onVegToggle={() => setVegFilter(!vegFilter)}
          onNonVegToggle={() => setNonVegFilter(!nonVegFilter)}
          categories={categories}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
          categoryCounts={categoryCounts}
        />
        <div className="overflow-y-auto max-h-[calc(100vh-200px)] pb-4 thin-scrollbar">
          <DishList
            dishes={filteredDishes}
            selectedDishes={selectedDishes}
            onToggle={toggleDish}
            onViewIngredients={(dish) => navigate(`/dishes/${dish.id}/ingredients`)} // Navigate to route
            onReadMore={openReadMore}
          />
        </div>
      </div>
      <div className="z-50 flex flex-col bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="flex items-center justify-between w-full bg-[#FFFAF4] mb-4">
          <span className="text-lg font-bold text-black font-sans">
            Total Dish Selected {totalSelected}
          </span>
          <span className="text-lg font-bold text-black">
            <FaChevronRight />
          </span>
        </div>
        <button
          onClick={handleContinue}
          className="bg-black text-sm text-white px-6 py-3 rounded-md font-medium w-full"
        >
          Continue
        </button>
      </div>
      <ReadMoreModal
        isOpen={showReadMoreModal}
        dish={modalDish}
        onViewIngredients={(dish) => navigate(`/dishes/${dish.id}/ingredients`)} // Navigate to route
        onClose={closeReadMore}
        selectedDishes={selectedDishes}
        onToggle={toggleDish}
      />
    </div>
  );
};


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<MenuScreen />} />
          <Route path="/summary" element={<SummaryScreen />} />
            <Route path="/dishes/:id/ingredients" element={<IngredientModal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;