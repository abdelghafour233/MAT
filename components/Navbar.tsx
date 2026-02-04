import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick }) => {
  return (
    <nav className="sticky top-0 z-50 bg-secondary text-white shadow-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-inner border border-green-400/30">
              S
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">STOREHALAL</span>
          </div>

          {/* Cart Button */}
          <button 
            onClick={onCartClick}
            className="relative p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
            aria-label="View Cart"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full border border-secondary">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;