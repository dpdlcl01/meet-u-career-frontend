"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { fetchMyInfo } from "@/api/fetchMyInfo";
import { apiClient } from "@/api/apiClient";

export const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [serverError, setServerError] = useState<string>("");
  const { setTokens } = useAuthStore();

  // 저장된 이메일 복구
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedAdminId");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async () => {
    let hasError = false;

    if (!email) {
      setEmailError("이메일을 입력해주세요.");
      hasError = true;
    }
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
      hasError = true;
    }
    if (hasError) return;

    setIsPending(true);
    setEmailError("");
    setPasswordError("");
    setServerError("");

    try {
      const response = await apiClient.post(
        "/api/admin/auth/login",
        {
          userId: email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.msg === "success") {
        const { accessToken, refreshToken } = response.data.data || {};

        if (accessToken && refreshToken) {
          setTokens(accessToken, refreshToken);

          sessionStorage.setItem("accessToken", accessToken);
          sessionStorage.setItem("refreshToken", refreshToken);

          // 로그인 성공 후 아이디 저장
          if (rememberMe) {
            localStorage.setItem("savedAdminId", email);
          } else {
            localStorage.removeItem("savedAdminId");
          }

          // 사용자 정보 가져오기
          await fetchMyInfo();

          // 대시보드 페이지로 이동
          router.push("/admin/dashboard");
        } else {
          setServerError("로그인 중 오류가 발생했습니다. (1)");
        }
      } else {
        setServerError(response.data.msg);
      }
    } catch (error: any) {
      setServerError(error.response?.data?.msg || "로그인 중 오류가 발생했습니다. (2)");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 서버 에러 메시지 (로그인 실패 시) */}
      {serverError && (
        <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm">
          {serverError}
        </div>
      )}

      {/* 아이디 입력 */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="off"
          placeholder="이메일"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError("");
          }}
          className={`w-full px-3 py-2 border ${emailError ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          aria-invalid={!!emailError}
          aria-describedby={emailError ? "email-error" : undefined}
        />
        {emailError && (
          <p id="email-error" className="mt-1 text-sm text-red-600">{emailError}</p>
        )}
      </div>

      {/* 비밀번호 입력 */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="off"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError) setPasswordError("");
          }}
          className={`w-full px-3 py-2 border ${passwordError ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          aria-invalid={!!passwordError}
          aria-describedby={passwordError ? "password-error" : undefined}
        />
        {passwordError && (
          <p id="password-error" className="mt-1 text-sm text-red-600">{passwordError}</p>
        )}
      </div>

      {/* 아이디 저장 체크박스 + 링크 */}
      <div className="flex items-center">
        <input
          id="rememberMe"
          name="rememberMe"
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label
          htmlFor="rememberMe"
          className="ml-2 block text-sm text-gray-700"
        >
          아이디 저장
        </label>
      </div>
      <div>
        <button
          type="button"
          onClick={handleLogin}
          disabled={isPending}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1a2233] hover:bg-[#2a3243] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
        >
          {isPending ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "로그인"
          )}
        </button>
      </div>
    </div>
  );
};
