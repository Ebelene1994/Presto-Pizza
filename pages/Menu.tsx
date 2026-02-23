
import React, { useState, useEffect, useMemo } from 'react';
import { 
    Utensils, Filter, Search, ChevronDown, Check,
    ChefHat, Flame, Leaf, Wind, IceCream, Coffee, Star
} from 'lucide-react';
import { FULL_MENU } from '../data';
import { Product, SizeOption, Category } from '../types';
import { PizzaCard } from '../components/PizzaCard';

interface MenuProps {
  onAddToCart: (product: Product, size?: SizeOption) => void;
  onNavigate: (page: string) => void;
  initialCategory?: Category | 'all';
}

const CATEGORIES: { id: Category | 'all', label: string, icon: any, desc: string, image: string }[] = [
    { 
        id: 'all', 
        label: 'All Items', 
        icon: Utensils, 
        desc: 'Experience the full range of Presto flavor.',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=2000&q=80'
    },
    { 
        id: 'pizza', 
        label: 'Artisan Pizzas', 
        icon: Flame, 
        desc: 'Hand-stretched dough, stone-oven baked at 900°F.',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=2000&q=80'
    },
    { 
        id: 'pasta', 
        label: 'Homemade Pasta', 
        icon: ChefHat, 
        desc: 'Traditional recipes with locally sourced semolina.',
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=2000&q=80'
    },
    { 
        id: 'salad', 
        label: 'Fresh Salads', 
        icon: Leaf, 
        desc: 'Crisp greens delivered from farm to table daily.',
        image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=2000&q=80'
    },
    { 
        id: 'side', 
        label: 'Italian Sides', 
        icon: Wind, 
        desc: 'The perfect accompaniments to your main feast.',
        image: 'https://images.unsplash.com/photo-1573140247632-f84660f67126?auto=format&fit=crop&w=2000&q=80'
    },
    { 
        id: 'dessert', 
        label: 'Sweet Endings', 
        icon: IceCream, 
        desc: 'Decadent treats to conclude your dining experience.',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=2000&q=80'
    },
    { 
        id: 'drink', 
        label: 'Refreshments', 
        icon: Coffee, 
        desc: 'Artisanal beverages and Italian classics.',
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=2000&q=80'
    },
];

const DIETARY_FILTERS = [
    { id: 'vegetarian', label: 'Vegetarian', color: 'text-green-600 bg-green-50' },
    { id: 'vegan', label: 'Vegan', color: 'text-emerald-600 bg-emerald-50' },
    { id: 'gluten-free', label: 'Gluten-Free', color: 'text-amber-600 bg-amber-50' },
    { id: 'spicy', label: 'Spicy', color: 'text-red-600 bg-red-50' },
    { id: 'nut-free', label: 'Nut-Free', color: 'text-blue-600 bg-blue-50' }
];

