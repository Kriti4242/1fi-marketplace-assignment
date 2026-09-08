import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ShopTabs from '../components/shop/ShopTabs';
import TopBrandsTab from '../components/shop/TopBrandsTab';
import NearbyStoresTab from '../components/shop/NearbyStoresTab';
import MarketplaceHeader from '../components/marketplace/MarketplaceHeader';
import SearchBar from '../components/marketplace/SearchBar';
import CategoryFilter from '../components/marketplace/CategoryFilter';
import ProductGrid from '../components/marketplace/ProductGrid';
import Header from '../components/common/Header';
import { Sparkles } from 'lucide-react';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'marketplace'; // Default to marketplace for assignment showcase
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  return (
    <div className="min-h-screen bg-[#F4F5FA] flex flex-col">
      {/* Top Header */}
      <Header
        title={activeTab === 'marketplace' ? '1Fi Marketplace' : 'Shop'}
        subtitle="Shop today, Pay later using Mutual Funds"
      />

      <main className="flex-1 max-w-md mx-auto w-full pb-16">
        {/* Top Hero Banner (Only on Top Brands & Nearby Stores, as seen in screenshot 3) */}
        {activeTab !== 'marketplace' && (
          <div className="mx-4 mt-3 mb-2 rounded-3xl bg-gradient-to-tr from-[#1E1256] via-[#2F1B85] to-[#5034D8] p-5 text-white shadow-md relative overflow-hidden">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[10px] font-extrabold tracking-wider uppercase mb-2">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>NO-COST EMIs</span>
            </div>
            <h1 className="text-xl font-black text-white leading-tight mb-1">
              Shop today,<br />Pay later using Mutual funds.
            </h1>
            <p className="text-xs text-white/80 max-w-xs">
              No credit score required. No interest. Backed by your investments.
            </p>
          </div>
        )}

        {/* Segmented Tab Switcher with the 3 options */}
        <ShopTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Tab 1: Top Brands */}
        {activeTab === 'top-brands' && (
          <TopBrandsTab onExploreMarketplace={() => handleTabChange('marketplace')} />
        )}

        {/* Tab 2: Nearby Stores */}
        {activeTab === 'nearby-stores' && (
          <NearbyStoresTab onExploreMarketplace={() => handleTabChange('marketplace')} />
        )}

        {/* Tab 3: 1Fi Marketplace (Full Experience) */}
        {activeTab === 'marketplace' && (
          <div className="animate-fadeIn">
            {/* Marketplace Banner */}
            <MarketplaceHeader />

            {/* Search Input */}
            <SearchBar />

            {/* Dynamic Categories */}
            <CategoryFilter />

            {/* Products Grid with Skeletons, Error State & Empty State */}
            <ProductGrid />
          </div>
        )}
      </main>
    </div>
  );
}
