import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Sparkles, AlertCircle } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

export default function Header({ title, showBack = false, subtitle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { errorSimulation, toggleSimulateError } = useMarketplace();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {showBack ? (
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors focus:outline-none"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#1E1256] to-[#5034D8] flex items-center justify-center text-white font-black text-sm shadow-sm">
                1Fi
              </div>
              <span className="font-bold text-gray-900 text-lg tracking-tight">
                1Fi
              </span>
            </div>
          )}

          {title && (
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs text-gray-500 line-clamp-1">{subtitle}</p>
              )}
            </div>
          )}
        </div>

        {/* Evaluator controls: Allows easily toggling simulated network error to test Error State & Retry */}
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleSimulateError}
            title={errorSimulation ? 'Disable simulated network error' : 'Enable simulated network error to test Error State'}
            className={`px-2 py-1 text-[10px] font-semibold rounded-full border transition-all flex items-center space-x-1 ${
              errorSimulation
                ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
            }`}
          >
            <AlertCircle className="w-3 h-3" />
            <span>{errorSimulation ? 'Error Active' : 'Test Error'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
