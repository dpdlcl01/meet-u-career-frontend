"use client";

import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/api/apiClient";

interface ResumeDownloadButtonProps {
  resumeId: number;
  resumeTitle: string;
}

export const ApplicantDetailHeader = ({ resumeId, resumeTitle }: ResumeDownloadButtonProps) => {
  const handleDownload = async () => {
    const agreed = window.confirm(
      "이력서를 다운로드하려면 개인정보 수집 및 이용에 동의하셔야 합니다.\n동의하시겠습니까?"
    );
    if (!agreed) return;

    try {
      const response = await apiClient.get(
        `/api/business/resume/${resumeId}/download?agreed=true`,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      // 파일명에 이력서 제목 반영, 공백 제거 및 확장자 붙이기
      const sanitizedTitle = resumeTitle.replace(/\s+/g, "_");
      a.download = `${sanitizedTitle}.pdf`;

      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("이력서 다운로드 실패:", error);
      alert("이력서를 다운로드할 수 없습니다.");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center gap-2">
        <Link href="/business/applicants" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold">지원자 상세 정보</h1>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={handleDownload} variant="outline" size="sm" className="flex items-center gap-1">
          <Download className="h-4 w-4" />
          <span>이력서 다운로드</span>
        </Button>
      </div>
    </div>
  );
};
