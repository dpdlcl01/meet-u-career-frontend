import axios from "axios";

// 공통 헤더 구성 함수
function getAuthHeaders(): { [key: string]: string } {
  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null;
  const isLocalhost =
    typeof window !== "undefined" && window.location.hostname === "localhost";

  if (token && isLocalhost) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  return {};
}

// 공통 axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  timeout: 10000,
});

// 반환값 타입을 any로 기본 설정
export const apiClient = {
  get: async <T = any>(url: string, config = {}) =>
    api.get<T>(url, {
      ...config,
      headers: {
        ...getAuthHeaders(),
        ...(config as any).headers,
      },
    }),

  post: async <T = any>(url: string, data?: any, config = {}) =>
    api.post<T>(url, data, {
      ...config,
      headers: {
        ...getAuthHeaders(),
        ...(config as any).headers,
      },
    }),

  patch: async <T = any>(url: string, data?: any, config = {}) =>
    api.patch<T>(url, data, {
      ...config,
      headers: {
        ...getAuthHeaders(),
        ...(config as any).headers,
      },
    }),

  put: async <T = any>(url: string, data?: any, config = {}) =>
    api.put<T>(url, data, {
      ...config,
      headers: {
        ...getAuthHeaders(),
        ...(config as any).headers,
      },
    }),

  delete: async <T = any>(url: string, config = {}) =>
    api.delete<T>(url, {
      ...config,
      headers: {
        ...getAuthHeaders(),
        ...(config as any).headers,
      },
    }),
};