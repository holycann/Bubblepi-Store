import { useState, useEffect, useMemo } from 'react';

export const useProductFilter = (products) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    accountType: '',
    searchQuery: '',
    sortBy: 'popular', // popular, price-low, price-high, newest
  });

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }
    
    // Apply price filter
    if (filters.minPrice !== '') {
      result = result.filter(product => product.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice !== '') {
      result = result.filter(product => product.price <= Number(filters.maxPrice));
    }
    
    // Apply account type filter
    if (filters.accountType) {
      result = result.filter(product => product.accountType === filters.accountType);
    }
    
    // Apply search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'popular':
      default:
        result.sort((a, b) => b.popularity - a.popularity);
        break;
    }
    
    setFilteredProducts(result);
  }, [products, filters]);

  // Calculate price range for the current filtered products
  const priceRange = useMemo(() => {
    if (!products.length) return { min: 0, max: 0 };
    
    return {
      min: Math.min(...products.map(p => p.price)),
      max: Math.max(...products.map(p => p.price))
    };
  }, [products]);

  // Update a single filter
  const updateFilter = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      accountType: '',
      searchQuery: '',
      sortBy: 'popular',
    });
  };

  return {
    filteredProducts,
    filters,
    updateFilter,
    resetFilters,
    priceRange
  };
}; 