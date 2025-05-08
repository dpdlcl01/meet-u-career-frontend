"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import PaymentsManagement from "@/components/admin/payments/PaymentsManagement";
import AdminHeader from "@/components/admin/layout/AdminHeader";

export default function PaymentsPage() {
  const isChecking = useAuthGuard(["admin", "super"]);

  if (isChecking) return null; // 검사 중일 땐 아무것도 렌더링하지 않음

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <PaymentsManagement />
    </div>
  );
}
