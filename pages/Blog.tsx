
import React, { useState } from 'react';
import { Search, Calendar, Clock, ChevronRight, ArrowRight, Mail, CheckCircle, Loader2 } from 'lucide-react';
import { BLOG_POSTS } from '../data';
import { BlogPost } from '../types';

interface BlogProps {
  onNavigate: (page: string, id?: string) => void;
}

const CATEGORIES = ['All', 'Recipes', 'Behind the Scenes', 'Promotions', 'Community'];

export default function Blog({ onNavigate }: BlogProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [email, setEmail] = useState('');

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubStatus('submitting');

      const formData = new FormData();
      formData.append("access_key", "cae56c3a-13e8-4ed8-ac4f-1ac20111063f");
      formData.append("email", email);
      formData.append("subject", "New Newsletter Subscription");
      formData.append("from_name", "Presto Pizza Newsletter");

      try {
          const response = await fetch("https://api.web3forms.com/submit", {
              method: "POST",
              body: formData
          });

          const data = await response.json();
          if (data.success) {
              setSubStatus('success');
              setEmail('');
              // Reset after 5 seconds to allow another sub if needed
              setTimeout(() => setSubStatus('idle'), 5000);
          } else {
              alert(data.message || "Something went wrong. Please try again.");
              setSubStatus('idle');
          }
      } catch (err) {
          alert("Network error. Please check your connection.");
          setSubStatus('idle');
      }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-12 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">The Slice Blog</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-8">
            Stories from the kitchen, cooking tips, community events, and the latest news from Presto Pizza.
          </p>
          
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar / Categories */}
          <div className="lg:w-64 flex-shrink-0">
             <div className="sticky top-28 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-lg text-gray-900 mb-4">Categories</h3>
                <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 hide-scrollbar">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                                activeCategory === cat 
                                ? 'bg-red-50 text-red-600 font-bold' 
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
             </div>
          </div>

          {/* Main Grid */}
          <div className="flex-1">
            {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredPosts.map(post => (
                        <div 
                            key={post.id} 
                            onClick={() => onNavigate('blog-post', post.id)}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer flex flex-col h-full"
                        >
                            <div className="h-56 overflow-hidden relative">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-md">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                    <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
                                    <span className="flex items-center gap-1"><Clock size={12}/> {post.readTime}</span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                                    {post.title}
                                </h2>
                                <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-1">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center text-red-600 font-bold text-sm mt-auto">
                                    Read Article <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">No articles found.</p>
                    <button onClick={() => { setActiveCategory('All'); setSearchQuery(''); }} className="text-red-600 font-bold mt-2">Clear Filters</button>
                </div>
            )}
          </div>

        </div>

        {/* Newsletter Section with Web3Forms Integration */}
        <div className="mt-20 bg-gray-900 rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-red-900/10">
             <div className="relative z-10 max-w-2xl mx-auto">
                 {subStatus === 'success' ? (
                     <div className="animate-in zoom-in-95 duration-500 flex flex-col items-center">
                         <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 mb-6 border border-green-500/30">
                             <CheckCircle size={40} />
                         </div>
                         <h2 className="text-3xl font-bold mb-4">You're on the list!</h2>
                         <p className="text-gray-400">Thanks for joining our inner circle. Check your inbox soon for your welcome gift!</p>
                     </div>
                 ) : (
                    <>
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-amber-400 mx-auto mb-6">
                            <Mail size={32} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Subscribe to <span className="text-red-500">The Slice</span></h2>
                        <p className="text-gray-400 mb-8 text-lg">Get the latest pizza news, exclusive deals, and secret recipes delivered straight to your inbox.</p>
                        
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input 
                                required
                                name="email"
                                type="email" 
                                placeholder="Enter your email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={subStatus === 'submitting'}
                                className="flex-1 px-6 py-4 rounded-2xl text-gray-900 outline-none focus:ring-4 focus:ring-red-500/50 bg-white shadow-lg transition-all disabled:opacity-50" 
                            />
                            <button 
                                type="submit"
                                disabled={subStatus === 'submitting'}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-lg hover:shadow-red-600/20 active:scale-95 flex items-center justify-center gap-2 min-w-[140px] disabled:opacity-70"
                            >
                                {subStatus === 'submitting' ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        Joining...
                                    </>
                                ) : 'Subscribe'}
                            </button>
                        </form>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black mt-6 opacity-50">
                            No spam. Just delicious pizza news.
                        </p>
                    </>
                 )}
             </div>
             {/* Decorative */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400/5 rounded-full blur-[100px] -ml-32 -mb-32"></div>
        </div>

      </div>
    </div>
  );
}
