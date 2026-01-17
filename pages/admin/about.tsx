import React, { useEffect, useState, useRef } from 'react';
import { getToken } from '../../services/auth';
import { Upload, Trash2, Save } from 'lucide-react';

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

const AboutAdminPage: React.FC = () => {
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploading, setUploading] = useState<number | null>(null);

  const [settings, setSettings] = useState<SiteSettings>({
    aboutTitle: '',
    aboutSubtitle: '',
    aboutDescription: '',
    feature1Title: '',
    feature1Desc: '',
    feature2Title: '',
    feature2Desc: '',
    feature3Title: '',
    feature3Desc: '',
    aboutImage1: null,
    aboutImage2: null,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (!response.ok) throw new Error('Failed to fetch settings');
      const data = await response.json();
      setSettings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, imageNumber: 1 | 2) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(imageNumber);
    setError(null);

    const formData = new FormData();
    formData.append('images', files[0]);

    try {
      const token = getToken();
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload image');

      const data = await response.json();
      const imageUrl = data.urls[0];

      setSettings(prev => ({
        ...prev,
        [imageNumber === 1 ? 'aboutImage1' : 'aboutImage2']: imageUrl,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(null);
      if (imageNumber === 1 && fileInputRef1.current) {
        fileInputRef1.current.value = '';
      }
      if (imageNumber === 2 && fileInputRef2.current) {
        fileInputRef2.current.value = '';
      }
    }
  };

  const removeImage = (imageNumber: 1 | 2) => {
    setSettings(prev => ({
      ...prev,
      [imageNumber === 1 ? 'aboutImage1' : 'aboutImage2']: null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const token = getToken();
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) throw new Error('Failed to save settings');

      setSuccess('Ayarlar basariyla kaydedildi!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof SiteSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-400 text-lg">Yukleniyor...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">Hakkimizda Sayfasi</h1>
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

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Main Section */}
            <div className="bg-gray-800 rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-2 mb-4">
                Ana Bolum
              </h2>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Baslik
                </label>
                <input
                  type="text"
                  value={settings.aboutTitle}
                  onChange={(e) => updateField('aboutTitle', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                  placeholder="Hikayemiz"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Alt Baslik
                </label>
                <input
                  type="text"
                  value={settings.aboutSubtitle}
                  onChange={(e) => updateField('aboutSubtitle', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                  placeholder="Erhan Usta'nin Lezzet Yolculugu"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Aciklama
                </label>
                <textarea
                  value={settings.aboutDescription}
                  onChange={(e) => updateField('aboutDescription', e.target.value)}
                  rows={4}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                  placeholder="Hikayenizi buraya yazin..."
                />
              </div>
            </div>

            {/* Images Section */}
            <div className="bg-gray-800 rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-2 mb-4">
                Gorseller
              </h2>

              <div className="grid grid-cols-2 gap-6">
                {/* Image 1 */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Gorsel 1
                  </label>
                  {settings.aboutImage1 ? (
                    <div className="relative group">
                      <img
                        src={settings.aboutImage1}
                        alt="About Image 1"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(1)}
                        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-gray-600 rounded-lg h-48 flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 transition-colors">
                      <input
                        ref={fileInputRef1}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 1)}
                        className="hidden"
                      />
                      {uploading === 1 ? (
                        <span className="text-gray-400">Yukleniyor...</span>
                      ) : (
                        <>
                          <Upload className="text-gray-400 mb-2" size={24} />
                          <span className="text-gray-400 text-sm">Gorsel Yukle</span>
                        </>
                      )}
                    </label>
                  )}
                </div>

                {/* Image 2 */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Gorsel 2
                  </label>
                  {settings.aboutImage2 ? (
                    <div className="relative group">
                      <img
                        src={settings.aboutImage2}
                        alt="About Image 2"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(2)}
                        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-gray-600 rounded-lg h-48 flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 transition-colors">
                      <input
                        ref={fileInputRef2}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 2)}
                        className="hidden"
                      />
                      {uploading === 2 ? (
                        <span className="text-gray-400">Yukleniyor...</span>
                      ) : (
                        <>
                          <Upload className="text-gray-400 mb-2" size={24} />
                          <span className="text-gray-400 text-sm">Gorsel Yukle</span>
                        </>
                      )}
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-gray-800 rounded-lg p-6 space-y-6">
              <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-2 mb-4">
                Ozellikler
              </h2>

              {/* Feature 1 */}
              <div className="bg-gray-700/50 rounded-lg p-4 space-y-3">
                <h3 className="text-orange-400 font-medium">Ozellik 1</h3>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Baslik</label>
                  <input
                    type="text"
                    value={settings.feature1Title}
                    onChange={(e) => updateField('feature1Title', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                    placeholder="Tas Firin Lezzeti"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Aciklama</label>
                  <textarea
                    value={settings.feature1Desc}
                    onChange={(e) => updateField('feature1Desc', e.target.value)}
                    rows={2}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-gray-700/50 rounded-lg p-4 space-y-3">
                <h3 className="text-orange-400 font-medium">Ozellik 2</h3>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Baslik</label>
                  <input
                    type="text"
                    value={settings.feature2Title}
                    onChange={(e) => updateField('feature2Title', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                    placeholder="72 Saat Mayalanma"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Aciklama</label>
                  <textarea
                    value={settings.feature2Desc}
                    onChange={(e) => updateField('feature2Desc', e.target.value)}
                    rows={2}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-gray-700/50 rounded-lg p-4 space-y-3">
                <h3 className="text-orange-400 font-medium">Ozellik 3</h3>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Baslik</label>
                  <input
                    type="text"
                    value={settings.feature3Title}
                    onChange={(e) => updateField('feature3Title', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                    placeholder="%100 Yerli ve Dogal"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Aciklama</label>
                  <textarea
                    value={settings.feature3Desc}
                    onChange={(e) => updateField('feature3Desc', e.target.value)}
                    rows={2}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-800 text-white font-medium py-3 px-8 rounded-lg transition-colors"
              >
                <Save size={20} />
                {saving ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
      </form>
    </div>
  );
};

export default AboutAdminPage;
