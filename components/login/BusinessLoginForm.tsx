"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { fetchMyInfo } from "@/api/fetchMyInfo";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export const BusinessLoginForm = () => {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{
    userId?: string;
    password?: string;
    message?: string;
  }>({});
  const [successMessage, setSuccessMessage] = useState("");
  const { setTokens } = useAuthStore();

  // 저장된 아이디 복구
  useEffect(() => {
    const savedUserId = localStorage.getItem("savedBusinessId");
    if (savedUserId) {
      setUserId(savedUserId);
      setRememberMe(true);
    }
  }, []);

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setErrorMessages({});
    setSuccessMessage("");

    try {
      const response = await axios.post("/api/business/auth/login", {
        userId,
        password,
      });

      if (response.data.msg == "success") {
        const { accessToken, refreshToken } = response.data.data || {};

        if (accessToken && refreshToken) {
          setTokens(accessToken, refreshToken);

          // 로그인 성공 후 아이디 저장
          if (rememberMe) {
            localStorage.setItem("savedBusinessId", userId);
          } else {
            localStorage.removeItem("savedBusinessId");
          }

          await fetchMyInfo();

          // 메인 페이지로 이동.
          router.push("/");
        } else {
          setErrorMessages({
            message: response.data.msg,
          });
        }
      } else {
        setErrorMessages({
          message: response.data.msg,
        });
      }
    } catch (error: any) {
      if (error.response?.data?.msg) {
        setErrorMessages({ message: error.response.data.msg });
      } else {
        setErrorMessages({ message: "로그인 중 오류가 발생했습니다." });
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="userId"
          placeholder="기업 아이디"
          autoComplete="off"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className={`w-full px-3 py-2.5 border ${errorMessages.userId ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
        />
        {errorMessages.userId && (
          <p className="text-red-500 text-xs mt-1">{errorMessages.userId}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full px-3 py-2.5 border ${errorMessages.password ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
        />
        {errorMessages.password && (
          <p className="text-red-500 text-xs mt-1">{errorMessages.password}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="businessRememberMe"
          name="rememberMe"
          checked={rememberMe}
          onChange={handleRememberMeChange}
          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        />
        <label
          htmlFor="businessRememberMe"
          className="ml-2 text-xs text-gray-600"
        >
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

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
      >
        {isPending ? (
          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          "로그인"
        )}
      </button>

      {successMessage && (
        <p className="text-green-600 text-sm text-center">{successMessage}</p>
      )}
      {errorMessages.message && !successMessage && (
        <p className="text-red-600 text-sm text-center">
          {errorMessages.message}
        </p>
      )}
    </form>
  );
};
