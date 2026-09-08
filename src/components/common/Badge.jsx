import React from 'react';

export default function Badge({ children, variant = 'primary', className = '' }) {
  const variants = {
    primary: 'bg-[#5034D8]/10 text-[#5034D8] border border-[#5034D8]/20',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    neutral: 'bg-gray-100 text-gray-700 border border-gray-200',
    accent: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium',
    dark: 'bg-gray-900 text-white',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${variants[variant] || variants.primary} ${className}`}
    >
      {children}
    </span>
  );
}
