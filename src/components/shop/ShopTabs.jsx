import React from 'react';

export default function ShopTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'top-brands', label: 'Top Brands' },
    { id: 'nearby-stores', label: 'Nearby Stores' },
    { id: 'marketplace', label: '1Fi Marketplace', badge: 'NEW' },
  ];

  return (
    <div className="px-4 py-2">
      <div className="bg-[#EAEBF4] p-1 rounded-full flex items-center shadow-inner">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 py-2.5 px-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 relative flex items-center justify-center space-x-1.5 focus:outline-none ${
                isActive
                  ? 'bg-white text-[#5034D8] shadow-sm transform scale-[1.01]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold tracking-wider uppercase ${
                    isActive
                      ? 'bg-[#5034D8] text-white'
                      : 'bg-[#5034D8]/20 text-[#5034D8]'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
