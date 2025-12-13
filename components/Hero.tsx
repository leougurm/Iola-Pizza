import React from 'react';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-brand-dark min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark-secondary to-brand-dark"></div>

        {/* Animated orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-red/20 rounded-full blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-brand-orange/15 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/10 rounded-full blur-[150px]"></div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-brand-yellow/40 rounded-full animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left pt-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
              <Sparkles size={16} className="text-brand-yellow" />
              <span className="text-brand-yellow text-sm font-semibold tracking-wide">Şehrin En İyi Pizzası</span>
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-brand-yellow fill-brand-yellow" />
                ))}
              </div>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-[1.1]">
              Gerçek İtalyan,
              <br />
              <span className="gradient-text">
                Türk Damak Tadı.
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed">
              Odun ateşinde pişen, taptaze malzemelerle hazırlanan el açması pizzalarımızı keşfedin.
              <span className="text-white font-medium"> Lezzet yolculuğuna hazır mısınız?</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start pt-4">
              <Link
                href="/menu"
                className="btn-glow inline-flex items-center justify-center gap-3 bg-brand-red hover:bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105"
              >
                Menüyü İncele
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg transition-all backdrop-blur-sm"
              >
                Bizi Arayın
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 justify-center sm:justify-start">
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-white">14+</div>
                <div className="text-sm text-gray-500">Yıllık Deneyim</div>
              </div>
              <div className="w-px bg-white/10"></div>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-sm text-gray-500">Mutlu Müşteri</div>
              </div>
              <div className="w-px bg-white/10"></div>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-white">4.9</div>
                <div className="text-sm text-gray-500">Ortalama Puan</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="hidden md:block relative">
            {/* Glow effect behind pizza */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-red/30 rounded-full blur-[100px] animate-pulse"></div>

            {/* Ring decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-white/5 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/[0.02] rounded-full"></div>

            {/* Main pizza image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80"
                alt="Delicious Pizza"
                className="relative w-full max-w-md mx-auto rounded-full shadow-2xl animate-float"
                style={{
                  boxShadow: '0 0 80px rgba(217, 56, 30, 0.3), 0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  animationDuration: '6s'
                }}
              />

              {/* Floating badge */}
              <div className="absolute -right-4 top-1/4 glass rounded-2xl p-4 shadow-xl animate-float" style={{ animationDelay: '2s', animationDuration: '5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-red/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🔥</span>
                  </div>
                  <div>
                    <div className="text-white font-bold">Odun Ateşi</div>
                    <div className="text-gray-400 text-sm">Geleneksel Pişirme</div>
                  </div>
                </div>
              </div>

              {/* Another floating badge */}
              <div className="absolute -left-4 bottom-1/4 glass rounded-2xl p-4 shadow-xl animate-float" style={{ animationDelay: '1s', animationDuration: '7s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🌿</span>
                  </div>
                  <div>
                    <div className="text-white font-bold">%100 Doğal</div>
                    <div className="text-gray-400 text-sm">Taze Malzeme</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <span className="text-xs uppercase tracking-widest">Keşfet</span>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
