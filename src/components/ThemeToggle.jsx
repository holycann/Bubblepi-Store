import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {theme === 'dark' ? (
          <FiSun className="w-5 h-5" />
        ) : (
          <FiMoon className="w-5 h-5" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle; 