export default function Menu({ onAddToCart, onNavigate, initialCategory = 'all' }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>(initialCategory);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync category from prop (navigation)
  useEffect(() => {
    setActiveCategory(initialCategory);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [initialCategory]);

  const toggleFilter = (filterId: string) => {
    const newFilters = new Set(activeFilters);
    if (newFilters.has(filterId)) {
        newFilters.delete(filterId);
    } else {
        newFilters.add(filterId);
    }
    setActiveFilters(newFilters);
  };

  const currentCategoryData = useMemo(() => 
    CATEGORIES.find(c => c.id === activeCategory) || CATEGORIES[0]
  , [activeCategory]);

  const filteredProducts = FULL_MENU.filter(product => {
      const categoryMatch = activeCategory === 'all' || product.category === activeCategory;
      const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const filterMatch = activeFilters.size === 0 || 
                          [...activeFilters].every(filter => product.tags?.includes(filter));
      return categoryMatch && searchMatch && filterMatch;
  });

  return (
    <div className="min-h-screen bg-white animate-in fade-in duration-500">
        
        {/* Dynamic Premium Hero */}
        <section className="relative h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden pt-20">
            <div className="absolute inset-0 bg-black/50 z-10" />
            <img 
                src={currentCategoryData.image} 
                alt={currentCategoryData.label}
                className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-[2000ms] ease-out"
                key={currentCategoryData.id} // Forces re-animation on change
                style={{ animation: 'slowZoom 20s infinite alternate' }}
            />
            <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="h-px w-8 md:w-16 bg-white/30"></div>
                    <currentCategoryData.icon size={24} className="text-amber-400" />
                    <div className="h-px w-8 md:w-16 bg-white/30"></div>
                </div>
                <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight drop-shadow-2xl">
                    {currentCategoryData.label}
                </h1>
                <p className="text-lg md:text-2xl text-gray-200 opacity-90 font-medium max-w-2xl mx-auto italic">
                    "{currentCategoryData.desc}"
                </p>
            </div>
        </section>

        {/* Global Toolbar */}
        <div className="sticky top-16 md:top-[72px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-4 py-4">
                
                {/* Category Navigation (Horizontal) */}
                <div className="flex overflow-x-auto gap-2 w-full md:flex-1 no-scrollbar pb-2 md:pb-0">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-5 py-2.5 rounded-full font-bold whitespace-nowrap transition-all text-xs uppercase tracking-widest flex items-center gap-2 border-2 ${
                                activeCategory === cat.id 
                                ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-100' 
                                : 'bg-white text-gray-400 border-gray-50 hover:border-gray-200 hover:text-gray-600'
                            }`}
                        >
                            <cat.icon size={14} />
                            {cat.label.split(' ')[1] || cat.label}
                        </button>
                    ))}
                </div>

                {/* Quick Search */}
                <div className="relative w-full md:w-80 group">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 group-focus-within:text-red-500 transition-colors" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search the menu..." 
                        className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-8 focus:ring-red-50 outline-none transition-all font-bold text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
        </div>

        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-12">
                
                {/* Sidebar - Enhanced Artisan Filters */}
                <aside className={`lg:w-72 flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
                    <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 sticky top-48 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-red-50 text-red-600 rounded-xl">
                                <Filter size={20} />
                            </div>
                            <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm">Refine Selection</h3>
                        </div>
                        
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Dietary Preference</h4>
                                <div className="space-y-2">
                                    {DIETARY_FILTERS.map(filter => (
                                        <button 
                                            key={filter.id} 
                                            onClick={() => toggleFilter(filter.id)}
                                            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl border-2 transition-all active:scale-[0.98] ${
                                                activeFilters.has(filter.id)
                                                ? 'bg-gray-900 text-white border-gray-900 shadow-lg'
                                                : 'bg-white text-gray-500 border-gray-50 hover:border-gray-200'
                                            }`}
                                        >
                                            <span className="text-sm font-bold">{filter.label}</span>
                                            {activeFilters.has(filter.id) ? (
                                                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-gray-900">
                                                    <Check size={12} strokeWidth={4} />
                                                </div>
                                            ) : (
                                                <div className={`w-2 h-2 rounded-full ${filter.color.split(' ')[0]}`}></div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {activeFilters.size > 0 && (
                                <button 
                                    onClick={() => setActiveFilters(new Set())}
                                    className="w-full text-red-600 text-xs font-black uppercase tracking-widest py-3 hover:bg-red-50 rounded-xl transition-colors"
                                >
                                    Clear all filters
                                </button>
                            )}
                        </div>

                        {/* Artisan Note Badge */}
                        <div className="mt-12 p-6 bg-amber-50 rounded-[2rem] border border-amber-100 relative overflow-hidden group">
                             <ChefHat className="text-amber-200 absolute -right-4 -bottom-4 rotate-12 group-hover:scale-110 transition-transform" size={80} />
                             <div className="relative z-10">
                                <h5 className="text-amber-900 font-black text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <Star size={14} className="fill-amber-900" /> Chef's Note
                                </h5>
                                <p className="text-amber-800 text-xs font-medium leading-relaxed">
                                    All our {activeCategory === 'all' ? 'dishes' : activeCategory} are prepared fresh upon order using heritage techniques.
                                </p>
                             </div>
                        </div>
                    </div>
                </aside>

                {/* Mobile Filter Toggle */}
                <button 
                    className="lg:hidden flex items-center justify-between bg-white p-5 rounded-[1.5rem] border border-gray-100 shadow-sm mb-4"
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                >
                    <span className="font-black text-gray-900 flex items-center gap-3 uppercase tracking-widest text-xs">
                        <Filter size={18} className="text-red-600" /> Filter Menu
                    </span>
                    <ChevronDown size={20} className={`transform transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
                </button>

                {/* Product Grid - The dynamic "Page" content */}
                <div className="flex-1 min-h-[60vh]">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-3xl font-black text-gray-900">
                                {activeCategory === 'all' ? 'Our Entire Selection' : currentCategoryData.label}
                            </h2>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-1">
                                {filteredProducts.length} Artisan Items Found
                            </p>
                        </div>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-32 bg-gray-50 rounded-[3rem] border-4 border-dashed border-gray-100">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl text-gray-300">
                                <Utensils size={48} />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-2">No Matches Found</h3>
                            <p className="text-gray-500 font-medium max-w-sm mx-auto">Try adjusting your filters or search criteria to find what you're looking for.</p>
                            <button 
                                onClick={() => { setActiveCategory('all'); setSearchQuery(''); setActiveFilters(new Set()); }}
                                className="mt-8 bg-red-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-100"
                            >
                                Reset Menu View
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
                            {filteredProducts.map((product, idx) => (
                                <div key={product.id} className="animate-in fade-in slide-in-from-bottom-6 duration-700 h-full" style={{ animationDelay: `${idx * 50}ms` }}>
                                    <PizzaCard product={product} onAddToCart={onAddToCart} showDetails={true} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Floating Bottom Section for Deals */}
        {activeCategory === 'all' && (
            <section className="py-20 bg-gray-900 overflow-hidden relative">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12 bg-white/5 backdrop-blur-sm rounded-[3rem] p-10 md:p-16 border border-white/10">
                        <div className="flex-1">
                            <span className="text-amber-400 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Limited Collection</span>
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">Can't Decide? <br/> Try our <span className="text-red-500">Truffle Flight</span></h2>
                            <p className="text-gray-400 text-lg mb-8 max-w-md">Our signature sampler featuring mini versions of our award-winning truffle series.</p>
                            <button className="bg-red-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-100">
                                View Special Deals
                            </button>
                        </div>
                        <div className="w-full md:w-1/2 relative group">
                            <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80" className="rounded-[2.5rem] shadow-2xl transition-transform duration-700 group-hover:scale-105" alt="Deals" />
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-amber-400 rounded-full flex flex-col items-center justify-center text-gray-900 shadow-2xl rotate-12 group-hover:rotate-0 transition-all duration-500">
                                <span className="font-black text-3xl">$24</span>
                                <span className="font-black text-[10px] uppercase tracking-widest">Limited</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Background Decor */}
                <div className="absolute -left-20 top-0 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute -right-20 bottom-0 w-96 h-96 bg-amber-400/5 rounded-full blur-[120px] pointer-events-none"></div>
            </section>
        )}

        <style>
            {`
                @keyframes slowZoom {
                    from { transform: scale(1); }
                    to { transform: scale(1.15); }
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}
        </style>
    </div>
  );
}
