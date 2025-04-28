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

  setUserInfo: (userInfo) => {
    if (isLocalhost) {
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
    set({ userInfo, isUserInfoHydrated: true });
  },

  clearUserInfo: () => {
    if (isLocalhost) {
      sessionStorage.removeItem("userInfo");
    }
    set({ userInfo: null, isUserInfoHydrated: true });
  },

  restoreUserInfo: async () => {
    const { accessToken } = useAuthStore.getState();
    let userInfo: UserInfo | null = null;

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

    if (!userInfo && accessToken) {
      try {
        const resp = await apiClient.get<{ data: UserInfo }>("/api/personal/me", {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        });
        userInfo = resp.data.data;
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
