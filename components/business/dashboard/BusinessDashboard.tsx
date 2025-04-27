"use client";

import { useEffect, useState } from "react";
import { fetchBusinessDashboard, BusinessDashboardData } from "@/lib/fetchBusinessDashboard";
import { BusinessHeader } from "@/components/business/layout/BusinessHeader";
import { CompanyProfile } from "./CompanyProfile";
import { JobStatistics } from "./JobStatistics";
import { ViewStatistics } from "./ViewStatistics";
import { JobPostingsList } from "./JobPostingsList";
import {
  SkeletonCard,
  SkeletonJobStatistics,
  SkeletonViewStatistics,
  SkeletonJobList,
} from "@/components/ui/skeleton";

export const BusinessDashboard = () => {
  const [data, setData] = useState<BusinessDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const dashboardData = await fetchBusinessDashboard();
        console.log("🔥 최종 받은 대시보드 데이터:", dashboardData);
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
    return (
      <div className="min-h-screen bg-gray-50">
        <BusinessHeader />
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <SkeletonCard />
          <SkeletonJobStatistics />
          <SkeletonViewStatistics />
          <SkeletonJobList />
        </main>
      </div>
    );
  }

  // 기본값 설정 (null일 경우)
  const defaultData: BusinessDashboardData = {
    companyName: "",
    industry: "",
    address: "",
    foundedDate: "",
    employeeScale: "",
    totalJobPostings: 0,
    activeJobPostings: 0,
    nearingDeadlineJobPostings: 0,
    closedJobPostings: 0,
    totalViews: 0,
    totalApplications: 0,
    jobCategoryViewCount: {},
    jobCategoryApplicationCount: {},
    jobPostings: [],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BusinessHeader />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <CompanyProfile data={data ?? defaultData} />
        <JobStatistics data={data ?? defaultData} />
        <ViewStatistics data={data ?? defaultData} />
        <JobPostingsList data={data?.jobPostings || []} />
      </main>
    </div>
  );
};
