import { create } from "zustand";

interface SearchStore {
    keyword: string;
    setStoreKeyword: (keyword: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
    keyword: "",
    setStoreKeyword: (keyword) => set({ keyword }),
}));