import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

export default function ErrorState({ message, onRetry }) {
  const { retry, loading, errorSimulation, toggleSimulateError } = useMarketplace();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      retry();
    }
  };

  return (
    <div className="px-4 py-12 text-center flex flex-col items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 mb-3 border border-rose-100">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h3 className="text-base font-bold text-gray-900 mb-1">
        Unable to load marketplace
      </h3>
      <p className="text-xs text-gray-500 max-w-xs mb-5">
        {message || 'Something went wrong while loading products. Please check your network and try again.'}
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-2">
        <button
          onClick={handleRetry}
          disabled={loading}
          className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-full bg-[#5034D8] text-white text-xs font-bold hover:bg-[#4329C1] transition-colors shadow-sm disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Retrying...' : 'Try Again'}</span>
        </button>

        {errorSimulation && (
          <button
            onClick={toggleSimulateError}
            className="px-4 py-2.5 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200 transition-colors"
          >
            Turn off Simulated Error
          </button>
        )}
      </div>
    </div>
  );
}
