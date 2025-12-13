import React from 'react';
import { Award, Clock, Truck, ChefHat } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <ChefHat className="w-8 h-8 text-brand-red" />,
      title: "Usta Ellerde",
      desc: "İtalya'da eğitim almış şeflerimiz tarafından hazırlanan özel hamur."
    },
    {
      icon: <Clock className="w-8 h-8 text-brand-red" />,
      title: "Hızlı Teslimat",
      desc: "Siparişiniz fırından çıktığı sıcaklıkta kapınızda."
    },
    {
      icon: <Award className="w-8 h-8 text-brand-red" />,
      title: "Kaliteli Malzeme",
      desc: "Sadece en taze, yerel ve doğal malzemeler kullanıyoruz."
    },
    {
      icon: <Truck className="w-8 h-8 text-brand-red" />,
      title: "Ücretsiz Gönderim",
      desc: "Belirli bir tutar üzerindeki siparişlerde teslimat ücretsiz."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-brand-cream hover:bg-red-50 transition-colors text-center group cursor-default">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="font-display font-bold text-xl text-brand-dark mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;