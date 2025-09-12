import React, { useState, useMemo } from 'react';
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
  const categories = ['starter', 'main course', 'dessert', 'sides'];
  const [currentCategory, setCurrentCategory] = useState('starter');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegFilter, setVegFilter] = useState(false);
  const [nonVegFilter, setNonVegFilter] = useState(false);
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [showIngredientModal, setShowIngredientModal] = useState(false);
  const [showReadMoreModal, setShowReadMoreModal] = useState(false);
  const [modalDish, setModalDish] = useState(null);

  const allDishes = mockDishes[currentCategory];
  const filteredDishes = useMemo(() => {
    let filtered = allDishes.filter((dish) =>
      dish.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (vegFilter) filtered = filtered.filter((dish) => dish.veg);
    if (nonVegFilter) filtered = filtered.filter((dish) => !dish.veg);
    return filtered;
  }, [allDishes, searchQuery, vegFilter, nonVegFilter]);

const categoryCounts = [];
for (let i = 0; i < categories.length; i++) {
  const cat = categories[i];
  let count = 0;
  for (const dish of mockDishes[cat]) {
    if (selectedDishes.includes(dish.id)) {
      count++;
    }
  }
  categoryCounts.push(count);
}
  const totalSelected = selectedDishes.length;

  const toggleDish = (id) => {
    setSelectedDishes((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const openIngredients = (dish) => {
    setModalDish(dish);
    setShowIngredientModal(true);
  };

  const closeIngredientModal = () => {
    setShowIngredientModal(false);
    setModalDish(null);
  };

  const openReadMore = (dish) => {
    setModalDish(dish);
    setShowReadMoreModal(true);
  };

  const closeReadMore = () => {
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
   
    <div className="overflow-y-auto max-h-[calc(100vh-200px)] pb-4 thin-scrollbar">  {/* Scrollable area for DishList */}
      <DishList
        dishes={filteredDishes}
        selectedDishes={selectedDishes}
        onToggle={toggleDish}
        onViewIngredients={openIngredients}
        onReadMore={openReadMore}
      />
    </div>
  </div>
  
  {/* Fixed Bottom Bar */}
  <div className="z-50 flex flex-col bg-white border-t border-gray-200 p-4 shadow-lg">
    <div className="flex items-center justify-between w-full bg-[#FFFAF4] mb-4">
      <span className="text-lg font-bold text-black font-sans">Total Dish Selected {totalSelected}</span> 
      <span className="text-lg font-bold text-black"><FaChevronRight /></span>
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
    onViewIngredients={openIngredients} 
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