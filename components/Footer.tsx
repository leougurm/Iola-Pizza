import React from 'react';
import { Instagram, Twitter, MapPin, Phone, Mail, ChefHat, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-brand-dark pt-24 pb-8 overflow-hidden" id="contact">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-[150px]"></div>
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[150px]"></div>
      </div>

      {/* Top decorative border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 group mb-6">
              <div className="w-12 h-12 bg-brand-red rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <ChefHat size={24} className="text-white" />
              </div>
              <span className="font-display font-bold text-2xl text-white">
                İolo<span className="text-brand-red">Pizza</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              2010'dan beri şehrin en iyi pizzalarını odun ateşinde pişiriyoruz.
              Lezzet tutkumuz hiç bitmedi.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all group"
              >
                <Instagram size={18} className="text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all group"
              >
                <Twitter size={18} className="text-gray-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-brand-red"></span>
              Hızlı Linkler
            </h4>
            <ul className="space-y-4">
              {[
                { href: '/', label: 'Ana Sayfa' },
                { href: '/menu', label: 'Menü' },
                { href: '/hakkimizda', label: 'Hakkımızda' },
                { href: '/iletisim', label: 'İletişim' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                  >
                    {link.label}
                    <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-brand-red"></span>
              İletişim
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-brand-red/50 transition-colors">
                    <MapPin size={18} className="text-brand-red" />
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm group-hover:text-white transition-colors block">
                      Mithatpaşa Cad. No: 35
                    </span>
                    <span className="text-gray-500 text-sm">Göztepe, İzmir</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="tel:+902325553535" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-brand-red/50 transition-colors">
                    <Phone size={18} className="text-brand-red" />
                  </div>
                  <span className="text-gray-400 text-sm group-hover:text-white transition-colors">
                    +90 232 555 35 35
                  </span>
                </a>
              </li>
              <li>
                <a href="mailto:info@iolopizza.com" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-brand-red/50 transition-colors">
                    <Mail size={18} className="text-brand-red" />
                  </div>
                  <span className="text-gray-400 text-sm group-hover:text-white transition-colors">
                    info@iolopizza.com
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-brand-red"></span>
              Çalışma Saatleri
            </h4>
            <div className="space-y-3">
              {[
                { day: 'Pazartesi - Cuma', hours: '11:00 - 23:00' },
                { day: 'Cumartesi', hours: '12:00 - 00:00' },
                { day: 'Pazar', hours: '12:00 - 23:00' },
              ].map((schedule, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center py-2 border-b border-white/5 last:border-0"
                >
                  <span className="text-gray-400 text-sm">{schedule.day}</span>
                  <span className="text-white text-sm font-medium bg-white/5 px-3 py-1 rounded-full">
                    {schedule.hours}
                  </span>
                </div>
              ))}
            </div>

            {/* Status indicator */}
            <div className="mt-6 flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">Şu an açığız</span>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} İolo Pizza. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">Gizlilik Politikası</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">Kullanım Şartları</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
