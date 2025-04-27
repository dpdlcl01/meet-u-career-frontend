"use client"

import Link from "next/link"
import { Menu, Bell, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NotificationDropdown } from "./NotificationDropdown"
import { ChatDropdown } from "@/components/personal/mypage/ChatDropdown"
import { ProfileDropdown } from "./ProfileDropdown"
import { useState, useRef, useEffect } from "react"

import { useSidebar } from "./SidebarProvider"

export function PersonalHeader() {
  const { toggleSidebar } = useSidebar()
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const notificationRef = useRef<HTMLDivElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if notification dropdown is open and clicked outside
      if (isNotificationOpen && notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false)
      }

      // Check if chat dropdown is open and clicked outside
      if (isChatOpen && chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsChatOpen(false)
      }

      // Check if profile dropdown is open and clicked outside
      if (isProfileOpen && profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }

    // Add event listener when any dropdown is open
    if (isNotificationOpen || isChatOpen || isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isNotificationOpen, isChatOpen, isProfileOpen])

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-30">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-gray-700"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
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
              className="relative rounded-full w-9 h-9 hover:bg-transparent"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
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
              className="relative rounded-full w-9 h-9 hover:bg-transparent"
              onClick={() => setIsChatOpen(!isChatOpen)}
              aria-label="Messages"
            >
              <MessageSquare className="h-[18px] w-[18px] text-gray-700" />
              <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs font-medium">
                2
              </span>
            </Button>
            {isChatOpen && <ChatDropdown />}
          </div>

          <div className="relative" ref={profileRef}>
            <Button
              variant="ghost"
              size="icon"
              className="p-0 rounded-full w-9 h-9 hover:bg-transparent"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="h-9 w-9 rounded-full bg-gray-200 overflow-hidden">{/* Profile image placeholder */}</div>
            </Button>
            {isProfileOpen && <ProfileDropdown />}
          </div>
        </div>
      </div>
    </header>
  )
}
