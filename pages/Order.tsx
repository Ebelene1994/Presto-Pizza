
import React, { useState } from 'react';
import { MapPin, ShoppingBag, Truck, Store, ArrowRight, Navigation } from 'lucide-react';
import { LOCATIONS } from '../data';
import { OrderInfo, OrderMethod } from '../types';

interface OrderProps {
  onStartOrder: (info: OrderInfo) => void;
  existingInfo?: OrderInfo;
  onNavigate: (page: string) => void;
}

export default function Order({ onStartOrder, existingInfo, onNavigate }: OrderProps) {
  const [method, setMethod] = useState<OrderMethod>(existingInfo?.method || 'delivery');
  const [address, setAddress] = useState(existingInfo?.address || { street: '', city: '', zip: '', instructions: '' });
  const [storeId, setStoreId] = useState(existingInfo?.storeId || LOCATIONS[0].id);
  const [contact, setContact] = useState(existingInfo?.contact || { name: '', phone: '', email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartOrder({
      method,
      address: method === 'delivery' ? address : undefined,
      storeId: method === 'pickup' ? storeId : undefined,
      contact
    });
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      {/* Page Header with Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-8 mb-8">
        <div className="container mx-auto px-4 max-w-4xl">
             <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span onClick={() => onNavigate('home')} className="cursor-pointer hover:text-red-600">Home</span>
                <span>/</span>
                <span className="font-semibold text-gray-900">Order</span>
             </div>
             <h1 className="text-4xl font-bold text-gray-900">Start Your Order</h1>
             <p className="text-gray-500 mt-2">Select how you'd like to receive your delicious pizza.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Method Toggles */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setMethod('delivery')}
              className={`flex-1 py-6 flex flex-col items-center gap-3 transition-colors ${
                method === 'delivery' ? 'bg-red-50 text-red-600 border-b-4 border-red-600' : 'hover:bg-gray-50 text-gray-500'
              }`}
            >
              <div className={`p-3 rounded-full ${method === 'delivery' ? 'bg-red-200' : 'bg-gray-100'}`}>
                <Truck size={32} />
              </div>
              <span className="font-bold text-lg">Delivery</span>
            </button>
            <button
              onClick={() => setMethod('pickup')}
              className={`flex-1 py-6 flex flex-col items-center gap-3 transition-colors ${
                method === 'pickup' ? 'bg-amber-50 text-amber-600 border-b-4 border-amber-500' : 'hover:bg-gray-50 text-gray-500'
              }`}
            >
              <div className={`p-3 rounded-full ${method === 'pickup' ? 'bg-amber-200' : 'bg-gray-100'}`}>
                <ShoppingBag size={32} />
              </div>
              <span className="font-bold text-lg">Pickup</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12">
            
            {/* Delivery Form */}
            {method === 'delivery' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-2">
                  <MapPin className="text-red-600" />
                  <h2>Delivery Address</h2>
                </div>
                
                <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Street Address</label>
                    <div className="relative">
                        <input 
                            required
                            type="text" 
                            placeholder="123 Pizza Street" 
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                            value={address.street}
                            onChange={(e) => setAddress({...address, street: e.target.value})}
                        />
                        <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                        <input 
                            required
                            type="text" 
                            placeholder="New York" 
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                            value={address.city}
                            onChange={(e) => setAddress({...address, city: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Zip Code</label>
                        <input 
                            required
                            type="text" 
                            placeholder="10001" 
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                            value={address.zip}
                            onChange={(e) => setAddress({...address, zip: e.target.value})}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Instructions (Optional)</label>
                    <textarea 
                        rows={2}
                        placeholder="Gate code, leave at door, etc." 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all resize-none"
                        value={address.instructions}
                        onChange={(e) => setAddress({...address, instructions: e.target.value})}
                    />
                </div>
              </div>
            )}

            {/* Pickup Form */}
            {method === 'pickup' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-2">
                  <Store className="text-amber-500" />
                  <h2>Select a Store</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {LOCATIONS.map(loc => (
                    <div 
                        key={loc.id}
                        onClick={() => setStoreId(loc.id)}
                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-start gap-4 ${
                            storeId === loc.id 
                            ? 'border-amber-500 bg-amber-50 shadow-md' 
                            : 'border-gray-100 hover:border-amber-200'
                        }`}
                    >
                        <img src={loc.image} className="w-16 h-16 rounded-lg object-cover bg-gray-200" alt="store" />
                        <div>
                            <h4 className="font-bold text-gray-900">{loc.name}</h4>
                            <p className="text-sm text-gray-500">{loc.address}</p>
                            <p className="text-xs text-amber-600 font-bold mt-1">Open until 11pm</p>
                        </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <hr className="my-8 border-gray-100" />

            {/* Contact Info (Common) */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-2">
                  <span className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm">i</span>
                  <h2>Contact Info</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                        <input 
                            required
                            type="text" 
                            placeholder="John Doe" 
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                            value={contact.name}
                            onChange={(e) => setContact({...contact, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        <input 
                            required
                            type="tel" 
                            placeholder="(555) 123-4567" 
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                            value={contact.phone}
                            onChange={(e) => setContact({...contact, phone: e.target.value})}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <button 
                    type="submit"
                    className={`w-full py-4 rounded-xl font-bold text-xl text-white shadow-xl transition-transform transform active:scale-95 flex items-center justify-center gap-2 ${
                        method === 'delivery' ? 'bg-red-600 hover:bg-red-700 hover:shadow-red-200' : 'bg-amber-500 hover:bg-amber-600 hover:shadow-amber-200'
                    }`}
                >
                    Continue to Menu <ArrowRight />
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
