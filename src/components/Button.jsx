import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  disabled = false,
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  // Button variants
  const variants = {
    primary: 'bg-purple-dark hover:bg-navy text-white',
    secondary: 'bg-pink-soft hover:bg-opacity-80 text-blue-dark',
    outline: 'bg-transparent border-2 border-purple-dark text-purple-dark hover:bg-purple-dark hover:text-white',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-dark-card text-purple-dark',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };

  // Button sizes
  const sizes = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4',
    lg: 'py-3 px-6 text-lg',
  };

  // Common classes
  const baseClasses = `
    font-medium rounded-md transition-all
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;

  // Button animation
  const buttonAnimation = {
    whileTap: { scale: disabled ? 1 : 0.97 },
    whileHover: { scale: disabled ? 1 : 1.02 }
  };

  // Render as Link if 'to' prop is provided
  if (to) {
    return (
      <motion.div {...buttonAnimation}>
        <Link
          to={to}
          className={baseClasses}
          {...props}
        >
          {children}
        </Link>
      </motion.div>
    );
  }

  // Render as anchor if 'href' prop is provided
  if (href) {
    return (
      <motion.div {...buttonAnimation}>
        <a
          href={href}
          className={baseClasses}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      </motion.div>
    );
  }

  // Render as button by default
  return (
    <motion.button
      type={type}
      className={baseClasses}
      disabled={disabled}
      onClick={onClick}
      {...buttonAnimation}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button; 