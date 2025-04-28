"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { fetchMyInfo } from "@/api/fetchMyInfo";

export const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setTokens } = useAuthStore();

  // 세션에 저장된 이메일 복구
  useEffect(() => {
    const savedEmail = sessionStorage.getItem("savedAdminId");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setServerError("");
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

    setIsLoading(true);
    try {
      const response = await axios.post("/api/admin/auth/login", {
        userId: email,
        password,
      });

      if (response.data.msg === "success") {
        const { accessToken, refreshToken } = response.data.data || {};

        if (accessToken && refreshToken) {
          setTokens(accessToken, refreshToken);

          // 로그인 성공 후 아이디 저장
          if (rememberMe) {
            sessionStorage.setItem("savedAdminId", email);
          } else {
            sessionStorage.removeItem("savedAdminId");
          }

          await fetchMyInfo();

          // 대시보드 페이지로 이동.
          router.push("/admin/dashboard");
        } else {
          setServerError(response.data.msg);
        }
      } else {
        setServerError(response.data.msg);
      }
    } catch (error: any) {
      setServerError(
        error.response?.data?.msg
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleLogin}>
      {serverError && (
        <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm">
          {serverError}
        </div>
      )}
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
          <p id="email-error" className="mt-1 text-sm text-red-600">
            {emailError}
          </p>
        )}
      </div>
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
          <p id="password-error" className="mt-1 text-sm text-red-600">
            {passwordError}
          </p>
        )}
      </div>
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
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1a2233] hover:bg-[#2a3243] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              로그인 중...
            </>
          ) : (
            "로그인"
          )}
        </button>
      </div>
    </form>
  );
};
