"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Bookmark,
  FileText,
  Home,
  Mail,
  MessageSquare,
  Send,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

import { useSidebar } from "./SidebarProvider";
import { useUserStore } from "@/store/useUserStore";

interface PersonalSidebarProps {
  activeItem?: string;
  stats: {
    applications: number;
    offers: number;
    interviews: number;
  };
}

export const PersonalSidebar = ({
  activeItem = "MY홈",
  stats,
}: PersonalSidebarProps) => {
  const { userInfo } = useUserStore();
  console.log(JSON.stringify(userInfo));

  const { sidebarOpen: isOpen, setSidebarOpen } = useSidebar();
  const onClose = () => setSidebarOpen(false);

  useEffect(() => {
    const handleBodyScroll = () => {
      if (window.innerWidth < 768 && isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    };

    handleBodyScroll();
    window.addEventListener("resize", handleBodyScroll);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", handleBodyScroll);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-20 transition-opacity md:hidden"
          aria-hidden="true"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-16 bottom-0 left-0 w-64 bg-white shadow-sm z-20 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="p-4 border-b border-gray-100">
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden mb-2">
                <Image
                  src="/images/etc/vibrant-street-market.png"
                  alt="User profile"
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  {userInfo?.name}
                </h2>
              </div>
            </div>

            <div className="flex justify-between mt-4 text-center bg-blue-50 rounded-md p-3">
              <div className="flex-1">
                <p className="text-xl font-bold text-blue-600">
                  {stats.applications}
                </p>
                <p className="text-xs text-gray-500">지원</p>
              </div>
              <div className="flex-1">
                <p className="text-xl font-bold text-blue-600">
                  {stats.offers}
                </p>
                <p className="text-xs text-gray-500">제안</p>
              </div>
              <div className="flex-1">
                <p className="text-xl font-bold text-blue-600">
                  {stats.interviews}
                </p>
                <p className="text-xs text-gray-500">면접</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`flex items-center py-3.5 px-4 ${
                      item.label === activeItem
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:bg-gray-100"
                    } rounded-md`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.label}</span>
                    {item.label === activeItem && (
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

const menuItems = [
  { label: "MY홈", icon: Home, href: "/personal/mypage" },
  { label: "이력서 관리", icon: FileText, href: "/personal/mypage/resume" },
  {
    label: "자기소개서 관리",
    icon: FileText,
    href: "/personal/mypage/cover-letter",
  },
  { label: "스크랩", icon: Bookmark, href: "/personal/mypage/bookmarks" },
  { label: "지원 내역", icon: Send, href: "/personal/mypage/applications" },
  {
    label: "면접 현황",
    icon: MessageSquare,
    href: "/personal/mypage/interviews",
  },
  { label: "받은 제안", icon: Mail, href: "/personal/mypage/offers" },
  { label: "열람 차단", icon: HelpCircle, href: "/personal/mypage/block" },
];
