
import React, { useState, useEffect } from 'react';
import { 
  Menu as MenuIcon, ShoppingCart, Search, 
  Phone, ChevronDown, X, Utensils, MessageCircle, Clock, MapPin, User as UserIcon, LogOut, Heart, ShoppingBag, LogIn
} from 'lucide-react';
import { Product, CartItem, SizeOption, OrderInfo, Page, Category } from './types';
import { CartSidebar } from './components/CartSidebar';
import Home from './pages/Home';
import MenuPage from './pages/Menu';
import OrderPage from './pages/Order';
import CheckoutPage from './pages/Checkout';
import TrackingPage from './pages/Tracking';
import LocationsPage from './pages/Locations';
import AboutPage from './pages/About';
import CareersPage from './pages/Careers';
import GiftCardsPage from './pages/GiftCards';
import BlogPage from './pages/Blog';
import BlogPostPage from './pages/BlogPost';
import ContactPage from './pages/Contact';
import CateringPage from './pages/Catering';
import DashboardPage from './pages/account/Dashboard';
import LoginPage from './pages/auth/Login';
import SignUpPage from './pages/auth/SignUp';
import ForgotPasswordPage from './pages/auth/ForgotPassword';
import ResetPasswordPage from './pages/auth/ResetPassword';
import VerifyEmailPage from './pages/auth/VerifyEmail';
import JotformChatbot from './components/JotformChatbot';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PrivateRoute, PublicRoute } from './lib/ProtectedRoute';

const LOGO_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzZrLBTuezhzClsDbkiEXLXzcbhwNTlmyQ1XKGwOrxcg&s";

