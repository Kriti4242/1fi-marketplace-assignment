import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  ShieldCheck,
  Calendar,
  CreditCard,
  ArrowRight,
  TrendingUp,
  FileCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import Header from '../components/common/Header';
import { useMarketplace } from '../context/MarketplaceContext';
import { formatCurrency, formatEmiDate } from '../utils/formatters';
import { marketplaceService } from '../services/marketplaceService';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { checkoutItem, setLastOrder } = useMarketplace();

  const [submitting, setSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  // If no active item, navigate back to Shop
  if (!checkoutItem && !completedOrder) {
    return (
      <div className="min-h-screen bg-[#F4F5FA] flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-6 text-center shadow-sm max-w-sm w-full">
          <p className="text-sm font-bold text-gray-800 mb-4">
            No active EMI plan selected
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="w-full py-3 rounded-full bg-[#5034D8] text-white text-xs font-bold"
          >
            Browse Marketplace
          </button>
        </div>
      </div>
    );
  }

  const { product, selectedVariants, selectedPlan, finalPrice } = checkoutItem || {};

  // Construct variant string
  const variantLabels = [];
  if (selectedVariants?.storage?.label) variantLabels.push(selectedVariants.storage.label);
  if (selectedVariants?.color?.label) variantLabels.push(selectedVariants.color.label);
  if (selectedVariants?.size?.label) variantLabels.push(selectedVariants.size.label);
  if (selectedVariants?.thickness?.label) variantLabels.push(selectedVariants.thickness.label);
  const variantSummary = variantLabels.join(' • ');

  // Compute first due date (5th of next month)
  const nextDueDate = new Date();
  nextDueDate.setMonth(nextDueDate.getMonth() + 1);
  nextDueDate.setDate(5);

  const handleConfirmOrder = async () => {
    setSubmitting(true);
    try {
      const order = await marketplaceService.submitOrder({
        productId: product.id,
        variantDetails: selectedVariants,
        emiPlan: selectedPlan,
        userPhone: '+91 1234567898',
      });
      setCompletedOrder(order);
      setLastOrder(order);
    } catch (err) {
      alert('Failed to confirm order: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // SUCCESS SCREEN
  if (completedOrder) {
    return (
      <div className="min-h-screen bg-[#F4F5FA] flex flex-col">
        <Header title="EMI Order Confirmed" />

        <main className="flex-1 max-w-md mx-auto w-full px-4 py-8 space-y-5">
          {/* Success Banner */}
          <div className="bg-white rounded-3xl p-6 text-center border border-gray-100 shadow-md">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
            </div>

            <h2 className="text-xl font-black text-gray-900 mb-1">
              Loan Approved & Order Placed!
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              Your mutual funds have been pledged at 0% interest. No charges have been deducted today.
            </p>

            <div className="bg-[#FAF9FF] border border-[#5034D8]/20 rounded-2xl p-4 text-left space-y-2 mb-4">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Order Reference:</span>
                <span className="font-bold text-gray-900">{completedOrder.orderId}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">1Fi Loan Account:</span>
                <span className="font-bold text-[#5034D8]">{completedOrder.loanId}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Monthly Installment:</span>
                <span className="font-black text-[#5034D8]">
                  {formatCurrency(completedOrder.emiPlan.monthlyAmount)}/mo
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Tenure:</span>
                <span className="font-bold text-gray-900">{completedOrder.emiPlan.duration} Months</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">First Auto-Debit Date:</span>
                <span className="font-bold text-emerald-700">{formatEmiDate(nextDueDate)}</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => navigate('/shop')}
                className="w-full py-3.5 rounded-full bg-[#5034D8] text-white text-xs font-bold hover:bg-[#4329C1] transition-colors shadow-sm"
              >
                Back to 1Fi Marketplace
              </button>

              <button
                onClick={() => navigate('/profile')}
                className="w-full py-3 rounded-full border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-colors"
              >
                View in Purchases & Loans
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // CONFIRMATION SCREEN
  return (
    <div className="min-h-screen bg-[#F4F5FA] flex flex-col pb-24">
      <Header title="Confirm EMI Plan" showBack />

      <main className="flex-1 max-w-md mx-auto w-full px-4 py-3 space-y-4">
        {/* Product & Variant Summary Card */}
        <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-xs flex items-center space-x-3.5">
          <div className="w-20 h-20 rounded-2xl bg-gray-50 p-2 shrink-0 flex items-center justify-center border border-gray-100">
            <img
              src={selectedVariants?.color?.image || product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase text-[#5034D8]">
              {product.brand}
            </span>
            <h2 className="text-sm font-black text-gray-900 truncate">
              {product.name}
            </h2>
            {variantSummary && (
              <p className="text-xs text-gray-500 mt-0.5">{variantSummary}</p>
            )}
            <p className="text-sm font-extrabold text-gray-900 mt-1">
              {formatCurrency(finalPrice)}
            </p>
          </div>
        </div>

        {/* Selected EMI Plan Breakdown Card */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
              Selected EMI Plan
            </h3>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
              0% Interest
            </span>
          </div>

          <div className="bg-[#FAF9FF] rounded-2xl p-4 border border-[#5034D8]/20 flex items-center justify-between">
            <div>
              <p className="text-base font-black text-[#5034D8]">
                {formatCurrency(selectedPlan.monthlyAmount)}
                <span className="text-xs text-gray-500 font-normal"> / month</span>
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                For {selectedPlan.duration} Months
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                No-Cost EMI
              </span>
            </div>
          </div>

          {/* Pricing Row Table */}
          <div className="space-y-2 pt-2 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Product Price</span>
              <span className="font-semibold text-gray-900">{formatCurrency(finalPrice)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Interest Rate (p.a.)</span>
              <span className="font-semibold text-emerald-600">0% (Zero Interest)</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Processing Fee</span>
              <span className="font-semibold text-emerald-600">₹0 (Waived)</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>First Installment Due</span>
              <span className="font-semibold text-gray-900">{formatEmiDate(nextDueDate)}</span>
            </div>
            <div className="pt-2 border-t border-gray-100 flex justify-between text-sm font-black text-gray-900">
              <span>Total Payable</span>
              <span className="text-[#5034D8]">{formatCurrency(selectedPlan.totalPayable)}</span>
            </div>
          </div>
        </div>

        {/* 1Fi Collateral / Mutual Fund Note */}
        <div className="bg-linear-to-br from-[#1E1256] to-[#5034D8] text-white rounded-3xl p-5 shadow-sm space-y-2.5">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-300" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Mutual Fund Backed Loan
            </h4>
          </div>
          <p className="text-xs text-white/90 leading-relaxed">
            This purchase is approved against your linked mutual fund portfolio (+91 1234567891). Your funds remain invested and continue growing.
          </p>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[11px] text-white/80">
            <div>✓ No credit score check</div>
            <div>✓ Auto-debit on 5th</div>
            <div>✓ Zero foreclosure fees</div>
            <div>✓ Instant fulfillment</div>
          </div>
        </div>
      </main>

      {/* Pinned Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl p-3 sm:p-4">
        <div className="max-w-md mx-auto flex items-center justify-between space-x-4">
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
              Total Payable
            </span>
            <span className="text-base sm:text-lg font-black text-gray-900">
              {formatCurrency(selectedPlan.totalPayable)}
            </span>
          </div>

          <button
            onClick={handleConfirmOrder}
            disabled={submitting}
            className="flex-1 py-3.5 px-5 rounded-full bg-[#5034D8] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[#4329C1] active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>{submitting ? 'Confirming with 1Fi...' : 'Confirm & Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
