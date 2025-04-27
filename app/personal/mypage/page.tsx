"use client";

import { useEffect, useState } from "react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { PersonalHeader } from "@/components/personal/mypage/PersonalHeader";
import { PersonalSidebar } from "@/components/personal/mypage/PersonalSidebar";
import { useSidebar } from "@/components/personal/mypage/SidebarProvider";
import { PersonalMyPageContent } from "@/components/personal/mypage/PersonalMyPageContent";
import { apiClient } from "@/api/apiClient";
import { PersonalMyPageInfo } from "@/types/personal";
import { useMyPageStore } from "@/hooks/useMyPageStore";

export default function PersonalMyPage() {
  const isChecking = useAuthGuard("personal");
  const { sidebarOpen } = useSidebar();
  const { setMyData, myData } = useMyPageStore(); // Zustand store로 상태 관리

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get<{ data: PersonalMyPageInfo }>(
          "/api/personal/mypage"
        );
        setMyData(res.data.data); // Zustand store에 데이터 설정
      } catch (err) {
        console.error("❌ 마이페이지 데이터 불러오기 실패", err);
      }
    };
    fetchData();
  }, []);  // 빈 배열로 한 번만 실행되도록

  if (isChecking || !myData) return null;

  return (
    <main className="min-h-screen bg-gray-50">
      <PersonalHeader />
      <div className={`pt-16 transition-all duration-300 ${sidebarOpen ? "md:pl-64" : "md:pl-0"}`}>
        <PersonalSidebar activeItem="MY홈" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <PersonalMyPageContent />
        </div>
      </div>
    </main>
  );
}
