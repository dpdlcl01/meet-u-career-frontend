"use client";

import { useEffect, useState } from "react";
import { fetchBusinessDashboard, BusinessDashboardData } from "@/lib/fetchBusinessDashboard";
import { BusinessHeader } from "@/components/business/layout/BusinessHeader";
import { CompanyProfile } from "./CompanyProfile";
import { JobStatistics } from "./JobStatistics";
import { ViewStatistics } from "./ViewStatistics";
import { JobPostingsList } from "./JobPostingsList";

export const BusinessDashboard = () => {
  const [data, setData] = useState<BusinessDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const dashboardData = await fetchBusinessDashboard();
        console.log("🔥 최종 받은 대시보드 데이터:", dashboardData); // 이거 추가
        setData(dashboardData);
      } catch (error) {
        console.error("❌ 대시보드 데이터 가져오기 실패", error);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BusinessHeader />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <CompanyProfile data={data} />
        <JobStatistics data={data} />
        <ViewStatistics data={data} />
        <JobPostingsList data={data.jobPostings} />
      </main>
    </div>
  );
};
