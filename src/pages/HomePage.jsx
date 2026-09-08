import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  TrendingUp,
  Percent,
  ShieldCheck,
  Zap,
  QrCode,
  Lock,
  ShoppingBag,
  Users,
  Sparkles,
} from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import Header from '../components/common/Header';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F5FA] flex flex-col pb-24">
      {/* Top Header */}
      <Header />

      <main className="flex-1 max-w-md mx-auto w-full px-4 pt-3 space-y-5">
        {/* Top Hero Banner matching Screenshot 1 */}
        <div className="rounded-3xl bg-gradient-to-tr from-[#1E1256] via-[#2F1B85] to-[#5034D8] p-6 text-white shadow-md relative overflow-hidden">
          <span className="text-[10px] font-extrabold tracking-widest text-white/70 uppercase block mb-1">
            GET STARTED
          </span>

          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-black text-white leading-tight mb-2">
              Shop on <span className="text-amber-300">no-cost</span><br />EMI
            </h1>
            <div className="text-right">
              <span className="text-3xl font-black text-white/90 block leading-none">
                0%
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                INTEREST
              </span>
            </div>
          </div>

          <p className="text-xs text-white/80 max-w-xs mb-5 leading-relaxed">
            Backed by your mutual funds, No credit pull, No charges, & quick approval.
          </p>

          <button
            onClick={() => navigate('/shop')}
            className="py-3 px-5 rounded-full bg-white text-gray-900 text-xs font-black shadow-md hover:bg-gray-100 transition-all flex items-center space-x-2"
          >
            <span>Explore 1Fi Marketplace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* OFFERS Section matching Screenshot 1 */}
        <div>
          <SectionHeader title="OFFERS" />
          <div
            onClick={() => navigate('/shop')}
            className="rounded-3xl bg-gradient-to-r from-[#2F1B85] to-[#4020A8] p-5 text-white shadow-sm cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <span className="text-[10px] font-bold tracking-wider text-amber-300 uppercase block mb-1">
              FURNITURE | MATTRESS | HOME DECOR
            </span>
            <h3 className="text-lg font-black text-white mb-2">
              Dream homes to sweet dreams
            </h3>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-[11px] font-semibold text-white">
              <span>✓ Comfort on 12m no-cost EMIs</span>
            </div>
          </div>
        </div>

        {/* SHOP USING 1FI AT TOP BRANDS matching Screenshot 1 & 2 */}
        <div>
          <SectionHeader
            title="SHOP USING 1FI AT TOP BRANDS"
            action={
              <button
                onClick={() => navigate('/shop?tab=top-brands')}
                className="text-xs font-bold text-[#5034D8] hover:underline"
              >
                View all
              </button>
            }
          />
          <div className="grid grid-cols-4 gap-2.5">
            {[
              { name: 'Apple', logo: '' },
              { name: 'Air India', logo: 'AI' },
              { name: 'Wakefit', logo: 'WF' },
              { name: 'Croma', logo: 'CR' },
            ].map((b, i) => (
              <button
                key={i}
                onClick={() => navigate('/shop')}
                className="bg-white rounded-2xl p-3 text-center border border-gray-100 shadow-xs hover:border-[#5034D8]/30 transition-all focus:outline-none"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-100 font-bold text-[#5034D8] flex items-center justify-center mx-auto mb-1.5">
                  {b.logo}
                </div>
                <span className="text-[11px] font-semibold text-gray-800 block truncate">
                  {b.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* WHY PAY WITH 1FI matching Screenshot 2 */}
        <div>
          <SectionHeader title="WHY PAY WITH 1FI" />
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-xs">
              <TrendingUp className="w-5 h-5 text-[#5034D8] mb-1.5" />
              <h4 className="text-xs font-bold text-gray-900">Keep growing</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">No tax, no exit load.</p>
            </div>
            <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-xs">
              <Percent className="w-5 h-5 text-[#5034D8] mb-1.5" />
              <h4 className="text-xs font-bold text-gray-900">0% interest</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">Repay only what you spend.</p>
            </div>
            <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-[#5034D8] mb-1.5" />
              <h4 className="text-xs font-bold text-gray-900">Zero charges</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">Nothing hidden, ever.</p>
            </div>
            <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-xs">
              <Zap className="w-5 h-5 text-[#5034D8] mb-1.5" />
              <h4 className="text-xs font-bold text-gray-900">Quickest approval</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">Instant eligibility check.</p>
            </div>
          </div>
        </div>

        {/* HOW 1FI WORKS matching Screenshot 2 */}
        <div>
          <SectionHeader title="HOW 1FI WORKS" />
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs">
            <div className="flex items-center justify-between relative">
              <div className="flex-1 text-center">
                <div className="w-11 h-11 rounded-full bg-[#5034D8] text-white flex items-center justify-center mx-auto mb-2 shadow-sm">
                  <QrCode className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-gray-800 uppercase block">
                  Connect Portfolio
                </span>
              </div>
              <div className="w-6 h-0.5 border-t-2 border-dashed border-gray-300 -mt-6" />
              <div className="flex-1 text-center">
                <div className="w-11 h-11 rounded-full bg-[#5034D8] text-white flex items-center justify-center mx-auto mb-2 shadow-sm">
                  <Lock className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-gray-800 uppercase block">
                  Unlock Limit
                </span>
              </div>
              <div className="w-6 h-0.5 border-t-2 border-dashed border-gray-300 -mt-6" />
              <div className="flex-1 text-center">
                <div className="w-11 h-11 rounded-full bg-[#5034D8] text-white flex items-center justify-center mx-auto mb-2 shadow-sm">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-gray-800 uppercase block">
                  Shop & Pay Later
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* REFER AND EARN matching Screenshot 2 */}
        <div className="rounded-3xl bg-gradient-to-r from-[#170E5C] to-[#4329C1] p-5 text-white shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-500 text-white px-2 py-0.5 rounded-full inline-block">
              INVITE
            </span>
            <h4 className="text-sm font-black text-white">Get upto ₹1000</h4>
            <p className="text-xs text-white/80">for every friend you refer</p>
          </div>
          <button className="px-4 py-2 rounded-full bg-white text-[#5034D8] text-xs font-bold">
            Refer & Earn
          </button>
        </div>
      </main>
    </div>
  );
}
