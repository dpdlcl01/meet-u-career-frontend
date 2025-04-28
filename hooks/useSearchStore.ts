import { create } from 'zustand';

interface SearchState {
  keyword: string;
  setStoreKeyword: (keyword: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  keyword: '',
  setStoreKeyword: (keyword) => set({ keyword }),
}));
