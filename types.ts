export enum Category {
  KLASIK = 'Klasik Lezzetler',
  GOURMET = 'Gurme Seçimler',
  VEGAN = 'Vejetaryen & Vegan',
  YAN = 'Yan Lezzetler',
  ICECEK = 'İçecekler'
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  spicy?: boolean;
  vegetarian?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}