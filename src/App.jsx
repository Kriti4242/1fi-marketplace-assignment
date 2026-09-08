import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { MarketplaceProvider } from './context/MarketplaceContext';
import BottomNav from './components/common/BottomNav';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';
import { EmiDuesPage, LimitPage } from './pages/PlaceholderPages';

function AppLayout() {
  const location = useLocation();
  // Hide bottom nav on full-screen detail & checkout flows to give focus to the primary EMI CTA
  const isDedicatedFlow =
    location.pathname.includes('/product/') ||
    location.pathname.includes('/checkout');

  return (
    <div className="relative min-h-screen bg-[#F3F4F8] text-gray-900 flex flex-col font-sans selection:bg-[#5034D8]/20 selection:text-[#5034D8]">
      <Routes>
        <Route path="/" element={<Navigate to="/shop" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/marketplace/product/:id" element={<ProductDetailsPage />} />
        <Route path="/shop/marketplace/checkout" element={<CheckoutPage />} />
        <Route path="/emi-dues" element={<EmiDuesPage />} />
        <Route path="/limit" element={<LimitPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/shop" replace />} />
      </Routes>

      {!isDedicatedFlow && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <MarketplaceProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </MarketplaceProvider>
  );
}
