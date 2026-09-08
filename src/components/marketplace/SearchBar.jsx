import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

export default function SearchBar() {
  const {
    searchQuery,
    setSearchQuery,
    selectedSort,
    setSelectedSort,
  } = useMarketplace();

  return (
    <div className="px-4 mb-3">
      <div className="flex items-center space-x-2">
        {/* Search input field */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products, brands, categories..."
            className="w-full pl-10 pr-9 py-2.5 bg-white rounded-full border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#5034D8] focus:ring-1 focus:ring-[#5034D8] shadow-xs transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 focus:outline-none"
              aria-label="Clear search"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Sort Selector */}
        <div className="relative">
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="appearance-none bg-white border border-gray-200 text-xs font-semibold text-gray-700 py-2.5 pl-3 pr-7 rounded-full focus:outline-none focus:border-[#5034D8] shadow-xs cursor-pointer"
            aria-label="Sort products"
          >
            <option value="recommended">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
          <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
            <SlidersHorizontal className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
