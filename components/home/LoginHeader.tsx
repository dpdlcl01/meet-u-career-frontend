"use client";

import Link from "next/link";
import { Search, Bell, MessageSquare, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import NotificationDropdown from "./NotificationDropdown";
import ChatDropdown from "./ChatDropdown";
import ProfileDropdown from "./ProfileDropdown";
import { useUserStore } from "@/store/useUserStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import { useRouter } from "next/navigation";
import { useSearchStore } from "@/hooks/useSearchStore";

export const LoginHeader = () => {
  const router = useRouter();
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  const { userInfo } = useUserStore(); // 내 정보

  const { notifications, isLoaded } = useNotificationStore();
  const hasUnreadNotification = isLoaded && notifications.some((n) => n.isRead === 0);

  const notificationRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState<string>("");  // 헤더에서 관리되는 검색어
  const { setStoreKeyword } = useSearchStore();  // zustand에서의 keyword 상태 설정 함수

  // 검색어 입력
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (search.trim() !== "") {
        // 상태에 검색어 반영 후, 검색 페이지로 이동
        setStoreKeyword(search);
        router.push(`/personal/jobs`);
      }
    }
  };

  // 드롭다운 외부 클릭시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationOpen(false);
      }
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setChatOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleNotification = () => {
    setNotificationOpen((prev) => !prev);
    setChatOpen(false);
    setProfileOpen(false);
  };

  const toggleChat = () => {
    setChatOpen((prev) => !prev);
    setNotificationOpen(false);
    setProfileOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen((prev) => !prev);
    setNotificationOpen(false);
    setChatOpen(false);
  };

  return (
    <header className="border-b py-2.5 bg-white sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-blue-600 font-bold text-2xl">
            <Image
              src="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/logo/logo6.png"
              alt="로고"
              width={120}
              height={35}
              priority
            />
          </Link>

          <div className="relative flex items-center w-80">
            <Search className="absolute left-4 w-5 h-5 text-blue-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-12 pr-4 py-2 w-full text-sm font-semibold border border-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          {/* 알림 */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={toggleNotification}
              className="relative p-1 rounded-full hover:bg-gray-100"
              aria-label="알림"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              {hasUnreadNotification && (
                <span className="absolute -top-0.5 -right-0.5 block h-2 w-2 rounded-full bg-red-500" />
              )}
            </button>
            {notificationOpen && <NotificationDropdown />}
          </div>

          {/* 채팅 */}
          <div className="relative" ref={chatRef}>
            <button
              onClick={toggleChat}
              className="relative p-1 rounded-full hover:bg-gray-100"
              aria-label="채팅"
            >
              <MessageSquare className="h-5 w-5 text-gray-600" />
            </button>
            {chatOpen && <ChatDropdown />}
          </div>

          {/* 프로필 */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={toggleProfile}
              className="flex items-center gap-1 hover:bg-gray-100 rounded-full p-1"
            >
              <div className="relative h-7 w-7 rounded-full overflow-hidden">
                <Image
                  src="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/placeholder.svg?height=40&width=40"
                  alt="프로필 이미지"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium hidden sm:inline">
                {userInfo?.name || "게스트"}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
            {profileOpen && <ProfileDropdown />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default LoginHeader;
