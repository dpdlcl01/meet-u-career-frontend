"use client";

import Link from "next/link";
import Image from "next/image";
import { User, Settings, Bell, Bookmark, FileText, LogOut } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import { apiClient } from "@/api/apiClient";
import { useRouter } from "next/navigation";

export function ProfileDropdown() {
  const router = useRouter();
  const { clearTokens } = useAuthStore();
  const { userInfo, clearUserInfo } = useUserStore();
  const { clearNotifications } = useNotificationStore(); // 알림 초기화 추가

  const handleLogout = async () => {
    try {
      // 서버에 로그아웃 요청 (refreshToken 삭제)
      await apiClient.post(
        "/api/auth/logout",
        {},
        { withCredentials: true }
      );

      // 클라이언트에 저장된 토큰, 유저정보, 알림 초기화
      clearTokens();
      clearUserInfo();
      clearNotifications(); // 알림 초기화 호출

      // 로그인 페이지로 이동
      router.push("/login");
    } catch (error) {
      console.error("로그아웃 실패", error);

      // 강제 클리어 후 이동
      clearTokens();
      clearUserInfo();
      clearNotifications();
      router.push("/login");
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg overflow-hidden z-50">
      <div className="p-4 border-b">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Image
              src="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/profile.png"
              alt="User profile"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {userInfo?.name}
            </p>
            <p className="text-xs text-gray-500">
              {userInfo?.role === "PERSONAL" && "개인회원"}
            </p>
          </div>
        </div>
      </div>

      <div className="py-1 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-400" />
          로그아웃
        </button>
      </div>
    </div>
  );
}
