import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import bcrypt from 'bcryptjs';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@iolapizza.com' },
    update: {},
    create: {
      email: 'admin@iolapizza.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'ADMIN',
    },
  });

  console.log('Created admin user:', admin.email);

  // Clear existing foods
  await prisma.food.deleteMany({});

  // Turkish-style pizzas with images
  const pizzas = [
    {
      name: 'Klasik Margarita',
      description: 'Taze domates sosu, mozarella peyniri ve fesleğen ile hazırlanan klasik İtalyan pizzası',
      price: 149.99,
      category: 'PIZZA' as const,
      ingredients: ['Domates Sosu', 'Mozarella', 'Taze Fesleğen', 'Zeytinyağı'],
      images: [
        'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800',
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
      ],
      isAvailable: true,
    },
    {
      name: 'Sucuklu Pizza',
      description: 'Özel baharatlı Türk sucuğu ile hazırlanan geleneksel lezzet',
      price: 169.99,
      category: 'PIZZA' as const,
      ingredients: ['Domates Sosu', 'Mozarella', 'Sucuk', 'Yeşil Biber', 'Domates'],
      images: [
        'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800',
      ],
      isAvailable: true,
    },
    {
      name: 'Pastırmalı Pizza',
      description: 'Kayseri pastırması ve kaşar peyniri ile hazırlanan özel pizza',
      price: 189.99,
      category: 'PIZZA' as const,
      ingredients: ['Domates Sosu', 'Kaşar Peyniri', 'Pastırma', 'Domates', 'Biber'],
      images: [
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800',
      ],
      isAvailable: true,
    },
    {
      name: 'Lahmacun Style Pizza',
      description: 'Lahmacun tadında, kıymalı ve baharatlı özel pizza',
      price: 159.99,
      category: 'PIZZA' as const,
      ingredients: ['Kıyma', 'Domates', 'Soğan', 'Maydanoz', 'Biber Salçası', 'Sumak'],
      images: [
        'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800',
      ],
      isAvailable: true,
    },
    {
      name: 'Karışık Pizza',
      description: 'Sucuk, sosis, salam, mantar ve biberli karışık pizza',
      price: 179.99,
      category: 'PIZZA' as const,
      ingredients: ['Domates Sosu', 'Mozarella', 'Sucuk', 'Sosis', 'Salam', 'Mantar', 'Yeşil Biber'],
      images: [
        'https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=800',
        'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=800',
      ],
      isAvailable: true,
    },
    {
      name: 'Dönerli Pizza',
      description: 'Taze döner eti, soğan ve özel soslarla hazırlanan pizza',
      price: 199.99,
      category: 'PIZZA' as const,
      ingredients: ['Domates Sosu', 'Mozarella', 'Döner Eti', 'Soğan', 'Domates', 'Özel Sos'],
      images: [
        'https://images.unsplash.com/photo-1600628421055-4d30de868b8f?w=800',
      ],
      isAvailable: true,
    },
    {
      name: 'Pide Pizza',
      description: 'Kaşarlı ve kıymalı Türk pidesi tadında pizza',
      price: 169.99,
      category: 'PIZZA' as const,
      ingredients: ['Kaşar Peyniri', 'Kıyma', 'Domates', 'Biber', 'Tereyağı'],
      images: [
        'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=800',
      ],
      isAvailable: true,
    },
    {
      name: 'Kavurmalı Pizza',
      description: 'Geleneksel kavurma ve kaşar peyniri ile hazırlanan pizza',
      price: 209.99,
      category: 'PIZZA' as const,
      ingredients: ['Domates Sosu', 'Kaşar Peyniri', 'Kavurma', 'Yeşil Biber', 'Domates'],
      images: [
        'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=800',
      ],
      isAvailable: true,
    },
    {
      name: 'Ispanaklı Pizza',
      description: 'Taze ıspanak, lor peyniri ve sarımsaklı pizza',
      price: 159.99,
      category: 'PIZZA' as const,
      ingredients: ['Zeytinyağı', 'Mozarella', 'Ispanak', 'Lor Peyniri', 'Sarımsak'],
      images: [
        'https://images.unsplash.com/photo-1576458088443-04a19bb13da6?w=800',
      ],
      isAvailable: true,
    },
    {
      name: 'Mantarlı Pizza',
      description: 'Çeşitli mantarlar ve peynir karışımı ile hazırlanan pizza',
      price: 164.99,
      category: 'PIZZA' as const,
      ingredients: ['Krema Sos', 'Mozarella', 'Kültür Mantarı', 'İstiridye Mantarı', 'Sarımsak'],
      images: [
        'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=800',
      ],
      isAvailable: true,
    },
    {
      name: 'Ton Balıklı Pizza',
      description: 'Ton balığı, mısır ve soğan ile hazırlanan deniz lezzeti',
      price: 174.99,
      category: 'PIZZA' as const,
      ingredients: ['Domates Sosu', 'Mozarella', 'Ton Balığı', 'Mısır', 'Soğan', 'Zeytin'],
      images: [
        'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800',
      ],
      isAvailable: true,
    },
    {
      name: 'Tavuklu BBQ Pizza',
      description: 'Izgara tavuk parçaları ve BBQ sos ile hazırlanan pizza',
      price: 179.99,
      category: 'PIZZA' as const,
      ingredients: ['BBQ Sos', 'Mozarella', 'Tavuk Göğsü', 'Mısır', 'Kırmızı Soğan'],
      images: [
        'https://images.unsplash.com/photo-1558030006-450675393462?w=800',
        'https://images.unsplash.com/photo-1598023696416-0193a0bcd302?w=800',
      ],
      isAvailable: true,
    },
    {
      name: 'Köfteli Pizza',
      description: 'El yapımı köfte parçaları ve özel soslarla hazırlanan pizza',
      price: 184.99,
      category: 'PIZZA' as const,
      ingredients: ['Domates Sosu', 'Mozarella', 'Köfte', 'Soğan', 'Biber', 'Maydanoz'],
      images: [
        'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800',
      ],
      isAvailable: true,
    },
    {
      name: 'Zeytinli Akdeniz',
      description: 'Siyah ve yeşil zeytin, feta peyniri ile Akdeniz esintisi',
      price: 169.99,
      category: 'PIZZA' as const,
      ingredients: ['Domates Sosu', 'Mozarella', 'Feta Peyniri', 'Siyah Zeytin', 'Yeşil Zeytin', 'Kekik'],
      images: [
        'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800',
      ],
      isAvailable: true,
    },
    {
      name: 'Sebzeli Pizza',
      description: 'Taze mevsim sebzeleri ile hazırlanan sağlıklı pizza',
      price: 154.99,
      category: 'PIZZA' as const,
      ingredients: ['Domates Sosu', 'Mozarella', 'Mantar', 'Biber', 'Soğan', 'Domates', 'Mısır', 'Zeytin'],
      images: [
        'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=800',
        'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=800',
      ],
      isAvailable: true,
    },
    {
      name: 'Acılı Sucuklu',
      description: 'Acı biber ve bol sucuklu, ateşli pizza sevenler için',
      price: 174.99,
      category: 'PIZZA' as const,
      ingredients: ['Domates Sosu', 'Mozarella', 'Sucuk', 'Acı Biber', 'Jalapeno', 'Pul Biber'],
      images: [
        'https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?w=800',
      ],
      isAvailable: true,
    },
    {
      name: 'Kaşarlı Pide Pizza',
      description: 'Bol kaşar peynirli, tereyağlı özel pide pizza',
      price: 159.99,
      category: 'PIZZA' as const,
      ingredients: ['Kaşar Peyniri', 'Mozarella', 'Tereyağı', 'Maydanoz'],
      images: [
        'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=800',
      ],
      isAvailable: true,
    },
    {
      name: 'Kuzu Etli Pizza',
      description: 'Marine edilmiş kuzu eti parçaları ile özel pizza',
      price: 219.99,
      category: 'PIZZA' as const,
      ingredients: ['Domates Sosu', 'Mozarella', 'Kuzu Eti', 'Soğan', 'Biber', 'Kekik', 'Biberiye'],
      images: [
        'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800',
      ],
      isAvailable: true,
    },
    {
      name: 'Beyaz Peynirli Pizza',
      description: 'Ezine beyaz peyniri ve domates ile hafif lezzet',
      price: 164.99,
      category: 'PIZZA' as const,
      ingredients: ['Zeytinyağı', 'Beyaz Peynir', 'Domates', 'Fesleğen', 'Kekik'],
      images: [
        'https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=800',
      ],
      isAvailable: true,
    },
    {
      name: 'Sultan Pizza',
      description: 'Tüm etli malzemelerle hazırlanan en dolu pizza',
      price: 229.99,
      category: 'PIZZA' as const,
      ingredients: ['Domates Sosu', 'Mozarella', 'Sucuk', 'Pastırma', 'Kavurma', 'Döner', 'Sosis', 'Biber', 'Mantar'],
      images: [
        'https://images.unsplash.com/photo-1605478371310-a9f1e96b4ff4?w=800',
        'https://images.unsplash.com/photo-1542282811-943ef1a977c3?w=800',
        'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800',
      ],
      isAvailable: true,
    },
  ];

  // Non-alcoholic drinks
  const drinks = [
    {
      name: 'Ev Yapımı Limonata',
      description: 'Taze sıkılmış limon, nane ve hafif şekerle hazırlanan serinletici içecek',
      price: 45.99,
      category: 'DRINK' as const,
      ingredients: ['Taze Limon', 'Nane', 'Şeker', 'Su', 'Buz'],
      images: ['https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800'],
      isAvailable: true,
    },
    {
      name: 'Taze Portakal Suyu',
      description: 'Günlük taze sıkım portakal suyu',
      price: 49.99,
      category: 'DRINK' as const,
      ingredients: ['Taze Portakal'],
      images: ['https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=800'],
      isAvailable: true,
    },
    {
      name: 'Ayran',
      description: 'Geleneksel Türk yoğurt içeceği, bol köpüklü',
      price: 29.99,
      category: 'DRINK' as const,
      ingredients: ['Yoğurt', 'Su', 'Tuz'],
      images: ['https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=800'],
      isAvailable: true,
    },
    {
      name: 'Coca-Cola',
      description: 'Klasik Coca-Cola 330ml',
      price: 35.99,
      category: 'DRINK' as const,
      ingredients: ['Kola'],
      images: ['https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=800'],
      isAvailable: true,
    },
    {
      name: 'Fanta',
      description: 'Portakallı gazlı içecek 330ml',
      price: 35.99,
      category: 'DRINK' as const,
      ingredients: ['Portakal Aromalı Gazlı İçecek'],
      images: ['https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=800'],
      isAvailable: true,
    },
    {
      name: 'Sprite',
      description: 'Limon-lime aromalı gazlı içecek 330ml',
      price: 35.99,
      category: 'DRINK' as const,
      ingredients: ['Limon Aromalı Gazlı İçecek'],
      images: ['https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=800'],
      isAvailable: true,
    },
    {
      name: 'Ice Tea Şeftali',
      description: 'Soğuk şeftalili buzlu çay 330ml',
      price: 35.99,
      category: 'DRINK' as const,
      ingredients: ['Çay', 'Şeftali Aroması', 'Şeker'],
      images: ['https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800'],
      isAvailable: true,
    },
    {
      name: 'Ice Tea Limon',
      description: 'Soğuk limonlu buzlu çay 330ml',
      price: 35.99,
      category: 'DRINK' as const,
      ingredients: ['Çay', 'Limon Aroması', 'Şeker'],
      images: ['https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=800'],
      isAvailable: true,
    },
    {
      name: 'Türk Kahvesi',
      description: 'Geleneksel Türk kahvesi, lokum ile servis edilir',
      price: 39.99,
      category: 'DRINK' as const,
      ingredients: ['Türk Kahvesi', 'Su', 'Lokum'],
      images: ['https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800'],
      isAvailable: true,
    },
    {
      name: 'Filtre Kahve',
      description: 'Taze demlenmiş filtre kahve',
      price: 44.99,
      category: 'DRINK' as const,
      ingredients: ['Filtre Kahve'],
      images: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800'],
      isAvailable: true,
    },
    {
      name: 'Soda',
      description: 'Sade veya meyveli soda 200ml',
      price: 19.99,
      category: 'DRINK' as const,
      ingredients: ['Maden Suyu'],
      images: ['https://images.unsplash.com/photo-1603394630850-69b1c7e4b817?w=800'],
      isAvailable: true,
    },
    {
      name: 'Su',
      description: 'Doğal kaynak suyu 500ml',
      price: 14.99,
      category: 'DRINK' as const,
      ingredients: ['Su'],
      images: ['https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800'],
      isAvailable: true,
    },
  ];

  // Desserts
  const desserts = [
    {
      name: 'Tiramisu',
      description: 'İtalyan usulü mascarpone kremalı, kahveli tatlı',
      price: 79.99,
      category: 'DESSERT' as const,
      ingredients: ['Mascarpone', 'Kahve', 'Kakaolu Bisküvi', 'Kakao'],
      images: ['https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800'],
      isAvailable: true,
    },
    {
      name: 'Çikolatalı Sufle',
      description: 'Sıcak servis edilen akışkan çikolatalı kek, dondurma ile',
      price: 89.99,
      category: 'DESSERT' as const,
      ingredients: ['Bitter Çikolata', 'Tereyağı', 'Yumurta', 'Un', 'Vanilya Dondurma'],
      images: ['https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800'],
      isAvailable: true,
    },
    {
      name: 'Cheesecake',
      description: 'New York usulü kremalı cheesecake, çilek sosu ile',
      price: 74.99,
      category: 'DESSERT' as const,
      ingredients: ['Krem Peynir', 'Bisküvi Taban', 'Çilek Sosu'],
      images: ['https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800'],
      isAvailable: true,
    },
    {
      name: 'Profiterol',
      description: 'Çikolata soslu, kremalı profiterol',
      price: 69.99,
      category: 'DESSERT' as const,
      ingredients: ['Krema', 'Çikolata Sosu', 'Choux Hamuru'],
      images: ['https://images.unsplash.com/photo-1612809075925-230035502a5e?w=800'],
      isAvailable: true,
    },
    {
      name: 'Künefe',
      description: 'Geleneksel Antep usulü sıcak künefe, kaymak ile',
      price: 99.99,
      category: 'DESSERT' as const,
      ingredients: ['Kadayıf', 'Peynir', 'Şerbet', 'Antep Fıstığı', 'Kaymak'],
      images: ['https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=800'],
      isAvailable: true,
    },
    {
      name: 'Sütlaç',
      description: 'Fırında pişirilmiş geleneksel sütlaç',
      price: 54.99,
      category: 'DESSERT' as const,
      ingredients: ['Süt', 'Pirinç', 'Şeker', 'Tarçın'],
      images: ['https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800'],
      isAvailable: true,
    },
    {
      name: 'Baklava',
      description: '4 dilim Antep fıstıklı ev yapımı baklava',
      price: 109.99,
      category: 'DESSERT' as const,
      ingredients: ['Yufka', 'Antep Fıstığı', 'Tereyağı', 'Şerbet'],
      images: ['https://images.unsplash.com/photo-1598110750624-207050c4f28c?w=800'],
      isAvailable: true,
    },
    {
      name: 'Dondurma (3 Top)',
      description: 'Çeşitli aromalarda 3 top dondurma',
      price: 59.99,
      category: 'DESSERT' as const,
      ingredients: ['Süt', 'Şeker', 'Çeşitli Aromalar'],
      images: ['https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800'],
      isAvailable: true,
    },
  ];

  // Side dishes
  const sides = [
    {
      name: 'Patates Kızartması',
      description: 'Çıtır patates kızartması, özel baharatlarla',
      price: 49.99,
      category: 'SIDE' as const,
      ingredients: ['Patates', 'Tuz', 'Özel Baharat'],
      images: ['https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800'],
      isAvailable: true,
    },
    {
      name: 'Soğan Halkaları',
      description: 'Çıtır kaplamalı soğan halkaları, ranch sos ile',
      price: 54.99,
      category: 'SIDE' as const,
      ingredients: ['Soğan', 'Kaplama', 'Ranch Sos'],
      images: ['https://images.unsplash.com/photo-1639024471283-03518883512d?w=800'],
      isAvailable: true,
    },
    {
      name: 'Sarımsaklı Ekmek',
      description: 'Tereyağlı ve sarımsaklı fırın ekmek dilimleri',
      price: 44.99,
      category: 'SIDE' as const,
      ingredients: ['Ekmek', 'Tereyağı', 'Sarımsak', 'Maydanoz'],
      images: ['https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=800'],
      isAvailable: true,
    },
    {
      name: 'Mozzarella Sticks',
      description: 'Çıtır kaplamalı mozzarella çubukları, marinara sos ile',
      price: 64.99,
      category: 'SIDE' as const,
      ingredients: ['Mozarella', 'Kaplama', 'Marinara Sos'],
      images: ['https://images.unsplash.com/photo-1548340748-6d2b7d7da280?w=800'],
      isAvailable: true,
    },
    {
      name: 'Tavuk Kanatları',
      description: 'Buffalo soslu veya BBQ soslu tavuk kanatları (8 adet)',
      price: 89.99,
      category: 'SIDE' as const,
      ingredients: ['Tavuk Kanatları', 'Buffalo Sos', 'BBQ Sos'],
      images: ['https://images.unsplash.com/photo-1608039755401-742074f0548d?w=800'],
      isAvailable: true,
    },
    {
      name: 'Caesar Salata',
      description: 'Marul, parmesan, kruton ve caesar sos',
      price: 69.99,
      category: 'SIDE' as const,
      ingredients: ['Marul', 'Parmesan', 'Kruton', 'Caesar Sos'],
      images: ['https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800'],
      isAvailable: true,
    },
    {
      name: 'Akdeniz Salata',
      description: 'Domates, salatalık, zeytin, beyaz peynir, zeytinyağı',
      price: 59.99,
      category: 'SIDE' as const,
      ingredients: ['Domates', 'Salatalık', 'Zeytin', 'Beyaz Peynir', 'Zeytinyağı'],
      images: ['https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800'],
      isAvailable: true,
    },
    {
      name: 'Humus',
      description: 'Nohut püresi, zeytinyağı ve pide eşliğinde',
      price: 49.99,
      category: 'SIDE' as const,
      ingredients: ['Nohut', 'Tahin', 'Zeytinyağı', 'Limon', 'Sarımsak'],
      images: ['https://images.unsplash.com/photo-1577805947697-89e18249d767?w=800'],
      isAvailable: true,
    },
  ];

  // Create all items
  const allItems = [...pizzas, ...drinks, ...desserts, ...sides];

  for (const item of allItems) {
    await prisma.food.create({
      data: item,
    });
  }

  console.log(`Created ${pizzas.length} pizzas`);
  console.log(`Created ${drinks.length} drinks`);
  console.log(`Created ${desserts.length} desserts`);
  console.log(`Created ${sides.length} side dishes`);
  console.log(`Total: ${allItems.length} items`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
