import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { getToken } from '../../../services/auth';
import AdminLayout from '../../../components/admin/AdminLayout';
import PrivateRoute from '../../../components/admin/PrivateRoute';
import { X, Upload, Plus, Trash2 } from 'lucide-react';

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

const CATEGORIES = ['PIZZA', 'BURGER', 'DRINK', 'DESSERT', 'SIDE'];

const PizzaEditPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('PIZZA');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isAvailable, setIsAvailable] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id && id !== 'new') {
      fetchFood();
    } else if (id === 'new') {
      setLoading(false);
    }
  }, [id]);

  const fetchFood = async () => {
    try {
      const response = await fetch(`/api/foods/${id}`);
      if (!response.ok) throw new Error('Failed to fetch pizza');
      const data: Food = await response.json();

      setName(data.name);
      setDescription(data.description || '');
      setPrice(data.price.toString());
      setCategory(data.category);
      setIngredients(data.ingredients);
      setImages(data.images || []);
      setIsAvailable(data.isAvailable);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    try {
      const token = getToken();
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload images');

      const data = await response.json();
      setImages((prev) => [...prev, ...data.urls]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addIngredient = () => {
    if (newIngredient.trim()) {
      setIngredients((prev) => [...prev, newIngredient.trim()]);
      setNewIngredient('');
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const token = getToken();
      const isNew = id === 'new';
      const url = isNew ? '/api/foods' : `/api/foods/${id}`;
      const method = isNew ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
          price: parseFloat(price),
          category,
          ingredients,
          images,
          isAvailable,
        }),
      });

      if (!response.ok) throw new Error('Failed to save pizza');

      setSuccess('Pizza başarıyla kaydedildi!');
      setTimeout(() => {
        router.push('/admin/pizzas');
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <PrivateRoute>
        <AdminLayout>
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-400 text-lg">Yükleniyor...</div>
          </div>
        </AdminLayout>
      </PrivateRoute>
    );
  }

  return (
    <PrivateRoute>
      <AdminLayout>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">
              {id === 'new' ? 'Yeni Pizza Ekle' : 'Pizza Düzenle'}
            </h1>
            <button
              onClick={() => router.push('/admin/pizzas')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Geri Dön
            </button>
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded mb-6">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6 space-y-6">
            {/* Name */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Pizza Adı *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Açıklama
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Price & Category */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Fiyat (₺) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Kategori *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Malzemeler
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
                  placeholder="Malzeme ekle..."
                  className="flex-1 bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={addIngredient}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    {ingredient}
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Fotoğraflar
              </label>
              <div className="grid grid-cols-4 gap-4 mb-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Pizza ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <label className="border-2 border-dashed border-gray-600 rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {uploading ? (
                    <span className="text-gray-400">Yükleniyor...</span>
                  ) : (
                    <>
                      <Upload className="text-gray-400 mb-2" size={24} />
                      <span className="text-gray-400 text-sm">Fotoğraf Ekle</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isAvailable"
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
                className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="isAvailable" className="text-gray-300">
                Satışta (Aktif)
              </label>
            </div>

            {/* Submit */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white font-medium py-3 px-4 rounded transition-colors"
              >
                {saving ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/admin/pizzas')}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      </AdminLayout>
    </PrivateRoute>
  );
};

export default PizzaEditPage;
