import { Product, StoreLocation, JobPosition, EmployeeTestimonial, BlogPost, User } from './types';
import { 
  Heart, Clock, DollarSign, TrendingUp, 
  Users, Award, Shield, Wallet, Zap,
  Briefcase, MapPin, Phone, Truck, Coffee, Utensils
} from 'lucide-react';

export const PIZZAS: Product[] = [
  {
    id: 'p1',
    name: 'Margherita Classico',
    description: 'Fresh basil, mozzarella di bufala, tomato sauce.',
    price: 12.99,
    rating: 4.8,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80',
    tags: ['vegetarian', 'nut-free'],
    calories: 260,
    allergens: ['Gluten', 'Dairy'],
    sizes: [
      { label: 'S', price: 12.99 },
      { label: 'M', price: 15.99 },
      { label: 'L', price: 19.99 }
    ]
  },
  {
    id: 'p2',
    name: 'Pepperoni Feast',
    description: 'Double pepperoni, extra mozzarella, signature sauce.',
    price: 15.99,
    rating: 4.9,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=80',
    tags: ['nut-free'],
    calories: 320,
    allergens: ['Gluten', 'Dairy', 'Pork'],
    sizes: [
        { label: 'S', price: 15.99 },
        { label: 'M', price: 18.99 },
        { label: 'L', price: 22.99 }
      ]
  },
  {
    id: 'p3',
    name: 'Truffle Mushroom',
    description: 'Wild mushrooms, truffle oil, parmesan, thyme.',
    price: 18.99,
    rating: 4.7,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80',
    tags: ['vegetarian', 'nut-free'],
    calories: 280,
    allergens: ['Gluten', 'Dairy'],
    sizes: [
        { label: 'S', price: 18.99 },
        { label: 'M', price: 22.99 },
        { label: 'L', price: 26.99 }
      ]
  },
  {
    id: 'p4',
    name: 'BBQ Chicken Supreme',
    description: 'Grilled chicken, red onions, BBQ swirl, cilantro.',
    price: 16.99,
    oldPrice: 19.99,
    rating: 4.6,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80',
    tags: ['nut-free'],
    calories: 310,
    allergens: ['Gluten', 'Dairy'],
    sizes: [
        { label: 'S', price: 16.99 },
        { label: 'M', price: 19.99 },
        { label: 'L', price: 23.99 }
      ]
  },
  {
    id: 'p5',
    name: 'Spicy Hawaiian',
    description: 'Roasted pineapple, jalapeños, ham, spicy drizzle.',
    price: 14.99,
    rating: 4.5,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=500&q=80',
    tags: ['spicy', 'nut-free'],
    calories: 290,
    allergens: ['Gluten', 'Dairy', 'Pork'],
    sizes: [
        { label: 'S', price: 14.99 },
        { label: 'M', price: 17.99 },
        { label: 'L', price: 21.99 }
      ]
  },
  {
    id: 'p6',
    name: 'Veggie Garden',
    description: 'Bell peppers, olives, onions, tomatoes, spinach.',
    price: 13.99,
    rating: 4.8,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80',
    tags: ['vegan', 'vegetarian', 'nut-free', 'dairy-free'],
    calories: 240,
    allergens: ['Gluten'],
    sizes: [
        { label: 'S', price: 13.99 },
        { label: 'M', price: 16.99 },
        { label: 'L', price: 20.99 }
      ]
  },
  {
    id: 'p7',
    name: 'Meat Lovers',
    description: 'Sausage, bacon, ham, pepperoni, beef.',
    price: 19.99,
    rating: 4.9,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=500&q=80',
    tags: ['nut-free'],
    calories: 380,
    allergens: ['Gluten', 'Dairy', 'Pork', 'Beef'],
    sizes: [
        { label: 'S', price: 19.99 },
        { label: 'M', price: 23.99 },
        { label: 'L', price: 28.99 }
      ]
  },
  {
    id: 'p8',
    name: 'Quattro Formaggi',
    description: 'Mozzarella, gorgonzola, parmesan, provolone.',
    price: 15.99,
    rating: 4.7,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1573821663912-6df460f9c684?auto=format&fit=crop&w=500&q=80',
    tags: ['vegetarian', 'nut-free'],
    calories: 330,
    allergens: ['Gluten', 'Dairy'],
    sizes: [
        { label: 'S', price: 15.99 },
        { label: 'M', price: 18.99 },
        { label: 'L', price: 22.99 }
      ]
  }
];

