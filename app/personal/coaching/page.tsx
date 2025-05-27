"use client";

import { Header } from "@/components/home/Header"
import { LoginHeader } from "@/components/home/LoginHeader"
import { MainNavigation } from "@/components/home/MainNavigation"
import { CoachingContent } from "@/components/personal/coaching/CoachingContent"
import { Footer } from "@/components/home/Footer"
import { useUserStore } from "@/store/useUserStore";

export default function CoachingPage() {
  const { userInfo, isUserInfoHydrated } = useUserStore();

  if (!isUserInfoHydrated) {
    return null; // 아직 복구 중이면 화면 그리지 않음
  }

  return (
    <div className="min-h-screen flex flex-col">
      {userInfo ? <LoginHeader /> : <Header />}
      <MainNavigation />
      <main className="flex-1 bg-gray-50">
        <CoachingContent />
      </main>
      <Footer />
    </div>
  )
}
