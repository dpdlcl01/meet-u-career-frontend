"use client"

import Link from "next/link"
import Image from "next/image"
import { User, Settings, Bell, Bookmark, FileText, LogOut } from "lucide-react"

export function ProfileDropdown() {
  const handleLogout = () => {
    // Logout logic here
    console.log("Logging out")
  }

  return (
    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg overflow-hidden z-50">
      <div className="p-4 border-b">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Image
              src="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/vibrant-street-market.png"
              alt="User profile"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">홍길동</p>
            <p className="text-xs text-gray-500">user@example.com</p>
          </div>
        </div>
      </div>

      <div className="py-1">
        <Link href="/personal/mypage" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          <User className="mr-3 h-5 w-5 text-gray-400" />
          마이페이지
        </Link>

        <Link href="/personal/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          <Settings className="mr-3 h-5 w-5 text-gray-400" />
          설정
        </Link>

        <Link
          href="/personal/notifications"
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <Bell className="mr-3 h-5 w-5 text-gray-400" />
          알림
        </Link>

        <Link
          href="/personal/bookmarks"
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <Bookmark className="mr-3 h-5 w-5 text-gray-400" />
          저장한 항목
        </Link>

        <Link href="/personal/resume" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          <FileText className="mr-3 h-5 w-5 text-gray-400" />
          이력서 관리
        </Link>
      </div>

      <div className="py-1 border-t">
        <button
          onClick={handleLogout}
          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-400" />
          로그아웃
        </button>
      </div>
    </div>
  )
}
