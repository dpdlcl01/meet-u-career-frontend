import type React from "react"
import { FileText, Clock, Award } from "lucide-react"
interface OffersStatsProps {
  counts: {
    전체: number
    검토중: number
    수락함: number
    거절함: number
  }
}
export function OffersStats({ counts }: OffersStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <StatCard icon={<FileText />} count={counts.전체} label="총 제안" />
      <StatCard icon={<Clock />} count={counts.검토중} label="검토중" />
      <StatCard icon={<Award />} count={counts.수락함} label="수락함" />
    </div>
  )
}
function StatCard({ icon, count, label }: { icon: React.ReactNode; count: number; label: string }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex items-start">
      <div className="bg-blue-50 p-3 rounded-full mr-4 flex items-center justify-center">
        <div className="text-blue-500 w-5 h-5">{icon}</div>
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{count}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  )
}