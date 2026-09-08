import React from 'react';
import { Sparkles, ShieldCheck, Zap, Percent } from 'lucide-react';

export default function MarketplaceHeader() {
  return (
    <div className="mx-4 mb-4 rounded-3xl bg-gradient-to-br from-[#120B44] via-[#2A1673] to-[#5034D8] p-5 text-white shadow-md relative overflow-hidden">
      {/* Decorative background glow & pattern */}
      <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-[#6B46F6]/30 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-[#4024B8]/40 blur-xl pointer-events-none" />

      <div className="relative z-10">
        {/* Pill badge */}
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold tracking-wide mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>1FI MARKETPLACE • ZERO COST EMI</span>
        </div>

        <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-1.5">
          Shop on No-Cost EMI
        </h1>

        <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-sm mb-4">
          Backed by your mutual funds. No credit score required, 0% interest, and instant limit approval.
        </p>

        {/* Value props badges */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-[10px] sm:text-xs">
          <div className="flex items-center space-x-1 text-white/90">
            <Percent className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            <span className="font-semibold">0% Interest</span>
          </div>
          <div className="flex items-center space-x-1 text-white/90">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-300 shrink-0" />
            <span className="font-semibold">No Credit Pull</span>
          </div>
          <div className="flex items-center space-x-1 text-white/90">
            <Zap className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="font-semibold">Instant Approval</span>
          </div>
        </div>
      </div>
    </div>
  );
}
