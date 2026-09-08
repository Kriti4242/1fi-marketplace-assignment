import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ShieldCheck, ChevronRight, Zap } from 'lucide-react';
import { formatCurrency, formatDiscount } from '../../utils/formatters';
import { getStartingEmi } from '../../utils/emiCalculator';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const startingEmi = getStartingEmi(
    product.basePrice,
    product.supportedEmiTenures,
    product.noCostEmiTenures
  );

  const hasDiscount = product.originalPrice && product.originalPrice > product.basePrice;
  const displayImage = !imageError && product.images && product.images.length > 0
    ? product.images[0]
    : 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80';

  const handleClick = () => {
    navigate(`/shop/marketplace/product/${product.id}`);
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      className="bg-white rounded-3xl p-3.5 border border-gray-100 shadow-xs hover:shadow-md hover:border-[#5034D8]/30 transition-all duration-200 flex flex-col justify-between group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5034D8]"
    >
      <div>
        {/* Product Image & Badges */}
        <div className="relative w-full aspect-square rounded-2xl bg-gray-50 overflow-hidden mb-3 flex items-center justify-center p-2">
          <img
            src={displayImage}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Discount badge top right */}
          {hasDiscount && (
            <span className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
              {formatDiscount(product.discountPercentage)}
            </span>
          )}

          {/* 0% Interest Pill top left */}
          <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs text-[#5034D8] border border-[#5034D8]/20 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1 shadow-xs">
            <Zap className="w-2.5 h-2.5 fill-current" />
            <span>0% EMI</span>
          </span>
        </div>

        {/* Brand & Rating */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-bold tracking-wide uppercase text-gray-500">
            {product.brand}
          </span>
          <div className="flex items-center space-x-1 bg-amber-50 px-1.5 py-0.5 rounded-md text-[10px] font-bold text-amber-800">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 mb-2 group-hover:text-[#5034D8] transition-colors">
          {product.name}
        </h3>

        {/* Pricing */}
        <div className="flex items-baseline space-x-2 mb-2.5">
          <span className="text-base font-extrabold text-gray-900">
            {formatCurrency(product.basePrice)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>

        {/* EMI Highlight Card */}
        <div className="bg-[#F6F7FD] rounded-xl p-2 border border-[#5034D8]/15 mb-3">
          <p className="text-[11px] font-semibold text-[#5034D8] flex items-center space-x-1">
            <span>Starting from</span>
            <span className="font-black text-xs">{formatCurrency(startingEmi)}/mo</span>
          </p>
          <p className="text-[10px] text-gray-500 flex items-center space-x-1 mt-0.5">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>No-cost EMI • Backed by MFs</span>
          </p>
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#5034D8] group-hover:translate-x-0.5 transition-transform">
        <span>View Details & Plans</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
}
