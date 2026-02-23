
import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number, sizeLabel?: string) => void;
  onRemoveItem: (id: string, sizeLabel?: string) => void;
  onCheckout: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-[70] ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[80] transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
                <ShoppingBag className="text-red-600" />
                <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">
                    {items.length} items
                </span>
            </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <ShoppingBag size={64} className="opacity-20" />
              <p className="text-lg font-medium">Your cart is empty</p>
              <button onClick={onClose} className="text-red-600 font-semibold hover:underline">
                Start Ordering
              </button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={`${item.id}-${item.selectedSize?.label || 'def'}`} className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-semibold text-gray-900 line-clamp-1">{item.name}</h4>
                        {item.selectedSize && (
                            <span className="text-xs bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded font-bold">
                                Size: {item.selectedSize.label}
                            </span>
                        )}
                    </div>
                    <button 
                        onClick={() => onRemoveItem(item.id, item.selectedSize?.label)} 
                        className="text-gray-400 hover:text-red-500 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
                        <button 
                            onClick={() => onUpdateQuantity(item.id, -1, item.selectedSize?.label)}
                            className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600 disabled:opacity-50"
                            disabled={item.quantity <= 1}
                        >
                            <Minus size={14} />
                        </button>
                        <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                        <button 
                            onClick={() => onUpdateQuantity(item.id, 1, item.selectedSize?.label)}
                            className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600"
                        >
                            <Plus size={14} />
                        </button>
                    </div>
                    <span className="font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-white space-y-4">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Tax (8%)</span>
              <span>${(subtotal * 0.08).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 pt-4 border-t border-dashed border-gray-200">
              <span>Total</span>
              <span>${(subtotal * 1.08).toFixed(2)}</span>
            </div>
            <button 
              onClick={() => {
                onClose();
                onCheckout();
              }}
              className="w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg hover:shadow-red-200 flex items-center justify-center gap-2"
            >
              Checkout Now
            </button>
          </div>
        )}
      </div>
    </>
  );
};
