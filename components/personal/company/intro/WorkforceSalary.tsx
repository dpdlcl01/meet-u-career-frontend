"use client"

import { InfoIcon } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export const WorkforceSalary = () => {
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">인력 규모를 확인해 보세요!</h2>
        <Link href="/personal/company/1/salary" className="text-xs text-gray-500 flex items-center">
          연봉정보 더보기
          <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.59 16.59L10 18L16 12L10 6L8.59 7.41L13.17 12L8.59 16.59Z" fill="#2365f2"></path>
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-6 rounded-lg">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">전체 사원수</p>
          <p className="text-xl font-bold">
            70,462<span className="text-sm font-normal ml-1">명</span>
          </p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <p className="text-sm text-gray-500">월급 인원</p>
            <button className="text-blue-500 ml-1 relative" onClick={() => toggleTooltip("salary")}>
              <InfoIcon size={12} />
              {showTooltip === "salary" && (
                <div className="absolute z-10 w-48 p-2 bg-white border shadow-lg rounded-md text-xs text-left text-gray-700 -translate-x-1/2 left-1/2 mt-1">
                  출처: 고용노동부 (2022년 기준)
                </div>
              )}
            </button>
          </div>
          <p className="text-xl font-bold">
            11,781<span className="text-sm font-normal ml-1">만원</span>
          </p>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">2022년 대비성장률</p>
          <p className="text-xl font-bold text-green-500">
            + 12.29<span className="text-sm font-normal ml-1">%</span>
          </p>
        </div>
      </div>
    </div>
  )
}
