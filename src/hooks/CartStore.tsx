import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';

// create فانکشنی که به Zustand میگیم یه استور بسازه
const useCartStore = create((set, get) => ({
  totalCount: 0,
  incrementTotalCount: () => set((x: any) => ({ totalCount: x.totalCount + 1 })),
  decrementTotalCount: () => set((x: any) => ({ totalCount: x.totalCount - 1 })),
  setTotalCount: (count: number) => set({ totalCount: count }),
  
  // اضافه کردن محصول به سبد خرید
  addToCart: async (productId: number) => {
    try {
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        toast.error('برای اضافه کردن محصول ابتدا وارد شوید');
        return false;
      }

      const response = await axios.post('https://nowruzi.top/api/Cart/AddToCart', {
        userId: parseInt(userId),
        productId: productId
      });

      if (response.data.isSuccess) {
        // به‌روزرسانی تعداد کل محصولات
        set({ totalCount: response.data.data.totalItems });
        toast.success(response.data.message || 'محصول با موفقیت به سبد خرید اضافه شد');
        
        return true;
      } else {
        toast.error(response.data.message || 'خطا در اضافه کردن محصول');
        return false;
      }
    } catch (error) {
      console.error('خطا در اضافه کردن به سبد خرید:', error);
      
      if (error.response) {
        toast.error(error.response.data?.message || 'خطا در ارتباط با سرور');
      } else if (error.request) {
        toast.error('خطا در اتصال به سرور');
      } else {
        toast.error('خطای غیرمنتظره رخ داد');
      }
      return false;
    }
  },

  // حذف محصول از سبد خرید
  removeFromCart: async (productId: number) => {
    try {
      const userId = localStorage.getItem('userId');
        if (!userId) {
        toast.error('برای حذف محصول ابتدا وارد شوید');
        return false;
      }

      const response = await axios.post('https://nowruzi.top/api/Cart/RemoveFromCart', {
        userId: parseInt(userId),
        productId: productId
      });

      if (response.data.isSuccess) {
        // به‌روزرسانی تعداد کل محصولات
        set({ totalCount: response.data.data.totalItems });
        toast.success(response.data.message || 'محصول با موفقیت از سبد خرید حذف شد');
        
        return true;
      } else {
        toast.error(response.data.message || 'خطا در حذف محصول');
        return false;
      }
    } catch (error) {
      console.error('خطا در حذف از سبد خرید:', error);
      
      if (error.response) {
        toast.error(error.response.data?.message || 'خطا در ارتباط با سرور');
      } else if (error.request) {
        toast.error('خطا در اتصال به سرور');
      } else {
        toast.error('خطای غیرمنتظره رخ داد');
      }
      return false;
    }
  }
}));

export default useCartStore;
