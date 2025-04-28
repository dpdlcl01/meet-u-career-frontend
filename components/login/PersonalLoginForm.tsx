"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { fetchMyInfo } from "@/api/fetchMyInfo";
import { apiClient } from "@/api/apiClient";

export const PersonalLoginForm = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [userIdError, setUserIdError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [serverError, setServerError] = useState<string>("");
  const { setTokens } = useAuthStore();

  // 저장된 아이디 복구
  useEffect(() => {
    const savedUserId = localStorage.getItem("savedUserId");
    if (savedUserId) {
      setUserId(savedUserId);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async () => {
    let hasError = false;
    setUserIdError("");
    setPasswordError("");
    setServerError("");

    if (!userId) {
      setUserIdError("아이디를 입력해주세요.");
      hasError = true;
    }
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
      hasError = true;
    }
    if (hasError) return;

    try {
      const response = await apiClient.post(
        "/api/personal/auth/login",
        {
          userId,
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
          // ✅ Zustand 스토어에 저장
          setTokens(accessToken, refreshToken);

          // ✅ 그리고 sessionStorage에도 저장 (여기가 핵심!!)
          sessionStorage.setItem("accessToken", accessToken);
          sessionStorage.setItem("refreshToken", refreshToken);

          // 로그인 성공 후 아이디 저장
          if (rememberMe) {
            localStorage.setItem("savedUserId", userId);
          } else {
            localStorage.removeItem("savedUserId");
          }

          // 사용자 정보 가져오기
          await fetchMyInfo();

          // 메인 페이지로 이동
          router.push("/");
        } else {
          setServerError("토큰 발급 실패. 다시 로그인 해주세요.");
        }
      } else {
        setServerError(response.data.msg);
      }
    } catch (error: any) {
      setServerError(error.response?.data?.msg || "로그인 실패");
    }
  };

  return (
    <div className="space-y-4">
      {/* 서버 에러 메시지 (로그인 실패 시) */}
      {serverError && (
        <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm">
          {serverError}
        </div>
      )}

      {/* 아이디 입력 */}
      <div>
        <input
          type="text"
          name="userId"
          placeholder="아이디"
          autoComplete="off"
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
            if (userIdError) setUserIdError("");
          }}
          className={`w-full px-3 py-2.5 border ${
            userIdError ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-1 ${
            userIdError ? "focus:ring-red-500" : "focus:ring-blue-500"
          }`}
        />
        {userIdError && (
          <p className="text-red-500 text-xs mt-1">{userIdError}</p>
        )}
      </div>

      {/* 비밀번호 입력 */}
      <div>
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          autoComplete="off"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError) setPasswordError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
          className={`w-full px-3 py-2.5 border ${
            passwordError ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-1 ${
            passwordError ? "focus:ring-red-500" : "focus:ring-blue-500"
          }`}
        />
        {passwordError && (
          <p className="text-red-500 text-xs mt-1">{passwordError}</p>
        )}
      </div>

      {/* 아이디 저장 체크박스 + 링크 */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="rememberMe"
          name="rememberMe"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        />
        <label htmlFor="rememberMe" className="ml-2 text-xs text-gray-600">
          아이디 저장
        </label>
        <div className="ml-auto flex gap-2 text-xs text-gray-500">
          <Link href="/find-id" className="hover:underline">
            아이디 찾기
          </Link>
          <span>|</span>
          <Link href="/find-password" className="hover:underline">
            비밀번호 찾기
          </Link>
        </div>
      </div>

      {/* 로그인 버튼 */}
      <button
        type="button"
        onClick={handleLogin}
        className="w-full py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
      >
        로그인
      </button>
    </div>
  );
};
