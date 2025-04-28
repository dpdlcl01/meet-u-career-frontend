"use client"

import { useState } from "react"
import { InfoIcon, TrendingUp } from "lucide-react"

export const SalaryOverview = () => {
  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  const toggleTooltip = (id: string) => {
    if (showTooltip === id) {
      setShowTooltip(null)
    } else {
      setShowTooltip(id)
    }
  }

  return (
    <div className="mb-10">
      <h2 className="text-lg font-bold mb-4">평균연봉</h2>

      <div className="bg-white border rounded-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <h3 className="text-base font-medium">2023년 평균연봉</h3>
          <div className="flex ml-2">
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full mr-1">계약직 포함</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">임원 제외</span>
          </div>
          <button
            className="ml-1 text-gray-400 relative"
            onClick={() => toggleTooltip("salary-info")}
            aria-label="연봉 정보 도움말"
          >
            <InfoIcon size={16} />
            {showTooltip === "salary-info" && (
              <div className="absolute z-10 w-64 p-3 bg-white border shadow-lg rounded-md text-xs text-left text-gray-700 -translate-x-1/2 left-1/2 mt-1">
                <p className="font-medium mb-1">연봉 정보 출처</p>
                <p>국민연금공단에 신고된 표준보수월액을 기준으로 산정한 추정 연봉입니다.</p>
              </div>
            )}
          </button>
        </div>

        <div className="text-center mb-6">
          <p className="text-4xl font-bold text-blue-600">
            11,781<span className="text-xl font-normal ml-1">만원</span>
          </p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>최저</span>
            <span>최고</span>
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full mb-1">
            <div className="absolute left-0 top-0 h-full w-[65%] bg-blue-500 rounded-full"></div>
            <div className="absolute left-0 top-0 h-4 w-4 bg-white border-2 border-blue-500 rounded-full -mt-1 -ml-1"></div>
            <div className="absolute right-[35%] top-0 h-4 w-4 bg-white border-2 border-blue-500 rounded-full -mt-1 -ml-1"></div>
          </div>
          <div className="flex justify-between text-sm">
            <span>5,236만원</span>
            <span>11,403만원</span>
          </div>
        </div>

      </div>

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-base font-medium mb-4">연도별 평균연봉 추이</h3>
        <div className="h-64 relative">
          <div className="flex h-48 items-end justify-around">
            <div className="flex flex-col items-center">
              <div className="w-16 bg-blue-200 rounded-t" style={{ height: "120px" }}></div>
              <div className="text-xs mt-2">2021</div>
              <div className="text-sm font-medium">9,587만원</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 bg-blue-300 rounded-t" style={{ height: "140px" }}></div>
              <div className="text-xs mt-2">2022</div>
              <div className="text-sm font-medium">10,492만원</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 bg-blue-500 rounded-t" style={{ height: "160px" }}></div>
              <div className="text-xs mt-2">2023</div>
              <div className="text-sm font-medium">11,781만원</div>
            </div>
          </div>
          <div className="absolute top-0 left-0 right-0 h-48 pointer-events-none">
            <div className="relative h-full">
              <div className="absolute left-0 right-0 top-0 border-t border-dashed border-gray-200 text-xs text-gray-400 -mt-2">
                <span className="absolute -top-3 right-0">12,000</span>
              </div>
              <div className="absolute left-0 right-0 top-1/4 border-t border-dashed border-gray-200 text-xs text-gray-400 -mt-2">
                <span className="absolute -top-3 right-0">9,000</span>
              </div>
              <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-gray-200 text-xs text-gray-400 -mt-2">
                <span className="absolute -top-3 right-0">6,000</span>
              </div>
              <div className="absolute left-0 right-0 top-3/4 border-t border-dashed border-gray-200 text-xs text-gray-400 -mt-2">
                <span className="absolute -top-3 right-0">3,000</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-green-500 font-medium">
        2022년 대비 평균<span className="font-bold">+12.29%</span> 상승
        </div>
      </div>
    </div>
  )
}