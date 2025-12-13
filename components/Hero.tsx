import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-brand-dark min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=1920&q=80" 
          alt="Dark Pizza Oven Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-yellow/10 border border-brand-yellow/20 rounded-full">
              <Star size={16} className="text-brand-yellow fill-brand-yellow" />
              <span className="text-brand-yellow text-sm font-bold tracking-wide uppercase">Şehrin En İyi Pizzası</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight">
              Gerçek İtalyan,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-500">
                Türk Damak Tadı.
              </span>
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-lg leading-relaxed">
              Odun ateşinde pişen, taptaze malzemelerle hazırlanan el açması pizzalarımızı keşfedin. Lezzet yolculuğuna hazır mısınız?
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              <Link 
                href="/menu"
                className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-red-900/50 hover:scale-105"
              >
                Menüyü İncele <ArrowRight size={20} />
              </Link>
              <a 
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/20 hover:border-white text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:bg-white/5"
              >
                Bizi Arayın
              </a>
            </div>
          </div>

          <div className="hidden md:block relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-red/20 rounded-full blur-3xl animate-pulse"></div>
            <img 
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80" 
              alt="Floating Delicious Pizza" 
              className="relative w-full max-w-lg mx-auto rounded-full shadow-2xl animate-[spin_60s_linear_infinite]"
              style={{ boxShadow: '0 0 50px rgba(217, 56, 30, 0.3)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;