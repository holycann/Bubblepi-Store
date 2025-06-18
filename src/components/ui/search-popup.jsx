import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const SearchPopup = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef(null);

  // Focus input when popup opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Mock search function - replace with your actual search logic
  const handleSearch = async (query) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Mock results - replace with actual search results
      const mockResults = [
        {
          id: 1,
          title: 'Product 1',
          category: 'Category A',
          price: 29.99,
          image: '/assets/images/products/1.jpg'
        },
        {
          id: 2,
          title: 'Product 2',
          category: 'Category B',
          price: 39.99,
          image: '/assets/images/products/2.jpg'
        },
      ];
      setSearchResults(mockResults);
      setIsLoading(false);
    }, 500);
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        handleSearch(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Search Container */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 z-50 shadow-xl"
          >
            <div className="container mx-auto px-4 py-4">
              {/* Search Input */}
              <div className="relative max-w-3xl mx-auto">
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products, categories..."
                    className="w-full pl-12 pr-10 py-4 bg-gray-100 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-pink-soft text-gray-900 dark:text-white placeholder-gray-500"
                  />
                  <button
                    onClick={onClose}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                {/* Search Results */}
                <AnimatePresence>
                  {(searchResults.length > 0 || isLoading) && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                    >
                      {isLoading ? (
                        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                          Searching...
                        </div>
                      ) : (
                        <div className="divide-y divide-gray-100 dark:divide-gray-700">
                          {searchResults.map((result) => (
                            <Link
                              key={result.id}
                              to={`/products/${result.id}`}
                              onClick={onClose}
                              className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                                <img
                                  src={result.image}
                                  alt={result.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-grow">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                  {result.title}
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {result.category}
                                </p>
                              </div>
                              <div className="text-sm font-medium text-pink-soft">
                                ${result.price}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchPopup; 