import { create } from 'zustand';
import { PersonalMyPageInfo } from '@/types/personal';

interface MyPageStore {
    myData: PersonalMyPageInfo | null;
    setMyData: (myData: PersonalMyPageInfo) => void;
}

export const useMyPageStore = create<MyPageStore>((set) => ({
    myData: null,
    setMyData: (myData) => set({ myData }),
}));
