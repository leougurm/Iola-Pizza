import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Menu from './components/Menu';
import Footer from './components/Footer';
import PopularPizzas from './components/PopularPizzas';
import Story from './components/Story';
import Testimonials from './components/Testimonials';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';

// Scroll to top wrapper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Features />
      <PopularPizzas />
      <Story />
      <Testimonials />
      {/* Call to Action Section */}
      <div className="bg-brand-red py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Canınız Pizza mı Çekti?</h2>
          <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
            Beklemenize gerek yok. Hemen menümüzü inceleyin, dilediğiniz lezzeti seçin ve anın tadını çıkarın.
          </p>
          <a 
             href="/#/menu" 
             className="inline-block bg-white text-brand-red px-12 py-5 rounded-full font-bold text-lg shadow-xl hover:bg-brand-yellow hover:text-brand-dark transition-all transform hover:scale-105"
          >
            Sipariş Ver
          </a>
        </div>
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/hakkimizda" element={<AboutPage />} />
            <Route path="/iletisim" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;