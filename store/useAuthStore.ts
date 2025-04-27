// store/useAuthStore.ts
import { create } from "zustand";
import Cookies from "js-cookie"; // 쿠키 라이브러리 사용

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
  restoreTokens: () => void;
}

const isLocalhost = typeof window !== "undefined" && window.location.hostname === "localhost";

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,

  // 토큰 저장
  setTokens: (accessToken, refreshToken) => {
    if (isLocalhost) {
      sessionStorage.setItem("accessToken", accessToken);  // sessionStorage에 저장
      sessionStorage.setItem("refreshToken", refreshToken);
    } else {
      Cookies.set("accessToken", accessToken, { path: "/", secure: true });  // 쿠키에 저장
      Cookies.set("refreshToken", refreshToken, { path: "/", secure: true });
    }
    set({ accessToken, refreshToken });
  },

  // 토큰 삭제
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

  // 토큰 복구
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
    set({ accessToken, refreshToken });
  },
}));
