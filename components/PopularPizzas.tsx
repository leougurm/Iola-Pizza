import React from 'react';
import { MENU_ITEMS } from '../constants';
import { ArrowRight, Star, Flame } from 'lucide-react';
import Link from 'next/link';

const PopularPizzas: React.FC = () => {
  // Select a few items to feature (e.g., items with ids '1', '4', '5')
  const featuredItems = MENU_ITEMS.filter(item => ['4', '5', '3'].includes(item.id));

  return (
    <section className="py-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="text-brand-yellow fill-brand-yellow" size={24} />
            <h2 className="text-brand-red font-bold tracking-widest uppercase text-sm">Haftanın Yıldızları</h2>
            <Star className="text-brand-yellow fill-brand-yellow" size={24} />
          </div>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-brand-dark">
            En Çok Tercih Edilenler
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-brand-yellow text-brand-dark font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide">
                  Popüler
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-display text-xl font-bold text-brand-dark">{item.name}</h4>
                  <span className="text-brand-red font-bold text-lg">{item.price} ₺</span>
                </div>
                <p className="text-gray-600 text-sm mb-6 line-clamp-2">{item.description}</p>
                
                <Link 
                  href="/menu"
                  className="w-full bg-brand-dark text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-brand-red transition-colors"
                >
                  Sipariş Ver <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/menu" className="text-brand-dark font-bold border-b-2 border-brand-red hover:text-brand-red transition-colors">
            Tüm Menüyü Görüntüle
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularPizzas;