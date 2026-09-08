import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { formatDiscount } from '../../utils/formatters';

export default function ProductGallery({ images = [], selectedColorImage, discountPercentage, productName }) {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [hasError, setHasError] = useState(false);

  // If a color variant has a specific image, update active image
  useEffect(() => {
    if (selectedColorImage) {
      setActiveImage(selectedColorImage);
    } else if (images.length > 0) {
      setActiveImage(images[0]);
    }
  }, [selectedColorImage, images]);

  const displayImage = hasError
    ? 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
    : activeImage || images[0];

  return (
    <div className="space-y-3">
      {/* Main Image Container */}
      <div className="relative w-full aspect-square sm:aspect-4/3 rounded-3xl bg-white border border-gray-100 p-6 flex items-center justify-center shadow-xs overflow-hidden">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
          <span className="bg-[#5034D8] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1 shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>0% EMI Available</span>
          </span>
        </div>

        {discountPercentage > 0 && (
          <span className="absolute top-4 right-4 z-10 bg-emerald-600 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-sm">
            {formatDiscount(discountPercentage)}
          </span>
        )}

        <img
          src={displayImage}
          alt={productName}
          onError={() => setHasError(true)}
          className="w-full h-full object-contain mix-blend-multiply transition-all duration-300 transform hover:scale-105"
        />
      </div>

      {/* Thumbnails if multiple images exist */}
      {images.length > 1 && (
        <div className="flex items-center space-x-2.5 overflow-x-auto no-scrollbar py-1">
          {images.map((img, idx) => {
            const isCurrent = activeImage === img;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setHasError(false);
                  setActiveImage(img);
                }}
                className={`w-16 h-16 rounded-2xl p-1 bg-white border transition-all shrink-0 focus:outline-none flex items-center justify-center ${
                  isCurrent
                    ? 'border-[#5034D8] ring-2 ring-[#5034D8]/20 shadow-xs'
                    : 'border-gray-200 hover:border-gray-300 opacity-70'
                }`}
              >
                <img
                  src={img}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
