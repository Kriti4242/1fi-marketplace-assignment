import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import { Receipt, TrendingUp, Sparkles } from 'lucide-react';

export function EmiDuesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F5FA] flex flex-col pb-24">
      <Header title="EMI Dues" />
      <main className="flex-1 max-w-md mx-auto w-full px-4 py-8 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-[#5034D8]/10 text-[#5034D8] flex items-center justify-center mb-4">
          <Receipt className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-black text-gray-900 mb-1">No Pending Dues</h2>
        <p className="text-xs text-gray-500 max-w-xs mb-6">
          You are all caught up! Next auto-debits will automatically show here after shopping on 1Fi Marketplace.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="py-3 px-6 rounded-full bg-[#5034D8] text-white text-xs font-bold shadow-sm hover:bg-[#4329C1]"
        >
          Explore Marketplace
        </button>
      </main>
    </div>
  );
}

export function LimitPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F5FA] flex flex-col pb-24">
      <Header title="Credit Limit" />
      <main className="flex-1 max-w-md mx-auto w-full px-4 py-6 space-y-4">
        <div className="rounded-3xl bg-gradient-to-br from-[#1E1256] to-[#5034D8] p-6 text-white shadow-md">
          <span className="text-[10px] font-bold tracking-wider text-emerald-300 uppercase block mb-1">
            APPROVED PORTFOLIO LIMIT
          </span>
          <div className="text-3xl font-black text-white mb-1">₹3,50,000</div>
          <p className="text-xs text-white/80 mb-4">
            Available to spend on 1Fi Marketplace with 0% No-Cost EMIs
          </p>
          <div className="bg-white/10 rounded-2xl p-3 text-xs flex justify-between">
            <span>Linked Mutual Funds:</span>
            <span className="font-bold">₹7,20,450</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/shop')}
          className="w-full py-3.5 rounded-full bg-[#5034D8] text-white text-xs font-bold shadow-sm hover:bg-[#4329C1]"
        >
          Use Limit on Marketplace →
        </button>
      </main>
    </div>
  );
}
