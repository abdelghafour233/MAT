import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';
import { CURRENCY } from '../constants';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100 group">
      <div className="relative aspect-w-1 aspect-h-1 h-64 w-full overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover object-center group-hover:opacity-90 transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-primary transition-colors">{product.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-5 flex-1 leading-relaxed">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <span className="text-xl font-bold text-secondary">
            {product.price} <span className="text-sm font-medium text-gray-400">{CURRENCY}</span>
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="inline-flex items-center justify-center p-2.5 rounded-lg bg-secondary text-white hover:bg-primary hover:text-white transition-all duration-300 shadow-md transform active:scale-95"
            aria-label="Add to cart"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;