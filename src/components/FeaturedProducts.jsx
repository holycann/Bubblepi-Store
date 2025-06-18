import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { products } from '../data';
import { FiArrowRight, FiStar } from 'react-icons/fi';

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(4);

  useEffect(() => {
    // Get a random selection of featured products
    const featured = [...products]
      .sort(() => 0.5 - Math.random())
      .slice(0, 8);
    
    setFeaturedProducts(featured);
  }, []);

  // Update visible products count based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) { // mobile
        setVisibleProducts(2);
      } else if (width < 1024) { // tablet
        setVisibleProducts(3);
      } else { // desktop
        setVisibleProducts(4);
      }
    };

    // Initial setup
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <section className="py-16 bg-white dark:bg-dark">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FiStar className="text-pink-soft w-5 h-5" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Featured Products
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              Discover our handpicked premium accounts that offer exceptional value and features.
            </p>
          </div>
          
          <Link 
            to="/products" 
            className="mt-4 md:mt-0 inline-flex items-center text-pink-soft hover:text-pink-soft/80 transition-colors group"
          >
            <span className="font-medium">View all products</span>
            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.slice(0, visibleProducts).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
        
        {/* Mobile "Show More" button */}
        <div className="mt-8 text-center lg:hidden">
          <Link 
            to="/products" 
            className="inline-flex items-center justify-center px-6 py-3 bg-pink-soft text-white rounded-lg hover:bg-pink-soft/90 transition-colors"
          >
            <span className="font-medium">Browse All Products</span>
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 