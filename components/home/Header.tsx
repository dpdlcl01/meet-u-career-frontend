"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useSearchStore } from "@/hooks/useSearchStore";
import { useState } from "react";

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState<string>(""); // 헤더에서 관리되는 검색어
  const { setStoreKeyword } = useSearchStore(); // zustand에서의 keyword 상태 설정 함수

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

  return (
    <header className="border-b py-2.5 bg-[#fcfcfd] sticky top-0 z-50">
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
        <div className="flex items-center gap-4 text-xs text-gray-600">
          <Link
            href="/login"
            className={
              pathname === "/login"
                ? "border-b-2 border-gray-900 pb-1"
                : "hover:text-gray-900"
            }
          >
            로그인
          </Link>
          <Link
            href="/register"
            className={
              pathname === "/register"
                ? "border-b-2 border-gray-900 pb-1"
                : "hover:text-gray-900"
            }
          >
            회원가입
          </Link>
          <Link
            href="/business/dashboard"
            className={
              pathname === "/business"
                ? "border-b-2 border-gray-900 pb-1"
                : "hover:text-gray-900"
            }
          >
            기업서비스
          </Link>
        </div>
      </div>
    </header>
  );
};
