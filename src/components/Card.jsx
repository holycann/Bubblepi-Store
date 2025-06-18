import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  elevation = 'md',
  hover = false,
  onClick,
  ...props 
}) => {
  // Elevation variants
  const elevations = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };
  
  // Animation variants
  const hoverAnimation = hover ? {
    whileHover: { 
      y: -5,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    transition: { 
      type: 'spring', 
      stiffness: 300, 
      damping: 20 
    }
  } : {};
  
  return (
    <motion.div
      className={`
        bg-white dark:bg-dark-card rounded-lg overflow-hidden
        ${elevations[elevation]}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      {...hoverAnimation}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Card subcomponents
Card.Header = ({ children, className = '', ...props }) => (
  <div className={`p-4 border-b border-gray-100 dark:border-gray-800 ${className}`} {...props}>
    {children}
  </div>
);

Card.Body = ({ children, className = '', ...props }) => (
  <div className={`p-4 ${className}`} {...props}>
    {children}
  </div>
);

Card.Footer = ({ children, className = '', ...props }) => (
  <div className={`p-4 border-t border-gray-100 dark:border-gray-800 ${className}`} {...props}>
    {children}
  </div>
);

Card.Image = ({ src, alt = '', className = '', ...props }) => (
  <img 
    src={src} 
    alt={alt} 
    className={`w-full object-cover ${className}`} 
    {...props} 
  />
);

Card.Title = ({ children, className = '', ...props }) => (
  <h3 className={`text-lg font-semibold text-gray-900 dark:text-dark-primary ${className}`} {...props}>
    {children}
  </h3>
);

Card.Subtitle = ({ children, className = '', ...props }) => (
  <p className={`text-sm text-gray-500 dark:text-gray-400 ${className}`} {...props}>
    {children}
  </p>
);

export default Card; 