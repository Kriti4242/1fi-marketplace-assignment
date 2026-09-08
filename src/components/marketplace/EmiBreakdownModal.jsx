import React from 'react';
import { X, ShieldCheck, TrendingUp, Sparkles, Check } from 'lucide-react';

export default function EmiBreakdownModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl relative border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-[#5034D8]/10 text-[#5034D8] flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-gray-900">
            How 1Fi No-Cost EMI Works
          </h3>
        </div>

        <p className="text-xs text-gray-500 mb-4 leading-relaxed">
          1Fi unlocks purchasing power by letting you borrow against your mutual funds without selling them or triggering capital gains tax.
        </p>

        <div className="space-y-3 mb-5">
          <div className="flex items-start space-x-3 p-2.5 rounded-2xl bg-[#F6F7FD] border border-[#5034D8]/10">
            <TrendingUp className="w-4 h-4 text-[#5034D8] shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold text-gray-900">Your Investments Keep Growing</p>
              <p className="text-gray-500 mt-0.5">Your mutual funds stay invested in the market, continuing to earn compound returns.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-2.5 rounded-2xl bg-[#F6F7FD] border border-[#5034D8]/10">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold text-gray-900">Zero Credit Score Impact</p>
              <p className="text-gray-500 mt-0.5">No hard credit inquiry on CIBIL. Instant approval based on your verified portfolio.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-2.5 rounded-2xl bg-[#F6F7FD] border border-[#5034D8]/10">
            <Check className="w-4 h-4 text-[#5034D8] shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold text-gray-900">True 0% Interest & ₹0 Fees</p>
              <p className="text-gray-500 mt-0.5">Pay only the product purchase price divided evenly across your chosen tenure.</p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-full bg-[#5034D8] text-white text-xs font-bold hover:bg-[#4329C1] transition-colors shadow-sm"
        >
          Got it, continue shopping
        </button>
      </div>
    </div>
  );
}
