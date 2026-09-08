import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Store, Receipt, TrendingUp, User } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      path: '/home',
      isActive: pathname === '/' || pathname === '/home',
    },
    {
      id: 'shop',
      label: 'Shop',
      icon: Store,
      path: '/shop',
      isActive: pathname.startsWith('/shop'),
    },
    {
      id: 'emi-dues',
      label: 'EMI Dues',
      icon: Receipt,
      path: '/emi-dues',
      isActive: pathname.startsWith('/emi-dues'),
    },
    {
      id: 'limit',
      label: 'Limit',
      icon: TrendingUp,
      path: '/limit',
      isActive: pathname.startsWith('/limit'),
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      path: '/profile',
      isActive: pathname.startsWith('/profile'),
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <nav
          className="bg-white/95 backdrop-blur-lg border-t border-gray-100 rounded-t-3xl shadow-[0_-8px_25px_rgba(0,0,0,0.06)] px-3 py-2 flex items-center justify-around"
          aria-label="Bottom Navigation"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className="relative flex flex-col items-center justify-center flex-1 py-1 focus:outline-none transition-transform active:scale-95 group"
                aria-current={item.isActive ? 'page' : undefined}
              >
                {/* Purple active top indicator line */}
                {item.isActive ? (
                  <div className="absolute -top-2 w-7 h-1 bg-[#5034D8] rounded-full transition-all duration-300 shadow-sm" />
                ) : (
                  <div className="absolute -top-2 w-7 h-1 bg-transparent rounded-full" />
                )}

                <div
                  className={`p-1 transition-colors duration-200 ${
                    item.isActive
                      ? 'text-[#5034D8]'
                      : 'text-gray-400 group-hover:text-gray-600'
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>

                <span
                  className={`text-[11px] tracking-tight transition-colors duration-200 ${
                    item.isActive
                      ? 'text-[#5034D8] font-bold'
                      : 'text-gray-500 font-medium'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
