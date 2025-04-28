// src/store/useUserStore.ts
import { create } from "zustand";
import { apiClient } from "@/api/apiClient";
import { useAuthStore } from "@/store/useAuthStore";

export interface UserInfo {
  accountId: number;
  profileId: number | null;
  name: string;
  profileImage?: string;
  accessToken: string;
  role: "PERSONAL" | "BUSINESS" | "ADMIN" | "SUPER";
  companyId: number;
  businessAccountId: number;
  resumeId: number | null;
}

interface UserStoreState {
  userInfo: UserInfo | null;
  isUserInfoHydrated: boolean;
  isLocalhost: boolean;
  setUserInfo: (userInfo: UserInfo) => void;
  clearUserInfo: () => void;
  restoreUserInfo: () => Promise<void>;
}

const isLocalhost =
  typeof window !== "undefined" && window.location.hostname === "localhost";

export const useUserStore = create<UserStoreState>((set, get) => ({
  userInfo: null,
  isUserInfoHydrated: false,
  isLocalhost,

  /**
   * 유저 정보 저장
   */
  setUserInfo: (userInfo) => {
    if (isLocalhost) {
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
    set({ userInfo, isUserInfoHydrated: true });
  },

  /**
   * 유저 정보 삭제
   */
  clearUserInfo: () => {
    if (isLocalhost) {
      sessionStorage.removeItem("userInfo");
    }
    set({ userInfo: null, isUserInfoHydrated: true });
  },

  /**
   * 유저 정보 복구
   * 1) 로컬 호스트라면 sessionStorage에서 우선 복구
   * 2) accessToken이 있으면 백엔드에서(`/api/personal/me`) 새로 받아오기
   * 3) 최종적으로 userInfo 또는 null, 그리고 isUserInfoHydrated=true
   */
  restoreUserInfo: async () => {
    const { accessToken } = useAuthStore.getState();
    let userInfo: UserInfo | null = null;

    // 1) sessionStorage 우선 확인
    if (isLocalhost) {
      const saved = sessionStorage.getItem("userInfo");
      if (saved) {
        try {
          userInfo = JSON.parse(saved);
        } catch {
          userInfo = null;
        }
      }
    }

    // 2) 없거나, 실제 로그인 상태라면 백엔드에서 fetch
    if (!userInfo && accessToken) {
      try {
        const resp = await apiClient.get<{ data: UserInfo }>(
          "/api/personal/me",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true,
          }
        );
        userInfo = resp.data.data;
        // sessionStorage에도 저장
        if (isLocalhost) {
          sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
        }
      } catch {
        userInfo = null;
      }
    }

    set({ userInfo, isUserInfoHydrated: true });
  },
}));
