import { apiClient } from "@/api/apiClient";

/**
 * 대시보드 데이터 타입 정의
 */
export interface BusinessDashboardData {
  companyName: string;
  industry: string;
  address: string;
  foundedDate: string;
  employeeScale: string;
  totalJobPostings: number;
  activeJobPostings: number;
  nearingDeadlineJobPostings: number;
  closedJobPostings: number;
  totalViews: number;
  totalApplications: number;
  jobCategoryViewCount: Record<string, number>;
  jobCategoryApplicationCount: Record<string, number>;
  jobPostings: {
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
  }[];
}

/**
 * 기업 대시보드 데이터를 가져오는 API 호출
 */
export const fetchBusinessDashboard = async (): Promise<BusinessDashboardData> => {
  const res = await apiClient.get("/api/business/dashboard/info", {
    withCredentials: true, // ✅ 쿠키 인증 포함
  });

  console.log("✅ 대시보드 전체 데이터:", res.data.data);
  return res.data.data;
};
