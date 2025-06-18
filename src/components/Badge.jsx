import { motion } from 'framer-motion';

const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) => {
  // Badge variants
  const variants = {
    primary: 'bg-purple-dark text-white',
    secondary: 'bg-pink-soft text-blue-dark',
    success: 'bg-green-500 text-white',
    warning: 'bg-amber-500 text-white',
    danger: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    outline: 'bg-transparent border border-purple-dark text-purple-dark',
    dark: 'bg-blue-dark text-white',
  };
  
  // Badge sizes
  const sizes = {
    sm: 'text-xs py-0.5 px-2',
    md: 'text-sm py-1 px-2.5',
    lg: 'text-base py-1.5 px-3',
  };
  
  // Animation variants
  const animationVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  };
  
  return (
    <motion.span
      className={`
        inline-flex items-center justify-center rounded-full font-medium
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={animationVariants}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.span>
  );
};

export default Badge; 