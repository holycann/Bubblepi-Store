import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ onComplete }) => {
  const [showSplash, setShowSplash] = useState(true);
  
  useEffect(() => {
    // Get state from sessionStorage to check if we already showed the splash
    const hasShownSplash = sessionStorage.getItem('hasShownSplash');
    
    if (hasShownSplash) {
      // If already shown, skip splash
      setShowSplash(false);
      if (onComplete) onComplete();
      return;
    }
    
    // Set timeout to hide splash after 2.5 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
      // Store in sessionStorage that we've shown the splash
      sessionStorage.setItem('hasShownSplash', 'true');
      if (onComplete) onComplete();
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [onComplete]);
  
  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-950"
        >
          <div className="text-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <img 
                src="/assets/images/logo.png"
                alt="BubblePi Logo" 
                className="w-24 h-24 mb-4"
              />
              
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "200px" }}
                transition={{ delay: 0.4, duration: 1 }}
                className="bg-gradient-to-r from-pink-soft to-purple-dark h-1 rounded-full"
              />
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-6 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-soft to-purple-dark"
              >
                BubblePi
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-2 text-gray-600 dark:text-gray-400"
              >
                Premium Accounts at Affordable Prices
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen; 