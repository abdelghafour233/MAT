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
    // Optional: Open cart automatically on add
    // setIsCartOpen(true);
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header Section */}
        <div className="text-center mb-10 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/5 rounded-tr-full -ml-8 -mb-8"></div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-3 relative z-10">
            أفضل المنتجات.. <span className="text-primary">بأفضل الأسعار</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg relative z-10">
            اكتشف تشكيلة واسعة من المنتجات العصرية. تسوق الآن بكل ثقة مع خدمة الدفع عند الاستلام.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-lg mx-auto mb-8">
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pr-12 pl-4 py-3.5 border border-gray-200 rounded-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm shadow-sm transition-shadow duration-200 hover:shadow-md"
            placeholder="عن ماذا تبحث اليوم؟"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="mb-8 sticky top-20 z-40 bg-gray-50/95 backdrop-blur-sm -mx-4 px-4 sm:mx-0 sm:px-0 py-2">
          <CategoryFilter 
            selectedCategory={activeCategory} 
            onSelectCategory={setActiveCategory} 
          />
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">لا توجد نتائج</h3>
            <p className="text-gray-500 mb-6">لم نعثر على أي منتجات تطابق بحثك.</p>
            <button 
              onClick={() => {setActiveCategory('ALL'); setSearchQuery('');}}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-green-700"
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
      
      {/* Footer */}
      <footer className="mt-24 bg-secondary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
              م
            </div>
            <span className="text-xl font-bold tracking-tight">متجري</span>
          </div>
          <p className="text-gray-400 text-sm mb-8 text-center max-w-md">
            متجرك الأول للتسوق الإلكتروني. نوفر لك أحدث المنتجات بجودة عالية وأسعار منافسة مع خدمة التوصيل السريع.
          </p>
          <div className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} متجري. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;