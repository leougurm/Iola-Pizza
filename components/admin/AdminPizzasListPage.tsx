import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getToken } from '../../services/auth';
import { Pizza, Coffee, IceCream, UtensilsCrossed } from 'lucide-react';

interface Food {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  ingredients: string[];
  images: string[];
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  PIZZA: 'Pizzalar',
  BURGER: 'Burgerler',
  DRINK: 'İçecekler',
  DESSERT: 'Tatlılar',
  SIDE: 'Yan Lezzetler',
};

const CATEGORY_ICONS: Record<string, React.FC<{ size?: number; className?: string }>> = {
  PIZZA: Pizza,
  DRINK: Coffee,
  DESSERT: IceCream,
  SIDE: UtensilsCrossed,
};

const AdminPizzasListPage: React.FC = () => {
  const router = useRouter();
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Tümü');

  // Read category from URL
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
      if (!response.ok) throw new Error('Failed to fetch foods');
      const data = await response.json();
      setFoods(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" ürününü silmek istediğinize emin misiniz?`)) {
      return;
    }

    setDeleting(id);
    try {
      const token = getToken();
      const response = await fetch(`/api/foods/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete');

      setFoods((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setDeleting(null);
    }
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (cat === 'Tümü') {
      router.push('/admin/pizzas', undefined, { shallow: true });
    } else {
      router.push(`/admin/pizzas?category=${cat}`, undefined, { shallow: true });
    }
  };

  // Get unique categories
  const categories = ['Tümü', ...Array.from(new Set(foods.map(f => f.category)))];

  // Filter foods by category
  const filteredFoods = activeCategory === 'Tümü'
    ? foods
    : foods.filter(f => f.category === activeCategory);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-400 text-lg">Yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded">
        Hata: {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">
          {activeCategory === 'Tümü' ? 'Menü Yönetimi' : CATEGORY_LABELS[activeCategory] || activeCategory}
        </h1>
        <Link
          href="/admin/pizzas/new"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          + Yeni Ürün Ekle
        </Link>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => {
          const Icon = CATEGORY_ICONS[cat];
          return (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {Icon && <Icon size={18} />}
              {CATEGORY_LABELS[cat] || cat}
              <span className="bg-black/20 px-2 py-0.5 rounded text-sm">
                {cat === 'Tümü' ? foods.length : foods.filter(f => f.category === cat).length}
              </span>
            </button>
          );
        })}
      </div>

      <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Görsel
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Ürün Adı
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Fiyat
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Durum
              </th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-gray-300 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredFoods.map((food) => {
              const CategoryIcon = CATEGORY_ICONS[food.category];
              return (
                <tr key={food.id} className="hover:bg-gray-750">
                  <td className="px-5 py-4">
                    {food.images && food.images.length > 0 ? (
                      <img
                        src={food.images[0]}
                        alt={food.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 text-xs">
                        Görsel Yok
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-white font-medium">{food.name}</p>
                    <p className="text-gray-400 text-sm max-w-xs truncate">
                      {food.description || '-'}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-2 text-gray-300">
                      {CategoryIcon && <CategoryIcon size={16} className="text-orange-400" />}
                      {CATEGORY_LABELS[food.category] || food.category}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-green-400 font-semibold">₺{food.price.toFixed(2)}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        food.isAvailable
                          ? 'bg-green-900 text-green-300'
                          : 'bg-red-900 text-red-300'
                      }`}
                    >
                      {food.isAvailable ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/pizzas/${food.id}`}
                      className="text-blue-400 hover:text-blue-300 mr-4 transition-colors"
                    >
                      Düzenle
                    </Link>
                    <button
                      onClick={() => handleDelete(food.id, food.name)}
                      disabled={deleting === food.id}
                      className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                    >
                      {deleting === food.id ? 'Siliniyor...' : 'Sil'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredFoods.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            Bu kategoride henüz ürün bulunmuyor.
          </div>
        )}
      </div>

      <div className="mt-4 text-gray-400 text-sm">
        Toplam {filteredFoods.length} ürün gösteriliyor
        {activeCategory !== 'Tümü' && ` (${foods.length} toplam ürün)`}
      </div>
    </div>
  );
};

export default AdminPizzasListPage;
