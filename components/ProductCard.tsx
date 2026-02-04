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
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full border border-gray-100">
      <div className="relative aspect-w-1 aspect-h-1 h-56 w-full overflow-hidden bg-gray-200">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover object-center group-hover:opacity-75 transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{product.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-primary">
            {product.price} <span className="text-xs font-normal text-gray-500">{CURRENCY}</span>
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="inline-flex items-center justify-center p-2 rounded-full bg-secondary text-white hover:bg-primary transition-colors duration-300 shadow-md"
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