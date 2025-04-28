import axios from "axios";

// 공통 헤더 구성 함수
function getAuthHeaders(): { [key: string]: string } {
  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null;

  if (token) {
    return {
      Authorization: `Bearer ${token}`, // 🔥 무조건 Authorization
    };
  }

  return {};
}

// 공통 axios instance
const api = axios.create({
  baseURL: "http://localhost:8080", // ✅ 반드시 Spring Boot 서버 주소
  timeout: 10000,
  withCredentials: true, // ✅ 쿠키 포함
});

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
