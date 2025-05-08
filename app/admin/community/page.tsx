"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import AdminHeader from "@/components/admin/layout/AdminHeader";
import CommunityManagement from "@/components/admin/community/CommunityManagement";

export default function CommunityPage() {
  const isChecking = useAuthGuard(["admin", "super"]);

  if (isChecking) return null; // 검사 중일 땐 아무것도 렌더링하지 않음

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <CommunityManagement />
    </div>
  );
}
