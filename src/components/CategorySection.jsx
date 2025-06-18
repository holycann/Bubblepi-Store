import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { categories } from '../data';

const CategorySection = () => {
  // Motion variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          variants={itemVariants}
          className="relative group"
        >
          <Link
            to={`/category/${category.id}`}
            className="block overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 drop-shadow-md group-hover:translate-x-2 transition-transform">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/80 drop-shadow-md line-clamp-2 max-w-xs mb-2 transition-opacity">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center text-xs sm:text-sm mt-3 text-white/80 group-hover:text-white transition-colors">
                    <span>Explore {category.name}</span>
                    <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                
                {category.icon && (
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-lg">
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
              
              {category.productCount && (
                <div className="absolute top-6 right-6 bg-pink-soft/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                  {category.productCount} products
                </div>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CategorySection; 