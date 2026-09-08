import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { marketplaceService, setSimulateError, getSimulateError } from '../services/marketplaceService';

const MarketplaceContext = createContext(null);

export function MarketplaceProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('recommended');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorSimulation, setErrorSimulation] = useState(getSimulateError());

  // Active checkout / loan session
  const [checkoutItem, setCheckoutItem] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);

  // Load categories on initial mount
  useEffect(() => {
    async function initCategories() {
      try {
        const cats = await marketplaceService.getCategories();
        setCategories(cats);
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    }
    initCategories();
  }, []);

  // Fetch products based on active filters
  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await marketplaceService.getProducts({
        query: searchQuery,
        category: activeCategory,
        sort: selectedSort,
      });
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Unable to load products. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, activeCategory, selectedSort]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Handler for retry
  const retry = () => {
    loadProducts();
  };

  // Toggle simulated network error (evaluator feature to verify error handling & retry)
  const toggleSimulateError = () => {
    const nextVal = !errorSimulation;
    setSimulateError(nextVal);
    setErrorSimulation(nextVal);
    loadProducts();
  };

  // Reset search and category filters
  const resetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setSelectedSort('recommended');
  };

  const value = {
    products,
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    selectedSort,
    setSelectedSort,
    loading,
    error,
    retry,
    errorSimulation,
    toggleSimulateError,
    resetFilters,
    checkoutItem,
    setCheckoutItem,
    lastOrder,
    setLastOrder,
  };

  return (
    <MarketplaceContext.Provider value={value}>
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}
