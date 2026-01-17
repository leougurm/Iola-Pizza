import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, Twitter } from 'lucide-react';

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

const ContactPage: React.FC = () => {
  const [settings, setSettings] = useState<ContactSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setSettings({
        contactAddress: data.contactAddress || DEFAULT_SETTINGS.contactAddress,
        contactPhone: data.contactPhone || DEFAULT_SETTINGS.contactPhone,
        contactPhoneHours: data.contactPhoneHours || DEFAULT_SETTINGS.contactPhoneHours,
        contactEmail: data.contactEmail || DEFAULT_SETTINGS.contactEmail,
        contactInstagram: data.contactInstagram,
        contactTwitter: data.contactTwitter,
        contactFacebook: data.contactFacebook,
        contactMapUrl: data.contactMapUrl,
      }))
      .catch(() => setSettings(DEFAULT_SETTINGS));
  }, []);

  return (
    <div className="pt-20 bg-brand-dark min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">İletişime Geçin</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Rezervasyon, öneri veya şikayetleriniz için bize her zaman ulaşabilirsiniz.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-display font-bold text-brand-yellow mb-8">İletişim Bilgileri</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-red/20 p-3 rounded-lg text-brand-red">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Adres</h3>
                    <p className="text-gray-300">{settings.contactAddress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-brand-red/20 p-3 rounded-lg text-brand-red">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Telefon</h3>
                    <p className="text-gray-300">{settings.contactPhone}</p>
                    <p className="text-sm text-gray-500">{settings.contactPhoneHours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-brand-red/20 p-3 rounded-lg text-brand-red">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">E-Posta</h3>
                    <p className="text-gray-300">{settings.contactEmail}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 flex gap-4">
                 {settings.contactInstagram && (
                   <a href={settings.contactInstagram} target="_blank" rel="noopener noreferrer" className="flex-1 bg-white/10 hover:bg-brand-red py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                     <Instagram size={20} /> Instagram
                   </a>
                 )}
                 {settings.contactTwitter && (
                   <a href={settings.contactTwitter} target="_blank" rel="noopener noreferrer" className="flex-1 bg-white/10 hover:bg-brand-red py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                     <Twitter size={20} /> Twitter
                   </a>
                 )}
                 {settings.contactFacebook && (
                   <a href={settings.contactFacebook} target="_blank" rel="noopener noreferrer" className="flex-1 bg-white/10 hover:bg-brand-red py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                     <Facebook size={20} /> Facebook
                   </a>
                 )}
                 {!settings.contactInstagram && !settings.contactTwitter && !settings.contactFacebook && (
                   <p className="text-gray-500 text-sm w-full text-center">Sosyal medya hesaplari yakilnda eklenecek</p>
                 )}
              </div>
            </div>

            {/* Map Section */}
            <div className="rounded-2xl overflow-hidden h-64 border border-white/10 relative group">
                <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
                    alt="Map Location"
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    {settings.contactMapUrl ? (
                      <a
                        href={settings.contactMapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-brand-red px-6 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
                      >
                        <MapPin size={18} /> Haritada Goster
                      </a>
                    ) : (
                      <button className="bg-brand-red px-6 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                        <MapPin size={18} /> Haritada Goster
                      </button>
                    )}
                </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-2xl text-brand-dark shadow-2xl">
            <h2 className="text-3xl font-display font-bold mb-6">Bize Yazın</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Adınız Soyadınız</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all"
                    placeholder="Örn: Ahmet Yılmaz"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all"
                    placeholder="05XX XXX XX XX"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">E-Posta Adresiniz</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all"
                  placeholder="ornek@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Konu</label>
                <select 
                  id="subject"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all"
                >
                  <option>Rezervasyon</option>
                  <option>Öneri / İstek</option>
                  <option>Şikayet</option>
                  <option>Diğer</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Mesajınız</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all"
                  placeholder="Mesajınızı buraya yazınız..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-brand-red text-white font-bold py-4 rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-200 flex items-center justify-center gap-2 group"
              >
                Gönder <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;