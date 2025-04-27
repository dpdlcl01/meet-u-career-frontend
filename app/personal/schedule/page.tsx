"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { Header } from "@/components/home/Header";
import { LoginHeader } from "@/components/home/LoginHeader";
import { MainNavigation } from "@/components/home/MainNavigation";
import { ScheduleContent } from "@/components/personal/schedule/ScheduleContent";
import { Footer } from "@/components/home/Footer";
import { useUserStore } from "@/store/useUserStore";

export default function SchedulePage() {
  const { userInfo, isUserInfoHydrated } = useUserStore();
  const isChecking = useAuthGuard("personal"); // personal만 접근 가능

  if (isChecking || !isUserInfoHydrated) return null; // 검사 중일 땐 아무것도 렌더링하지 않음

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {userInfo ? <LoginHeader /> : <Header />}
      <MainNavigation />
      <main className="flex-1 bg-gray-50">
        <ScheduleContent />
      </main>
      <Footer />
    </div>
  );
}
