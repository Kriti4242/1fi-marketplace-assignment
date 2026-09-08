import React from 'react';

export function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse bg-gray-200/80 rounded-xl ${className}`}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm flex flex-col justify-between">
      <div>
        <Skeleton className="w-full aspect-square rounded-xl mb-3" />
        <div className="flex items-center space-x-2 mb-2">
          <Skeleton className="h-4 w-16 rounded-full" />
          <Skeleton className="h-4 w-12 rounded-full" />
        </div>
        <Skeleton className="h-5 w-4/5 rounded mb-2" />
        <Skeleton className="h-4 w-2/3 rounded mb-3" />
        <div className="flex items-baseline space-x-2 mb-2">
          <Skeleton className="h-6 w-24 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
        </div>
      </div>
      <div className="pt-2 border-t border-gray-100">
        <Skeleton className="h-8 w-full rounded-full" />
      </div>
    </div>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div className="space-y-4 p-4 animate-pulse">
      <Skeleton className="w-full h-72 rounded-3xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-24 rounded-full" />
        <Skeleton className="h-7 w-3/4 rounded" />
        <Skeleton className="h-5 w-1/3 rounded" />
      </div>
      <Skeleton className="h-24 w-full rounded-2xl" />
      <Skeleton className="h-32 w-full rounded-2xl" />
      <Skeleton className="h-40 w-full rounded-2xl" />
    </div>
  );
}
