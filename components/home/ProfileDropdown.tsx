"use client";

import Link from "next/link";
import { User, Building2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import { apiClient } from "@/api/apiClient";

const ProfileDropdown = () => {
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
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-50 border">
      <ul>
        <li>
          {userInfo?.role === "PERSONAL" ? (
            <Link
              href="/personal/mypage"
              className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
            >
              <User className="h-4 w-4 text-gray-500" />
              <span>마이페이지</span>
            </Link>
          ) : (
            <Link
              href="/business/dashboard"
              className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
            >
              <Building2 className="h-4 w-4 text-gray-500" />
              <span>기업서비스</span>
            </Link>
          )}
        </li>
        <li className="border-t">
          <button
            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
            onClick={handleLogout}
          >
            <LogOut size={16} className="mr-2" />
            <span>로그아웃</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
