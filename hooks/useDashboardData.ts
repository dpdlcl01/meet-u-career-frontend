"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/api/apiClient";

export interface JobPostingItem {
  jobPostingId: number;
  title: string;
  location: string;
  postedDate: string;
  deadline: string;
  viewCount: number;
  applicationCount: number;
  industry: string;
  jobType: string;
  salaryRange: string;
  keyword: string;
}

export interface BusinessDashboardData {
  companyName: string;
  industry: string;
  address: string;
  foundedDate: string;
  employeeScale: string;
  totalJobPostings: number;
  activeJobPostings: number;
  closedJobPostings: number;
  nearingDeadlineJobPostings: number;
  totalViews: number;
  totalApplications: number;
  jobCategoryViewCount: { [key: string]: number };
  jobCategoryApplicationCount: { [key: string]: number };
  jobPostings: JobPostingItem[];
}

const useDashboardData = () => {
  const [data, setData] = useState<BusinessDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get("/api/business/dashboard/info");
        setData(res.data.data);
      } catch (error) {
        console.error("🚨 대시보드 데이터 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading };
};

export default useDashboardData;
