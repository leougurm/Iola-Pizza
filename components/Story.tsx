import React, { useState, useEffect } from 'react';
import { Flame, Wheat, Heart, ChefHat } from 'lucide-react';

interface SiteSettings {
  aboutTitle: string;
  aboutSubtitle: string;
  aboutDescription: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  aboutImage1: string | null;
  aboutImage2: string | null;
}

const DEFAULT_SETTINGS: SiteSettings = {
  aboutTitle: 'Hikayemiz',
  aboutSubtitle: 'Erhan Usta\'nin Lezzet Yolculugu',
  aboutDescription: '2010 yilinda Izmir Goztepe\'de kucuk bir dukkanda baslayan seruvenimiz, Erhan Usta\'nin tutkusuyla bugun sehrin en sevilen pizza duragi haline geldi. Sirrimiz cok basit: Geleneksel yontemlere sadik kalmak ve asla kaliteden odun vermemek.',
  feature1Title: 'Tas Firin Lezzeti',
  feature1Desc: 'Pizzalarimiz, mese odunuyla isitilan ozel tas firinimizda, 400 derecede piser.',
  feature2Title: '72 Saat Mayalanma',
  feature2Desc: 'Hamurumuz ozel un karisimiyla hazirlanir ve sindirimi kolaylastirmak icin en az 72 saat soguk mayalanir.',
  feature3Title: '%100 Yerli ve Dogal',
  feature3Desc: 'Soslarimizda Canakkale domatesleri, uzerlerinde ise yerel ureticilerden aldigimiz taze peynirler kullanilir.',
  aboutImage1: null,
  aboutImage2: null,
};

const Story: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(() => setSettings(DEFAULT_SETTINGS));
  }, []);

  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Images Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {settings.aboutImage1 ? (
                <img
                  src={settings.aboutImage1}
                  alt="About Image 1"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover mt-12 hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <img
                  src="https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=400&q=80"
                  alt="Wood fire oven"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover mt-12 hover:scale-105 transition-transform duration-500"
                />
              )}
              {settings.aboutImage2 ? (
                <img
                  src={settings.aboutImage2}
                  alt="About Image 2"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="rounded-2xl shadow-lg w-full h-64 bg-white flex items-center justify-center hover:scale-105 transition-transform duration-500 border border-gray-100 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200 opacity-50"></div>
                  <ChefHat
                    size={140}
                    className="text-black drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)] transform transition-transform group-hover:rotate-3 relative z-10"
                    fill="currentColor"
                    strokeWidth={1.5}
                  />
                </div>
              )}
            </div>
            {/* Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-red text-white p-6 rounded-full shadow-xl z-10 hidden md:block">
              <Flame size={40} className="animate-pulse" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-brand-red font-bold tracking-widest uppercase mb-2">{settings.aboutTitle}</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-6">
                {settings.aboutSubtitle}
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {settings.aboutDescription}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-brand-cream p-3 rounded-xl h-fit">
                  <Flame className="text-brand-red" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark text-lg">{settings.feature1Title}</h4>
                  <p className="text-gray-500">{settings.feature1Desc}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-brand-cream p-3 rounded-xl h-fit">
                  <Wheat className="text-brand-red" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark text-lg">{settings.feature2Title}</h4>
                  <p className="text-gray-500">{settings.feature2Desc}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-brand-cream p-3 rounded-xl h-fit">
                  <Heart className="text-brand-red" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark text-lg">{settings.feature3Title}</h4>
                  <p className="text-gray-500">{settings.feature3Desc}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Story;