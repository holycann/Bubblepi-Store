import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data';
import { formatPrice } from '../lib/utils';
import { FiStar, FiArrowRight, FiChevronRight } from 'react-icons/fi';
import { HoverBorderGradient } from './ui/hover-border-gradient';
import { motion } from 'framer-motion';

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'streaming', name: 'Streaming' },
    { id: 'design', name: 'Design' },
    { id: 'ai', name: 'AI Tools' },
  ];
  
  const filteredProducts = activeCategory === 'all' 
    ? products.slice(0, 6) // Show first 6 products
    : products.filter(product => product.category === activeCategory).slice(0, 6);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-soft to-purple-dark">
            Featured Products
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Discover our most popular premium accounts and find the perfect one for your needs
          </p>
          
          {/* Category Tabs */}
          <div className="inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1.5 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === category.id 
                    ? 'bg-white dark:bg-gray-700 text-blue-dark dark:text-white shadow-sm' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-dark dark:hover:text-white'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: product.id * 0.1,
                ease: "easeInOut"
              }}
            >
              <Link to={`/product/${product.id}`}>
                <HoverBorderGradient className="h-full overflow-hidden">
                  <div className="p-6 flex flex-col h-full">
                    <div className="mb-4 overflow-hidden rounded-lg">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    <h3 className="text-xl font-bold text-blue-dark dark:text-white mb-2">
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                      {product.description}
                    </p>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center">
                        <FiStar className="w-5 h-5 text-yellow-500 mr-1" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">4.9/5</span>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-xs text-gray-500 dark:text-gray-400">Starting from</div>
                        <div className="font-bold text-pink-soft">
                          {formatPrice(Math.min(...product.variants.map(v => v.price)))}
                        </div>
                      </div>
                    </div>
                  </div>
                </HoverBorderGradient>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-soft to-purple-dark text-white font-medium hover:opacity-90 transition-all shadow-lg"
          >
            View All Products
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 