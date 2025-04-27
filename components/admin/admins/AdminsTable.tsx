
"use client"

import type { AdminData } from "@/types/admin/AdminData"

interface AdminsTableProps {
  admins: AdminData[]
  onEdit: (admin: AdminData) => void
  onDelete: (id: number) => void
}

export default function AdminsTable({ admins, onEdit, onDelete }: AdminsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase border-b">
          <tr>
            <th className="px-4 py-3">이름</th>
            <th className="px-4 py-3">이메일</th>
            <th className="px-4 py-3">직급</th>
            <th className="px-4 py-3">레벨</th>
            <th className="px-4 py-3">작업</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-4">{admin.name}</td>
              <td className="px-4 py-4">{admin.email}</td>
              <td className="px-4 py-4">
                {admin.role === 1 ? "Super" : admin.role === 2 ? "Admin" : "-"}
              </td>
              <td className="px-4 py-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${admin.role === 1
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                    }`}
                >
                  {admin.role === 1 ? "슈퍼 관리자" : admin.role === 2 ? "일반 관리자" : "알 수 없음"}
                </span>
              </td>
              <td className="px-4 py-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(admin)}
                    className="px-2 py-1 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    수정
                  </button>
                  {admin.role === 2 && (
                    <button
                      onClick={() => onDelete(admin.id!)}
                      className="px-2 py-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                    >
                      삭제
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
