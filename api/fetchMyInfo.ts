import { apiClient } from "@/api/apiClient";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";

/**
 * 내 정보 가져오기 (apiClient 적용)
 */
export const fetchMyInfo = async () => {
  const { accessToken, clearTokens } = useAuthStore.getState();
  const { setUserInfo, clearUserInfo } = useUserStore.getState();

  try {
    const isLocalhost =
      typeof window !== "undefined" && window.location.hostname === "localhost";

    const response = await apiClient.get<any>("/api/user/me", {
      withCredentials: !isLocalhost,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userData = response.data.data;
    setUserInfo(userData);
  } catch (error) {
    console.error("/me 불러오기 실패", error);
    clearTokens();
    clearUserInfo();
  }
};