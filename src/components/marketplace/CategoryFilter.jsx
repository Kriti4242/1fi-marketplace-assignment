import React from 'react';
import {
  Sparkles,
  Smartphone,
  Laptop,
  Headphones,
  Tv,
  Bed,
  Watch,
  Layers,
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

const ICON_MAP = {
  Sparkles,
  Smartphone,
  Laptop,
  Headphones,
  Tv,
  Bed,
  Watch,
};

export default function CategoryFilter() {
  const { categories, activeCategory, setActiveCategory } = useMarketplace();

  return (
    <div className="mb-4">
      <div className="flex items-center space-x-2 overflow-x-auto px-4 py-1 no-scrollbar">
        {categories.map((cat) => {
          const IconComponent = ICON_MAP[cat.icon] || Layers;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 focus:outline-none ${
                isActive
                  ? 'bg-[#5034D8] text-white shadow-sm ring-2 ring-[#5034D8]/20'
                  : 'bg-white text-gray-700 border border-gray-200/80 hover:bg-gray-50'
              }`}
            >
              <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
