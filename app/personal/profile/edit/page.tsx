"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { SidebarProvider } from "@/components/personal/mypage/SidebarProvider";
import { PersonalHeader } from "@/components/personal/mypage/PersonalHeader";
import { PersonalSidebar } from "@/components/personal/mypage/PersonalSidebar";
import { ProfileEditContent } from "@/components/personal/profile/edit/ProfileEditContent";

export default function ProfileEditPage() {
  const isChecking = useAuthGuard("personal");

  if (isChecking) return null;

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50">
        <PersonalHeader />
        <div className="flex pt-16">
          <PersonalSidebar activeItem="MY홈" />
          <main className="flex-1 md:ml-64 p-4 md:p-8">
            <ProfileEditContent />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
