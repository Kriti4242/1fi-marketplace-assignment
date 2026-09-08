import React from 'react';

export default function SectionHeader({ title, subtitle, action, className = '' }) {
  return (
    <div className={`flex items-center justify-between mb-3.5 ${className}`}>
      <div className="flex items-center space-x-2">
        {/* The signature 1Fi purple vertical accent bar */}
        <div className="w-1.5 h-4 bg-[#5034D8] rounded-full" />
        <h2 className="text-xs font-bold tracking-wider text-[#5034D8] uppercase">
          {title}
        </h2>
      </div>
      {action && <div>{action}</div>}
      {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
  );
}
