import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Flame, Leaf, Search, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

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

// Map database categories to Turkish display names
const CATEGORY_LABELS: Record<string, string> = {
  PIZZA: 'Pizzalar',
  BURGER: 'Burgerler',
  DRINK: 'İçecekler',
  DESSERT: 'Tatlılar',
  SIDE: 'Yan Lezzetler',
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  PIZZA: 'Odun ateşinde pişen el yapımı pizzalar',
  DRINK: 'Serinleten içecekler',
  DESSERT: 'Tatlı kaçamaklar',
  SIDE: 'Lezzetli ara sıcaklar',
};

const Menu: React.FC = () => {
  const router = useRouter();
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Tümü');
  const [searchQuery, setSearchQuery] = useState('');

  // Read category from URL on mount and when query changes
  useEffect(() => {
    const { category } = router.query;
    if (category && typeof category === 'string') {
      setActiveCategory(category);
    } else {
      setActiveCategory('Tümü');
    }
  }, [router.query]);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await fetch('/api/foods');
      if (!response.ok) throw new Error('Failed to fetch menu');
      const data: Food[] = await response.json();
      // Only show available items
      setFoods(data.filter(item => item.isAvailable));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories from foods
  const categories = ['Tümü', ...Array.from(new Set(foods.map(f => f.category)))];

  // Filter by category and search
  const filteredItems = foods.filter(item => {
    const matchesCategory = activeCategory === 'Tümü' || item.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    // Update URL without full page reload
    if (cat === 'Tümü') {
      router.push('/menu', undefined, { shallow: true });
    } else {
      router.push(`/menu?category=${cat}`, undefined, { shallow: true });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading skeleton */}
          <div className="text-center mb-12">
            <div className="h-4 w-32 bg-white/5 rounded mx-auto mb-4 shimmer"></div>
            <div className="h-12 w-64 bg-white/5 rounded mx-auto shimmer"></div>
          </div>
          <div className="flex justify-center gap-3 mb-12">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-10 w-24 bg-white/5 rounded-full shimmer"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white/[0.02] rounded-2xl overflow-hidden border border-white/5">
                <div className="h-64 shimmer"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 w-3/4 shimmer rounded"></div>
                  <div className="h-4 w-full shimmer rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-brand-dark pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">😕</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Bir Hata Oluştu</h2>
          <p className="text-gray-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-brand-red text-white rounded-full font-medium"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-12 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-red/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-brand-orange/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-brand-red text-sm font-bold tracking-widest uppercase mb-4">
            Dijital Menü
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
            {activeCategory === 'Tümü' ? (
              <>Lezzetleri <span className="gradient-text">Keşfet</span></>
            ) : (
              CATEGORY_LABELS[activeCategory] || activeCategory
            )}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {activeCategory === 'Tümü'
              ? 'Sipariş vermek için garsonunuza beğendiğiniz lezzeti iletebilirsiniz. Fiyatlarımıza KDV dahildir.'
              : CATEGORY_DESCRIPTIONS[activeCategory] || ''
            }
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md mx-auto md:mx-0">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Pizza, içecek veya malzeme ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-red/50 focus:bg-white/[0.07] transition-all"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 sticky top-20 z-30 bg-brand-dark/80 backdrop-blur-xl py-4 -mx-4 px-4 border-y border-white/5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all text-sm ${
                activeCategory === cat
                  ? 'bg-brand-red text-white shadow-lg shadow-brand-red/25'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {CATEGORY_LABELS[cat] || cat}
            </button>
          ))}
        </div>

        {/* Items count */}
        <div className="text-center mb-8">
          <span className="text-gray-500 text-sm">
            {filteredItems.length} ürün gösteriliyor
            {searchQuery && ` "${searchQuery}" için`}
          </span>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🍽️</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Ürün Bulunamadı</h3>
            <p className="text-gray-500">
              {searchQuery
                ? `"${searchQuery}" ile eşleşen ürün bulunamadı.`
                : 'Bu kategoride henüz ürün bulunmuyor.'
              }
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 px-6 py-2 bg-white/5 text-white rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                Aramayı Temizle
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const MenuCard: React.FC<{ item: Food }> = ({ item }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasMultipleImages = item.images && item.images.length > 1;

  // Check if pizza has spicy ingredients
  const isSpicy = item.ingredients.some(i =>
    i.toLowerCase().includes('acı') ||
    i.toLowerCase().includes('jalapeno') ||
    i.toLowerCase().includes('pul biber')
  );

  // Check if vegetarian
  const isVegetarian = item.ingredients.every(i =>
    !i.toLowerCase().includes('et') &&
    !i.toLowerCase().includes('sucuk') &&
    !i.toLowerCase().includes('sosis') &&
    !i.toLowerCase().includes('salam') &&
    !i.toLowerCase().includes('pastırma') &&
    !i.toLowerCase().includes('kavurma') &&
    !i.toLowerCase().includes('döner') &&
    !i.toLowerCase().includes('tavuk') &&
    !i.toLowerCase().includes('köfte') &&
    !i.toLowerCase().includes('kıyma') &&
    !i.toLowerCase().includes('ton balığı') &&
    !i.toLowerCase().includes('kuzu')
  );

  const mainImage = item.images && item.images.length > 0
    ? item.images[currentImageIndex]
    : 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800';

  return (
    <div className="group relative bg-white/[0.02] rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500 card-hover">
      {/* Image section */}
      <div className="relative h-56 overflow-hidden img-zoom">
        <img
          src={mainImage}
          alt={item.name}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent"></div>

        {/* Image slider controls */}
        {hasMultipleImages && (
          <>
            {/* Arrow buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex((prev) => (prev === 0 ? item.images.length - 1 : prev - 1));
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex((prev) => (prev === item.images.length - 1 ? 0 : prev + 1));
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronRight size={18} />
            </button>

            {/* Image counter badge */}
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs font-medium">
              {currentImageIndex + 1} / {item.images.length}
            </div>

            {/* Navigation dots */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-1.5">
              {item.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/40 w-1.5 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Tags */}
        <div className="absolute top-4 right-4 flex gap-2">
          {isSpicy && (
            <div className="w-8 h-8 bg-brand-red/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg" title="Acılı">
              <Flame size={14} className="text-white" fill="currentColor" />
            </div>
          )}
          {isVegetarian && (
            <div className="w-8 h-8 bg-green-500/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg" title="Vejetaryen">
              <Leaf size={14} className="text-white" fill="currentColor" />
            </div>
          )}
        </div>

        {/* Price */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-brand-dark/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
            <span className="text-brand-yellow font-bold text-lg">₺{item.price.toFixed(0)}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display text-lg font-bold text-white group-hover:text-brand-yellow transition-colors">
            {item.name}
          </h3>
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2 h-10">
          {item.description || item.ingredients.slice(0, 4).join(', ')}
        </p>

        {/* Ingredients */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.ingredients.slice(0, 4).map((ingredient, idx) => (
            <span key={idx} className="text-xs bg-white/5 text-gray-400 px-2.5 py-1 rounded-full border border-white/5">
              {ingredient}
            </span>
          ))}
          {item.ingredients.length > 4 && (
            <span className="text-xs text-gray-500 px-2 py-1">
              +{item.ingredients.length - 4}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {CATEGORY_LABELS[item.category] || item.category}
          </span>
          {/*
          <button className="text-brand-yellow font-semibold text-sm hover:text-white transition-colors">
            Detaylı Bilgi →
          </button>
          */}
        </div>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 60px rgba(217, 56, 30, 0.08)' }}
      ></div>
    </div>
  );
};

export default Menu;
