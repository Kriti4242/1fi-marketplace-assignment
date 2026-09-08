import React from 'react';
import { CheckCircle2, Circle, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export default function EmiPlanSelector({
  emiPlans = [],
  selectedPlan,
  onSelectPlan,
  onOpenBreakdownModal,
}) {
  if (!emiPlans || emiPlans.length === 0) {
    return (
      <div className="bg-gray-50 rounded-2xl p-4 text-center text-xs text-gray-500">
        No EMI plans available for this configuration.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1.5">
          <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">
            Select EMI Plan
          </label>
          <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
            0% Interest
          </span>
        </div>

        {onOpenBreakdownModal && (
          <button
            type="button"
            onClick={onOpenBreakdownModal}
            className="text-xs font-semibold text-[#5034D8] flex items-center space-x-1 hover:underline focus:outline-none"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>How it works</span>
          </button>
        )}
      </div>

      {/* Grid / List of EMI Options */}
      <div className="space-y-2.5">
        {emiPlans.map((plan) => {
          const isSelected = selectedPlan?.id === plan.id;

          return (
            <div
              key={plan.id}
              onClick={() => onSelectPlan(plan)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectPlan(plan);
                }
              }}
              className={`relative rounded-2xl p-4 border transition-all duration-200 cursor-pointer flex items-center justify-between focus:outline-none ${
                isSelected
                  ? 'border-[#5034D8] bg-[#FAF9FF] ring-2 ring-[#5034D8]/30 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50'
              }`}
            >
              {/* Recommended pill badge */}
              {plan.recommended && (
                <span className="absolute -top-2.5 left-4 bg-gradient-to-r from-[#5034D8] to-[#6E48E5] text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-xs flex items-center space-x-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>RECOMMENDED</span>
                </span>
              )}

              <div className="flex items-center space-x-3.5">
                {/* Radio Selection Indicator */}
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                    isSelected ? 'text-[#5034D8]' : 'text-gray-300'
                  }`}
                >
                  {isSelected ? (
                    <CheckCircle2 className="w-5 h-5 fill-[#5034D8] text-white" />
                  ) : (
                    <Circle className="w-5 h-5 stroke-[1.8]" />
                  )}
                </div>

                <div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-sm font-extrabold text-gray-900">
                      {plan.title}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        plan.isNoCost
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {plan.isNoCost ? '0% Interest' : `${plan.interestRate}% p.a.`}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-gray-500 mt-0.5">
                    <span>Total: {formatCurrency(plan.totalPayable)}</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-medium">₹0 processing fee</span>
                  </div>
                </div>
              </div>

              {/* Monthly Amount */}
              <div className="text-right">
                <div className="text-base font-black text-[#5034D8]">
                  {formatCurrency(plan.monthlyAmount)}
                </div>
                <div className="text-[10px] text-gray-400 font-medium">/ month</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Plan Summary Banner */}
      {selectedPlan && (
        <div className="bg-[#5034D8]/5 border border-[#5034D8]/20 rounded-2xl p-3 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#5034D8] shrink-0" />
            <div>
              <p className="font-bold text-[#5034D8]">
                {selectedPlan.duration} Months @ {formatCurrency(selectedPlan.monthlyAmount)}/mo
              </p>
              <p className="text-[11px] text-gray-500">
                Backed by your Mutual Funds portfolio (0% extra charges)
              </p>
            </div>
          </div>
          {selectedPlan.interestDiscount > 0 && (
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
              Save {formatCurrency(selectedPlan.interestDiscount)}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