export const SIDES: Product[] = [
  {
    id: 's1',
    name: 'Golden Onion Rings',
    description: 'Crispy battered onion rings with ranch dip.',
    price: 5.99,
    rating: 4.5,
    category: 'side',
    image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=500&q=80',
    tags: ['vegetarian', 'nut-free'],
    calories: 320,
    allergens: ['Gluten', 'Dairy', 'Egg']
  },
  {
    id: 's2',
    name: 'Truffle Fries',
    description: 'Hand-cut fries, parmesan, truffle oil.',
    price: 6.99,
    rating: 4.8,
    category: 'side',
    image: 'https://www.runningtothekitchen.com/wp-content/uploads/2025/07/parmesan-truffle-fries-8.jpg',
    tags: ['vegetarian', 'gluten-free', 'nut-free'],
    calories: 350,
    allergens: ['Dairy']
  },
  {
    id: 's3',
    name: 'Buffalo Wings (6pcs)',
    description: 'Spicy buffalo sauce, celery, blue cheese.',
    price: 8.99,
    rating: 4.7,
    category: 'side',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=500&q=80',
    tags: ['spicy', 'gluten-free', 'nut-free'],
    calories: 420,
    allergens: ['Dairy']
  },
  {
    id: 's4',
    name: 'Garlic Knots',
    description: 'Oven-baked dough knots with garlic butter.',
    price: 4.99,
    rating: 4.6,
    category: 'side',
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=500&q=80',
    tags: ['vegetarian', 'nut-free'],
    calories: 220,
    allergens: ['Gluten', 'Dairy']
  }
];

export const PASTA: Product[] = [
  {
    id: 'pa1',
    name: 'Fettuccine Alfredo',
    description: 'Creamy parmesan sauce over hand-made fettuccine.',
    price: 14.99,
    rating: 4.8,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=500&q=80',
    tags: ['vegetarian', 'nut-free'],
    calories: 650,
    allergens: ['Gluten', 'Dairy', 'Egg']
  }
];

export const SALADS: Product[] = [
  {
    id: 'sa1',
    name: 'Classic Caesar',
    description: 'Romaine lettuce, parmesan, croutons, signature Caesar dressing.',
    price: 9.99,
    rating: 4.7,
    category: 'salad',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=500&q=80',
    tags: ['vegetarian', 'nut-free'],
    calories: 280,
    allergens: ['Dairy', 'Gluten', 'Fish']
  }
];

export const DESSERTS: Product[] = [
  {
    id: 'd1',
    name: 'Tiramisu',
    description: 'Coffee-soaked ladyfingers with mascarpone cream.',
    price: 7.99,
    rating: 4.9,
    category: 'dessert',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=500&q=80',
    tags: ['vegetarian', 'nut-free'],
    calories: 450,
    allergens: ['Dairy', 'Gluten', 'Egg']
  }
];

export const DRINKS: Product[] = [
  {
    id: 'dr1',
    name: 'San Pellegrino',
    description: 'Italian sparkling mineral water.',
    price: 3.50,
    rating: 4.8,
    category: 'drink',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80',
    tags: ['vegan', 'vegetarian', 'gluten-free', 'nut-free'],
    calories: 0
  }
];

export const FULL_MENU: Product[] = [...PIZZAS, ...SIDES, ...PASTA, ...SALADS, ...DESSERTS, ...DRINKS];

