import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 border-t border-white/5" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-2xl uppercase tracking-wide">
              İolo<span className="text-brand-red">Pizza</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              2010'dan beri şehrin en iyi pizzalarını odun ateşinde pişiriyoruz. 
              Lezzet tutkumuz hiç bitmedi.
            </p>
            <div className="flex space-x-4 pt-2">
              <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-red transition-colors cursor-pointer">
                <Instagram size={18} />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-red transition-colors cursor-pointer">
                <Twitter size={18} />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-red transition-colors cursor-pointer">
                <Facebook size={18} />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-brand-yellow">Hızlı Linkler</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Ana Sayfa</Link></li>
              <li><Link to="/menu" className="hover:text-white transition-colors">Menü</Link></li>
              <li><Link to="/hakkimizda" className="hover:text-white transition-colors">Hakkımızda</Link></li>
              <li><Link to="/iletisim" className="hover:text-white transition-colors">İletişim</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-brand-yellow">İletişim</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-red mt-1 shrink-0" />
                <span>Mithatpaşa Cad. No: 35<br />Göztepe, İzmir</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-red shrink-0" />
                <span>+90 232 555 35 35</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-red shrink-0" />
                <span>info@iolopizza.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-brand-yellow">Çalışma Saatleri</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex justify-between">
                <span>Pazartesi - Cuma</span>
                <span className="text-white">11:00 - 23:00</span>
              </li>
              <li className="flex justify-between">
                <span>Cumartesi</span>
                <span className="text-white">12:00 - 00:00</span>
              </li>
              <li className="flex justify-between">
                <span>Pazar</span>
                <span className="text-white">12:00 - 23:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-xs">
          <p>&copy; 2024 İolo Pizza. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;