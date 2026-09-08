import React, { useState } from 'react';
import { Search, ChevronRight, Sparkles } from 'lucide-react';

const TOP_BRANDS = [
  {
    id: 'air-india',
    name: 'Air India',
    tenure: 'No-cost EMIs upto 18 months',
    bgColor: 'bg-red-600',
    logoText: 'AIR INDIA',
    category: 'Travel & Flights',
  },
  {
    id: 'apple-reseller',
    name: 'Apple Premium Reseller',
    tenure: 'No-cost EMIs upto 24 months',
    bgColor: 'bg-black',
    logoText: ' Premium',
    category: 'Electronics & Mobiles',
  },
  {
    id: 'caratlane',
    name: 'CaratLane',
    tenure: 'No-cost EMIs upto 6 months',
    bgColor: 'bg-[#5B21B6]',
    logoText: 'CaratLane',
    category: 'Jewellery',
  },
  {
    id: 'croma',
    name: 'Croma Electronics',
    tenure: 'No-cost EMIs upto 12 months',
    bgColor: 'bg-[#0E7490]',
    logoText: 'croma',
    category: 'Appliances & Tech',
  },
  {
    id: 'reliance-digital',
    name: 'Reliance Digital',
    tenure: 'No-cost EMIs upto 12 months',
    bgColor: 'bg-[#1D4ED8]',
    logoText: 'Reliance',
    category: 'Electronics',
  },
  {
    id: 'wakefit',
    name: 'Wakefit',
    tenure: 'No-cost EMIs upto 12 months',
    bgColor: 'bg-[#4338CA]',
    logoText: 'wakefit',
    category: 'Furniture & Mattress',
  },
  {
    id: 'makemytrip',
    name: 'MakeMyTrip',
    tenure: 'No-cost EMIs upto 9 months',
    bgColor: 'bg-[#DC2626]',
    logoText: 'MMT',
    category: 'Holiday Packages',
  },
];

export default function TopBrandsTab({ onExploreMarketplace }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBrands = TOP_BRANDS.filter(
    (b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 px-4 pb-24">
      {/* Search Input matching screenshot */}
      <div className="relative">
        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search online stores..."
          className="w-full pl-11 pr-4 py-3 bg-white rounded-full border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#5034D8] focus:ring-1 focus:ring-[#5034D8] shadow-xs"
        />
      </div>

      {/* 1Fi Marketplace Callout Banner */}
      <div className="bg-gradient-to-r from-[#5034D8] to-[#6E48E5] text-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-1 text-xs font-semibold text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NEW FEATURE</span>
          </div>
          <p className="font-bold text-sm">Shop directly on 1Fi Marketplace</p>
          <p className="text-xs text-white/80">Browse top products with 0% No-Cost EMI</p>
        </div>
        <button
          onClick={onExploreMarketplace}
          className="px-3 py-2 bg-white text-[#5034D8] text-xs font-bold rounded-full shadow-sm hover:bg-gray-50 transition-colors whitespace-nowrap ml-2"
        >
          Explore →
        </button>
      </div>

      {/* Brands List */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-3">Top Brands</h2>
        <div className="space-y-2.5">
          {filteredBrands.map((brand) => (
            <div
              key={brand.id}
              className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-xs flex items-center justify-between hover:border-gray-200 transition-colors"
            >
              <div className="flex items-center space-x-3.5">
                <div
                  className={`w-14 h-14 rounded-xl ${brand.bgColor} text-white flex items-center justify-center font-bold text-xs p-1 text-center shadow-xs`}
                >
                  {brand.logoText}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{brand.name}</h3>
                  <p className="text-xs text-gray-500">{brand.tenure}</p>
                  <span className="text-[10px] text-gray-400">{brand.category}</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
