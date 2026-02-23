
import React from 'react';
import { ArrowLeft, Calendar, Clock, User, Facebook, Twitter, Linkedin, Share2 } from 'lucide-react';
import { BLOG_POSTS } from '../data';
import { BlogPost as BlogPostType } from '../types';

interface BlogPostProps {
  postId: string;
  onNavigate: (page: string, id?: string) => void;
  onBack: () => void;
}

export default function BlogPost({ postId, onNavigate, onBack }: BlogPostProps) {
  const post = BLOG_POSTS.find(p => p.id === postId);
  
  // Get related posts (same category, excluding current)
  const relatedPosts = BLOG_POSTS
    .filter(p => p.category === post?.category && p.id !== post?.id)
    .slice(0, 2);

  if (!post) {
      return (
          <div className="pt-32 text-center container mx-auto px-4">
              <h2 className="text-2xl font-bold">Post not found</h2>
              <button onClick={onBack} className="text-red-600 mt-4 underline">Back to Blog</button>
          </div>
      );
  }

  return (
    <div className="bg-white min-h-screen animate-in fade-in duration-500 pb-20">
        
        {/* Scroll Progress Bar (Simple) */}
        <div className="fixed top-0 left-0 h-1 bg-red-600 z-50 w-full origin-left scale-x-0 animate-[grow_1s_ease-out_forwards]"></div>

        {/* Hero Image */}
        <div className="relative h-[50vh] md:h-[60vh] w-full">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-4 md:p-10 container mx-auto">
                 <div className="max-w-4xl mx-auto text-white">
                     <button onClick={onBack} className="flex items-center gap-2 text-white/80 hover:text-white mb-6 font-semibold transition-colors">
                         <ArrowLeft size={20} /> Back to Blog
                     </button>
                     <div className="flex gap-2 mb-4">
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            {post.category}
                        </span>
                     </div>
                     <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                         {post.title}
                     </h1>
                     <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-gray-300">
                         <div className="flex items-center gap-2">
                             <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                                 <User size={14} />
                             </div>
                             <span>{post.author}</span>
                         </div>
                         <div className="flex items-center gap-2">
                             <Calendar size={16} /> {post.date}
                         </div>
                         <div className="flex items-center gap-2">
                             <Clock size={16} /> {post.readTime}
                         </div>
                     </div>
                 </div>
            </div>
        </div>

        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
                
                {/* Main Content */}
                <div className="lg:w-3/4">
                    <div className="prose prose-lg prose-red max-w-none text-gray-700 leading-relaxed">
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-100">
                        <h4 className="font-bold text-gray-900 mb-4">Tags:</h4>
                        <div className="flex gap-2 flex-wrap">
                            {post.tags.map(tag => (
                                <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:w-1/4 space-y-8">
                    {/* Share */}
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 sticky top-28">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Share2 size={18} /> Share this article
                        </h3>
                        <div className="flex gap-2">
                            <button className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"><Facebook size={18}/></button>
                            <button className="p-3 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"><Twitter size={18}/></button>
                            <button className="p-3 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition-colors"><Linkedin size={18}/></button>
                        </div>
                    </div>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <div>
                            <h3 className="font-bold text-xl text-gray-900 mb-6">Related Posts</h3>
                            <div className="space-y-6">
                                {relatedPosts.map(rp => (
                                    <div 
                                        key={rp.id} 
                                        className="group cursor-pointer"
                                        onClick={() => onNavigate('blog-post', rp.id)}
                                    >
                                        <div className="h-32 rounded-xl overflow-hidden mb-3">
                                            <img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <h4 className="font-bold text-gray-900 leading-tight group-hover:text-red-600 transition-colors">
                                            {rp.title}
                                        </h4>
                                        <span className="text-xs text-gray-500 mt-1 block">{rp.date}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    </div>
  );
}
