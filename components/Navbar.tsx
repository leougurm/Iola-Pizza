import React, { useState } from 'react';
import { Menu, X, ShoppingBag, ChefHat } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const isMenuPage = router.pathname === '/menu';

  return (
    <nav className="fixed w-full z-50 bg-brand-dark/95 text-white backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-brand-red p-2 rounded-lg group-hover:bg-red-600 transition-colors">
              <ChefHat size={24} className="text-black" />
            </div>
            <span className="font-display font-bold text-2xl tracking-wide uppercase">
              İolo<span className="text-brand-red">Pizza</span>
            </span>
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/" className="hover:text-brand-yellow transition-colors font-medium">Ana Sayfa</Link>
              <Link href="/menu" className="hover:text-brand-yellow transition-colors font-medium">Menü</Link>
              <Link href="/hakkimizda" className="hover:text-brand-yellow transition-colors font-medium">Hakkımızda</Link>
              <Link href="/iletisim" className="hover:text-brand-yellow transition-colors font-medium">İletişim</Link>
              <Link href="/admin/dashboard" className="hover:text-brand-yellow transition-colors font-medium">Admin</Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
             {/* Call to Action Button */}
             {!isMenuPage && (
               <Link 
                 href="/menu" 
                 className="bg-brand-red hover:bg-red-600 text-white px-6 py-2 rounded-full font-bold transition-all shadow-lg hover:shadow-red-900/50"
               >
                 Sipariş Ver
               </Link>
             )}
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-dark border-b border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Ana Sayfa</Link>
            <Link href="/menu" className="text-brand-yellow block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Menü</Link>
            <Link href="/hakkimizda" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Hakkımızda</Link>
            <Link href="/iletisim" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>İletişim</Link>
            <Link href="/admin/dashboard" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Admin</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;