function MainApp() {
  const { user, logout, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentBlogPostId, setCurrentBlogPostId] = useState<string | undefined>(undefined);
  const [activeMenuCategory, setActiveMenuCategory] = useState<Category | 'all'>('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<{message: string, show: boolean}>({ message: '', show: false });
  const [orderInfo, setOrderInfo] = useState<OrderInfo | undefined>(undefined);
  const [myStoreId, setMyStoreId] = useState<string | undefined>(undefined);
  const [authEmail, setAuthEmail] = useState(''); // Used for verify/reset screens

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    const savedStore = localStorage.getItem('presto_my_store');
    if (savedStore) setMyStoreId(savedStore);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
      window.scrollTo(0,0);
      setIsMobileMenuOpen(false);
  }, [currentPage, currentBlogPostId]);

  const handleSetStore = (id: string) => {
      setMyStoreId(id);
      localStorage.setItem('presto_my_store', id);
      setToast({ message: 'Store set as your favorite!', show: true });
      setTimeout(() => setToast({ message: '', show: false }), 3000);
  };

  const addToCart = (product: Product, size?: SizeOption) => {
    if (!user) {
      setToast({ message: 'Please Login to start ordering!', show: true });
      setTimeout(() => setToast({ message: '', show: false }), 3000);
      setCurrentPage('login');
      return;
    }

    setCartItems(prev => {
      const sizeId = size ? `-${size.label}` : '';
      const existingId = product.id + sizeId;
      
      const existing = prev.find(p => {
          const pSizeId = p.selectedSize ? `-${p.selectedSize.label}` : '';
          return (p.id + pSizeId) === existingId;
      });
      
      if (existing) {
        return prev.map(item => {
            const itemSizeId = item.selectedSize ? `-${item.selectedSize.label}` : '';
            if ((item.id + itemSizeId) === existingId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
      }
      
      return [...prev, { 
          ...product, 
          quantity: 1, 
          selectedSize: size, 
          price: size ? size.price : product.price 
      }];
    });
    setToast({ message: `Added ${product.name} to cart!`, show: true });
    setTimeout(() => setToast({ message: '', show: false }), 3000);
    setCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number, sizeLabel?: string) => {
    setCartItems(prev => prev.map(item => {
      const matchSize = item.selectedSize?.label === sizeLabel || (!item.selectedSize && !sizeLabel);
      if (item.id === id && matchSize) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeItem = (id: string, sizeLabel?: string) => {
    setCartItems(prev => prev.filter(item => {
        const matchSize = item.selectedSize?.label === sizeLabel || (!item.selectedSize && !sizeLabel);
        return !(item.id === id && matchSize);
    }));
  };

  const navigateTo = (page: string, param?: string) => {
      if (page === 'blog-post' && param) {
          setCurrentBlogPostId(param);
      }
      if (page === 'menu' && param) {
          setActiveMenuCategory(param as Category);
      } else if (page === 'menu') {
          setActiveMenuCategory('all');
      }
      
      // Handle passing email if provided as param
      if ((page === 'verify-email' || page === 'forgot-password' || page === 'reset-password') && param) {
          setAuthEmail(param);
      }

      setCurrentPage(page as Page);
  }

  const handleStartOrder = (info: OrderInfo) => {
      setOrderInfo(info);
      if (currentPage === 'order-setup') {
          setCurrentPage('checkout');
      } else {
          setCurrentPage('menu');
      }
      setToast({ message: `Ready for ${info.method}!`, show: true });
      setTimeout(() => setToast({ message: '', show: false }), 3000);
  };

  const handlePlaceOrder = () => {
      setCartItems([]);
      setCurrentPage('tracking');
      setToast({ message: 'Order placed successfully!', show: true });
      setTimeout(() => setToast({ message: '', show: false }), 3000);
  };

  const handleStartOrderFlow = () => {
      if (!user) {
          setToast({ message: 'Please Login to start ordering!', show: true });
          setTimeout(() => setToast({ message: '', show: false }), 3000);
          setCurrentPage('login');
          return;
      }
      if (!orderInfo) {
          setCurrentPage('order-setup');
      } else {
          setCurrentPage('menu');
      }
  };

  const handleCheckoutClick = () => {
      if (!orderInfo) {
          setCurrentPage('order-setup');
          setToast({ message: 'Tell us where to send your pizza first!', show: true });
          setTimeout(() => setToast({ message: '', show: false }), 3000);
      } else {
          setCurrentPage('checkout');
      }
  }

  const handleLogout = async () => {
      await logout();
      setToast({ message: 'Successfully logged out.', show: true });
      setTimeout(() => setToast({ message: '', show: false }), 3000);
      setCurrentPage('home');
  };

  const simplifiedFooterPages: Page[] = ['tracking', 'checkout', 'verify-email'];
  const showFooter = !simplifiedFooterPages.includes(currentPage);
  const showSimplifiedFooter = simplifiedFooterPages.includes(currentPage);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <JotformChatbot />
      
      <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[90] bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="bg-green-500 rounded-full p-1"><Utensils size={12} /></div>
        {toast.message}
      </div>

      <header className={`fixed w-full z-[60] transition-all duration-300 ${isScrolled || currentPage !== 'home' ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
          <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
              <div 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => navigateTo('home')}
              >
              <img src={LOGO_URL} alt="Presto Logo" className="w-10 h-10 rounded-full object-cover shadow-lg" />
              <span className={`text-2xl font-bold tracking-tight ${isScrolled || currentPage !== 'home' ? 'text-gray-900' : 'text-white'}`}>
                  Presto<span className="text-red-600">Pizza</span>
              </span>
              </div>

              <nav className="hidden lg:flex items-center gap-8">
              <button 
                  onClick={() => navigateTo('about')}
                  className={`text-sm font-semibold hover:text-red-500 transition-colors ${isScrolled || currentPage !== 'home' ? 'text-gray-700' : 'text-white/90'}`}
              >
                  About
              </button>
              
              <div className="relative group">
                  <button 
                      onClick={() => navigateTo('menu')}
                      className={`text-sm font-semibold hover:text-red-500 transition-colors flex items-center ${isScrolled || currentPage !== 'home' ? 'text-gray-700' : 'text-white/90'}`}
                  >
                      Our Menu <ChevronDown size={14} className="ml-1" />
                  </button>
                  <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
                      {[
                        { label: 'Pizza', id: 'pizza' },
                        { label: 'Pasta', id: 'pasta' },
                        { label: 'Salads', id: 'salad' },
                        { label: 'Sides', id: 'side' },
                        { label: 'Desserts', id: 'dessert' },
                        { label: 'Drinks', id: 'drink' }
                      ].map(item => (
                          <button 
                              key={item.id}
                              onClick={() => navigateTo('menu', item.id)}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 font-medium"
                          >
                              {item.label}
                          </button>
                      ))}
                  </div>
              </div>

              {['Order Now', 'Locations', 'Blog', 'Contact'].map((item) => (
                  <button 
                  key={item} 
                  onClick={() => 
                      item === 'Order Now' ? handleStartOrderFlow() : 
                      item === 'Locations' ? navigateTo('locations') : 
                      item === 'Blog' ? navigateTo('blog') : 
                      item === 'Contact' ? navigateTo('contact') : undefined
                  }
                  className={`text-sm font-semibold hover:text-red-500 transition-colors ${isScrolled || currentPage !== 'home' ? 'text-gray-700' : 'text-white/90'}`}
                  >
                  {item}
                  </button>
              ))}
              </nav>

              <div className="flex items-center gap-4">
              <a href="tel:+1234567890" className={`hidden xl:flex items-center gap-2 font-bold ${isScrolled || currentPage !== 'home' ? 'text-gray-900' : 'text-white'}`}>
                  <div className="bg-amber-400 p-2 rounded-full text-gray-900">
                  <Phone size={16} />
                  </div>
                  <span>+1 234 567 890</span>
              </a>

              {user && (
                   <div className="relative group">
                       <button
                           className={`p-2 pl-3 rounded-full transition-colors flex items-center gap-2 pr-4 ${
                               isScrolled || currentPage !== 'home' ? 'bg-gray-100 text-gray-900 hover:bg-gray-200' : 'bg-white/10 text-white hover:bg-white/20'
                           }`}
                       >
                           {user.photoURL ? (
                             <img src={user.photoURL} alt="Profile" className="w-6 h-6 rounded-full object-cover" />
                           ) : (
                             <UserIcon size={20} className="fill-current" />
                           )}
                           <span className="text-sm font-bold max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                           <ChevronDown size={14} />
                       </button>
                       <div className="absolute top-full right-0 w-56 bg-white shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 z-50">
                           <div className="px-4 py-3 border-b border-gray-100">
                               <div className="text-sm font-bold text-gray-900">{user.name}</div>
                           </div>
                           <button onClick={() => navigateTo('dashboard')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 flex items-center gap-2">
                               <UserIcon size={16} /> Dashboard
                           </button>
                           <button onClick={() => navigateTo('dashboard')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 flex items-center gap-2">
                               <ShoppingBag size={16} /> Order History
                           </button>
                           <div className="border-t border-gray-100 mt-1"></div>
                           <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium">
                               <LogOut size={16} /> Logout
                           </button>
                       </div>
                   </div>
              )}
              
              <button 
                  onClick={() => setCartOpen(true)}
                  className={`relative p-2 rounded-full transition-colors ${isScrolled || currentPage !== 'home' ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
              >
                  <ShoppingCart size={24} />
                  {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                      {cartItems.length}
                  </span>
                  )}
              </button>
              
              <button 
                  className="lg:hidden text-white"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                  <MenuIcon size={24} className={isScrolled || currentPage !== 'home' ? 'text-gray-900' : 'text-white'} />
              </button>
              </div>
          </div>
          </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white lg:hidden flex flex-col p-6 animate-in slide-in-from-right">
          <div className="flex justify-between items-center mb-8">
            <span className="text-2xl font-bold text-gray-900">Presto<span className="text-red-600">Pizza</span></span>
            <button onClick={() => setIsMobileMenuOpen(false)}><X size={32} /></button>
          </div>
          <nav className="flex flex-col gap-6 text-xl font-medium text-gray-800">
            <button onClick={() => navigateTo('home')} className="text-left border-b border-gray-100 pb-2">Home</button>
            <button onClick={() => navigateTo('about')} className="text-left border-b border-gray-100 pb-2">About Us</button>
            <button onClick={() => navigateTo('menu')} className="text-left border-b border-gray-100 pb-2 text-red-600">Our Menu</button>
            <button onClick={() => navigateTo('locations')} className="text-left border-b border-gray-100 pb-2">Locations</button>
            <button onClick={() => navigateTo('blog')} className="text-left border-b border-gray-100 pb-2">Blog</button>
            <button onClick={() => navigateTo('contact')} className="text-left border-b border-gray-100 pb-2">Contact</button>
            
            {user && (
                 <>
                    <button onClick={() => navigateTo('dashboard')} className="text-left border-b border-gray-100 pb-2 text-amber-600">My Dashboard</button>
                    <button onClick={handleLogout} className="text-left border-b border-gray-100 pb-2 text-red-500">Logout</button>
                 </>
            )}
            <button onClick={handleStartOrderFlow} className="text-left border-b border-gray-100 pb-2">Order Now</button>
          </nav>
        </div>
      )}

      <CartSidebar 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckoutClick}
      />

      <main className="flex-grow">
          {currentPage === 'home' && (
              <Home onAddToCart={addToCart} onNavigate={navigateTo} onStartOrder={handleStartOrderFlow} />
          )}
          {currentPage === 'menu' && (
              <MenuPage onAddToCart={addToCart} onNavigate={navigateTo} initialCategory={activeMenuCategory} />
          )}
          {currentPage === 'order-setup' && (
              <OrderPage 
                onStartOrder={handleStartOrder} 
                existingInfo={orderInfo} 
                onNavigate={navigateTo}
              />
          )}
          {currentPage === 'locations' && (
              <LocationsPage 
                onStartOrder={handleStartOrder} 
                selectedStoreId={myStoreId} 
                onSetStore={handleSetStore} 
              />
          )}
          {currentPage === 'about' && (
              <AboutPage onNavigate={navigateTo} onStartOrder={handleStartOrderFlow} />
          )}
          {currentPage === 'careers' && (
              <CareersPage onNavigate={navigateTo} />
          )}
          {currentPage === 'gift-cards' && (
              <GiftCardsPage onNavigate={navigateTo} onAddToCart={addToCart} />
          )}
          {currentPage === 'blog' && (
              <BlogPage onNavigate={navigateTo} />
          )}
          {currentPage === 'blog-post' && currentBlogPostId && (
              <BlogPostPage 
                postId={currentBlogPostId} 
                onNavigate={navigateTo} 
                onBack={() => navigateTo('blog')} 
              />
          )}
          {currentPage === 'contact' && (
              <ContactPage />
          )}
          {currentPage === 'catering' && (
              <CateringPage onNavigate={navigateTo} />
          )}
          {currentPage === 'dashboard' && (
              <PrivateRoute onNavigate={navigateTo}>
                <DashboardPage onNavigate={navigateTo} onLogout={handleLogout} onStartOrder={handleStartOrderFlow} />
              </PrivateRoute>
          )}
          {currentPage === 'login' && (
              <PublicRoute onNavigate={navigateTo}>
                <LoginPage onNavigate={navigateTo} onLoginSuccess={() => navigateTo('home')} />
              </PublicRoute>
          )}
          {currentPage === 'signup' && (
              <PublicRoute onNavigate={navigateTo}>
                <SignUpPage onNavigate={navigateTo} onLoginSuccess={() => navigateTo('home')} />
              </PublicRoute>
          )}
          {currentPage === 'forgot-password' && (
              <PublicRoute onNavigate={navigateTo}>
                <ForgotPasswordPage onNavigate={navigateTo} />
              </PublicRoute>
          )}
          {currentPage === 'reset-password' && (
              <PublicRoute onNavigate={navigateTo}>
                <ResetPasswordPage onNavigate={navigateTo} onLoginSuccess={() => navigateTo('home')} />
              </PublicRoute>
          )}
          {currentPage === 'verify-email' && (
              <PublicRoute onNavigate={navigateTo}>
                  <VerifyEmailPage email={authEmail} onNavigate={navigateTo} />
              </PublicRoute>
          )}
          {currentPage === 'checkout' && (
              <PrivateRoute onNavigate={navigateTo}>
                  {orderInfo && (
                    <CheckoutPage 
                        cartItems={cartItems} 
                        orderInfo={orderInfo} 
                        onBack={() => navigateTo('menu')}
                        onEditInfo={() => navigateTo('order-setup')}
                        onPlaceOrder={handlePlaceOrder}
                    />
                  )}
              </PrivateRoute>
          )}
          {currentPage === 'tracking' && (
              <PrivateRoute onNavigate={navigateTo}>
                {orderInfo && <TrackingPage orderInfo={orderInfo} onNavigate={navigateTo} />}
              </PrivateRoute>
          )}
      </main>

      {(showFooter || showSimplifiedFooter) && (
          <footer className="bg-gray-900 text-white pt-20 pb-10">
            <div className="container mx-auto px-4">
                {showFooter ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <img src={LOGO_URL} alt="Presto Logo" className="w-10 h-10 rounded-full object-cover" />
                                <span className="text-2xl font-bold">Presto<span className="text-red-600">Pizza</span></span>
                            </div>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                We believe in the power of good food. Using only fresh ingredients and traditional methods, we bring the true taste of Italy to your doorstep.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                            <ul className="space-y-4 text-gray-400">
                                <li><button onClick={() => navigateTo('menu')} className="hover:text-white transition-colors">Menu</button></li>
                                <li><button onClick={() => navigateTo('locations')} className="hover:text-white transition-colors">Locations</button></li>
                                <li><button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">About Us</button></li>
                                <li><button onClick={() => navigateTo('blog')} className="hover:text-white transition-colors">Blog</button></li>
                                <li><button onClick={() => navigateTo('gift-cards')} className="hover:text-white transition-colors">Gift Cards</button></li>
                                <li><button onClick={() => navigateTo('catering')} className="hover:text-white transition-colors">Catering</button></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-6">Support</h4>
                            <ul className="space-y-4 text-gray-400">
                                <li><button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">Contact Us</button></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                            </ul>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                            <div className="flex items-center gap-4 mb-4">
                                <Clock size={40} className="text-amber-400" />
                                <div>
                                    <h4 className="font-bold text-xl">30 Min Delivery</h4>
                                    <p className="text-gray-400 text-sm">Guarantee</p>
                                </div>
                            </div>
                            <a href="tel:123456789" className="block text-center bg-red-600 py-3 rounded-full font-bold hover:bg-red-700 transition-colors">
                                Call Now
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="text-center mb-8">
                        <p className="text-gray-500">Need help? <a href="#" className="text-white hover:underline">Contact Support</a></p>
                    </div>
                )}
                
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p>&copy; 2025 Presto Pizza Inc. All rights reserved.</p>
                </div>
            </div>
          </footer>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
