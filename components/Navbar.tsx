import React, { useState, useEffect } from 'react';
import { Menu, X, ChefHat, ChevronDown, Pizza, Coffee, IceCream, UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MENU_CATEGORIES = [
  { key: 'PIZZA', label: 'Pizzalar', icon: Pizza },
  { key: 'DRINK', label: 'İçecekler', icon: Coffee },
  { key: 'DESSERT', label: 'Tatlılar', icon: IceCream },
  { key: 'SIDE', label: 'Yan Lezzetler', icon: UtensilsCrossed },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  const isMenuPage = router.pathname === '/menu';

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryClick = (category: string) => {
    router.push(`/menu?category=${category}`);
    setIsMenuDropdownOpen(false);
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-dark/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-red rounded-xl blur-md opacity-50 group-hover:opacity-80 transition-opacity"></div>
              <div className="relative bg-brand-red p-2.5 rounded-xl group-hover:scale-110 transition-transform">
                <ChefHat size={22} className="text-white" />
              </div>
            </div>
            <span className="font-display font-bold text-2xl tracking-wide">
              <span className="text-white">İolo</span>
              <span className="text-brand-red">Pizza</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              <NavLink href="/" label="Ana Sayfa" />

              {/* Menu Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsMenuDropdownOpen(!isMenuDropdownOpen)}
                  onMouseEnter={() => setIsMenuDropdownOpen(true)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-medium transition-all ${
                    router.pathname === '/menu'
                      ? 'text-brand-yellow'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Menü
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${isMenuDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isMenuDropdownOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-64 bg-brand-dark-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
                    onMouseLeave={() => setIsMenuDropdownOpen(false)}
                  >
                    <Link
                      href="/menu"
                      className="block px-5 py-4 hover:bg-white/5 transition-colors border-b border-white/5"
                      onClick={() => setIsMenuDropdownOpen(false)}
                    >
                      <span className="font-semibold text-white">Tüm Menü</span>
                      <span className="text-gray-500 text-sm block mt-0.5">Tüm lezzetleri keşfet</span>
                    </Link>

                    <div className="py-2">
                      {MENU_CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <button
                            key={cat.key}
                            onClick={() => handleCategoryClick(cat.key)}
                            className="w-full flex items-center gap-4 px-5 py-3 hover:bg-white/5 transition-colors text-left group"
                          >
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-brand-red/50 group-hover:bg-brand-red/10 transition-all">
                              <Icon size={18} className="text-brand-yellow" />
                            </div>
                            <span className="text-gray-300 group-hover:text-white transition-colors">
                              {cat.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <NavLink href="/hakkimizda" label="Hakkımızda" />
              <NavLink href="/iletisim" label="İletişim" />
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            {!isMenuPage && (
              <Link
                href="/menu"
                className="btn-glow relative bg-brand-red hover:bg-red-600 text-white px-6 py-2.5 rounded-full font-bold transition-all hover:scale-105"
              >
                <span className="relative z-10">Sipariş Ver</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-brand-dark-card/95 backdrop-blur-xl border-t border-white/5 px-4 py-6 space-y-2">
          <MobileNavLink href="/" label="Ana Sayfa" onClick={() => setIsOpen(false)} />

          {/* Mobile Menu Categories */}
          <div className="border-t border-white/5 pt-4 mt-4">
            <span className="px-4 text-xs text-gray-500 uppercase tracking-wider font-medium">Menü</span>
            <Link
              href="/menu"
              className="flex items-center gap-3 px-4 py-3 mt-2 text-brand-yellow font-medium rounded-xl hover:bg-white/5 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Tüm Menü
            </Link>
            {MENU_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.key}
                  onClick={() => handleCategoryClick(cat.key)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
                >
                  <Icon size={18} className="text-brand-yellow" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="border-t border-white/5 pt-4 mt-4 space-y-2">
            <MobileNavLink href="/hakkimizda" label="Hakkımızda" onClick={() => setIsOpen(false)} />
            <MobileNavLink href="/iletisim" label="İletişim" onClick={() => setIsOpen(false)} />
          </div>

          {/* Mobile CTA */}
          {!isMenuPage && (
            <div className="pt-4 mt-4 border-t border-white/5">
              <Link
                href="/menu"
                className="block w-full bg-brand-red text-white text-center py-3 rounded-xl font-bold"
                onClick={() => setIsOpen(false)}
              >
                Sipariş Ver
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{ href: string; label: string }> = ({ href, label }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-xl font-medium transition-all ${
        isActive
          ? 'text-brand-yellow'
          : 'text-gray-300 hover:text-white hover:bg-white/5'
      }`}
    >
      {label}
    </Link>
  );
};

const MobileNavLink: React.FC<{ href: string; label: string; onClick: () => void }> = ({
  href,
  label,
  onClick,
}) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
        isActive
          ? 'text-brand-yellow bg-white/5'
          : 'text-gray-300 hover:text-white hover:bg-white/5'
      }`}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default Navbar;
