"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ChevronDown, LogOut, User, Settings } from "lucide-react"
import Image from "next/image"

export default function AdminHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    // Handle ESC key to close dropdown
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscKey)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [])

  const handleLogout = () => {
    // Placeholder for logout functionality
    console.log("Logging out...")
    // Redirect to login page
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50 bg-[#1a3365] text-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/admin/dashboard" className="text-xl font-semibold">
            <Image
              src="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/logo/logo_admin_re.png"
              alt="로고"
              width={120}
              height={35}
              priority
            />
          </Link>

          <nav className="hidden md:flex space-x-1">
            <Link
              href="/admin/dashboard"
              className={`px-3 py-2 font-medium ${pathname.includes("/admin/dashboard") ? "border-b-2 border-white" : "hover:bg-blue-800/20"}`}
            >
              대시보드
            </Link>
            <Link
              href="/admin/companies"
              className={`px-3 py-2 font-medium ${pathname.includes("/admin/companies") ? "border-b-2 border-white" : "hover:bg-blue-800/20"}`}
            >
              기업 관리
            </Link>
            <Link
              href="/admin/jobs"
              className={`px-3 py-2 font-medium ${pathname.includes("/admin/jobs") ? "border-b-2 border-white" : "hover:bg-blue-800/20"}`}
            >
              공고 관리
            </Link>
            <Link
              href="/admin/members"
              className={`px-3 py-2 font-medium ${pathname.includes("/admin/members") ? "border-b-2 border-white" : "hover:bg-blue-800/20"}`}
            >
              회원 관리
            </Link>
            <Link
              href="/admin/community"
              className={`px-3 py-2 font-medium ${pathname.includes("/admin/community") ? "border-b-2 border-white" : "hover:bg-blue-800/20"}`}
            >
              커뮤니티 관리
            </Link>
            <Link
              href="/admin/payments"
              className={`px-3 py-2 font-medium ${pathname.includes("/admin/payments") ? "border-b-2 border-white" : "hover:bg-blue-800/20"}`}
            >
              결제 관리
            </Link>
            <Link
              href="/admin/admins"
              className={`px-3 py-2 font-medium ${pathname.includes("/admin/admins") ? "border-b-2 border-white" : "hover:bg-blue-800/20"}`}
            >
              관리자 관리
            </Link>
            <Link
              href="/admin/logs"
              className={`px-3 py-2 font-medium ${pathname.includes("/admin/logs") ? "border-b-2 border-white" : "hover:bg-blue-800/20"}`}
            >
              로그 관리
            </Link>
          </nav>
        </div>

        <div className="flex items-center relative" ref={dropdownRef}>
          <button
            className="flex items-center space-x-1 bg-blue-900/30 rounded-full px-3 py-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-blue-900 text-xs">
              K
            </span>
            <span>김관리</span>
            <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">김관리</p>
                <p className="text-xs text-gray-500 truncate">admin@saramin.co.kr</p>
              </div>

              <Link
                href="/admin/profile"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                role="menuitem"
              >
                <User size={16} className="mr-2" />
                프로필 관리
              </Link>

              <Link
                href="/admin/settings"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                role="menuitem"
              >
                <Settings size={16} className="mr-2" />
                설정
              </Link>

              <div className="border-t border-gray-100 my-1"></div>

              <button
                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                onClick={handleLogout}
                role="menuitem"
              >
                <LogOut size={16} className="mr-2" />
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
