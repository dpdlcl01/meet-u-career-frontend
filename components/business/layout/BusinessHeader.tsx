"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  Building2,
  ChevronDown,
  LogOut,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useEffect,
  useRef,
  useState,
  MouseEvent as ReactMouseEvent,
} from "react";
import { NotificationDropdown } from "./NotificationDropdown";
import { ChatDropdown } from "./ChatDropdown"; // ✅ props 제거한 구조로 유지
import Image from "next/image";
import { useNotificationStore } from "@/store/useNotificationStore";
import { useAuthStore } from "@/store/useAuthStore";
import { apiClient } from "@/api/apiClient";
import { useUserStore } from "@/store/useUserStore";
import { useChatRooms } from "@/hooks/useChatRooms"; // ✅ 채팅 훅 추가

interface NavItem {
  label: string;
  href: string;
}

export const BusinessHeader = () => {
  const pathname: string = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const { clearTokens } = useAuthStore();
  const { userInfo, clearUserInfo } = useUserStore();
  const { notifications, isLoaded, clearNotifications, setNotifications } = useNotificationStore();
  const hasUnreadNotification =
    isLoaded && notifications.some((n) => n.isRead === 0);

  const { chatRooms } = useChatRooms(); // ✅ useChatRooms 사용
  const unreadChatCount = chatRooms.reduce((acc, room) => acc + room.unreadCount, 0); // ✅ 합계 계산

  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems: NavItem[] = [
    { label: "대시보드", href: "/business/dashboard" },
    { label: "공고 관리", href: "/business/jobs" },
    { label: "지원자 관리", href: "/business/applicants" },
    { label: "인재 검색", href: "/business/talents" },
    { label: "일정 관리", href: "/business/schedule" },
    { label: "결제 내역", href: "/business/payments" },
  ];

  const handleLogout = async () => {
    try {
      await apiClient.post("/api/auth/logout", {}, { withCredentials: true });
      clearTokens();
      clearUserInfo();
      clearNotifications();
      router.push("/login");
    } catch (error) {
      console.error("로그아웃 실패", error);
      clearTokens();
      clearUserInfo();
      clearNotifications();
      router.push("/login");
    }
  };

  // 헤더 마운트 시 알림 미리 불러오기
  useEffect(() => {
    if (!isLoaded) {
      (async () => {
        try {
          const res = await apiClient.get("/api/notification/list");
          setNotifications(res.data.data || []);
        } catch (error) {
          console.error("알림 미리 불러오기 실패:", error);
        }
      })();
    }
  }, [isLoaded, setNotifications]);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setIsNotificationOpen(false);
        setIsChatOpen(false);
      }
    };

    if (isOpen || isNotificationOpen || isChatOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, isNotificationOpen, isChatOpen]);

  return (
    <header className="sticky top-0 z-50 bg-[#1a3365] text-white py-3 px-6">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto w-full">
        {/* 로고 + 메뉴 */}
        <div className="flex items-center space-x-8">
          <Link href="/business/dashboard" className="text-xl font-semibold">
            <Image
              src="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/logo/logo_business_re.png"
              alt="로고"
              width={120}
              height={35}
              priority
            />
          </Link>
          <nav>
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium hover:text-white/90 transition-colors",
                      pathname.startsWith(item.href)
                        ? "border-b-2 border-white pb-1"
                        : "text-white/80"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* 알림, 채팅, 사용자 메뉴 */}
        <div className="flex items-center space-x-4">
          {/* 알림 */}
          <div className="relative">
            <button
              onClick={(e: ReactMouseEvent) => {
                e.stopPropagation();
                setIsNotificationOpen((prev) => !prev);
                setIsChatOpen(false);
                setIsOpen(false);
              }}
              className="focus:outline-none focus:ring-2 focus:ring-white/30 rounded-full p-1"
              aria-label="알림"
            >
              <Bell className="h-5 w-5 text-white/80" />
              {hasUnreadNotification && (
                <span className="absolute -top-0.5 -right-0.5 block h-2 w-2 rounded-full bg-red-500" />
              )}
            </button>
            {isNotificationOpen && (
              <NotificationDropdown
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
              />
            )}
          </div>

          {/* 채팅 */}
          <div className="relative">
            <button
              onClick={(e: ReactMouseEvent) => {
                e.stopPropagation();
                setIsChatOpen((prev) => !prev);
                setIsNotificationOpen(false);
                setIsOpen(false);
              }}
              className="focus:outline-none focus:ring-2 focus:ring-white/30 rounded-full p-1"
              aria-label="메시지"
            >
              <MessageSquare className="h-5 w-5 text-white/80" />
              {unreadChatCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {unreadChatCount > 9 ? "9+" : unreadChatCount}
                </span>
              )}
            </button>
            {isChatOpen && <ChatDropdown />} {/* ✅ 조건부 렌더링 방식 적용 */}
          </div>

          {/* 사용자 메뉴 */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center space-x-1 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 rounded-md px-2 py-1"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-haspopup="true"
            >
              <span className="text-white/80">{userInfo?.companyName}</span>
              <span className="font-medium">{userInfo?.name}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-white/80 transition-transform duration-200",
                  isOpen ? "rotate-180" : ""
                )}
              />
            </button>

            {isOpen && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10"
                role="menu"
              >
                <div className="py-1 border-b border-gray-100">
                  <div className="px-4 py-2 text-sm text-gray-700 font-medium">
                    {userInfo?.name}님
                  </div>
                  <div className="px-4 py-1 text-xs text-gray-500">
                    {userInfo?.companyName} - {userInfo?.position}
                  </div>
                </div>
                <div className="py-1">
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/business/profile");
                    }}
                  >
                    <Building2 className="mr-2 h-4 w-4" />
                    기업 정보 관리
                  </button>
                </div>
                <div className="py-1 border-t border-gray-100">
                  <button
                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                    role="menuitem"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} className="mr-2" />
                    로그아웃
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
