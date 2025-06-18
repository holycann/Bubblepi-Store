import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAnimations } from '../hooks/useAnimations';

const NotFoundPage = () => {
  const { slideUpVariants, bounceVariants } = useAnimations();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div 
        className="text-center"
        initial="hidden"
        animate="visible"
        variants={slideUpVariants}
      >
        <div className="mb-8">
          <motion.div 
            className="inline-block"
            variants={bounceVariants}
          >
            <span className="text-9xl font-bold bg-gradient-to-r from-pink-soft to-purple-dark bg-clip-text text-transparent">
              404
            </span>
          </motion.div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-blue-dark dark:text-dark-primary">
          Oops! Page Not Found
        </h1>
        
        <p className="text-lg mb-8 text-gray-600 dark:text-dark-secondary">
          We couldn't find the page you're looking for.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="btn-primary px-8 py-3"
          >
            Go Home
          </Link>
          
          <Link 
            to="/products" 
            className="btn-secondary px-8 py-3"
          >
            Browse Products
          </Link>
        </div>
        
        <div className="mt-12">
          <p className="text-gray-500 dark:text-gray-400">
            Need help? <a href="#" className="text-purple-dark dark:text-dark-accent underline">Contact Support</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage; 