import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';

/**
 * استور مدیریت سبد خرید با استفاده از زوستند
 * 
 * این استور مسئول مدیریت عملیات سبد خرید شامل:
 * - نگهداری تعداد کل محصولات در سبد خرید
 * - اضافه کردن محصول به سبد خرید
 * - حذف محصول از سبد خرید
 * - نمایش پیام‌های موفقیت و خطا
 * 
 * @example
 * ```tsx
 * const { totalCount, addToCart, removeFromCart } = useCartStore();
 * 
 * // اضافه کردن محصول
 * await addToCart(productId);
 * 
 * // حذف محصول
 * await removeFromCart(productId);
 * ```
 */
const useCartStore = create((set, get) => ({
  /** تعداد کل محصولات در سبد خرید */
  totalCount: 0,
  
  /**
   * افزایش تعداد کل محصولات در سبد خرید
   * @returns {void}
   */
  incrementTotalCount: () => set((x: any) => ({ totalCount: x.totalCount + 1 })),
  
  /**
   * کاهش تعداد کل محصولات در سبد خرید
   * @returns {void}
   */
  decrementTotalCount: () => set((x: any) => ({ totalCount: x.totalCount - 1 })),
  
  /**
   * تنظیم تعداد کل محصولات در سبد خرید
   * @param {number} count - تعداد جدید محصولات
   * @returns {void}
   */
  setTotalCount: (count: number) => set({ totalCount: count }),
  
  /**
   * اضافه کردن محصول به سبد خرید
   * 
   * این متد یک درخواست POST به API ارسال می‌کند تا محصول را به سبد خرید کاربر اضافه کند.
   * قبل از ارسال درخواست، بررسی می‌کند که کاربر وارد شده باشد.
   * 
   * @param {number} productId - شناسه محصول مورد نظر
   * @returns {Promise<boolean>} true در صورت موفقیت، false در صورت خطا
   * 
   * @example
   * ```tsx
   * const success = await addToCart(123);
   * if (success) {
   *   console.log('محصول با موفقیت اضافه شد');
   * }
   * ```
   */
  addToCart: async (productId: number) => {
    try {
      // بررسی وجود کاربر در localStorage
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        toast.error('برای اضافه کردن محصول ابتدا وارد شوید');
        return false;
      }

      // ارسال درخواست به API برای اضافه کردن محصول
      const response = await axios.post('https://nowruzi.top/api/Cart/AddToCart', {
        userId: parseInt(userId),
        productId: productId
      });

      if (response.data.isSuccess) {
        // به‌روزرسانی تعداد کل محصولات در استور
        set({ totalCount: response.data.data.totalItems });
        toast.success(response.data.message || 'محصول با موفقیت به سبد خرید اضافه شد');
        
        return true;
      } else {
        // نمایش پیام خطا در صورت عدم موفقیت
        toast.error(response.data.message || 'خطا در اضافه کردن محصول');
        return false;
      }
    } catch (error) {
      console.error('خطا در اضافه کردن به سبد خرید:', error);
      
      // مدیریت انواع مختلف خطاها
      if (error.response) {
        // خطای پاسخ سرور (مثل 400، 500)
        toast.error(error.response.data?.message || 'خطا در ارتباط با سرور');
      } else if (error.request) {
        // خطای عدم اتصال به سرور
        toast.error('خطا در اتصال به سرور');
      } else {
        // خطای غیرمنتظره
        toast.error('خطای غیرمنتظره رخ داد');
      }
      return false;
    }
  },

  /**
   * حذف محصول از سبد خرید
   * 
   * این متد یک درخواست POST به API ارسال می‌کند تا محصول را از سبد خرید کاربر حذف کند.
   * قبل از ارسال درخواست، بررسی می‌کند که کاربر وارد شده باشد.
   * 
   * @param {number} productId - شناسه محصول مورد نظر
   * @returns {Promise<boolean>} true در صورت موفقیت، false در صورت خطا
   * 
   * @example
   * ```tsx
   * const success = await removeFromCart(123);
   * if (success) {
   *   console.log('محصول با موفقیت حذف شد');
   * }
   * ```
   */
  removeFromCart: async (productId: number) => {
    try {
      // بررسی وجود کاربر در localStorage
      const userId = localStorage.getItem('userId');
        if (!userId) {
        toast.error('برای حذف محصول ابتدا وارد شوید');
        return false;
      }

      // ارسال درخواست به API برای حذف محصول
      const response = await axios.post('https://nowruzi.top/api/Cart/RemoveFromCart', {
        userId: parseInt(userId),
        productId: productId
      });

      if (response.data.isSuccess) {
        // به‌روزرسانی تعداد کل محصولات در استور
        set({ totalCount: response.data.data.totalItems });
        toast.success(response.data.message || 'محصول با موفقیت از سبد خرید حذف شد');
        
        return true;
      } else {
        // نمایش پیام خطا در صورت عدم موفقیت
        toast.error(response.data.message || 'خطا در حذف محصول');
        return false;
      }
    } catch (error) {
      console.error('خطا در حذف از سبد خرید:', error);
      
      // مدیریت انواع مختلف خطاها
      if (error.response) {
        // خطای پاسخ سرور (مثل 400، 500)
        toast.error(error.response.data?.message || 'خطا در ارتباط با سرور');
      } else if (error.request) {
        // خطای عدم اتصال به سرور
        toast.error('خطا در اتصال به سرور');
      } else {
        // خطای غیرمنتظره
        toast.error('خطای غیرمنتظره رخ داد');
      }
      return false;
    }
  }
}));

export default useCartStore;
