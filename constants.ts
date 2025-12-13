import { Category, MenuItem } from './types';

// Using specific Unsplash IDs for high-quality food images
export const MENU_ITEMS: MenuItem[] = [
  // Klasik
  {
    id: '1',
    name: 'Margarita',
    description: 'Özel domates sosu, bol mozzarella peyniri ve taze fesleğen.',
    price: 220,
    category: Category.KLASIK,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    vegetarian: true
  },
  {
    id: '2',
    name: 'Karışık Pizza',
    description: 'Sucuk, salam, sosis, mantar, mısır, zeytin ve renkli biberler.',
    price: 280,
    category: Category.KLASIK,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    name: 'Sucuksever',
    description: 'Baharatlı kasap sucuğu, mozzarella peyniri ve kekik.',
    price: 260,
    category: Category.KLASIK,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80'
  },
  
  // Gurme
  {
    id: '4',
    name: 'Anadolu Ateşi',
    description: 'Pastırma, kavurma, acı biber turşusu, yerel peynirler.',
    price: 340,
    category: Category.GOURMET,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    spicy: true
  },
  {
    id: '5',
    name: 'Füme Kaburga',
    description: 'İsli dana kaburga, karamelize soğan, barbekü sos tabanı.',
    price: 360,
    category: Category.GOURMET,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '6',
    name: 'Dört Peynirli',
    description: 'Mozzarella, Rokfor, Parmesan ve Çedar peynirinin muhteşem uyumu.',
    price: 300,
    category: Category.GOURMET,
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=800&q=80',
    vegetarian: true
  },

  // Vegan/Vejetaryen
  {
    id: '7',
    name: 'Sebze Bahçesi',
    description: 'Kabak, patlıcan, mantar, enginar, domates sosu.',
    price: 240,
    category: Category.VEGAN,
    image: 'https://images.unsplash.com/photo-1593560708920-63984dc77432?auto=format&fit=crop&w=800&q=80',
    vegetarian: true
  },

  // Yan Lezzetler
  {
    id: '8',
    name: 'Sarımsaklı Ekmek',
    description: 'Tereyağlı ve sarımsak soslu kızarmış ekmek dilimleri (4 adet).',
    price: 90,
    category: Category.YAN,
    image: 'https://images.unsplash.com/photo-1573140247632-f84660f67627?auto=format&fit=crop&w=800&q=80',
    vegetarian: true
  },
  {
    id: '9',
    name: 'Çıtır Tavuk Parçaları',
    description: 'Özel panelenmiş tavuk göğüs parçaları, dip sos ile.',
    price: 140,
    category: Category.YAN,
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=80'
  },

  // İçecekler
  {
    id: '10',
    name: 'Ev Yapımı Limonata',
    description: 'Naneli ferahlatıcı ev yapımı limonata.',
    price: 60,
    category: Category.ICECEK,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    vegetarian: true
  },
  {
    id: '11',
    name: 'Ayran',
    description: 'Bol köpüklü yayık ayranı.',
    price: 40,
    category: Category.ICECEK,
    image: 'https://images.unsplash.com/photo-1625244515286-dd6b7a2ae4a3?auto=format&fit=crop&w=800&q=80',
    vegetarian: true
  },
  {
    id: '12',
    name: 'Kola',
    description: '330ml kutu.',
    price: 50,
    category: Category.ICECEK,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    vegetarian: true
  }
];