import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter, FiX, FiCheck } from "react-icons/fi";
import { BackgroundGradient } from "./background-gradient";
import { cn } from "../../lib/utils";

export const FilterPopup = ({ 
  onFilterChange, 
  onSortChange, 
  categories,
  selectedCategory,
  sortBy,
  isOpen,
  onClose
}) => {
  const [internalCategory, setInternalCategory] = useState(selectedCategory);
  const [internalSortBy, setInternalSortBy] = useState(sortBy);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const containerRef = useRef();

  // Handle clicks outside to close the popup
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    setInternalCategory(selectedCategory);
    setInternalSortBy(sortBy);
  }, [selectedCategory, sortBy]);

  const handleApply = () => {
    onFilterChange(internalCategory, priceRange);
    onSortChange(internalSortBy);
    onClose();
  };

  const handleReset = () => {
    setInternalCategory("all");
    setInternalSortBy("default");
    setPriceRange([0, 200000]);
    onFilterChange("all", [0, 200000]);
    onSortChange("default");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm flex items-center justify-center"
        >
          <motion.div
            ref={containerRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-full max-w-md mx-4"
          >
            <BackgroundGradient className="p-1">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <FiFilter className="w-5 h-5" />
                    Filter & Sort
                  </h3>
                  <button
                    onClick={onClose}
                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <FiX className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Categories filter */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      Category
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <FilterButton
                        active={internalCategory === "all"}
                        onClick={() => setInternalCategory("all")}
                      >
                        All Products
                      </FilterButton>
                      {categories.map((category) => (
                        <FilterButton
                          key={category.slug}
                          active={internalCategory === category.slug}
                          onClick={() => setInternalCategory(category.slug)}
                        >
                          {category.name}
                        </FilterButton>
                      ))}
                    </div>
                  </div>

                  {/* Price filter */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      Price Range
                    </h4>
                    <div className="px-2">
                      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div
                          className="absolute h-2 bg-pink-soft rounded-full"
                          style={{
                            left: `${(priceRange[0] / 200000) * 100}%`,
                            right: `${100 - (priceRange[1] / 200000) * 100}%`,
                          }}
                        />
                      </div>
                      <div className="mt-6 flex items-center justify-between">
                        <input
                          type="number"
                          placeholder="Min"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([
                            Math.min(parseInt(e.target.value) || 0, priceRange[1]),
                            priceRange[1],
                          ])}
                          className="w-24 p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                          type="number"
                          placeholder="Max"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([
                            priceRange[0],
                            Math.max(parseInt(e.target.value) || 0, priceRange[0]),
                          ])}
                          className="w-24 p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sorting */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      Sort By
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <FilterButton
                        active={internalSortBy === "default"}
                        onClick={() => setInternalSortBy("default")}
                      >
                        Default
                      </FilterButton>
                      <FilterButton
                        active={internalSortBy === "price_low"}
                        onClick={() => setInternalSortBy("price_low")}
                      >
                        Price: Low to High
                      </FilterButton>
                      <FilterButton
                        active={internalSortBy === "price_high"}
                        onClick={() => setInternalSortBy("price_high")}
                      >
                        Price: High to Low
                      </FilterButton>
                      <FilterButton
                        active={internalSortBy === "name"}
                        onClick={() => setInternalSortBy("name")}
                      >
                        Name (A-Z)
                      </FilterButton>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button
                    onClick={handleReset}
                    className="py-2 px-4 rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleApply}
                    className="py-2 px-4 rounded-lg text-white bg-pink-soft hover:bg-pink-soft/90 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </BackgroundGradient>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FilterButton = ({ active, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2",
        active
          ? "bg-pink-soft text-white"
          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
      )}
    >
      {active && <FiCheck className="w-4 h-4" />}
      {children}
    </button>
  );
};

export const FilterBar = ({
  onOpenFilters,
  onSearch,
  searchQuery,
  productsCount,
  filteredCount,
  activeFilters
}) => {
  const [query, setQuery] = useState(searchQuery || "");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
      <div className="flex items-center">
        <button
          onClick={onOpenFilters}
          className="flex items-center gap-2 py-2 px-4 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <FiFilter className="w-4 h-4" />
          <span>Filter & Sort</span>
          {activeFilters > 0 && (
            <span className="bg-pink-soft text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {activeFilters}
            </span>
          )}
        </button>
        
        <div className="ml-4 text-sm text-gray-500 dark:text-gray-400">
          {filteredCount < productsCount ? (
            <span>Showing {filteredCount} of {productsCount} products</span>
          ) : (
            <span>{productsCount} products</span>
          )}
        </div>
      </div>
      
      <form onSubmit={handleSearch} className="relative flex-1 max-w-xs ml-auto">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full py-2 pl-3 pr-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-soft"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}; 