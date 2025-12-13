import React, { useState } from 'react';
import { MENU_ITEMS } from '../constants';
import { Category, MenuItem } from '../types';
import { Flame, Leaf } from 'lucide-react';

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category | 'Tümü'>('Tümü');

  const categories = ['Tümü', ...Object.values(Category)];

  const filteredItems = activeCategory === 'Tümü' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-brand-yellow font-bold tracking-widest uppercase mb-2">Dijital Menü</h2>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Lezzetleri Keşfet</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Sipariş vermek için garsonunuza beğendiğiniz lezzeti iletebilirsiniz. 
            Fiyatlarımıza KDV dahildir.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 sticky top-24 z-30 bg-brand-dark/95 backdrop-blur-md py-4 rounded-xl border-y border-white/5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as Category | 'Tümü')}
              className={`px-6 py-2 rounded-full font-medium transition-all text-sm md:text-base whitespace-nowrap
                ${activeCategory === cat 
                  ? 'bg-brand-red text-white shadow-[0_0_15px_rgba(217,56,30,0.5)]' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Bu kategoride henüz ürün bulunmuyor.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const MenuCard: React.FC<{ item: MenuItem }> = ({ item }) => {
  return (
    <div className="bg-[#252525] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-white/5">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          {item.spicy && (
            <div className="bg-brand-red text-white p-2 rounded-full shadow-lg backdrop-blur-sm" title="Acılı">
              <Flame size={16} fill="currentColor" />
            </div>
          )}
          {item.vegetarian && (
            <div className="bg-green-600 text-white p-2 rounded-full shadow-lg backdrop-blur-sm" title="Vejetaryen">
              <Leaf size={16} fill="currentColor" />
            </div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
           <span className="text-brand-yellow font-display font-bold text-xl drop-shadow-md">{item.price} ₺</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display text-xl font-bold text-white group-hover:text-brand-red transition-colors">{item.name}</h3>
        </div>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 h-10">{item.description}</p>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
           <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{item.category}</span>
           <button className="text-brand-yellow font-bold text-sm hover:text-white transition-colors">Detaylı Bilgi</button>
        </div>
      </div>
    </div>
  );
};

export default Menu;