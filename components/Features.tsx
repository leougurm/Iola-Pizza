import React from 'react';
import { Award, Clock, Truck, ChefHat } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <ChefHat className="w-7 h-7" />,
      title: "Usta Ellerde",
      desc: "İtalya'da eğitim almış şeflerimiz tarafından hazırlanan özel hamur.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: "Hızlı Teslimat",
      desc: "Siparişiniz fırından çıktığı sıcaklıkta kapınızda.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: "Kaliteli Malzeme",
      desc: "Sadece en taze, yerel ve doğal malzemeler kullanıyoruz.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Truck className="w-7 h-7" />,
      title: "Ücretsiz Gönderim",
      desc: "Belirli bir tutar üzerindeki siparişlerde teslimat ücretsiz.",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-red/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-orange/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-brand-red text-sm font-bold tracking-widest uppercase">Neden Biz?</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-4">
            Farkımızı Hissedin
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Hover glow effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

              <div className="relative z-10">
                {/* Icon container */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-[1px] mb-6`}>
                  <div className="w-full h-full rounded-xl bg-brand-dark flex items-center justify-center text-white">
                    {feature.icon}
                  </div>
                </div>

                <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:text-brand-yellow transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>

              {/* Corner accent */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
