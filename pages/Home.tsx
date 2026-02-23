
import React, { useState } from 'react';
import { 
  Utensils, Award, Truck, MapPin, 
  Phone, Clock, Facebook, Twitter, Instagram 
} from 'lucide-react';
import { PIZZAS, SIDES, LOCATIONS } from '../data';
import { Product, SizeOption } from '../types';
import { PizzaCard } from '../components/PizzaCard';

interface HomeProps {
  onAddToCart: (product: Product, size?: SizeOption) => void;
  onNavigate: (page: string) => void;
  onStartOrder: () => void;
}

export default function Home({ onAddToCart, onNavigate, onStartOrder }: HomeProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 scale-105"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=2000&q=80')` }}
        />
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-amber-400 text-black font-bold text-sm tracking-wide mb-6 animate-bounce">
            Best Pizza in Town
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 drop-shadow-lg">
            Authentic <br/> Italian <span className="text-amber-400">Flavor</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Hand-kneaded dough, garden-fresh ingredients, and stone-oven perfection. Taste the difference in every slice.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onStartOrder}
              className="bg-red-600 hover:bg-red-700 text-white text-lg font-bold px-10 py-4 rounded-full transition-all hover:scale-105 shadow-xl hover:shadow-red-900/50"
            >
              Order Now
            </button>
            <button 
              onClick={() => onNavigate('menu')}
              className="bg-white hover:bg-gray-100 text-gray-900 text-lg font-bold px-10 py-4 rounded-full transition-all hover:scale-105 shadow-xl"
            >
              View Menu
            </button>
          </div>
        </div>
      </section>

      {/* Trust Icons */}
      <section className="py-12 bg-white relative z-20 -mt-10 container mx-auto px-4 rounded-t-3xl shadow-xl border-b border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { icon: Utensils, title: "Original Recipes", desc: "Secret family recipes passed down." },
                { icon: Award, title: "Quality Foods", desc: "Locally sourced organic ingredients." },
                { icon: Truck, title: "Fastest Delivery", desc: "Hot & fresh in under 30 minutes." }
            ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 shrink-0">
                        <feature.icon size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{feature.title}</h3>
                        <p className="text-gray-500 text-sm">{feature.desc}</p>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Yellow Emotional Section */}
      <section className="bg-amber-400 py-20 px-4">
        <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 font-serif italic">
                "Nothing brings people together like a good pizza"
            </h2>
            <div className="flex justify-center gap-8 md:gap-16 mt-12 flex-wrap">
                {[
                    { icon: '🍕', label: 'Pizza' },
                    { icon: '🍟', label: 'Sides' },
                    { icon: '🥤', label: 'Drinks' },
                    { icon: '🍰', label: 'Dessert' }
                ].map((cat, idx) => (
                    <div key={idx} className="group cursor-pointer" onClick={() => onNavigate('menu')}>
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center text-4xl shadow-md group-hover:scale-110 transition-transform duration-300 mb-3">
                            {cat.icon}
                        </div>
                        <span className="font-bold text-gray-900 uppercase tracking-wider text-sm">{cat.label}</span>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
            <span className="text-red-600 font-bold uppercase tracking-widest text-sm">Choose your flavor</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">True Italian Flavor</h2>
            
            {/* Simple Filters */}
            <div className="flex justify-center gap-4 mt-8">
                {['all', 'vegetarian', 'spicy', 'vegan'].map(filter => (
                    <button 
                        key={filter}
                        onClick={() => setActiveCategory(filter)}
                        className={`px-6 py-2 rounded-full text-sm font-bold capitalize transition-all ${
                            activeCategory === filter 
                            ? 'bg-gray-900 text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PIZZAS.filter(p => activeCategory === 'all' || p.tags?.includes(activeCategory)).slice(0, 8).map(pizza => (
                <PizzaCard key={pizza.id} product={pizza} onAddToCart={onAddToCart} />
            ))}
        </div>

        <div className="mt-16 text-center">
            <button 
                onClick={() => onNavigate('menu')}
                className="border-2 border-gray-900 text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-gray-900 hover:text-white transition-colors uppercase tracking-wide"
            >
                View Full Menu
            </button>
        </div>
      </section>

      {/* Quick Tiles */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { title: "Join Our Team", sub: "We are hiring!", bg: "bg-red-600", text: "text-white", action: () => onNavigate('careers') },
                { title: "Order Now", sub: "Delivery to doorstep", bg: "bg-gray-900", text: "text-white", action: onStartOrder },
                { title: "Gift Cards", sub: "Share the love", bg: "bg-amber-400", text: "text-gray-900", action: () => onNavigate('gift-cards') }
            ].map((tile, idx) => (
                <div key={idx} onClick={tile.action} className={`${tile.bg} ${tile.text} p-8 rounded-2xl flex flex-col items-center justify-center text-center h-48 hover:shadow-xl transition-shadow cursor-pointer`}>
                    <h3 className="text-2xl font-bold mb-2">{tile.title}</h3>
                    <p className="opacity-80 font-medium">{tile.sub}</p>
                </div>
            ))}
        </div>
      </section>

      {/* Deals Section */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Hot Deals of the Week</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((deal) => (
                <div key={deal} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-red-200 transition-colors flex items-center gap-6">
                    <img src={`https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=150&q=80`} alt="Deal" className="w-24 h-24 rounded-full object-cover shadow-md" />
                    <div>
                        <h4 className="font-bold text-lg mb-1">Double Crunch Deal</h4>
                        <p className="text-xs text-gray-500 mb-2">2 Large Pizzas + Drinks</p>
                        <div className="flex items-center gap-3">
                            <span className="text-red-600 font-bold text-xl">$24.99</span>
                            <span className="text-gray-400 text-sm line-through">$32.00</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Sides */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <span className="text-red-600 font-bold uppercase text-sm">Delicious Extras</span>
                    <h2 className="text-3xl font-bold text-gray-900">Sides & Drinks</h2>
                </div>
                <button onClick={() => onNavigate('menu')} className="text-gray-900 font-bold hover:text-red-600">See All &rarr;</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {SIDES.slice(0,4).map(side => (
                    <PizzaCard key={side.id} product={side} onAddToCart={onAddToCart} />
                ))}
            </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-20 container mx-auto px-4">
        <div className="bg-gray-900 rounded-3xl overflow-hidden relative h-[400px] flex items-center">
            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80" alt="Catering" className="absolute inset-0 w-full h-full object-cover opacity-40" />
            <div className="relative z-10 px-8 md:px-16 max-w-2xl text-white">
                <h2 className="text-4xl font-bold mb-4">Host Your Next Event With Us</h2>
                <p className="text-gray-300 text-lg mb-8">
                    From birthday parties to corporate gatherings, we cater events of all sizes with our mobile pizza oven.
                </p>
                <button 
                  onClick={() => onNavigate('catering')}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-colors"
                >
                    Book Catering
                </button>
            </div>
        </div>
      </section>

      {/* Best Offers Banner */}
      <section className="py-10 container mx-auto px-4">
          <div className="bg-gray-900 text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl overflow-hidden relative">
              <div className="relative z-10">
                  <span className="text-amber-400 font-bold tracking-widest uppercase mb-2 block">Limited Time Offer</span>
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">Chicken Ranchero</h2>
                  <div className="flex items-baseline gap-4 mb-6">
                      <span className="text-gray-400 text-xl">from</span>
                      <span className="text-red-500 font-bold text-4xl">$13.99</span>
                      <span className="bg-red-600 text-white text-xs px-2 py-1 rounded font-bold ml-2">50% OFF</span>
                  </div>
                  <button onClick={onStartOrder} className="bg-white text-gray-900 font-bold px-8 py-3 rounded-full hover:bg-amber-400 transition-colors">
                      Order Now
                  </button>
              </div>
              <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80" alt="Special" className="w-full md:w-1/2 rounded-full border-4 border-white/10 shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500" />
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
          </div>
      </section>
    </>
  );
}
