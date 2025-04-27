export const SalaryComparison = () => {
  const comparisonData = [
    { company: "현대자동차", avgSalary: 11781, color: "bg-blue-500" },
    { company: "기아자동차", avgSalary: 10950, color: "bg-blue-400" },
    { company: "삼성전자", avgSalary: 12500, color: "bg-gray-400" },
    { company: "LG전자", avgSalary: 11200, color: "bg-gray-400" },
    { company: "제조업 평균", avgSalary: 8150, color: "bg-gray-300" },
  ]

  // Find the maximum salary for scaling
  const maxSalary = Math.max(...comparisonData.map((item) => item.avgSalary))

  return (
    <div className="mb-10">
      <h2 className="text-lg font-bold mb-4">동종업계 연봉비교</h2>

      <div className="bg-white border rounded-lg p-6">
        <div className="space-y-4">
          {comparisonData.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="w-32 text-sm">{item.company}</div>
              <div className="flex-1">
                <div className="relative h-8">
                  <div
                    className={`absolute left-0 top-0 h-full ${item.color} rounded`}
                    style={{ width: `${(item.avgSalary / maxSalary) * 100}%` }}
                  >
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-sm font-medium">
                      {item.avgSalary}만원
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}