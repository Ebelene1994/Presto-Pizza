
import React, { useState } from 'react';
import { 
    Gift, CreditCard, Mail, CheckCircle, 
    DollarSign, Search, ShoppingBag, Eye 
} from 'lucide-react';
import { GIFT_CARD_THEMES } from '../data';
import { Product, SizeOption } from '../types';

interface GiftCardsProps {
  onNavigate: (page: string) => void;
  onAddToCart: (product: Product, size?: SizeOption) => void;
}

export default function GiftCards({ onNavigate, onAddToCart }: GiftCardsProps) {
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState(GIFT_CARD_THEMES[0]);
  const [deliveryType, setDeliveryType] = useState<'email' | 'physical'>('email');
  const [formData, setFormData] = useState({
      recipientName: '',
      recipientEmail: '',
      senderName: '',
      message: ''
  });
  
  // Balance Checker State
  const [balanceCode, setBalanceCode] = useState('');
  const [balanceResult, setBalanceResult] = useState<string | null>(null);
  const [checkingBalance, setCheckingBalance] = useState(false);

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCustomAmount(e.target.value);
      const val = parseFloat(e.target.value);
      if (!isNaN(val) && val > 0) {
          setAmount(val);
      }
  };

  const handleAddToCart = () => {
      const product: Product = {
          id: `gc-${Date.now()}`,
          name: `Presto Gift Card - $${amount}`,
          description: `For ${formData.recipientName || 'Someone Special'} (${selectedTheme.name})`,
          price: amount,
          image: selectedTheme.image,
          rating: 5,
          category: 'gift-card',
          tags: ['gift-card']
      };
      
      onAddToCart(product);
  };

  const checkBalance = (e: React.FormEvent) => {
      e.preventDefault();
      setCheckingBalance(true);
      setTimeout(() => {
          setBalanceResult(`$${(Math.random() * 100).toFixed(2)}`);
          setCheckingBalance(false);
      }, 1000);
  };

  return (
    <div className="bg-white animate-in fade-in duration-500">
      
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-red-600 flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
         <div className="relative z-10 text-center text-white px-4">
             <div className="bg-white/20 backdrop-blur-md p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Gift size={40} className="text-amber-300" />
             </div>
             <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">Give the Gift of Pizza</h1>
             <p className="text-xl max-w-2xl mx-auto opacity-90">The perfect present for holidays, birthdays, or just because.</p>
         </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row gap-12">
              
              {/* Left Column: Configurator */}
              <div className="lg:w-2/3 space-y-10">
                  
                  {/* Step 1: Design */}
                  <div>
                      <div className="flex items-center gap-3 mb-6">
                          <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">1</div>
                          <h2 className="text-2xl font-bold text-gray-900">Choose a Design</h2>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {GIFT_CARD_THEMES.map(theme => (
                              <button 
                                key={theme.id}
                                onClick={() => setSelectedTheme(theme)}
                                className={`rounded-xl overflow-hidden border-4 transition-all ${
                                    selectedTheme.id === theme.id 
                                    ? 'border-red-600 shadow-lg scale-105' 
                                    : 'border-transparent opacity-70 hover:opacity-100'
                                }`}
                              >
                                  <img src={theme.image} alt={theme.name} className="w-full h-24 object-cover" />
                                  <div className="text-xs font-bold p-2 text-center bg-gray-50">{theme.name}</div>
                              </button>
                          ))}
                      </div>
                  </div>

                  {/* Step 2: Amount */}
                  <div>
                      <div className="flex items-center gap-3 mb-6">
                          <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">2</div>
                          <h2 className="text-2xl font-bold text-gray-900">Select Amount</h2>
                      </div>
                      <div className="flex flex-wrap gap-4">
                          {[25, 50, 75, 100, 200].map(val => (
                              <button
                                key={val}
                                onClick={() => { setAmount(val); setCustomAmount(''); }}
                                className={`px-6 py-3 rounded-full font-bold transition-all ${
                                    amount === val && !customAmount
                                    ? 'bg-gray-900 text-white shadow-lg'
                                    : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'
                                }`}
                              >
                                  ${val}
                              </button>
                          ))}
                          <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                              <input 
                                type="number" 
                                placeholder="Custom" 
                                value={customAmount}
                                onChange={handleCustomAmountChange}
                                className={`pl-8 pr-4 py-3 rounded-full border font-bold outline-none w-32 transition-colors ${
                                    customAmount ? 'border-red-600 ring-2 ring-red-100' : 'border-gray-200'
                                }`}
                              />
                          </div>
                      </div>
                  </div>

                  {/* Step 3: Details */}
                  <div>
                      <div className="flex items-center gap-3 mb-6">
                          <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">3</div>
                          <h2 className="text-2xl font-bold text-gray-900">Delivery Details</h2>
                      </div>

                      <div className="flex bg-gray-100 p-1 rounded-xl mb-6 w-full md:w-fit">
                          <button 
                            onClick={() => setDeliveryType('email')}
                            className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                                deliveryType === 'email' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
                            }`}
                          >
                              <Mail size={16} /> Email Delivery
                          </button>
                          <button 
                            onClick={() => setDeliveryType('physical')}
                            className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                                deliveryType === 'physical' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
                            }`}
                          >
                              <CreditCard size={16} /> Physical Card
                          </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                          <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">To (Recipient Name)</label>
                              <input 
                                type="text" 
                                placeholder="e.g. Michael Scott"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-600 outline-none"
                                value={formData.recipientName}
                                onChange={e => setFormData({...formData, recipientName: e.target.value})}
                              />
                          </div>
                          <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">
                                  {deliveryType === 'email' ? 'Recipient Email' : 'Recipient Address'}
                              </label>
                              <input 
                                type="text" 
                                placeholder={deliveryType === 'email' ? "michael@dundermifflin.com" : "123 Paper St, Scranton, PA"}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-600 outline-none"
                                value={formData.recipientEmail}
                                onChange={e => setFormData({...formData, recipientEmail: e.target.value})}
                              />
                          </div>
                          <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">From (Your Name)</label>
                              <input 
                                type="text" 
                                placeholder="Your Name"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-600 outline-none"
                                value={formData.senderName}
                                onChange={e => setFormData({...formData, senderName: e.target.value})}
                              />
                          </div>
                          <div className="md:col-span-2">
                              <label className="block text-sm font-bold text-gray-700 mb-2">Message (Optional)</label>
                              <textarea 
                                rows={3}
                                placeholder="Enjoy some pizza on me!"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-600 outline-none resize-none"
                                value={formData.message}
                                onChange={e => setFormData({...formData, message: e.target.value})}
                              />
                          </div>
                      </div>
                  </div>
              </div>

              {/* Right Column: Preview & Action */}
              <div className="lg:w-1/3">
                  <div className="sticky top-28 space-y-8">
                      {/* Card Preview */}
                      <div className="bg-white p-6 rounded-3xl shadow-2xl border border-gray-100">
                          <h3 className="text-lg font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                              <Eye size={18} /> Preview
                          </h3>
                          <div className="relative aspect-[1.6/1] rounded-2xl overflow-hidden shadow-md group mb-6">
                              <img src={selectedTheme.image} alt="Card" className="absolute inset-0 w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/30"></div>
                              <div className="absolute top-4 right-4 text-white font-bold text-xl md:text-2xl drop-shadow-lg">
                                  ${amount}
                              </div>
                              <div className="absolute bottom-4 left-4 text-white">
                                  <div className="text-xs uppercase opacity-80 font-bold">Presto Pizza</div>
                                  <div className="font-bold text-lg drop-shadow-md">Gift Card</div>
                              </div>
                          </div>
                          
                          <div className="space-y-3 mb-8">
                              <div className="flex justify-between text-sm">
                                  <span className="text-gray-500">Value</span>
                                  <span className="font-bold text-gray-900">${amount.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                  <span className="text-gray-500">To</span>
                                  <span className="font-bold text-gray-900 text-right truncate max-w-[150px]">{formData.recipientName || 'Recipient'}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                  <span className="text-gray-500">From</span>
                                  <span className="font-bold text-gray-900 text-right truncate max-w-[150px]">{formData.senderName || 'You'}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                  <span className="text-gray-500">Delivery</span>
                                  <span className="font-bold text-gray-900 capitalize">{deliveryType}</span>
                              </div>
                          </div>

                          <button 
                            onClick={handleAddToCart}
                            className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
                          >
                              <ShoppingBag size={20} /> Add to Cart
                          </button>
                      </div>

                      {/* Check Balance */}
                      <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200">
                          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                              <Search size={18} /> Check Balance
                          </h3>
                          <form onSubmit={checkBalance}>
                              <div className="relative mb-4">
                                  <input 
                                    type="text" 
                                    placeholder="Card Number (e.g. 1234-5678)"
                                    value={balanceCode}
                                    onChange={(e) => setBalanceCode(e.target.value)}
                                    className="w-full pl-4 pr-4 py-3 rounded-xl border border-gray-200 focus:border-amber-400 outline-none text-sm font-mono uppercase"
                                  />
                              </div>
                              <button 
                                type="submit"
                                disabled={!balanceCode || checkingBalance}
                                className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors disabled:opacity-50"
                              >
                                  {checkingBalance ? 'Checking...' : 'Check Balance'}
                              </button>
                          </form>
                          {balanceResult && (
                              <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2">
                                  <CheckCircle size={20} />
                                  <div>
                                      <div className="text-xs uppercase font-bold opacity-70">Current Balance</div>
                                      <div className="font-bold text-xl">{balanceResult}</div>
                                  </div>
                              </div>
                          )}
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}
