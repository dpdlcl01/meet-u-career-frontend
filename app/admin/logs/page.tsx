"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import AdminHeader from "@/components/admin/layout/AdminHeader";
import LogsManagement from "@/components/admin/logs/LogsManagement";

export default function LogsPage() {
  const isChecking = useAuthGuard("super"); // SUPER만 접근 가능

  if (isChecking) return null; // 검사 중일 땐 아무것도 렌더링하지 않음

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <LogsManagement />
      </main>
    </div>
  );
}
