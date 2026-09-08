import React from 'react';
import ProductCard from './ProductCard';
import { ProductCardSkeleton } from '../common/Skeleton';
import EmptyState from './EmptyState';
import ErrorState from './ErrorState';
import { useMarketplace } from '../../context/MarketplaceContext';

export default function ProductGrid() {
  const { products, loading, error } = useMarketplace();

  if (loading) {
    return (
      <div className="px-4 pb-28">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {[1, 2, 3, 4].map((n) => (
            <ProductCardSkeleton key={n} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 pb-28">
        <ErrorState message={error} />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="px-4 pb-28">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="px-4 pb-28">
      <div className="flex items-center justify-between mb-2.5 px-1">
        <span className="text-xs font-semibold text-gray-500">
          Showing {products.length} {products.length === 1 ? 'product' : 'products'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
