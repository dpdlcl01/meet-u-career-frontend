"use client";

import { Header } from "@/components/home/Header"
import { LoginHeader } from "@/components/home/LoginHeader";
import { MainNavigation } from "@/components/home/MainNavigation"
import { ReviewsContent } from "@/components/personal/reviews/ReviewsContent"
import { Footer } from "@/components/home/Footer"
import { useUserStore } from "@/store/useUserStore";

export default function ReviewsPage() {
  const { userInfo, isUserInfoHydrated } = useUserStore();

  if (!isUserInfoHydrated) {
    return null; // 아직 복구 중이면 화면 그리지 않음
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfd]">
      {userInfo ? <LoginHeader /> : <Header />}
      <MainNavigation />
      <main className="flex-1">
        <ReviewsContent />
      </main>
      <Footer />
    </div>
  )
}
