import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Package,
  PiggyBank,
  Users,
  HelpCircle,
  ShieldAlert,
  ChevronRight,
} from 'lucide-react';
import Header from '../components/common/Header';
import { useMarketplace } from '../context/MarketplaceContext';
import { formatCurrency } from '../utils/formatters';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { lastOrder } = useMarketplace();

  const actions = [
    {
      id: 'profile',
      title: 'Profile details',
      subtitle: 'Name, contact and KYC info',
      icon: User,
    },
    {
      id: 'purchases',
      title: 'Purchases',
      subtitle: 'Orders, invoices and loan status',
      icon: Package,
      badge: lastOrder ? '1 ACTIVE' : undefined,
    },
    {
      id: 'pledge',
      title: 'Pledge history',
      subtitle: 'Funds you pledged or released',
      icon: PiggyBank,
    },
    {
      id: 'invite',
      title: 'Invite friends',
      subtitle: 'Share the app, earn rewards',
      icon: Users,
      badge: 'EARN ₹500',
    },
    {
      id: 'support',
      title: 'Support & FAQs',
      subtitle: 'Find answers or contact us',
      icon: HelpCircle,
    },
    {
      id: 'privacy',
      title: 'Privacy policy',
      subtitle: 'Rules governing your usage',
      icon: ShieldAlert,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F5FA] flex flex-col pb-24">
      <Header />

      <main className="flex-1 max-w-md mx-auto w-full px-4 pt-3 space-y-5">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Profile
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage your account settings and personal preferences.
          </p>
        </div>

        {/* User Card matching Screenshot 4 */}
        <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-xs flex items-center space-x-3.5">
          <div className="w-14 h-14 rounded-full bg-[#5034D8]/15 text-[#5034D8] flex items-center justify-center font-black text-xl">
            U
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">User</h2>
            <p className="text-xs text-gray-500 font-medium">+91 1234567898</p>
            <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              KYC Verified • MF Limit Active
            </span>
          </div>
        </div>

        {/* Recent Order if placed in Marketplace */}
        {lastOrder && (
          <div className="bg-[#FAF9FF] border border-[#5034D8]/20 rounded-3xl p-4 space-y-2">
            <span className="text-[10px] font-bold text-[#5034D8] uppercase tracking-wider block">
              Recent Marketplace Purchase
            </span>
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-gray-900">{lastOrder.product.name}</span>
              <span className="font-black text-[#5034D8]">
                {formatCurrency(lastOrder.emiPlan.monthlyAmount)}/mo
              </span>
            </div>
            <p className="text-[11px] text-gray-500">
              Loan ID: {lastOrder.loanId} • {lastOrder.emiPlan.duration}M 0% EMI
            </p>
          </div>
        )}

        {/* Quick Actions List matching Screenshot 4 */}
        <div>
          <span className="text-xs font-bold text-gray-400 tracking-wider uppercase block mb-2 px-1">
            QUICK ACTIONS
          </span>

          <div className="space-y-2.5">
            {actions.map((act) => {
              const Icon = act.icon;
              return (
                <div
                  key={act.id}
                  onClick={() => {
                    if (act.id === 'purchases') {
                      navigate('/shop');
                    }
                  }}
                  className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-xs flex items-center justify-between hover:border-gray-200 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#5034D8]/10 text-[#5034D8] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">
                        {act.title}
                      </h3>
                      <p className="text-xs text-gray-500">{act.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {act.badge && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#5034D8]/15 text-[#5034D8]">
                        {act.badge}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
