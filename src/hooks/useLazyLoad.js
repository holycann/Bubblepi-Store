import { lazy, Suspense } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

export const useLazyLoad = (importFunc) => {
  const LazyComponent = lazy(importFunc);
  
  const LazyLoadedComponent = (props) => (
    <Suspense fallback={
      <div className="min-h-[200px] flex items-center justify-center">
        <LoadingSpinner size="md" color="primary" />
      </div>
    }>
      <LazyComponent {...props} />
    </Suspense>
  );
  
  return LazyLoadedComponent;
}; 