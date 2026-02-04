import React, { useState, useEffect } from 'react';
import { X, Trash2, CheckCircle, MapPin, Phone, User, ChevronDown } from 'lucide-react';
import { CartItem, OrderForm } from '../types';
import { CURRENCY, MOROCCAN_CITIES } from '../constants';
import { submitOrder } from '../services/orderService';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onClearCart,
}) => {
  const [formData, setFormData] = useState<OrderForm>({
    fullName: '',
    city: '',
    phoneNumber: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (cartItems.length === 0) {
      setError('السلة فارغة!');
      return;
    }

    if (!formData.fullName || !formData.city || !formData.phoneNumber) {
      setError('يرجى تعبئة جميع الحقول المطلوبة.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitOrder({
        ...formData,
        items: cartItems,
        total,
        date: new Date().toISOString(),
      });

      if (result.success) {
        setIsSuccess(true);
        onClearCart();
        setFormData({ fullName: '', city: '', phoneNumber: '' });
      }
    } catch (err) {
      setError('حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-2xl text-right overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full border border-gray-100">
          
          {/* Header */}
          <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-900" id="modal-title">
              {isSuccess ? 'تم الطلب بنجاح' : 'تأكيد الطلب'}
            </h3>
            <button
              type="button"
              className="bg-gray-50 rounded-full p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">شكراً لثقتك بنا!</h3>
                <p className="text-gray-500 mb-8 max-w-xs mx-auto text-lg leading-relaxed">
                  تم استلام طلبك بنجاح. سيقوم فريقنا بالاتصال بك قريباً لتأكيد التوصيل.
                </p>
                <button
                  onClick={onClose}
                  className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-lg shadow-green-200 px-6 py-4 bg-primary text-lg font-bold text-white hover:bg-green-700 focus:outline-none transform hover:-translate-y-0.5 transition-all"
                >
                  العودة للمتجر
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                
                {/* Cart Items Summary */}
                <div className="bg-gray-50/80 rounded-xl p-5 border border-gray-100">
                  <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                    <span>محتويات السلة</span>
                    <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-bold">{cartItems.length}</span>
                  </h4>
                  
                  {cartItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-6 bg-white rounded-lg border border-dashed border-gray-200">السلة فارغة</p>
                  ) : (
                    <ul className="space-y-3 mb-4 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                      {cartItems.map((item) => (
                        <li key={item.id} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                          <div className="flex items-center gap-3">
                             <img src={item.image} alt={item.title} className="w-10 h-10 rounded-md object-cover" />
                             <div>
                               <p className="font-bold text-gray-800 text-sm line-clamp-1">{item.title}</p>
                               <p className="text-primary font-bold text-xs">{item.price} {CURRENCY} <span className="text-gray-400 font-normal">x {item.quantity}</span></p>
                             </div>
                          </div>
                          <button 
                            onClick={() => onRemoveItem(item.id)}
                            className="text-gray-400 hover:text-red-500 p-1 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="font-bold text-gray-600">المجموع الكلي:</span>
                    <span className="text-2xl font-extrabold text-secondary">{total} <span className="text-sm font-medium text-gray-500">{CURRENCY}</span></span>
                  </div>
                </div>

                {/* Order Form */}
                <form id="order-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="space-y-5">
                    
                    {/* Name Field */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-bold text-gray-700 mb-2">الاسم</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="fullName"
                          id="fullName"
                          required
                          className="block w-full pr-12 pl-4 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary sm:text-base py-3.5 border bg-white shadow-sm transition-shadow"
                          placeholder="أدخل اسمك"
                          value={formData.fullName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-bold text-gray-700 mb-2">رقم الهاتف</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phoneNumber"
                          id="phoneNumber"
                          required
                          dir="ltr"
                          className="block w-full pr-12 pl-4 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary sm:text-base py-3.5 border bg-white shadow-sm transition-shadow text-right placeholder:text-right"
                          placeholder="06XXXXXXXX"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    {/* City Dropdown */}
                    <div>
                      <label htmlFor="city" className="block text-sm font-bold text-gray-700 mb-2">المدينة</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-10">
                          <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                          name="city"
                          id="city"
                          required
                          className="block w-full pr-12 pl-10 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary sm:text-base py-3.5 border bg-white shadow-sm transition-shadow appearance-none cursor-pointer text-gray-900"
                          value={formData.city}
                          onChange={handleInputChange}
                        >
                          <option value="" disabled className="text-gray-400">اختر مدينتك</option>
                          {MOROCCAN_CITIES.map((city) => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  
                  </div>

                  {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2 animate-pulse">
                       <span className="font-bold">تنبيه:</span> {error}
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {!isSuccess && (
            <div className="bg-gray-50 px-6 py-4 flex flex-col-reverse sm:flex-row gap-3 border-t border-gray-100">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-xl border border-gray-200 shadow-sm px-6 py-3.5 bg-white text-base font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 focus:outline-none transition-colors sm:w-auto"
                onClick={onClose}
              >
                إلغاء
              </button>
              <button
                type="submit"
                form="order-form"
                disabled={isSubmitting || cartItems.length === 0}
                className={`w-full flex-1 inline-flex justify-center items-center gap-2 rounded-xl border border-transparent shadow-lg px-6 py-3.5 text-base font-bold text-white transition-all transform active:scale-95
                  ${isSubmitting || cartItems.length === 0 
                    ? 'bg-gray-400 cursor-not-allowed shadow-none' 
                    : 'bg-secondary hover:bg-gray-900 shadow-gray-900/10'}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    جاري الإرسال...
                  </>
                ) : 'تأكيد الطلب (الدفع عند الاستلام)'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;