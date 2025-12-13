export interface Pizza {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface Order {
  id: number;
  customerName: string;
  pizzas: { pizza: Pizza; quantity: number }[];
  total: number;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
}

export const dummyPizzas: Pizza[] = [
  {
    id: 1,
    name: 'Margherita',
    description: 'Classic tomato, mozzarella, and basil.',
    price: 12.99,
  },
  {
    id: 2,
    name: 'Pepperoni',
    description: 'Spicy pepperoni with mozzarella and tomato sauce.',
    price: 14.99,
  },
  {
    id: 3,
    name: 'Vegetarian',
    description: 'A mix of fresh vegetables on a cheesy base.',
    price: 13.99,
  },
];

export const dummyOrders: Order[] = [
  {
    id: 101,
    customerName: 'John Doe',
    pizzas: [
      { pizza: dummyPizzas[0], quantity: 1 },
      { pizza: dummyPizzas[1], quantity: 1 },
    ],
    total: 27.98,
    status: 'Completed',
  },
  {
    id: 102,
    customerName: 'Jane Smith',
    pizzas: [
      { pizza: dummyPizzas[2], quantity: 2 },
    ],
    total: 27.98,
    status: 'In Progress',
  },
];
