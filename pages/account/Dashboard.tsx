import React, { useState, useRef } from 'react';
import { 
    User, ShoppingBag, MapPin, 
    Settings, LogOut, Award, ChevronRight, 
    CreditCard, Clock, RotateCcw, Edit2, Check, X, Bell,
    Plus, Shield, Wallet, Trash2, Home as HomeIcon, Briefcase,
    Utensils, Calendar, Camera, Loader2, ArrowRight, Star,
    Gift, Zap, Heart, Info, Mail, Lock, HelpCircle, Store,
    MessageCircle, ShieldCheck
} from 'lucide-react';
import { MOCK_USER } from '../../data';
import { useAuth } from '../../context/AuthContext';
import { DeliveryAddress } from '../../types';

interface DashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onStartOrder: () => void;
}

type TabType = 'overview' | 'orders' | 'addresses' | 'settings';

export default function Dashboard({ onNavigate, onLogout, onStartOrder }: DashboardProps) {
  const { user, updateProfile, resetPassword, deleteAccount } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(user?.name || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Preferences State
  const [notifications, setNotifications] = useState({
      sms: true,
      email: true,
      promos: false
  });
  
  // Local state for addresses
  const [addresses, setAddresses] = useState<DeliveryAddress[]>(MOCK_USER.addresses);
  const [newAddress, setNewAddress] = useState({ type: 'Home', street: '', city: '', zip: '' });

  if (!user) return null;

  const handleUpdateName = async () => {
    if (!newName.trim() || newName === user.name) {
      setIsEditingName(false);
      return;
    }

    setIsUpdating(true);
    try {
      await updateProfile({ name: newName });
      setIsEditingName(false);
    } catch (error) {
      alert("Failed to update name");
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 1024 * 1024) {
          alert("File is too large (max 1MB)");
          return;
      }
      setIsUploading(true);

      try {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64String = reader.result as string;
          await updateProfile({ photoURL: base64String });
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        alert("Failed to upload photo");
        setIsUploading(false);
      }
    }
  };

  const handleDeleteAccount = async () => {
      if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
          setIsDeleting(true);
          try {
              await deleteAccount();
              onNavigate('home'); 
          } catch (error: any) {
              alert(error.message);
              setIsDeleting(false);
          }
      }
  };

  const handleReorder = (orderId: string) => {
    alert(`Re-adding items from order ${orderId} to your cart. Redirecting to menu...`);
    onNavigate('menu');
  };

  const handleAddAddress = (e: React.FormEvent) => {
      e.preventDefault();
      const id = `addr-${Date.now()}`;
      setAddresses([...addresses, { ...newAddress, id }]);
      setShowAddressModal(false);
      setNewAddress({ type: 'Home', street: '', city: '', zip: '' });
  };

  const removeAddress = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  const triggerReset = async () => {
    if (!user?.email) return;
    setIsResetting(true);
    try {
      await resetPassword(user.email);
      alert(`A password reset link has been sent to ${user.email}`);
    } catch (error) {
      alert("Failed to send reset email. Please try again later.");
    } finally {
      setIsResetting(false);
    }
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getFirstName = (fullName: string) => {
      if (!fullName || fullName === 'Guest') return 'there';
      return fullName.split(' ')[0];
  };

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome Banner */}
      <div className="bg-gray-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-gray-200">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1 text-center md:text-left">
                  <span className="inline-block px-3 py-1 bg-red-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">Silver Member</span>
                  <h2 className="text-4xl lg:text-5xl font-black mb-4">Hello, {getFirstName(user.name)}!</h2>
                  <p className="text-gray-400 text-lg max-w-md">
                      Welcome back to your Presto Pizza dashboard. Your next artisan feast is just a few clicks away!
                  </p>
                  <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
                    <button 
                        onClick={onStartOrder}
                        className="bg-red-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-700 transition-all flex items-center gap-3 shadow-xl shadow-red-900/20 active:scale-95 group"
                    >
                        Start New Order <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                        onClick={() => onNavigate('menu')}
                        className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all active:scale-95 border border-white/10"
                    >
                        Browse Menu
                    </button>
                  </div>
              </div>
              <div className="relative shrink-0 group">
                <img 
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80" 
                    alt="Pizza" 
                    className="w-56 h-56 object-cover rounded-[3rem] border-8 border-white/5 shadow-2xl transition-transform duration-700 group-hover:rotate-12"
                />
              </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      </div>

      {/* Dynamic Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button 
            onClick={() => setActiveTab('orders')}
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:border-red-100 transition-all active:scale-95"
          >
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ShoppingBag size={28} />
              </div>
              <div className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">Lifetime Orders</div>
              <div className="text-3xl font-black text-gray-900 flex items-center gap-2">12 <ChevronRight size={16} className="text-gray-300" /></div>
          </button>
          <button 
            onClick={() => onNavigate('locations')}
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:border-blue-100 transition-all cursor-pointer active:scale-95"
          >
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MapPin size={28} />
              </div>
              <div className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">Preferred Store</div>
              <div className="text-xl font-black text-gray-900 flex items-center gap-2">Downtown Main <ChevronRight size={16} className="text-gray-300" /></div>
          </button>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10 px-2">
        <h3 className="text-3xl font-black text-gray-900 mb-2">Order History</h3>
        <p className="text-gray-500 font-medium">Every slice counts. Here's your complete journey with Presto.</p>
      </div>
      <div className="space-y-6">
          {MOCK_USER.recentOrders.map(order => (
              <div key={order.id} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                  <div className="flex flex-col lg:flex-row justify-between gap-10 relative z-10">
                      <div className="flex flex-col sm:flex-row gap-8">
                          <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center text-gray-300 shrink-0 border border-gray-100 group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                              <Utensils size={40} />
                          </div>
                          <div className="space-y-4">
                              <div>
                                  <div className="flex items-center gap-4 mb-2">
                                      <h4 className="text-2xl font-black text-gray-900">Order {order.id}</h4>
                                      <span className="bg-green-100 text-green-700 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-[0.2em]">{order.status}</span>
                                  </div>
                                  <p className="text-gray-600 font-bold text-lg">{order.items.join(' • ')}</p>
                              </div>
                              <div className="flex flex-wrap items-center gap-8">
                                  <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</p>
                                    <p className="text-sm font-black text-gray-900 flex items-center gap-2"><Calendar size={14} className="text-red-500"/> {order.date}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount Paid</p>
                                    <p className="text-sm font-black text-gray-900 flex items-center gap-2"><Wallet size={14} className="text-amber-500"/> ${order.total}</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0 justify-center">
                          <button 
                            onClick={() => handleReorder(order.id)}
                            className="bg-red-600 text-white px-10 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-red-100 active:scale-95"
                          >
                              <RotateCcw size={20} /> Reorder This
                          </button>
                      </div>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );

  const renderAddresses = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-end mb-10 px-2">
            <div>
                <h3 className="text-3xl font-black text-gray-900 mb-2">Delivery Locations</h3>
                <p className="text-gray-500 font-medium">Save your favorite spots for even faster ordering.</p>
            </div>
            <button 
                onClick={() => setShowAddressModal(true)}
                className="bg-gray-900 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all flex items-center gap-3 shadow-xl active:scale-95"
            >
                <Plus size={18} /> Add New Address
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map(addr => (
                <div key={addr.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:border-red-100 transition-all group relative">
                    <div className="flex items-start gap-5">
                        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 border border-gray-100 group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                            {addr.type === 'Home' ? <HomeIcon size={24} /> : addr.type === 'Work' ? <Briefcase size={24} /> : <MapPin size={24} />}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h4 className="font-black text-gray-900 text-xl">{addr.type}</h4>
                                <button 
                                    onClick={() => removeAddress(addr.id!)}
                                    className="p-2 text-gray-300 hover:text-red-600 transition-colors active:scale-90"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                            <p className="text-gray-600 font-bold mt-2">{addr.street}</p>
                            <p className="text-gray-400 font-medium">{addr.city}, {addr.zip}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {showAddressModal && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddressModal(false)}></div>
                <form onSubmit={handleAddAddress} className="bg-white rounded-[3rem] p-10 w-full max-w-md relative z-10 animate-in zoom-in-95 duration-300 shadow-2xl">
                    <h3 className="text-2xl font-black text-gray-900 mb-8">New Delivery Spot</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Label</label>
                            <select 
                                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white outline-none"
                                value={newAddress.type}
                                onChange={e => setNewAddress({...newAddress, type: e.target.value})}
                            >
                                <option>Home</option>
                                <option>Work</option>
                                <option>Friend</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Street Address</label>
                            <input 
                                required
                                type="text"
                                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white outline-none"
                                placeholder="123 Pizza St"
                                value={newAddress.street}
                                onChange={e => setNewAddress({...newAddress, street: e.target.value})}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">City</label>
                                <input 
                                    required
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white outline-none"
                                    placeholder="New York"
                                    value={newAddress.city}
                                    onChange={e => setNewAddress({...newAddress, city: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Zip Code</label>
                                <input 
                                    required
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white outline-none"
                                    placeholder="10001"
                                    value={newAddress.zip}
                                    onChange={e => setNewAddress({...newAddress, zip: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 mt-10">
                        <button 
                            type="button" 
                            onClick={() => setShowAddressModal(false)}
                            className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-100 active:scale-95"
                        >
                            Save Spot
                        </button>
                    </div>
                </form>
            </div>
        )}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="px-2">
            <h3 className="text-3xl font-black text-gray-900 mb-2">Profile Settings</h3>
            <p className="text-gray-500 font-medium">Keep your account secure and up to date.</p>
        </div>

        {/* Section 1: Quick Links & General */}
        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                <button 
                    onClick={() => setActiveTab('addresses')}
                    className="flex items-center gap-5 p-6 rounded-3xl border border-gray-100 hover:border-red-100 hover:bg-red-50/30 transition-all group active:scale-95"
                >
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <MapPin size={20} />
                    </div>
                    <div className="text-left">
                        <h4 className="font-black text-gray-900 text-lg">Manage Addresses</h4>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Saved locations</p>
                    </div>
                </button>
                <button 
                    onClick={() => onNavigate('locations')}
                    className="flex items-center gap-5 p-6 rounded-3xl border border-gray-100 hover:border-amber-100 hover:bg-amber-50/30 transition-all group active:scale-95"
                >
                    <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-all">
                        <Store size={20} />
                    </div>
                    <div className="text-left">
                        <h4 className="font-black text-gray-900 text-lg">Preferred Store</h4>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Downtown Main</p>
                    </div>
                </button>
            </div>
        </div>

        {/* Section 2: Security & Privacy */}
        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="p-10 space-y-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
                            <Shield size={24} />
                        </div>
                        <div>
                            <h4 className="font-black text-gray-900 text-xl">Account Security</h4>
                            <p className="text-gray-400 font-medium">Update your password via secure email link</p>
                        </div>
                    </div>
                    <button 
                        onClick={triggerReset}
                        disabled={isResetting}
                        className="min-w-[180px] px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isResetting ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />}
                        {isResetting ? 'Sending...' : 'Reset Password'}
                    </button>
                </div>

                <hr className="border-gray-50" />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <h4 className="font-black text-gray-900 text-xl">Two-Factor Auth</h4>
                            <p className="text-gray-400 font-medium">Extra layer of security for your account</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-black text-gray-400 uppercase">Disabled</span>
                        <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer shadow-inner">
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Section 3: Preferences & Support */}
        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="p-10 space-y-10">
                {/* Notifications Toggles */}
                <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Notifications</h4>
                    
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center">
                                <Bell size={18} />
                            </div>
                            <span className="font-bold text-gray-700">Order Updates (SMS)</span>
                        </div>
                        <div 
                            onClick={() => toggleNotification('sms')}
                            className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${notifications.sms ? 'bg-green-500' : 'bg-gray-200'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${notifications.sms ? 'right-1' : 'left-1'}`}></div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                                <Mail size={18} />
                            </div>
                            <span className="font-bold text-gray-700">Marketing & Deals (Email)</span>
                        </div>
                        <div 
                            onClick={() => toggleNotification('email')}
                            className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${notifications.email ? 'bg-green-500' : 'bg-gray-200'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${notifications.email ? 'right-1' : 'left-1'}`}></div>
                        </div>
                    </div>
                </div>

                <hr className="border-gray-50" />

                {/* Support Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button 
                        onClick={() => onNavigate('contact')}
                        className="flex items-center justify-between p-6 rounded-[2rem] bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 transition-all active:scale-95 group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white text-gray-900 rounded-xl flex items-center justify-center shadow-sm group-hover:bg-red-600 group-hover:text-white transition-all">
                                <HelpCircle size={18} />
                            </div>
                            <span className="font-black text-xs uppercase tracking-widest">Help Center</span>
                        </div>
                        <ChevronRight size={16} className="text-gray-300" />
                    </button>
                    <button 
                        onClick={() => window.open('https://wa.me/233542134605', '_blank')}
                        className="flex items-center justify-between p-6 rounded-[2rem] bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 transition-all active:scale-95 group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white text-green-600 rounded-xl flex items-center justify-center shadow-sm group-hover:bg-green-600 group-hover:text-white transition-all">
                                <MessageCircle size={18} />
                            </div>
                            <span className="font-black text-xs uppercase tracking-widest">Live WhatsApp</span>
                        </div>
                        <ChevronRight size={16} className="text-gray-300" />
                    </button>
                </div>
            </div>
        </div>

        {/* Section 4: Danger Zone */}
        <div className="bg-red-50 rounded-[3rem] border border-red-100 p-10">
            <h4 className="font-black text-red-900 text-xl mb-6 flex items-center gap-2">
                <Shield size={24} /> Danger Zone
            </h4>

            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h4 className="font-black text-gray-900 text-lg">Sign Out</h4>
                        <p className="text-gray-500 font-medium">Log out of your account session safely</p>
                    </div>
                    <button 
                        onClick={onLogout}
                        className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all active:scale-95"
                    >
                        Logout
                    </button>
                </div>

                <hr className="border-red-200/50" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h4 className="font-black text-red-900 text-lg">Delete Account</h4>
                        <p className="text-red-600/60 font-medium">Permanently delete your account and data</p>
                    </div>
                    <button 
                        onClick={handleDeleteAccount}
                        disabled={isDeleting}
                        className="px-8 py-4 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-200 hover:bg-red-700 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
                    >
                        {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                        {isDeleting ? 'Deleting...' : 'Delete Account'}
                    </button>
                </div>
            </div>
        </div>
    </div>
  );

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto">
          
          {/* Sidebar Navigation */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden sticky top-32">
                {/* User Info Header */}
                <div className="p-8 text-center bg-gray-50 border-b border-gray-100 relative group">
                    <div className="relative inline-block mb-6">
                        <div className="w-32 h-32 rounded-[2.5rem] bg-gray-200 border-4 border-white shadow-2xl overflow-hidden relative">
                            {user.photoURL ? (
                                <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <User size={64} />
                                </div>
                            )}
                            {isUploading && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
                                    <Loader2 size={32} className="text-white animate-spin" />
                                </div>
                            )}
                        </div>
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute -bottom-2 -right-2 bg-red-600 text-white p-3 rounded-2xl shadow-xl hover:bg-red-700 transition-all active:scale-90"
                            title="Update Profile Photo"
                        >
                            <Camera size={18} />
                        </button>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            accept="image/*" 
                            onChange={handlePhotoUpload} 
                        />
                    </div>
                    
                    <div className="space-y-1">
                        {isEditingName ? (
                            <div className="flex items-center gap-2 justify-center">
                                <input 
                                    className="w-full max-w-[150px] px-3 py-1 rounded-lg border border-red-200 text-center text-lg font-black outline-none"
                                    value={newName}
                                    onChange={e => setNewName(e.target.value)}
                                    autoFocus
                                />
                                <button onClick={handleUpdateName} disabled={isUpdating} className="p-2 text-green-600 hover:bg-green-50 rounded-lg active:scale-90">
                                    {isUpdating ? <Loader2 size={20} className="animate-spin" /> : <Check size={20} />}
                                </button>
                                <button onClick={() => setIsEditingName(false)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg active:scale-90">
                                    <X size={20} />
                                </button>
                            </div>
                        ) : (
                            <h2 className="text-2xl font-black text-gray-900 flex items-center justify-center gap-2">
                                {user.name}
                                <button onClick={() => setIsEditingName(true)} className="p-1 text-gray-400 hover:text-red-600 transition-colors active:scale-90">
                                    <Edit2 size={14} />
                                </button>
                            </h2>
                        )}
                        <p className="text-sm font-bold text-gray-400">{user.email}</p>
                    </div>
                </div>

                {/* Nav Links */}
                <nav className="p-4 space-y-2">
                    {[
                        { id: 'overview', label: 'Dashboard', icon: Star, color: 'text-amber-500' },
                        { id: 'orders', label: 'My Orders', icon: ShoppingBag, color: 'text-red-600' },
                        { id: 'addresses', label: 'Addresses', icon: MapPin, color: 'text-blue-500' },
                        { id: 'settings', label: 'Settings', icon: Settings, color: 'text-gray-600' },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id as TabType)}
                            className={`w-full flex items-center justify-between p-5 rounded-[1.8rem] transition-all group active:scale-[0.98] ${
                                activeTab === item.id 
                                ? 'bg-red-50 text-red-600 shadow-inner' 
                                : 'hover:bg-gray-50 text-gray-500'
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-xl transition-all ${activeTab === item.id ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-50 group-hover:bg-white'}`}>
                                    <item.icon size={20} />
                                </div>
                                <span className="font-black text-xs uppercase tracking-widest">{item.label}</span>
                            </div>
                            {activeTab === item.id && <ChevronRight size={18} />}
                        </button>
                    ))}
                    
                    <div className="pt-4 border-t border-gray-50 mt-4">
                        <button
                            onClick={onLogout}
                            className="w-full flex items-center gap-4 p-5 rounded-[1.8rem] text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all group active:scale-[0.98]"
                        >
                            <div className="p-2 bg-gray-50 group-hover:bg-white rounded-xl">
                                <LogOut size={20} />
                            </div>
                            <span className="font-black text-xs uppercase tracking-widest">Logout Session</span>
                        </button>
                    </div>
                </nav>
            </div>
          </aside>

          {/* Main Display Area */}
          <main className="flex-1 min-h-[600px]">
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'orders' && renderOrders()}
              {activeTab === 'addresses' && renderAddresses()}
              {activeTab === 'settings' && renderSettings()}
          </main>
        </div>
      </div>
    </div>
  );
}