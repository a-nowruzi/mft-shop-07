import { create } from 'zustand';

// create فانکشنی که به Zustand میگیم یه استور بسازه
const useCartStore = create((set) => ({
  totalCount: 0,
  incrementTotalCount: () => set((x: any) => ({ totalCount: x.totalCount + 1 })),
  decrementTotalCount: () => set((x: any) => ({ totalCount: x.totalCount - 1 })),
}));

export default useCartStore;
