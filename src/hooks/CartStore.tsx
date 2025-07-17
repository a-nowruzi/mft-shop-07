import { create } from 'zustand';

// create فانکشنی که به Zustand میگیم یه استور بسازه
const useCartStore = create((set) => ({
  count: 0,
  increment: () => set((x) => ({ count: x.count + 1 })),
  decrement: () => set((x) => ({ count: x.count - 1 })),
}));

export default useCartStore;
