"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { PersonalHeader } from "@/components/personal/mypage/PersonalHeader";
import { PersonalSidebar } from "@/components/personal/mypage/PersonalSidebar";
import { ApplicationsContent } from "@/components/personal/mypage/applications/ApplicationsContent";
import { useSidebar } from "@/components/personal/mypage/SidebarProvider";

export default function ApplicationsPage() {
  const isChecking = useAuthGuard("personal"); // personal만 접근 가능

  const { sidebarOpen } = useSidebar();

  if (isChecking) return null; // 검사 중일 땐 아무것도 렌더링하지 않음

  return (
    <main className="min-h-screen bg-gray-50">
      <PersonalHeader />
      <div
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? "md:pl-64" : "md:pl-0"
        }`}
      >
        <PersonalSidebar activeItem="지원 내역" />
        <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <ApplicationsContent />
        </div>
      </div>
    </main>
  );
}
