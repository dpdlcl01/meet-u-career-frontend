// src/components/personal/PersonalHeader.tsx
"use client";

import Link from "next/link";
import { Menu, Bell, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationDropdown } from "./NotificationDropdown";
import ChatDropdown from "@/components/personal/mypage/ChatDropdown";
import { ProfileDropdown } from "./ProfileDropdown";
import { useState, useRef, useEffect } from "react";
import { useSidebar } from "./SidebarProvider";
import { useUserStore } from "@/store/useUserStore";

export function PersonalHeader() {
  const { toggleSidebar } = useSidebar();
  const { userInfo, isUserInfoHydrated, restoreUserInfo } = useUserStore();

  // 각 드롭다운 오픈 상태
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // 유저 정보 복구
  useEffect(() => {
    restoreUserInfo();
  }, [restoreUserInfo]);

  // 외부 클릭 시 모든 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isNotificationOpen &&
        notificationRef.current &&
        !notificationRef.current.contains(e.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
      if (
        isChatOpen &&
        chatRef.current &&
        !chatRef.current.contains(e.target as Node)
      ) {
        setIsChatOpen(false);
      }
      if (
        isProfileOpen &&
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isNotificationOpen, isChatOpen, isProfileOpen]);

  // 채팅방 선택 시: 드롭다운 닫고 새 창으로 이동
  const handleSelectRoom = (roomId: string) => {
    setIsChatOpen(false);
    window.open(`/chat?roomId=${roomId}`, "ChatWindow", "width=800,height=600,resizable,scrollbars");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-30">
      <div className="flex items-center justify-between h-full px-4">
        {/* 좌측: 사이드바 토글 + 로고 */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </Button>
          <Link href="/" className="flex items-center">
            <span className="text-lg font-bold text-blue-600">meet</span>
            <span className="text-lg font-bold text-blue-600">Ü</span>
          </Link>
        </div>

        {/* 우측: 알림 / 채팅 / 프로필 */}
        <div className="flex items-center gap-3">
          {/* 알림 */}
          <div className="relative" ref={notificationRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsNotificationOpen((o) => !o)}
              aria-label="Notifications"
            >
              <Bell className="h-[18px] w-[18px] text-gray-700" />
              <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs font-medium">
                1
              </span>
            </Button>
            {isNotificationOpen && <NotificationDropdown />}
          </div>

          {/* 채팅 */}
          <div className="relative" ref={chatRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsChatOpen((o) => !o)}
              aria-label="Messages"
            >
              <MessageSquare className="h-[18px] w-[18px] text-gray-700" />
              <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs font-medium">
                2
              </span>
            </Button>
            {isChatOpen && isUserInfoHydrated && userInfo && (
              <ChatDropdown onSelectRoom={handleSelectRoom} />
            )}
          </div>

          {/* 프로필 */}
          <div className="relative" ref={profileRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsProfileOpen((o) => !o)}
              aria-label="Profile"
            >
              <div className="h-9 w-9 rounded-full bg-gray-200 overflow-hidden" />
            </Button>
            {isProfileOpen && <ProfileDropdown />}
          </div>
        </div>
      </div>
    </header>
  );
}
