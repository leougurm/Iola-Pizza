import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { logout } from '../../services/auth';
import { ChevronDown, Pizza, Coffee, IceCream, UtensilsCrossed, LayoutDashboard, ShoppingCart, Info, Phone } from 'lucide-react';

const MENU_CATEGORIES = [
  { key: 'PIZZA', label: 'Pizzalar', icon: Pizza },
  { key: 'DRINK', label: 'İçecekler', icon: Coffee },
  { key: 'DESSERT', label: 'Tatlılar', icon: IceCream },
  { key: 'SIDE', label: 'Yan Lezzetler', icon: UtensilsCrossed },
];

const AdminNavbar: React.FC = () => {
  const router = useRouter();
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const isActive = (path: string) => router.pathname === path;

  const handleCategoryClick = (category: string) => {
    router.push(`/admin/menu?category=${category}`);
    setIsMenuDropdownOpen(false);
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/admin/dashboard" className="font-bold text-xl text-orange-500">
          Iola Pizza Admin
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/admin/dashboard"
            className={`flex items-center gap-2 hover:text-orange-400 transition-colors ${isActive('/admin/dashboard') ? 'text-orange-400' : ''}`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          {/* Menu Management Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsMenuDropdownOpen(!isMenuDropdownOpen)}
              onMouseEnter={() => setIsMenuDropdownOpen(true)}
              className={`flex items-center gap-1 hover:text-orange-400 transition-colors ${router.pathname.includes('/admin/pizzas') || router.pathname.includes('/admin/menu') ? 'text-orange-400' : ''}`}
            >
              Menü Yönetimi
              <ChevronDown size={16} className={`transition-transform ${isMenuDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isMenuDropdownOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-56 bg-gray-900 rounded-lg shadow-xl border border-gray-700 overflow-hidden z-50"
                onMouseLeave={() => setIsMenuDropdownOpen(false)}
              >
                <Link
                  href="/admin/pizzas"
                  className="block px-4 py-3 hover:bg-gray-700 transition-colors border-b border-gray-700 font-medium"
                  onClick={() => setIsMenuDropdownOpen(false)}
                >
                  Tüm Ürünler
                </Link>
                {MENU_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <Link
                      key={cat.key}
                      href={`/admin/pizzas?category=${cat.key}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition-colors"
                      onClick={() => setIsMenuDropdownOpen(false)}
                    >
                      <Icon size={18} className="text-orange-400" />
                      <span>{cat.label}</span>
                    </Link>
                  );
                })}
                <div className="border-t border-gray-700">
                  <Link
                    href="/admin/pizzas/new"
                    className="block px-4 py-3 hover:bg-gray-700 transition-colors text-green-400 font-medium"
                    onClick={() => setIsMenuDropdownOpen(false)}
                  >
                    + Yeni Ürün Ekle
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/admin/orders"
            className={`flex items-center gap-2 hover:text-orange-400 transition-colors ${isActive('/admin/orders') ? 'text-orange-400' : ''}`}
          >
            <ShoppingCart size={18} />
            Siparişler
          </Link>

          <Link
            href="/admin/about"
            className={`flex items-center gap-2 hover:text-orange-400 transition-colors ${isActive('/admin/about') ? 'text-orange-400' : ''}`}
          >
            <Info size={18} />
            Hakkımızda
          </Link>

          <Link
            href="/admin/contact"
            className={`flex items-center gap-2 hover:text-orange-400 transition-colors ${isActive('/admin/contact') ? 'text-orange-400' : ''}`}
          >
            <Phone size={18} />
            İletişim
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
