
export const SalaryByPosition = () => {
  const positionData = [
    { position: "사원", minSalary: 4200, maxSalary: 5800, avgSalary: 5100 },
    { position: "대리", minSalary: 5500, maxSalary: 7200, avgSalary: 6500 },
    { position: "과장", minSalary: 7000, maxSalary: 9500, avgSalary: 8200 },
    { position: "차장", minSalary: 8500, maxSalary: 11000, avgSalary: 9800 },
    { position: "부장", minSalary: 10000, maxSalary: 14000, avgSalary: 12000 },
  ]

  return (
    <div className="mb-10">
      <h2 className="text-lg font-bold mb-4">직급별 연봉정보</h2>

      <div className="bg-white border rounded-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-sm">직급</th>
                <th className="text-left py-3 px-4 font-medium text-sm">최저연봉</th>
                <th className="text-left py-3 px-4 font-medium text-sm">평균연봉</th>
                <th className="text-left py-3 px-4 font-medium text-sm">최고연봉</th>
                <th className="text-left py-3 px-4 font-medium text-sm">연봉범위</th>
              </tr>
            </thead>
            <tbody>
              {positionData.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4 text-sm font-medium">{item.position}</td>
                  <td className="py-3 px-4 text-sm">{item.minSalary}만원</td>
                  <td className="py-3 px-4 text-sm font-medium text-blue-600">{item.avgSalary}만원</td>
                  <td className="py-3 px-4 text-sm">{item.maxSalary}만원</td>
                  <td className="py-3 px-4">
                    <div className="relative w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className="absolute left-0 top-0 h-full bg-blue-500 rounded-full"
                        style={{
                          width: `${((item.maxSalary - item.minSalary) / 14000) * 100}%`,
                          left: `${(item.minSalary / 14000) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
