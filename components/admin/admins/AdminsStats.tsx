// components/admin/AdminsStats.tsx

"use client"

import { Shield } from "lucide-react"

interface AdminsStatsProps {
  level1Count: number
  level2Count: number
}

export default function AdminsStats({ level1Count, level2Count }: AdminsStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-lg shadow flex items-center">
        <div className="bg-blue-50 p-3 rounded-full mr-4">
          <Shield className="text-blue-500" size={24} />
        </div>
        <div>
          <div className="text-2xl font-bold">{level1Count}</div>
          <div className="text-sm text-gray-500">레벨 1 관리자</div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow flex items-center">
        <div className="bg-blue-50 p-3 rounded-full mr-4">
          <Shield className="text-blue-500" size={24} />
        </div>
        <div>
          <div className="text-2xl font-bold">{level2Count}</div>
          <div className="text-sm text-gray-500">레벨 2 관리자</div>
        </div>
      </div>
    </div>
  )
}