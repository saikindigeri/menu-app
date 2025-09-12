import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaChevronLeft } from "react-icons/fa";

const Filters = ({
  searchQuery,
  onSearchChange,
  vegFilter,
  nonVegFilter,
  onVegToggle,
  onNonVegToggle,
  categories,
  categoryCounts,
  currentCategory,
  setCurrentCategory,
}) => {
  return (
    <div className="p-2 sm:p-4 bg-gray-50 border-3 border-[#ADADAD]-500">
      <div className="relative w-full mb-3 sm:mb-4">
        <FaChevronLeft
          className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-black  "
          aria-hidden="true"
        />
        <input
          type="text"
          placeholder="Search dish for your party......"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-8 sm:pl-10 pr-8 sm:pr-16 p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none text-sm sm:text-base"
        />
        <CiSearch
          className="absolute h-4 w-4 sm:h-5 sm:w-5 right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-black cursor-pointer"
          aria-hidden="true"
        />
      </div>

      <nav className="flex flex-row overflow-x-auto justify-between border-b border-gray-200 pb-1 sm:pb-2 mb-3 sm:mb-4 no-scrollbar">
        {categories.map((cat, index) => (
          <button
            key={cat}
            onClick={() => setCurrentCategory(cat)}
            className={`px-2 py-1 sm:px-4 sm:py-2 mx-1 sm:mx-2 whitespace-nowrap rounded-lg transition-colors font-semibold border-2 border-[#ADADAD] duration-200 text-xs sm:text-sm ${
              currentCategory === cat
                ? "bg-[#FF941A] text-white border-[#FF941A]"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)} {" "}
            {categoryCounts[index] > 0 ? `${categoryCounts[index]}` : "0"}
          </button>
        ))}
      </nav>

      <div className="flex sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <div className="font-semibold text-sm sm:text-base">
          {currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}{" "}
          selected ({categoryCounts[categories.indexOf(currentCategory)]})
        </div>

        <div className="flex flex-row justify-start sm:justify-end space-x-4 sm:space-x-6">
          {/* Veg Button */}
          <button
            onClick={onVegToggle}
            className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-md border-2 font-medium transition-colors duration-200 ${
              vegFilter
                ? "bg-green-600 border-green-500"
                : "bg-white border-green-300 hover:bg-green-50"
            }`}
          >
            <span
              className={`rounded-full w-2 h-2 sm:w-3 sm:h-3 inline-block transition-colors ${
                vegFilter ? "bg-green-300" : "bg-green-400"
              }`}
            ></span>
          </button>

          {/* Non-Veg Button */}
          <button
            onClick={onNonVegToggle}
            className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-md border-2 font-medium transition-colors duration-200 ${
              nonVegFilter
                ? "bg-red-600 border-red-500"
                : "bg-white border-red-300 hover:bg-red-50"
            }`}
          >
            <span
              className={`rounded-full w-2 h-2 sm:w-3 sm:h-3 inline-block transition-colors ${
                nonVegFilter ? "bg-red-300" : "bg-red-400"
              }`}
            ></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;