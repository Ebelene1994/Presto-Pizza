
import React, { useState, useMemo } from 'react';
import { 
  CreditCard, Wallet, Banknote, ShoppingBag, ArrowLeft, 
  Check, TicketPercent, ShieldCheck, Truck, Store, 
  MapPin, Phone, Info, ChevronRight, Apple, Smartphone, 
  Lock, AlertCircle, Utensils, CheckCircle
} from 'lucide-react';
import { CartItem, OrderInfo } from '../types';

interface CheckoutProps {
  cartItems: CartItem[];
  orderInfo: OrderInfo;
  onBack: () => void;
  onEditInfo: () => void;
  onPlaceOrder: () => void;
}

export default function Checkout({ cartItems, orderInfo, onBack, onEditInfo, onPlaceOrder }: CheckoutProps) {
  const [tipPercentage, setTipPercentage] = useState<number>(0.15);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'google' | 'cash'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Card Details State
  const [cardDetails, setCardDetails] = useState({
      holder: '',
      number: '',
      expiry: '',
      cvv: ''
  });

  // Derived Values
  const subtotal = useMemo(() => cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cartItems]);
  const tax = useMemo(() => subtotal * 0.08, [subtotal]);
  const discount = useMemo(() => promoApplied ? subtotal * 0.15 : 0, [promoApplied, subtotal]);
  const tipAmount = useMemo(() => subtotal * tipPercentage, [subtotal, tipPercentage]);
  const total = useMemo(() => subtotal + tax + tipAmount - discount, [subtotal, tax, tipAmount, discount]);

  // Input Formatting Helpers
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) return parts.join(' ');
    return value;
  };

  const formatExpiry = (value: string) => {
      const v = value.replace(/[^0-9]/gi, '');
      if (v.length >= 2) {
          return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
      }
      return v;
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'SAVE15') {
      setPromoApplied(true);
    } else {
      alert('Invalid code. Try "SAVE15"');
    }
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API delay with meaningful interaction
    setTimeout(() => {
        setIsProcessing(false);
        onPlaceOrder();
    }, 2500);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50 animate-in fade-in duration-500">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Breadcrumb & Secure Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <button onClick={onBack} className="flex items-center text-gray-500 hover:text-red-600 transition-all font-black text-xs uppercase tracking-[0.2em] group">
                <div className="p-2 bg-white rounded-xl shadow-sm mr-3 group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                    <ArrowLeft size={16} />
                </div>
                Return to Menu
            </button>
            <div className="flex items-center gap-3 px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-100">
                <ShieldCheck size={18} />
                <span className="text-xs font-black uppercase tracking-widest">256-bit Secure Encryption</span>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Details & Payment */}
          <div className="flex-1 space-y-6">
            
            {/* Steps Visual (Desktop Only) */}
            <div className="hidden lg:flex items-center mb-6 gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-black text-xs shadow-lg shadow-green-100">
                        <Check size={14} />
                    </div>
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Order Info</span>
                </div>
                <div className="w-12 h-0.5 bg-green-200"></div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-black text-xs shadow-lg shadow-red-100">2</div>
                    <span className="text-xs font-black text-gray-900 uppercase tracking-widest">Secure Payment</span>
                </div>
                <div className="w-12 h-0.5 bg-gray-200"></div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-black text-xs">3</div>
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Confirmation</span>
                </div>
            </div>

            {/* Recap Section */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-5">
                        <div className={`p-4 rounded-3xl ${orderInfo.method === 'delivery' ? 'bg-red-50 text-red-600 shadow-red-100' : 'bg-amber-50 text-amber-600 shadow-amber-100'} shadow-lg`}>
                            {orderInfo.method === 'delivery' ? <Truck size={28} /> : <Store size={28} />}
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 leading-tight">
                                {orderInfo.method === 'delivery' ? 'Delivery Details' : 'Pickup at Store'}
                            </h2>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mt-1">Ready in 30-45 mins</p>
                        </div>
                    </div>
                    <button 
                        onClick={onEditInfo}
                        className="px-6 py-3 bg-gray-50 text-red-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-red-50 transition-all border-2 border-transparent hover:border-red-100 active:scale-95"
                    >
                        Change
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-50">
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <MapPin size={20} className="text-red-500 mt-1 shrink-0" />
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Address</p>
                                <p className="font-bold text-gray-700 leading-relaxed">
                                    {orderInfo.method === 'delivery' && orderInfo.address 
                                        ? `${orderInfo.address.street}, ${orderInfo.address.city}, ${orderInfo.address.zip}` 
                                        : 'Presto Downtown Main Branch'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <Phone size={20} className="text-amber-500 mt-1 shrink-0" />
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Contact</p>
                                <p className="font-bold text-gray-700">{orderInfo.contact.name}</p>
                                <p className="text-sm text-gray-500 font-medium">{orderInfo.contact.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full blur-3xl -mr-16 -mt-16 -z-10 group-hover:bg-red-50 transition-colors"></div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-10">
                    <div className="p-4 bg-blue-50 text-blue-600 rounded-3xl shadow-lg shadow-blue-100">
                        <CreditCard size={28} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 leading-tight">Payment Method</h2>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mt-1">Select your preferred option</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {[
                        { id: 'card', label: 'Card', icon: CreditCard, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-600' },
                        { id: 'apple', label: 'Apple Pay', icon: Apple, color: 'text-black', bg: 'bg-gray-100', border: 'border-black' },
                        { id: 'google', label: 'Google', icon: Smartphone, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-600' },
                        { id: 'cash', label: 'Cash', icon: Banknote, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-600' }
                    ].map(pm => (
                        <button 
                            key={pm.id}
                            onClick={() => setPaymentMethod(pm.id as any)}
                            className={`flex flex-col items-center justify-center p-6 rounded-[2rem] border-2 transition-all group active:scale-95 ${
                                paymentMethod === pm.id 
                                ? `${pm.border} ${pm.bg} ${pm.color} shadow-2xl shadow-gray-100 scale-[1.02]` 
                                : 'border-gray-50 hover:border-gray-200 text-gray-400 hover:text-gray-600'
                            }`}
                        >
                            <pm.icon size={32} className={`mb-3 transition-transform ${paymentMethod === pm.id ? 'scale-110' : 'group-hover:scale-110'}`} />
                            <span className="font-black text-[10px] uppercase tracking-[0.2em]">{pm.label}</span>
                        </button>
                    ))}
                </div>

                {/* Conditional Payment UI */}
                <div className="relative">
                    {paymentMethod === 'card' ? (
                        <form id="payment-form" onSubmit={handlePayment} className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Card Holder Name</label>
                                <div className="relative group">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-red-500 transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input 
                                        required 
                                        type="text" 
                                        placeholder="JOHN DOE" 
                                        className="w-full pl-14 pr-6 py-5 rounded-[1.5rem] border border-gray-100 bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-8 focus:ring-red-50 outline-none transition-all font-black text-gray-900 uppercase placeholder:text-gray-300"
                                        value={cardDetails.holder}
                                        onChange={(e) => setCardDetails({...cardDetails, holder: e.target.value.toUpperCase()})}
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Card Number</label>
                                <div className="relative group">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-red-500 transition-colors">
                                        <CreditCard size={18} />
                                    </div>
                                    <input 
                                        required 
                                        type="text" 
                                        placeholder="0000 0000 0000 0000" 
                                        className="w-full pl-14 pr-6 py-5 rounded-[1.5rem] border border-gray-100 bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-8 focus:ring-red-50 outline-none transition-all font-mono font-bold text-lg text-gray-900 placeholder:text-gray-300"
                                        maxLength={19}
                                        value={cardDetails.number}
                                        onChange={(e) => setCardDetails({...cardDetails, number: formatCardNumber(e.target.value)})}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Expiry Date</label>
                                    <input 
                                        required 
                                        type="text" 
                                        placeholder="MM/YY" 
                                        className="w-full px-6 py-5 rounded-[1.5rem] border border-gray-100 bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-8 focus:ring-red-50 outline-none transition-all font-mono font-bold text-gray-900 placeholder:text-gray-300 text-center"
                                        maxLength={5}
                                        value={cardDetails.expiry}
                                        onChange={(e) => setCardDetails({...cardDetails, expiry: formatExpiry(e.target.value)})}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">CVV Code</label>
                                    <input 
                                        required 
                                        type="password" 
                                        placeholder="•••" 
                                        className="w-full px-6 py-5 rounded-[1.5rem] border border-gray-100 bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-8 focus:ring-red-50 outline-none transition-all font-mono font-bold text-gray-900 placeholder:text-gray-300 text-center"
                                        maxLength={3}
                                        value={cardDetails.cvv}
                                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value.replace(/[^0-9]/g, '')})}
                                    />
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4 p-5 bg-blue-50 rounded-[1.5rem] border border-blue-100 text-xs font-bold text-blue-700 leading-relaxed">
                                <ShieldCheck size={24} className="shrink-0" />
                                <p>Your data is protected. We use industry-leading encryption and don't store your sensitive card details on our servers.</p>
                            </div>
                        </form>
                    ) : (
                        <div className="p-12 bg-gray-50 rounded-[3rem] text-center space-y-6 animate-in fade-in zoom-in-95 border-2 border-dashed border-gray-200">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-gray-400 mx-auto shadow-2xl relative">
                                {paymentMethod === 'apple' ? <Apple size={48} className="text-black" /> : paymentMethod === 'google' ? <Smartphone size={48} className="text-blue-600" /> : <Banknote size={48} className="text-green-600" />}
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-gray-50">
                                    <Check size={16} />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-gray-900">
                                    {paymentMethod === 'cash' ? 'Pay at Door' : `Pay with ${paymentMethod === 'apple' ? 'Apple Pay' : 'Google Pay'}`}
                                </h3>
                                <p className="text-sm font-medium text-gray-500 max-w-xs mx-auto mt-2">
                                    {paymentMethod === 'cash' 
                                        ? "Simply hand the exact amount to our delivery driver when your order arrives." 
                                        : `You'll be redirected to complete the ${paymentMethod} verification after clicking the button.`}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
          </div>

          {/* Right Column: Sticky Summary Card */}
          <div className="lg:w-[420px] shrink-0">
            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden sticky top-28 transition-all hover:shadow-red-900/5">
                <div className="p-10 border-b border-gray-50 bg-gray-900 text-white relative">
                    <h2 className="text-2xl font-black flex items-center gap-3">
                        <ShoppingBag size={24} className="text-red-500" />
                        Order Summary
                    </h2>
                    <div className="absolute bottom-0 right-0 p-4 opacity-10">
                        <Utensils size={80} />
                    </div>
                </div>
                
                {/* Scrollable Item List */}
                <div className="p-8 space-y-6 max-h-[350px] overflow-y-auto hide-scrollbar">
                    {cartItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-start animate-in slide-in-from-right-4" style={{ animationDelay: `${idx * 100}ms` }}>
                            <div className="flex gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-gray-100 shrink-0 overflow-hidden border border-gray-50 shadow-sm">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="py-1">
                                    <span className="font-black text-gray-900 text-sm line-clamp-1">{item.name}</span>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] font-black text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full uppercase tracking-widest">{item.quantity} QTY</span>
                                        {item.selectedSize && (
                                            <span className="text-[10px] font-black text-red-500 bg-red-50 px-2 py-0.5 rounded-full uppercase tracking-widest">SIZE {item.selectedSize.label}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <span className="font-black text-gray-900 text-sm mt-1">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    {cartItems.length === 0 && (
                         <div className="text-center py-10">
                             <ShoppingBag size={48} className="mx-auto text-gray-200 mb-4" />
                             <p className="text-gray-400 font-black uppercase text-xs tracking-widest">Cart is Empty</p>
                         </div>
                    )}
                </div>

                <div className="p-8 space-y-8 bg-gray-50/50">
                    {/* Interactive Promo Section */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-1">Promo Code</label>
                            {promoApplied && <span className="text-[10px] font-black text-green-600 uppercase flex items-center gap-1"><CheckCircle size={14}/> SAVE15 Active</span>}
                        </div>
                        <div className="flex gap-3">
                            <div className="relative flex-1 group">
                                <TicketPercent className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-red-500 transition-colors" size={20} />
                                <input 
                                    type="text" 
                                    placeholder="SAVE15"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                    disabled={promoApplied}
                                    className="w-full pl-12 pr-4 py-4 rounded-[1.2rem] border border-gray-200 text-sm font-black outline-none focus:border-red-500 focus:ring-8 focus:ring-red-50 disabled:bg-gray-100 disabled:text-gray-400 transition-all uppercase placeholder:text-gray-200"
                                />
                            </div>
                            <button 
                                onClick={handleApplyPromo}
                                disabled={promoApplied || !promoCode}
                                className={`px-6 rounded-[1.2rem] font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg ${
                                    promoApplied ? 'bg-green-500 text-white shadow-green-100' : 'bg-gray-900 text-white hover:bg-black shadow-gray-200 disabled:opacity-50'
                                }`}
                            >
                                {promoApplied ? <Check size={20} /> : 'Apply'}
                            </button>
                        </div>
                    </div>

                    {/* Gratuity Selector */}
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4 block ml-1">Tip for your driver</label>
                        <div className="flex gap-2">
                            {[0.10, 0.15, 0.20, 0.25].map(pct => (
                                <button
                                    key={pct}
                                    onClick={() => setTipPercentage(pct)}
                                    className={`flex-1 py-3 rounded-2xl text-xs font-black transition-all border-2 active:scale-95 ${
                                        tipPercentage === pct 
                                        ? 'bg-red-600 text-white border-red-600 shadow-xl shadow-red-100 scale-105' 
                                        : 'bg-white text-gray-400 border-gray-50 hover:border-gray-200 hover:text-gray-600'
                                    }`}
                                >
                                    {pct * 100}%
                                </button>
                            ))}
                            <button 
                                onClick={() => setTipPercentage(0)}
                                className={`px-4 py-3 rounded-2xl text-xs font-black transition-all border-2 active:scale-95 ${
                                    tipPercentage === 0 
                                    ? 'bg-gray-900 text-white border-gray-900 shadow-xl shadow-gray-100' 
                                    : 'bg-white text-gray-400 border-gray-50 hover:border-gray-200 hover:text-gray-600'
                                }`}
                            >
                                NO
                            </button>
                        </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div className="space-y-4 pt-6 border-t border-gray-200">
                        <div className="flex justify-between text-sm font-bold text-gray-500">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold text-gray-500">
                            <span className="flex items-center gap-2">Estimated Tax <Info size={14}/></span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        {promoApplied && (
                            <div className="flex justify-between text-sm font-black text-green-600">
                                <span>Promo Discount (15%)</span>
                                <span>-${discount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-sm font-bold text-gray-500">
                            <span>Delivery Fee</span>
                            <span className="text-green-600 font-black">FREE</span>
                        </div>
                        <div className="flex justify-between text-sm font-black text-gray-900">
                            <span>Gratuity</span>
                            <span>${tipAmount.toFixed(2)}</span>
                        </div>
                        
                        <div className="pt-6 border-t border-dashed border-gray-200 flex justify-between items-end">
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Total to Pay</p>
                                <p className="text-4xl font-black text-gray-900 tracking-tighter mt-1">${total.toFixed(2)}</p>
                            </div>
                            <div className="bg-red-50 text-red-600 p-3 rounded-2xl shadow-inner">
                                <CreditCard size={24} />
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="space-y-4">
                        <button 
                            form="payment-form" // This triggers the card form if visible
                            onClick={paymentMethod !== 'card' ? handlePayment : undefined}
                            disabled={isProcessing || cartItems.length === 0}
                            className="w-full bg-red-600 text-white py-6 rounded-[1.8rem] font-black text-xl hover:bg-red-700 transition-all shadow-2xl shadow-red-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 relative overflow-hidden group active:scale-[0.98]"
                        >
                            {isProcessing ? (
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span className="text-sm uppercase tracking-widest">Securing Order...</span>
                                </div>
                            ) : (
                                <>
                                    <span className="group-hover:translate-x-1 transition-transform">Complete Purchase</span>
                                    <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
                                </>
                            )}
                            
                            {/* Reflection effect */}
                            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </button>
                        
                        <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest font-bold leading-loose">
                            Secured by Presto Encryption <br/>
                            <a href="#" className="underline hover:text-red-600 transition-colors">Terms of Sale</a> • <a href="#" className="underline hover:text-red-600 transition-colors">Refund Policy</a>
                        </p>
                    </div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
