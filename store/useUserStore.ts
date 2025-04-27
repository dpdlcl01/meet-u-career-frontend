import { create } from "zustand";

interface UserInfo {
  accountId: number;
  profileId: number | null;
  name: string;
  profileImage?: string;
  role: "PERSONAL" | "BUSINESS" | "ADMIN" | "SUPER";
}

interface UserStoreState {
  userInfo: UserInfo | null;
  isUserInfoHydrated: boolean;
  isLocalhost: boolean;
  setUserInfo: (userInfo: UserInfo) => void;
  clearUserInfo: () => void;
  restoreUserInfo: () => void;
}

const isLocalhost =
  typeof window !== "undefined" && window.location.hostname === "localhost";

export const useUserStore = create<UserStoreState>((set) => ({
  userInfo: null,
  isUserInfoHydrated: false,
  isLocalhost:
    typeof window !== "undefined" && window.location.hostname === "localhost",

  /**
   * 유저 정보 저장
   */
  setUserInfo: (userInfo) => set({ userInfo, isUserInfoHydrated: true }),

  /**
   * 유저 정보 삭제
   */
  clearUserInfo: () => set({ userInfo: null, isUserInfoHydrated: true }),

  /**
   * 유저 정보 복구
   * - 로컬이면 sessionStorage에서 복구
   * - 없으면 userInfo: null로 설정
   * - 무조건 isUserInfoHydrated = true
   */
  restoreUserInfo: () => {
    let userInfo = null;
    if (isLocalhost) {
      const saved = sessionStorage.getItem("userInfo");
      if (saved) {
        userInfo = JSON.parse(saved);
      }
    }
    set({ userInfo, isUserInfoHydrated: true });
  },
}));