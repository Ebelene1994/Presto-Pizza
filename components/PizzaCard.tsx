
import React, { useState } from 'react';
import { Product, SizeOption } from '../types';
import { ShoppingBag, Star, Heart, Info, Eye, ExternalLink } from 'lucide-react';

interface PizzaCardProps {
  product: Product;
  onAddToCart: (product: Product, size?: SizeOption) => void;
  showDetails?: boolean;
}

const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/E8jcVHQde4V3NoDgnxFFg8";
const WHATSAPP_ICON_URL = "https://png.pngtree.com/element_our/png_detail/20181011/whatsapp-social-media-icon-design-template-vector-png_127011.png";

export const PizzaCard: React.FC<PizzaCardProps> = ({ product, onAddToCart, showDetails = false }) => {
  const [selectedSize, setSelectedSize] = useState<SizeOption | undefined>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
  );
  
  const [isFavorited, setIsFavorited] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const currentPrice = selectedSize ? selectedSize.price : product.price;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Simulate navigation or modal opening
    alert(`Quick View: ${product.name}\n\n${product.description}\n\nCalories: ${product.calories || 'N/A'}\nRating: ${product.rating}/5`);
  };

  return (
    <div 
      className="group relative bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden cursor-pointer" onClick={handleQuickView}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Darker Overlay on Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-md p-4 rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <Eye size={24} className="text-gray-900" />
            </div>
        </div>

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.oldPrice && (
                <div className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    Sale
                </div>
            )}
            {product.tags?.includes('vegetarian') && (
                 <div className="bg-green-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    Veg
                </div>
            )}
        </div>

        {/* Favorite Button */}
        <div className="absolute top-4 right-4 z-10">
           <button 
             onClick={handleFavoriteClick}
             className={`p-3 rounded-2xl shadow-xl transition-all duration-300 transform active:scale-90 ${
               isFavorited 
               ? 'bg-red-600 text-white scale-105' 
               : 'bg-white/90 backdrop-blur-sm text-gray-400 hover:text-red-500'
             }`}
           >
            <Heart size={20} className={isFavorited ? 'fill-current' : ''} />
          </button>
        </div>
        
        {/* Info Trigger */}
        {(product.allergens || product.calories) && (
             <div 
                className="absolute bottom-4 left-4 z-10"
                onMouseEnter={() => setShowInfo(true)}
                onMouseLeave={() => setShowInfo(false)}
             >
                 <div className="p-2.5 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg text-gray-500 cursor-help hover:bg-white hover:text-gray-900 transition-colors border border-white/20">
                    <Info size={18} />
                 </div>
                 {showInfo && (
                     <div className="absolute bottom-full left-0 mb-3 w-56 bg-gray-900/95 backdrop-blur-md text-white p-5 rounded-[1.5rem] shadow-2xl z-20 animate-in fade-in slide-in-from-bottom-2 duration-300 border border-white/10">
                         <div className="flex items-center gap-2 mb-3 text-amber-400 font-black text-[10px] uppercase tracking-widest">
                            <Info size={14} /> Nutrition Facts
                         </div>
                         {product.calories && (
                            <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-2">
                                <span className="text-gray-400 text-xs">Energy</span>
                                <span className="font-bold text-sm">{product.calories} kcal</span>
                            </div>
                         )}
                         {product.allergens && (
                             <div>
                                 <span className="text-gray-400 text-[10px] block mb-1 uppercase font-black">Allergens</span>
                                 <div className="flex flex-wrap gap-1">
                                    {product.allergens.map(a => (
                                        <span key={a} className="bg-white/10 px-2 py-0.5 rounded text-[10px] font-bold">{a}</span>
                                    ))}
                                 </div>
                             </div>
                         )}
                     </div>
                 )}
             </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
              <h3 
                className="text-xl font-black text-gray-900 group-hover:text-red-600 transition-colors line-clamp-1 cursor-pointer"
                onClick={handleQuickView}
              >
                {product.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <span className="text-[10px] font-black text-amber-700">{product.rating}</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">• {product.category}</span>
              </div>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm mb-6 line-clamp-2 font-medium leading-relaxed">
          {product.description}
        </p>

        {/* Size Selection UI */}
        {product.sizes && (
            <div className="flex gap-2 mb-6 p-1.5 bg-gray-50 rounded-2xl border border-gray-100">
                {product.sizes.map((size) => (
                    <button
                        key={size.label}
                        onClick={() => setSelectedSize(size)}
                        className={`flex-1 text-xs font-black py-2 rounded-xl transition-all transform active:scale-95 ${
                            selectedSize?.label === size.label 
                            ? 'bg-white text-red-600 shadow-lg border border-red-50' 
                            : 'text-gray-400 hover:text-gray-900'
                        }`}
                    >
                        {size.label}
                    </button>
                ))}
            </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-50 gap-4">
            <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Price</span>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-gray-900">${currentPrice.toFixed(2)}</span>
                    {product.oldPrice && !selectedSize && (
                        <span className="text-sm text-gray-400 line-through font-bold">${product.oldPrice}</span>
                    )}
                </div>
            </div>

          <div className="flex items-center gap-3">
            {/* WhatsApp Link Icon */}
            <a 
              href={WHATSAPP_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center bg-green-50 rounded-2xl hover:bg-green-100 transition-all hover:scale-110 active:scale-90 border border-green-100 shadow-sm"
              title="Share or Inquiry via WhatsApp"
            >
              <img 
                src={WHATSAPP_ICON_URL} 
                alt="WhatsApp" 
                className="w-8 h-8 object-contain"
              />
            </a>

            {/* Add to Cart Button */}
            <button
              onClick={() => onAddToCart(product, selectedSize)}
              className="flex items-center gap-3 bg-gray-900 text-white px-6 py-4 rounded-2xl hover:bg-red-600 transition-all font-black text-xs uppercase tracking-widest shadow-2xl shadow-gray-200 active:scale-[0.98] group/btn"
            >
              <ShoppingBag size={18} className="group-hover/btn:scale-110 transition-transform" />
              Add to Bag
            </button>
          </div>
        </div>
      </div>
      
      {/* Visual Indicator of Activity */}
      <div className={`absolute bottom-0 left-0 h-1 bg-red-600 transition-all duration-500 ease-out ${isHovered ? 'w-full' : 'w-0'}`}></div>
    </div>
  );
};
