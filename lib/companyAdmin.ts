import { apiClient } from "@/api/apiClient"
import type { CompanyDetail } from "@/types/admin/CompanyDetail"

interface CompanyListResponse {
  content: CompanyDetail[]
  totalPages: number
  totalElements: number
}

/**
 * 기업 목록 조회 (검색어 + 정렬 기준 포함)
 * 
 * @param page        - 페이지 번호 (0부터 시작)
 * @param size        - 한 페이지당 항목 수
 * @param status      - 상태 필터 (all | pending | approved)
 * @param keyword     - 검색어 (기업명)
 * @param sort        - 정렬 기준 (default | foundedDate | size)
 */
export const fetchCompanyList = async (
  page: number,
  size: number,
  status: "all" | "pending" | "approved",
  keyword?: string,
  sort?: "default" | "foundedDate" | "size"
): Promise<CompanyListResponse> => {
  const res = await apiClient.get(`/api/admin/companies`, {
    params: {
      page,
      size,
      status,
      keyword,
      sort,
    },
  })
  return res.data.data
}

/**
 * 기업 상세 조회
 * @param id - 기업 ID
 */
export const fetchCompanyDetail = async (id: number): Promise<CompanyDetail> => {
  const res = await apiClient.get(`/api/admin/companies/${id}`)
  return res.data.data
}

/**
 * 기업 활성화
 */
export const approveCompany = (id: number) =>
  apiClient.post(`/api/admin/companies/${id}/approve`)

/**
 * 기업 비활성화
 */
export const rejectCompany = (id: number) =>
  apiClient.post(`/api/admin/companies/${id}/reject`)

/**
 * 기업 대기 상태로 변경
 */
export const blockCompany = (id: number) =>
  apiClient.post(`/api/admin/companies/${id}/block`)
