
export type Category = 'pizza' | 'side' | 'drink' | 'deal' | 'pasta' | 'salad' | 'dessert' | 'gift-card';

export interface SizeOption {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  category: Category;
  tags?: string[];
  calories?: number;
  allergens?: string[];
  sizes?: SizeOption[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: SizeOption;
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  image: string;
  hours: string;
  features: string[];
  coordinates: { lat: number; lng: number };
  distance?: string; // Mock distance for UI
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  text: string;
}

export type OrderMethod = 'delivery' | 'pickup';

export interface DeliveryAddress {
  id?: string;
  type?: string;
  street: string;
  city: string;
  zip: string;
  instructions?: string;
}

export interface OrderInfo {
  method: OrderMethod;
  address?: DeliveryAddress;
  storeId?: string;
  contact: {
    name: string;
    phone: string;
    email: string;
  };
}

export interface JobPosition {
  id: string;
  title: string;
  type: 'Full-time' | 'Part-time';
  location: string;
  salary: string;
  description: string;
  requirements: string[];
}

export interface EmployeeTestimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: 'Recipes' | 'Behind the Scenes' | 'Promotions' | 'Community';
  image: string;
  author: string;
  tags: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  isLoggedIn: boolean;
  addresses: DeliveryAddress[];
  photoURL?: string;
  role?: string;
  createdAt?: string;
}

export type Page = 'home' | 'menu' | 'order-setup' | 'checkout' | 'tracking' | 'locations' | 'about' | 'careers' | 'gift-cards' | 'blog' | 'blog-post' | 'contact' | 'dashboard' | 'login' | 'signup' | 'forgot-password' | 'reset-password' | 'catering' | 'verify-email';
