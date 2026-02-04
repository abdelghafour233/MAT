export type Category = 'ALL' | 'WATCHES' | 'GLASSES' | 'CAR_ACCESSORIES' | 'MISC';

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: Category;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderForm {
  fullName: string;
  city: string;
  phoneNumber: string;
}

export interface Order extends OrderForm {
  items: CartItem[];
  total: number;
  date: string;
}