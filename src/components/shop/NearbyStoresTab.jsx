import React from 'react';
import { MapPin, Navigation, Bell } from 'lucide-react';

export default function NearbyStoresTab({ onExploreMarketplace }) {
  return (
    <div className="px-4 py-8 pb-28 text-center flex flex-col items-center justify-center min-h-[50vh]">
      <div className="w-16 h-16 rounded-full bg-[#5034D8]/10 text-[#5034D8] flex items-center justify-center mb-4 shadow-inner">
        <MapPin className="w-8 h-8 stroke-[2.2]" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">
        Nearby Stores Coming Soon
      </h3>
      <p className="text-xs text-gray-500 max-w-xs mb-6">
        We are partnering with verified retail stores across your city so you can walk in, scan QR, and pay with 1Fi No-Cost EMIs.
      </p>

      <div className="space-y-3 w-full max-w-xs">
        <button
          onClick={() => alert('We will notify you when stores near you are onboarded!')}
          className="w-full py-3 px-4 rounded-full border border-[#5034D8] text-[#5034D8] text-xs font-bold hover:bg-[#5034D8]/5 transition-colors flex items-center justify-center space-x-2"
        >
          <Bell className="w-4 h-4" />
          <span>Notify me when available</span>
        </button>

        <button
          onClick={onExploreMarketplace}
          className="w-full py-3 px-4 rounded-full bg-[#5034D8] text-white text-xs font-bold hover:bg-[#4329C1] transition-colors shadow-sm"
        >
          Browse 1Fi Marketplace Online →
        </button>
      </div>
    </div>
  );
}
