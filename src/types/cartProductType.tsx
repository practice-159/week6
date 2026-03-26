export interface Root {
  carts: Cart[];
  total: number;
  final_total: number;
}

export interface Cart {
  coupon: Coupon;
  final_total: number;
  id: string;
  product: Product;
  product_id: string;
  qty: number;
  total: number;
}

export interface Coupon {
  code: string;
  due_date: number;
  id: string;
  is_enabled: number;
  percent: number;
  title: string;
}

export interface Product {
  category: string;
  content: string;
  description: string;
  id: string;
  imageUrl: string;
  imagesUrl: string[];
  is_enabled: number;
  num: number;
  origin_price: number;
  price: number;
  title: string;
  unit: string;
}
