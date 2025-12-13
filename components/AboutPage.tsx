import React from 'react';
import { ChefHat, Award, Heart, Leaf } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-20 bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=1920&q=80" 
            alt="İolo Pizza Mutfak" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">Bizim Hikayemiz</h1>
          <p className="text-xl max-w-2xl mx-auto font-light">Napoli sokaklarından İzmir Göztepe'ye uzanan bir lezzet yolculuğu.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Erhan Usta Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red/10 text-brand-red rounded-full">
              <ChefHat size={20} />
              <span className="font-bold uppercase text-sm tracking-wide">Şefimiz Hakkında</span>
            </div>
            <h2 className="text-4xl font-display font-bold text-brand-dark">Erhan Usta Kimdir?</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              İzmir doğumlu Erhan Usta, gastronomi tutkusunun peşinden giderek 2005 yılında İtalya'nın Napoli kentine yerleşti. Burada gerçek pizzanın sırlarını, hamurun kimyasını ve odun ateşinin inceliklerini yerel ustalardan öğrendi.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              5 yıllık İtalya serüveninin ardından, "En iyi pizza, ait olduğu toprağın malzemesiyle harmanlanandır" diyerek memleketi İzmir'e döndü. 2010 yılında Göztepe'de açtığı İolo Pizza ile İtalyan tekniğini Türk damak tadıyla buluşturdu.
            </p>
            <div className="flex gap-8 pt-4">
              <div>
                <span className="block text-4xl font-bold text-brand-red font-display">15+</span>
                <span className="text-sm text-gray-500">Yıllık Tecrübe</span>
              </div>
              <div>
                <span className="block text-4xl font-bold text-brand-red font-display">50+</span>
                <span className="text-sm text-gray-500">Özel Tarif</span>
              </div>
              <div>
                <span className="block text-4xl font-bold text-brand-red font-display">1000+</span>
                <span className="text-sm text-gray-500">Mutlu Müşteri/Gün</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl shadow-2xl w-full h-[600px] bg-white flex items-center justify-center border border-gray-100 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200"></div>
               <ChefHat 
                 size={320} 
                 className="text-black drop-shadow-[0_25px_25px_rgba(0,0,0,0.35)] relative z-10" 
                 fill="currentColor" 
                 strokeWidth={1} 
               />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-brand-cream p-8 rounded-xl shadow-lg hidden md:block max-w-xs z-20">
              <p className="font-display font-bold text-xl text-brand-dark mb-2">"Pizza sadece bir yemek değil, paylaşılan bir mutluluktur."</p>
              <p className="text-brand-red font-medium">- Erhan Usta</p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-brand-cream rounded-3xl p-12 md:p-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-4">Değerlerimiz</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bizi biz yapan, mutfağımızdan eksik etmediğimiz prensiplerimizdir.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-md text-brand-red">
                <Leaf size={32} />
              </div>
              <h3 className="font-bold text-xl text-brand-dark">Doğallık</h3>
              <p className="text-gray-600">
                Konserve ürün kullanmıyoruz. Soslarımız mevsiminde toplanan Çanakkale domatesleriyle hazırlanır.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-md text-brand-red">
                <Award size={32} />
              </div>
              <h3 className="font-bold text-xl text-brand-dark">Kalite</h3>
              <p className="text-gray-600">
                Peynirlerimiz yerel mandıralardan günlük gelir. Unumuz taş değirmende öğütülmüş özel bir karışımdır.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-md text-brand-red">
                <Heart size={32} />
              </div>
              <h3 className="font-bold text-xl text-brand-dark">Samimiyet</h3>
              <p className="text-gray-600">
                Göztepe esnaf kültürünü yaşatıyoruz. Her misafirimiz bizim için ailemizin bir parçasıdır.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;