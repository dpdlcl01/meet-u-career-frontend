import { apiClient } from "@/api/apiClient";
import type { AdminData } from "@/components/admin/admins/AdminModal";

/** Fetch list of admins, optional search keyword */
export async function fetchAdmins(keyword = ""): Promise<AdminData[]> {
  const response = await apiClient.get<{ data: AdminData[] }>("/api/admins", {
    params: { keyword },
  });
  return response.data.data;
}

/** Create a new admin account */
export async function createAdmin(data: Omit<AdminData, "id" | "confirmPassword"> & { password: string }): Promise<AdminData> {
  const response = await apiClient.post<{ data: AdminData }>("/api/admins", data);
  return response.data.data;
}

/** Update an existing admin account */
export async function updateAdmin(data: Partial<Omit<AdminData, "confirmPassword">> & { id: number }): Promise<AdminData> {
  const { id, ...payload } = data;
  const response = await apiClient.patch<{ data: AdminData }>(`/api/admins/${id}`, payload);
  return response.data.data;
}

/** Delete an admin by ID */
export async function deleteAdmin(id: number): Promise<void> {
  await apiClient.delete(`/api/admins/${id}`);
}
