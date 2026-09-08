import React from 'react';
import { Check } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export default function VariantSelector({
  variants,
  selectedVariants,
  onSelectVariant,
}) {
  if (!variants || Object.keys(variants).length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Storage Variants */}
      {variants.storage && variants.storage.length > 0 && (
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Storage Option
          </label>
          <div className="flex flex-wrap gap-2">
            {variants.storage.map((opt) => {
              const isSelected = selectedVariants?.storage?.id === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onSelectVariant('storage', opt)}
                  className={`py-2 px-3.5 rounded-2xl text-xs font-bold border transition-all flex items-center space-x-1.5 focus:outline-none ${
                    isSelected
                      ? 'border-[#5034D8] bg-[#5034D8]/10 text-[#5034D8] ring-2 ring-[#5034D8]/20 shadow-xs'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  <span>{opt.label}</span>
                  {opt.priceModifier > 0 && (
                    <span className="text-[10px] font-medium text-gray-500">
                      (+{formatCurrency(opt.priceModifier)})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Color Variants */}
      {variants.color && variants.color.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Colour
            </label>
            {selectedVariants?.color && (
              <span className="text-xs font-semibold text-[#5034D8]">
                {selectedVariants.color.label}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {variants.color.map((opt) => {
              const isSelected = selectedVariants?.color?.id === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onSelectVariant('color', opt)}
                  className={`group relative p-1 rounded-full transition-all focus:outline-none flex items-center space-x-1.5 pr-3 pl-1.5 py-1 ${
                    isSelected
                      ? 'bg-gray-100 ring-2 ring-[#5034D8]'
                      : 'bg-white border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full border border-black/10 shadow-xs block"
                    style={{ backgroundColor: opt.hex }}
                  />
                  <span className="text-xs font-medium text-gray-800">
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Size / Dimension Variants (for mattresses, TVs, watches) */}
      {variants.size && variants.size.length > 0 && (
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Size / Model
          </label>
          <div className="flex flex-wrap gap-2">
            {variants.size.map((opt) => {
              const isSelected = selectedVariants?.size?.id === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onSelectVariant('size', opt)}
                  className={`py-2 px-3.5 rounded-2xl text-xs font-bold border transition-all flex items-center space-x-1.5 focus:outline-none ${
                    isSelected
                      ? 'border-[#5034D8] bg-[#5034D8]/10 text-[#5034D8] ring-2 ring-[#5034D8]/20 shadow-xs'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  <span>{opt.label}</span>
                  {opt.priceModifier !== 0 && (
                    <span className="text-[10px] font-medium text-gray-500">
                      ({opt.priceModifier > 0 ? '+' : ''}{formatCurrency(opt.priceModifier)})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Thickness Variants */}
      {variants.thickness && variants.thickness.length > 0 && (
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Thickness
          </label>
          <div className="flex flex-wrap gap-2">
            {variants.thickness.map((opt) => {
              const isSelected = selectedVariants?.thickness?.id === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onSelectVariant('thickness', opt)}
                  className={`py-2 px-3.5 rounded-2xl text-xs font-bold border transition-all flex items-center space-x-1.5 focus:outline-none ${
                    isSelected
                      ? 'border-[#5034D8] bg-[#5034D8]/10 text-[#5034D8] ring-2 ring-[#5034D8]/20 shadow-xs'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
