import React from 'react';
import { Flame, Wheat, Heart, ChefHat } from 'lucide-react';

const Story: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Images Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=400&q=80" 
                alt="Wood fire oven" 
                className="rounded-2xl shadow-lg w-full h-64 object-cover mt-12 hover:scale-105 transition-transform duration-500"
              />
              <div className="rounded-2xl shadow-lg w-full h-64 bg-white flex items-center justify-center hover:scale-105 transition-transform duration-500 border border-gray-100 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200 opacity-50"></div>
                <ChefHat 
                  size={140} 
                  className="text-black drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)] transform transition-transform group-hover:rotate-3 relative z-10" 
                  fill="currentColor" 
                  strokeWidth={1.5}
                />
              </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-red text-white p-6 rounded-full shadow-xl z-10 hidden md:block">
              <Flame size={40} className="animate-pulse" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-brand-red font-bold tracking-widest uppercase mb-2">Hikayemiz</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-6">
                Erhan Usta'nın<br />Lezzet Yolculuğu
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                2010 yılında İzmir Göztepe'de küçük bir dükkanda başlayan serüvenimiz, Erhan Usta'nın tutkusuyla bugün şehrin en sevilen pizza durağı haline geldi. Sırrımız çok basit: Geleneksel yöntemlere sadık kalmak ve asla kaliteden ödün vermemek.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-brand-cream p-3 rounded-xl h-fit">
                  <Flame className="text-brand-red" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark text-lg">Taş Fırın Lezzeti</h4>
                  <p className="text-gray-500">Pizzalarımız, meşe odunuyla ısıtılan özel taş fırınımızda, 400 derecede pişer.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-brand-cream p-3 rounded-xl h-fit">
                  <Wheat className="text-brand-red" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark text-lg">72 Saat Mayalanma</h4>
                  <p className="text-gray-500">Hamurumuz özel un karışımıyla hazırlanır ve sindirimi kolaylaştırmak için en az 72 saat soğuk mayalanır.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-brand-cream p-3 rounded-xl h-fit">
                  <Heart className="text-brand-red" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark text-lg">%100 Yerli ve Doğal</h4>
                  <p className="text-gray-500">Soslarımızda Çanakkale domatesleri, üzerlerinde ise yerel üreticilerden aldığımız taze peynirler kullanılır.</p>
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