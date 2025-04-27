import { create } from "zustand";
import Cookies from "js-cookie";
import { toast } from "@/components/ui/use-toast";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isHydrated: boolean;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setAccessToken: (accessToken: string) => void;
  clearTokens: () => void;
  restoreTokens: () => void;
  logoutWithAlert: () => void;
}

// 현재 환경이 localhost인지 여부
const isLocalhost = typeof window !== "undefined" && window.location.hostname === "localhost";

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  isHydrated: false,

  /**
   * AccessToken과 RefreshToken 저장
   * - 로컬: sessionStorage
   * - 운영: Secure 쿠키
   */
  setTokens: (accessToken, refreshToken) => {
    if (isLocalhost) {
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
    } else {
      Cookies.set("accessToken", accessToken, { path: "/", secure: true });
      Cookies.set("refreshToken", refreshToken, { path: "/", secure: true });
    }
    set({ accessToken, refreshToken });
  },

  /**
   * AccessToken만 별도 저장
   */
  setAccessToken: (accessToken) => {
    if (isLocalhost) {
      sessionStorage.setItem("accessToken", accessToken);
    } else {
      Cookies.set("accessToken", accessToken, { path: "/", secure: true });
    }
    set((state) => ({ ...state, accessToken }));
  },

  /**
   * 저장된 토큰 삭제
   */
  clearTokens: () => {
    if (isLocalhost) {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
    } else {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    }
    set({ accessToken: null, refreshToken: null });
  },

  /**
   * 저장된 토큰 복구
   */
  restoreTokens: () => {
    let accessToken = null;
    let refreshToken = null;
    if (isLocalhost) {
      accessToken = sessionStorage.getItem("accessToken");
      refreshToken = sessionStorage.getItem("refreshToken");
    } else {
      accessToken = Cookies.get("accessToken") || null;
      refreshToken = Cookies.get("refreshToken") || null;
    }
    set({ accessToken, refreshToken, isHydrated: true });
  },

  /**
   * 세션 만료 시 자동 로그아웃
   */
  logoutWithAlert: () => {
    if (isLocalhost) {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
    } else {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    }
    set({ accessToken: null, refreshToken: null });

    toast({
      title: "세션 만료",
      description: "다시 로그인 해주세요.",
      variant: "destructive",
    });

    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  },
}));