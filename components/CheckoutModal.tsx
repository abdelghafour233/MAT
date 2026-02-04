import React, { useState, useEffect } from 'react';
import { X, Trash2, CheckCircle, MapPin, Phone, User } from 'lucide-react';
import { CartItem, OrderForm } from '../types';
import { CURRENCY } from '../constants';
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-2xl text-right overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          
          {/* Header */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-between items-center border-b border-gray-100">
            <h3 className="text-lg leading-6 font-bold text-gray-900" id="modal-title">
              {isSuccess ? 'تم الطلب بنجاح' : 'إتمام الطلب'}
            </h3>
            <button
              type="button"
              className="bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {isSuccess ? (
              <div className="text-center py-10">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">شكراً لك!</h3>
                <p className="text-gray-500">تم استلام طلبك بنجاح. سيتم التواصل معك قريباً لتأكيد التوصيل.</p>
                <button
                  onClick={onClose}
                  className="mt-6 w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-green-600 focus:outline-none sm:text-sm"
                >
                  مواصلة التسوق
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                
                {/* Cart Items Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">ملخص السلة</h4>
                  {cartItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">السلة فارغة</p>
                  ) : (
                    <ul className="divide-y divide-gray-200 max-h-40 overflow-y-auto custom-scrollbar">
                      {cartItems.map((item) => (
                        <li key={item.id} className="py-2 flex justify-between items-center">
                          <div className="flex items-center gap-3">
                             <div className="text-sm">
                               <p className="font-medium text-gray-900">{item.title}</p>
                               <p className="text-gray-500 text-xs">{item.price} {CURRENCY} x {item.quantity}</p>
                             </div>
                          </div>
                          <button 
                            onClick={() => onRemoveItem(item.id)}
                            className="text-red-400 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-3 flex justify-between items-center font-bold text-gray-900 pt-2 border-t border-gray-200">
                    <span>الإجمالي:</span>
                    <span className="text-lg text-primary">{total} {CURRENCY}</span>
                  </div>
                </div>

                {/* Order Form */}
                <form id="order-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        required
                        className="block w-full pr-10 border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm py-2 border shadow-sm"
                        placeholder="أدخل اسمك الثلاثي"
                        value={formData.fullName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">المدينة</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        required
                        className="block w-full pr-10 border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm py-2 border shadow-sm"
                        placeholder="الدار البيضاء، الرباط، طنجة..."
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        required
                        dir="ltr"
                        className="block w-full pr-10 border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm py-2 border shadow-sm text-right"
                        placeholder="06XXXXXXXX"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </form>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {!isSuccess && (
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
              <button
                type="submit"
                form="order-form"
                disabled={isSubmitting || cartItems.length === 0}
                className={`w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-3 sm:py-2 text-base font-medium text-white sm:w-auto sm:text-sm
                  ${isSubmitting || cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-secondary hover:bg-gray-800'}`}
              >
                {isSubmitting ? 'جاري الإرسال...' : 'اشترِ الآن - الدفع عند الاستلام'}
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={onClose}
              >
                إلغاء
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;