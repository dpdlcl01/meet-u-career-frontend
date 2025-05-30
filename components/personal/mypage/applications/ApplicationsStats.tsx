interface ApplicationsStatsProps {
  total: number;
  applied: number;
  passed: number;
  rejected: number;
}

export const ApplicationsStats = ({ total, applied, passed, rejected }: ApplicationsStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-sm text-gray-600 mb-1">전체 지원</h3>
        <p className="text-xl font-bold text-blue-600">{total}건</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-sm text-gray-600 mb-1">지원완료</h3>
        <p className="text-xl font-bold text-gray-900">{applied}건</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-sm text-gray-600 mb-1">서류통과</h3>
        <p className="text-xl font-bold text-gray-900">{passed}건</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-sm text-gray-600 mb-1">불합격</h3>
        <p className="text-xl font-bold text-gray-900">{rejected}건</p>
      </div>
    </div>
  )
}
