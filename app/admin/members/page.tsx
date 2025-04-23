"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import MembersManagement from "@/components/admin/members/MembersManagement";
import AdminHeader from "@/components/admin/layout/AdminHeader";

export default function MembersPage() {
  const isChecking = useAuthGuard("admin"); // admin만 접근 가능

  if (isChecking) return null; // 검사 중일 땐 아무것도 렌더링하지 않음

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <MembersManagement />
    </div>
  );
}
