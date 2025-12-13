import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Selin Yılmaz",
      role: "Gurme",
      text: "İzmir'de yediğim tartışmasız en iyi pizza. Erhan Usta'nın hamura kattığı sevgi her lokmada hissediliyor. Mutfakta bir dahi var!",
      image: "https://randomuser.me/api/portraits/women/28.jpg"
    },
    {
      name: "Mert Demir",
      role: "Müdavim",
      text: "Göztepe'ye böyle bir lezzet kattığı için Erhan Usta'ya teşekkürler. İtalya'da yediğim pizzaları aratmıyor, şefin eline sağlık.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Ayşe Kaya",
      role: "Lezzet Tutkunu",
      text: "Erhan Şef'in spesiyalleri inanılmaz. Malzemelerin uyumu, pişirme derecesi... Her şey mükemmel. İzmir'in yeni favori mekanı.",
      image: "https://randomuser.me/api/portraits/women/65.jpg"
    }
  ];

  return (
    <section className="py-20 bg-brand-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-brand-yellow font-bold tracking-widest uppercase mb-2">Müşteri Yorumları</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-white">
            Erhan Usta İçin Ne Dediler?
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <Quote className="text-brand-red mb-6" size={40} />
              <p className="text-gray-300 text-lg mb-8 italic">"{review.text}"</p>
              
              <div className="flex items-center gap-4">
                <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full border-2 border-brand-yellow" />
                <div>
                  <h4 className="font-bold text-white">{review.name}</h4>
                  <span className="text-brand-yellow text-sm">{review.role}</span>
                </div>
                <div className="ml-auto flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-brand-yellow text-brand-yellow" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;