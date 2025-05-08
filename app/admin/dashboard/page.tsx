"use client";

import { useState } from "react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import AdminHeader from "@/components/admin/layout/AdminHeader";
import UserDashboard from "@/components/admin/dashboard/UserDashboard";
import JobPostingDashboard from "@/components/admin/dashboard/JobPostingDashboard";
import ApplicationStatusDashboard from "@/components/admin/dashboard/ApplicationStatusDashboard";
import { Tabs } from "@/components/admin/dashboard/Tabs";
import { apiClient } from "@/api/apiClient";
import { toast } from "@/components/ui/use-toast";

export default function AdminDashboardPage() {
  const isChecking = useAuthGuard(["admin", "super"]); // SUPER, ADMIN 둘 다 접근 가능

  const [activeTab, setActiveTab] = useState<string>("user");
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  if (isChecking) return null;

  // 보고서 다운로드
  const handleDownloadReport = async () => {
    try {
      setIsDownloading(true);

      const response = await apiClient.get("/api/admin/dashboard/download", {
        responseType: "blob",
      });

      const disposition = response.headers["content-disposition"];
      let fileName = "report.xlsx"; // fallback

      if (disposition) {
        const match = disposition.match(/filename\*=UTF-8''(.+)/);
        if (match && match[1]) {
          fileName = decodeURIComponent(match[1]);
        }
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast({
        title: "보고서 다운로드 완료",
        description: "대시보드 보고서 파일을 다운로드했습니다.",
      });
    } catch (error) {
      console.error("보고서 다운로드 실패:", error);

      toast({
        title: "보고서 다운로드 실패",
        description: "네트워크 오류 또는 서버 오류가 발생했습니다.",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">대시보드</h1>
          <button
            onClick={handleDownloadReport}
            disabled={isDownloading}
            className={`${isDownloading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
              } text-white px-4 py-2 rounded-md text-sm`}
          >
            {isDownloading ? "다운로드 중..." : "보고서 생성"}
          </button>
        </div>

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "user" && <UserDashboard />}
        {activeTab === "jobPosting" && <JobPostingDashboard />}
        {activeTab === "applicationStatus" && <ApplicationStatusDashboard />}
      </main>
    </div>
  );
}
