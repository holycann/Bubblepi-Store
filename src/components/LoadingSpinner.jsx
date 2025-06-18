import { cn } from '../lib/utils';

const LoadingSpinner = ({ size = 'md', className }) => {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-3',
    lg: 'h-16 w-16 border-4',
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-t-transparent border-purple-dark dark:border-pink-soft',
          sizeClasses[size] || sizeClasses.md
        )}
      />
    </div>
  );
};

export default LoadingSpinner; 