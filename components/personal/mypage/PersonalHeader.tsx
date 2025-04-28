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

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    restoreUserInfo();
  }, [restoreUserInfo]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isNotificationOpen && notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setIsNotificationOpen(false);
      }
      if (isChatOpen && chatRef.current && !chatRef.current.contains(e.target as Node)) {
        setIsChatOpen(false);
      }
      if (isProfileOpen && profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isNotificationOpen, isChatOpen, isProfileOpen]);

  const handleSelectRoom = (roomId: string) => {
    setIsChatOpen(false);
    window.open(`/chat?roomId=${roomId}`, "ChatWindow", "width=800,height=600,resizable,scrollbars");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-30">
      <div className="flex items-center justify-between h-full px-4">
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

        <div className="flex items-center gap-3">
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
