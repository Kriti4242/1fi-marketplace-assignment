import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

export default function EmptyState() {
  const { searchQuery, activeCategory, resetFilters } = useMarketplace();

  return (
    <div className="px-4 py-12 text-center flex flex-col items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-3 shadow-inner">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="text-base font-bold text-gray-900 mb-1">
        No products found
      </h3>
      <p className="text-xs text-gray-500 max-w-xs mb-5">
        {searchQuery
          ? `We couldn't find any products matching "${searchQuery}".`
          : 'No products are currently available in this category.'}
      </p>

      <button
        onClick={resetFilters}
        className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-full bg-[#5034D8] text-white text-xs font-bold hover:bg-[#4329C1] transition-colors shadow-sm"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Clear Filters & Search</span>
      </button>
    </div>
  );
}
