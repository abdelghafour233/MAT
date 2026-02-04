import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import CheckoutModal from './components/CheckoutModal';
import { PRODUCTS } from './constants';
import { Category, Product, CartItem } from './types';
import { Search } from 'lucide-react';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('ALL');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on category and search query
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = activeCategory === 'ALL' || product.category === activeCategory;
      const matchesSearch = product.title.includes(searchQuery) || product.description.includes(searchQuery);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Optional: Open cart automatically on add, or just show a toast (omitted for simplicity)
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-10">
      <Navbar 
        cartCount={totalCartItems} 
        onCartClick={() => setIsCartOpen(true)} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-2">أفضل المنتجات بأفضل الأسعار</h1>
          <p className="text-gray-500">تسوق الآن وادفع عند الاستلام</p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-6">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pr-10 pl-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm shadow-sm"
            placeholder="ابحث عن منتج..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="mb-8 sticky top-16 z-40 bg-gray-50/95 backdrop-blur-sm">
          <CategoryFilter 
            selectedCategory={activeCategory} 
            onSelectCategory={setActiveCategory} 
          />
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">لا توجد منتجات مطابقة للبحث.</p>
            <button 
              onClick={() => {setActiveCategory('ALL'); setSearchQuery('');}}
              className="mt-4 text-primary hover:underline font-medium"
            >
              عرض جميع المنتجات
            </button>
          </div>
        )}
      </main>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />
      
      {/* Simple Footer */}
      <footer className="mt-20 border-t border-gray-200 bg-white py-8">
        <div className="text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} متجري. جميع الحقوق محفوظة.
        </div>
      </footer>
    </div>
  );
};

export default App;