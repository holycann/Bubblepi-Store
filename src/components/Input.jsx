import { useState } from 'react';
import { FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';

const Input = ({
  label,
  type = 'text',
  id,
  name,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = true,
  className = '',
  leftIcon,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === 'password';
  
  // Handle password visibility toggle
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Determine input type based on password visibility
  const inputType = isPasswordType 
    ? (showPassword ? 'text' : 'password') 
    : type;
  
  // Base classes for the input container
  const containerClasses = `
    relative
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;
  
  // Base classes for the input field
  const inputClasses = `
    block rounded-md border-gray-300 shadow-sm
    focus:border-purple-dark focus:ring focus:ring-purple-dark focus:ring-opacity-20
    dark:bg-dark-card dark:border-gray-700 dark:text-dark-primary
    ${leftIcon ? 'pl-10' : ''}
    ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
    ${disabled ? 'opacity-60 cursor-not-allowed bg-gray-100 dark:bg-dark-elevated' : ''}
    ${fullWidth ? 'w-full' : ''}
  `;
  
  return (
    <div className={containerClasses}>
      {label && (
        <label 
          htmlFor={id || name} 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}
        
        <input
          type={inputType}
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={inputClasses}
          {...props}
        />
        
        {isPasswordType && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>
      
      {(error || helperText) && (
        <div className="mt-1 text-sm">
          {error ? (
            <div className="flex items-center text-red-500">
              <FiAlertCircle className="mr-1" />
              {error}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">{helperText}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Input; 