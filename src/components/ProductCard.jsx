import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { formatPrice } from '../lib/utils';
import { 
  FiShoppingCart, 
  FiCheckCircle, 
  FiStar, 
  FiPackage, 
  FiTruck, 
  FiClock,
  FiTag,
  FiBox,
  FiAlertCircle,
  FiCheckSquare
} from 'react-icons/fi';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useContext(CartContext);
  
  const lowestPriceVariant = product.variants.reduce((lowest, current) => {
    return current.price < lowest.price ? current : lowest;
  }, product.variants[0]);
  
  const totalStock = product.variants.reduce((sum, variant) => sum + variant.stock, 0);
  const lowStock = totalStock < 5;
  const outOfStock = totalStock === 0;
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    
    // Add default variant to cart
    addToCart({
      id: `${product.id}-${lowestPriceVariant.id}`,
      productId: product.id,
      name: product.name,
      image: product.image,
      price: lowestPriceVariant.price,
      variantName: lowestPriceVariant.name,
      quantity: 1,
    });
    
    // Reset the button state after animation completes
    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };

  return (
    <Link to={`/product/${product.id}`} className="block">
      <motion.div 
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden h-full relative"
      >
        {/* Image container */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          
          {/* Stock indicator */}
          <div className="absolute top-3 left-3">
            {outOfStock ? (
              <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                <FiAlertCircle className="w-3 h-3" />
                Out of Stock
              </div>
            ) : lowStock ? (
              <div className="bg-amber-500 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                <FiClock className="w-3 h-3" />
                Low Stock: {totalStock}
              </div>
            ) : (
              <div className="bg-pink-soft text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                <FiCheckSquare className="w-3 h-3" />
                In Stock: {totalStock}
              </div>
            )}
          </div>
          
          {/* Category tag */}
          <div className="absolute bottom-3 right-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-xs px-2 py-1 rounded-md flex items-center gap-1">
            <FiTag className="w-3 h-3" />
            {product.category}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center text-start justify-between mb-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FiBox className="w-4 h-4" />
              {product.name}
            </h3>
            <div className="flex items-center">
              <FiStar className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-xs text-gray-500 dark:text-gray-400">4.8</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-start dark:text-gray-300 text-sm mb-3 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center justify-between mt-auto">
            {/* Price */}
            <div>
              <div className="text-xs text-gray-500 text-start dark:text-gray-400">Starting from</div>
              <div className="font-bold text-pink-soft flex items-center gap-1">
                <FiTag className="w-3 h-3" />
                {formatPrice(lowestPriceVariant.price)}
              </div>
            </div>
            
            {/* Add to cart button with animation */}
            <motion.button
              onClick={handleAddToCart}
              disabled={outOfStock || isAdding}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-lg transition-all ${
                outOfStock 
                  ? 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed' 
                  : 'bg-pink-soft hover:bg-pink-soft/90 text-white'
              }`}
            >
              <AnimatePresence mode="wait">
                {isAdding ? (
                  <motion.div
                    key="adding"
                    initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.3, type: "spring" }}
                  >
                    <FiCheckCircle className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiShoppingCart className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Cart added animation overlay */}
        <AnimatePresence>
          {isAdding && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-pink-soft/10 backdrop-blur-sm flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ 
                  scale: [0, 1.2, 1], 
                  rotate: [0, 20, 0],
                  y: [0, -20, 0] 
                }}
                transition={{ 
                  duration: 0.6, 
                  times: [0, 0.6, 1],
                  ease: "easeOut" 
                }}
                className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg"
              >
                <FiCheckCircle className="w-8 h-8 text-green-500" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="absolute bottom-10 font-medium text-pink-soft bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg"
              >
                Added to cart!
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
};

export default ProductCard; 