export const LOCATIONS: StoreLocation[] = [
  {
    id: 'loc1',
    name: 'Presto Downtown Main',
    address: '123 Broadway, New York, NY 10001',
    phone: '(212) 555-0123',
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=500&q=80',
    hours: '10:00 AM - 11:00 PM',
    features: ['Dine-In', 'Takeout', 'Delivery', 'WiFi'],
    coordinates: { lat: 40.7128, lng: -74.0060 },
    distance: '0.5 mi'
  },
  {
    id: 'loc2',
    name: 'Presto Brooklyn Heights',
    address: '456 Court St, Brooklyn, NY 11201',
    phone: '(718) 555-0456',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=500&q=80',
    hours: '11:00 AM - 10:00 PM',
    features: ['Dine-In', 'Takeout', 'Delivery', 'Outdoor Seating'],
    coordinates: { lat: 40.6925, lng: -73.9903 },
    distance: '2.3 mi'
  }
];

export const JOBS: JobPosition[] = [
  {
    id: 'j1',
    title: 'Head Pizza Chef',
    type: 'Full-time',
    location: 'Downtown Main',
    salary: '$55k - $70k',
    description: 'We are looking for an experienced Pizza Chef to lead our kitchen operations.',
    requirements: ['5+ years experience', 'Food safety certified', 'Strong leadership skills']
  },
  {
    id: 'j2',
    title: 'Delivery Driver',
    type: 'Part-time',
    location: 'Brooklyn Heights',
    salary: '$15/hr + Tips',
    description: 'Deliver hot, fresh pizza to our neighbors.',
    requirements: ['Valid driver license', 'Clean driving record', 'Punctual and friendly']
  }
];

export const BENEFITS = [
  { icon: Heart, title: 'Health Insurance', desc: 'Comprehensive medical, dental, and vision plans.' },
  { icon: Utensils, title: 'Free Meals', desc: 'Enjoy the best pizza in town on every shift.' },
  { icon: Wallet, title: 'Weekly Pay', desc: 'Get your hard-earned money faster with weekly direct deposits.' },
  { icon: Zap, title: 'Career Growth', desc: 'We promote from within. Start here, lead here.' }
];

export const EMPLOYEE_TESTIMONIALS: EmployeeTestimonial[] = [
  {
    id: 't1',
    name: 'Marco Rossi',
    role: 'Store Manager',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80',
    quote: 'I started as a driver 5 years ago. Today I manage our flagship store.'
  }
];

export const GIFT_CARD_THEMES = [
  { id: 'classic', name: 'Classic Presto', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80' },
  { id: 'birthday', name: 'Happy Birthday', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=500&q=80' }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Secrets to the Perfect Thin Crust',
    excerpt: 'Our head chef Elena reveals the techniques behind our world-famous crust.',
    content: '<p>The secret lies in the fermentation process. We let our dough rest for 48 hours...</p>',
    date: 'Oct 12, 2024',
    readTime: '5 min read',
    category: 'Recipes',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    author: 'Elena Marco',
    tags: ['Pizza', 'CookingTips']
  }
];

export const FRANCHISE_STATS = [
  { value: '50+', label: 'Stores' },
  { value: '25%', label: 'Avg ROI' },
  { value: '1M+', label: 'Happy Customers' },
  { value: '1998', label: 'Founded' }
];

export const FRANCHISE_STEPS = [
  { title: 'Inquiry', desc: 'Fill out our inquiry form to express interest.' },
  { title: 'Discovery', desc: 'Meet our team and learn about the Presto model.' },
  { title: 'Planning', desc: 'Site selection and market analysis.' },
  { title: 'Setup', desc: 'Store construction and staff training.' },
  { title: 'Launch', desc: 'Grand opening of your Presto Pizza!' }
];

export const MOCK_USER: User & { recentOrders: any[] } = {
  id: 'u1',
  name: 'John Rossi',
  email: 'john@example.com',
  isLoggedIn: true,
  addresses: [
    { id: 'a1', type: 'Home', street: '123 Pizza St', city: 'New York', zip: '10001' }
  ],
  photoURL: 'https://img.freepik.com/premium-photo/business-woman-black-suit-white-background_564692-15944.jpg',
  recentOrders: [
    { id: '8291', items: ['Margherita Classico', 'Truffle Fries'], total: 24.99, date: 'Oct 20, 2024', status: 'Delivered' }
  ]
};