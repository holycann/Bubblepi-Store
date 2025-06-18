import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { products, categories } from '../data';
import ProductCard from '../components/ProductCard';
import { FilterPopup, FilterBar } from '../components/ui/filter-popup';
import { BackgroundBeams, GridPattern } from '../components/ui/background-gradient';
import { motion } from 'framer-motion';

const ProductsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [sortBy, setSortBy] = useState('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Count how many active filters
  const activeFiltersCount = 
    (selectedCategory !== 'all' ? 1 : 0) + 
    (searchQuery ? 1 : 0) + 
    (sortBy !== 'default' ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 200000 ? 1 : 0);
  
  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by price range
    result = result.filter(product => {
      const minPrice = Math.min(...product.variants.map(v => v.price));
      return minPrice >= priceRange[0] && minPrice <= priceRange[1];
    });
    
    // Sort products
    switch (sortBy) {
      case 'price_low':
        result.sort((a, b) => {
          const aPrice = Math.min(...a.variants.map(v => v.price));
          const bPrice = Math.min(...b.variants.map(v => v.price));
          return aPrice - bPrice;
        });
        break;
      case 'price_high':
        result.sort((a, b) => {
          const aPrice = Math.min(...a.variants.map(v => v.price));
          const bPrice = Math.min(...b.variants.map(v => v.price));
          return bPrice - aPrice;
        });
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // default order
        break;
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, sortBy, priceRange]);
  
  const handleFilterChange = (category, range) => {
    setSelectedCategory(category);
    setPriceRange(range);
  };
  
  const handleSortChange = (sort) => {
    setSortBy(sort);
  };
  
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  
  return (
    <div className="relative py-16 min-h-screen">
      {/* Background effects */}
      <BackgroundBeams className="opacity-30" />
      <GridPattern className="opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-8">
          <Link to="/" className="hover:text-pink-soft">Home</Link>
          <FiChevronRight className="mx-2" />
          <span className="text-gray-700 dark:text-gray-300">Products</span>
        </div>
        
        {/* Page title */}
        <div className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-soft to-purple-dark"
          >
            All Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600 dark:text-gray-300 mt-2"
          >
            Find the perfect premium account for your needs
          </motion.p>
        </div>
        
        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FilterBar 
            onOpenFilters={() => setIsFilterOpen(true)}
            onSearch={handleSearch}
            searchQuery={searchQuery}
            productsCount={products.length}
            filteredCount={filteredProducts.length}
            activeFilters={activeFiltersCount}
          />
        </motion.div>
        
        {/* Products grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * (index % 4) }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Try adjusting your search or filter parameters
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSortBy('default');
                setPriceRange([0, 200000]);
              }}
              className="py-2 px-4 bg-pink-soft text-white rounded-lg hover:bg-pink-soft/90 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
      
      {/* Filter popup */}
      <FilterPopup 
        categories={categories}
        selectedCategory={selectedCategory}
        sortBy={sortBy}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
    </div>
  );
};

export default ProductsPage; 