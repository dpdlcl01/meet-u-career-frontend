
export const EmployeeStatistics = () => {
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">우리는 이렇게 구성되어 있어요</h2>
        <span className="text-xs text-gray-500">출처: 국민연금공단</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border rounded-md p-4">
          <h3 className="text-sm font-medium text-center mb-4">직원 남녀비율</h3>
          <div className="relative w-36 h-36 mx-auto">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Background circle */}
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#E5E7EB" strokeWidth="16" />

              {/* Male percentage (92.4%) */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#3B82F6"
                strokeWidth="16"
                strokeDasharray="251.2"
                strokeDashoffset="19.1" // 251.2 * (1 - 0.924)
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-bold">
                  92.4<span className="text-sm">%</span>
                </div>
                <div className="text-xs text-gray-500">남성</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-8 mt-4">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-sm mr-1"></span>
              <span className="text-xs">남자비율</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-gray-300 rounded-sm mr-1"></span>
              <span className="text-xs">여자비율</span>
            </div>
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-500">
            <div>
              남성 <span className="font-medium">92.4%</span>
            </div>
            <div>
              여성 <span className="font-medium">7.6%</span>
            </div>
          </div>
        </div>

        <div className="border rounded-md p-4">
          <h3 className="text-sm font-medium text-center mb-4">사업부별 비율</h3>
          <div className="relative w-36 h-36 mx-auto">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="40" fill="#3B82F6" />
              <text
                x="50"
                y="50"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="16"
                fontWeight="bold"
              >
                100%
              </text>
              <text x="50" y="65" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="10">
                자동차부문
              </text>
            </svg>
          </div>
          <div className="flex justify-center mt-4">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-sm mr-1"></span>
              <span className="text-xs">자동차부문</span>
            </div>
          </div>
        </div>

        <div className="border rounded-md p-4">
          <h3 className="text-sm font-medium text-center mb-4">근속 연수</h3>
          <div className="flex items-end justify-center h-36 pt-4">
            <div className="text-center mr-8">
              <div className="text-xs text-gray-500 mb-2">평균 근속연수</div>
              <div className="text-lg font-bold">
                13.6<span className="text-sm">년</span>
              </div>
            </div>
            <div className="relative w-16">
              <div className="bg-blue-500 w-full h-32 rounded-t-md relative">
                <div className="absolute -top-6 left-0 w-full text-center text-xs text-gray-500">13년 6개월</div>
              </div>
              <div className="text-center mt-2">
                <div className="text-xs text-gray-500">자동차부문</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
