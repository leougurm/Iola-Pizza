import React, { useEffect, useState } from 'react';
import { getToken } from '../../services/auth';
import { Save, MapPin, Phone, Mail, Instagram, Twitter, Facebook } from 'lucide-react';

interface ContactSettings {
  contactAddress: string;
  contactPhone: string;
  contactPhoneHours: string;
  contactEmail: string;
  contactInstagram: string | null;
  contactTwitter: string | null;
  contactFacebook: string | null;
  contactMapUrl: string | null;
}

const DEFAULT_SETTINGS: ContactSettings = {
  contactAddress: 'Mithatpasa Caddesi No: 35, Goztepe, Konak / Izmir',
  contactPhone: '+90 232 555 35 35',
  contactPhoneHours: 'Hergun 11:00 - 23:00 arasi',
  contactEmail: 'info@iolopizza.com',
  contactInstagram: null,
  contactTwitter: null,
  contactFacebook: null,
  contactMapUrl: null,
};

const ContactAdminPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [settings, setSettings] = useState<ContactSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (!response.ok) throw new Error('Failed to fetch settings');
      const data = await response.json();
      setSettings({
        contactAddress: data.contactAddress || DEFAULT_SETTINGS.contactAddress,
        contactPhone: data.contactPhone || DEFAULT_SETTINGS.contactPhone,
        contactPhoneHours: data.contactPhoneHours || DEFAULT_SETTINGS.contactPhoneHours,
        contactEmail: data.contactEmail || DEFAULT_SETTINGS.contactEmail,
        contactInstagram: data.contactInstagram,
        contactTwitter: data.contactTwitter,
        contactFacebook: data.contactFacebook,
        contactMapUrl: data.contactMapUrl,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const token = getToken();

      // First get all current settings
      const currentResponse = await fetch('/api/settings');
      const currentSettings = await currentResponse.json();

      // Merge with contact settings
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...currentSettings,
          ...settings,
        }),
      });

      if (!response.ok) throw new Error('Failed to save settings');

      setSuccess('Iletisim bilgileri basariyla kaydedildi!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof ContactSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value || null }));
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
            <h1 className="text-3xl font-bold text-white">Iletisim Bilgileri</h1>
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
            {/* Contact Info Section */}
            <div className="bg-gray-800 rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-2 mb-4">
                Temel Bilgiler
              </h2>

              <div>
                <label className="flex items-center gap-2 text-gray-300 text-sm font-medium mb-2">
                  <MapPin size={16} className="text-orange-400" />
                  Adres
                </label>
                <textarea
                  value={settings.contactAddress}
                  onChange={(e) => updateField('contactAddress', e.target.value)}
                  rows={2}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                  placeholder="Adres bilgisi"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-gray-300 text-sm font-medium mb-2">
                    <Phone size={16} className="text-orange-400" />
                    Telefon
                  </label>
                  <input
                    type="text"
                    value={settings.contactPhone}
                    onChange={(e) => updateField('contactPhone', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                    placeholder="+90 XXX XXX XX XX"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Calisma Saatleri
                  </label>
                  <input
                    type="text"
                    value={settings.contactPhoneHours}
                    onChange={(e) => updateField('contactPhoneHours', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                    placeholder="Hergun 11:00 - 23:00 arasi"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-300 text-sm font-medium mb-2">
                  <Mail size={16} className="text-orange-400" />
                  E-Posta
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => updateField('contactEmail', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                  placeholder="info@example.com"
                />
              </div>
            </div>

            {/* Social Media Section */}
            <div className="bg-gray-800 rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-2 mb-4">
                Sosyal Medya
              </h2>

              <div>
                <label className="flex items-center gap-2 text-gray-300 text-sm font-medium mb-2">
                  <Instagram size={16} className="text-pink-400" />
                  Instagram URL
                </label>
                <input
                  type="url"
                  value={settings.contactInstagram || ''}
                  onChange={(e) => updateField('contactInstagram', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                  placeholder="https://instagram.com/iolopizza"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-300 text-sm font-medium mb-2">
                  <Twitter size={16} className="text-blue-400" />
                  Twitter URL
                </label>
                <input
                  type="url"
                  value={settings.contactTwitter || ''}
                  onChange={(e) => updateField('contactTwitter', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                  placeholder="https://twitter.com/iolopizza"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-300 text-sm font-medium mb-2">
                  <Facebook size={16} className="text-blue-500" />
                  Facebook URL
                </label>
                <input
                  type="url"
                  value={settings.contactFacebook || ''}
                  onChange={(e) => updateField('contactFacebook', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                  placeholder="https://facebook.com/iolopizza"
                />
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-gray-800 rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-2 mb-4">
                Harita
              </h2>

              <div>
                <label className="flex items-center gap-2 text-gray-300 text-sm font-medium mb-2">
                  <MapPin size={16} className="text-orange-400" />
                  Google Maps URL
                </label>
                <input
                  type="url"
                  value={settings.contactMapUrl || ''}
                  onChange={(e) => updateField('contactMapUrl', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                  placeholder="https://maps.google.com/..."
                />
                <p className="text-gray-500 text-sm mt-1">
                  Google Maps'te konum linkini yapistirin
                </p>
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

export default ContactAdminPage;
