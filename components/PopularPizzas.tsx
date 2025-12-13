import React, { useEffect, useState } from 'react';
import { ArrowRight, Star, Flame, Leaf } from 'lucide-react';
import Link from 'next/link';

interface Food {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  ingredients: string[];
  images: string[];
  isAvailable: boolean;
}

const PopularPizzas: React.FC = () => {
  const [featuredItems, setFeaturedItems] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch('/api/foods');
        if (!response.ok) throw new Error('Failed to fetch');
        const data: Food[] = await response.json();
        // Get first 3 available pizzas
        const pizzas = data
          .filter(item => item.category === 'PIZZA' && item.isAvailable)
          .slice(0, 3);
        setFeaturedItems(pizzas);
      } catch (err) {
        console.error('Failed to fetch featured items:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-brand-dark-secondary relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-4 w-32 bg-white/5 rounded mx-auto mb-4 shimmer"></div>
            <div className="h-10 w-64 bg-white/5 rounded mx-auto shimmer"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/[0.02] rounded-2xl overflow-hidden border border-white/5">
                <div className="h-64 shimmer"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 w-3/4 shimmer rounded"></div>
                  <div className="h-4 w-full shimmer rounded"></div>
                  <div className="h-12 w-full shimmer rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (featuredItems.length === 0) return null;

  return (
    <section className="py-24 bg-brand-dark-secondary relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-[150px] -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[150px] -translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand-red"></div>
            <Star className="text-brand-yellow fill-brand-yellow" size={20} />
            <span className="text-brand-red font-bold tracking-widest uppercase text-sm">Haftanın Yıldızları</span>
            <Star className="text-brand-yellow fill-brand-yellow" size={20} />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand-red"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
            En Çok Tercih Edilenler
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Müşterilerimizin en çok sevdiği lezzetleri sizin için seçtik
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredItems.map((item, index) => (
            <FeaturedCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-16">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-white font-bold text-lg group"
          >
            <span className="border-b-2 border-brand-red group-hover:border-brand-yellow transition-colors">
              Tüm Menüyü Görüntüle
            </span>
            <ArrowRight size={20} className="text-brand-red group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const FeaturedCard: React.FC<{ item: Food; index: number }> = ({ item, index }) => {
  const mainImage = item.images && item.images.length > 0
    ? item.images[0]
    : 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800';

  const isSpicy = item.ingredients.some(i =>
    i.toLowerCase().includes('acı') ||
    i.toLowerCase().includes('jalapeno') ||
    i.toLowerCase().includes('pul biber')
  );

  const isVegetarian = item.ingredients.every(i =>
    !i.toLowerCase().includes('et') &&
    !i.toLowerCase().includes('sucuk') &&
    !i.toLowerCase().includes('sosis') &&
    !i.toLowerCase().includes('tavuk') &&
    !i.toLowerCase().includes('döner')
  );

  return (
    <div
      className="group relative bg-white/[0.02] rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500 card-hover"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image section */}
      <div className="relative h-64 overflow-hidden img-zoom">
        <img
          src={mainImage}
          alt={item.name}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent"></div>

        {/* Popular badge */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-1.5 bg-brand-yellow/90 backdrop-blur-sm text-brand-dark font-bold px-3 py-1.5 rounded-full text-xs uppercase tracking-wide">
            <Star size={12} className="fill-current" />
            Popüler
          </div>
        </div>

        {/* Tags */}
        <div className="absolute top-4 right-4 flex gap-2">
          {isSpicy && (
            <div className="w-8 h-8 bg-red-500/90 backdrop-blur-sm rounded-full flex items-center justify-center" title="Acılı">
              <Flame size={14} className="text-white" />
            </div>
          )}
          {isVegetarian && (
            <div className="w-8 h-8 bg-green-500/90 backdrop-blur-sm rounded-full flex items-center justify-center" title="Vejetaryen">
              <Leaf size={14} className="text-white" />
            </div>
          )}
        </div>

        {/* Price tag */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-brand-dark/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
            <span className="text-brand-yellow font-bold text-lg">₺{item.price.toFixed(0)}</span>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-brand-yellow transition-colors">
          {item.name}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 h-10">
          {item.description || item.ingredients.slice(0, 4).join(', ')}
        </p>

        {/* Ingredients preview */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {item.ingredients.slice(0, 3).map((ingredient, idx) => (
            <span
              key={idx}
              className="text-xs bg-white/5 text-gray-400 px-2.5 py-1 rounded-full border border-white/5"
            >
              {ingredient}
            </span>
          ))}
          {item.ingredients.length > 3 && (
            <span className="text-xs text-gray-500 px-2 py-1">
              +{item.ingredients.length - 3}
            </span>
          )}
        </div>

        {/* CTA Button */}
        <Link
          href={`/menu?category=PIZZA`}
          className="btn-glow w-full bg-brand-red/10 border border-brand-red/20 hover:bg-brand-red hover:border-brand-red text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300"
        >
          Sipariş Ver
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 60px rgba(217, 56, 30, 0.1)' }}
      ></div>
    </div>
  );
};

export default PopularPizzas;
