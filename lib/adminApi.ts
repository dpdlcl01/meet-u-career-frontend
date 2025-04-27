// lib/adminApi.ts

import { apiClient } from "@/api/apiClient"
import type { AdminData } from "@/types/admin/AdminData"

// 관리자 목록 조회
export const fetchAdmins = async (keyword?: string): Promise<AdminData[]> => {
  const response = await apiClient.get(`/api/admin/accounts`, {
    params: keyword ? { keyword } : {},
  })
  return response.data.data
}

// 관리자 생성
export const createAdmin = async (admin: Partial<AdminData>) => {
  const payload = {
    name: admin.name,
    email: admin.email,
    password: admin.password,
    role: admin.role,
  }
  return apiClient.post(`/api/admin/accounts`, payload)
}

// 관리자 수정
export const updateAdmin = async (admin: Partial<AdminData> & { id: number }) => {
  const payload = {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    password: admin.password,
    role: admin.role,
  }
  return apiClient.put(`/api/admin/accounts`, payload)
}

// 관리자 삭제
export const deleteAdmin = async (id: number) => {
  return apiClient.delete(`/api/admin/accounts/${id}`)
}
