"use client"

import { useState } from "react"
import { InfoIcon } from "lucide-react"
import Link from "next/link"

export const CompanyOverview = () => {
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center justify-center p-4 border rounded-md">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <svg
                className="w-5 h-5 text-blue-500 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" rx="4" fill="#E8F0FE" />
                <path
                  d="M12 8v4l2 2M12 4c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8z"
                  stroke="#2365F2"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-medium">설립 59년차</span>
            </div>
            <p className="text-xs text-gray-500">1963년 12월 29일 설립</p>
          </div>
        </div>

        <div className="flex items-center justify-center p-4 border rounded-md">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <svg
                className="w-5 h-5 text-blue-500 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" rx="4" fill="#E8F0FE" />
                <path
                  d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                  stroke="#2365F2"
                  strokeWidth="1.5"
                />
                <path
                  d="M20 18C20 15.7909 16.4183 14 12 14C7.58172 14 4 15.7909 4 18"
                  stroke="#2365F2"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path d="M20 18V20H4V18" stroke="#2365F2" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="font-medium">1000대기업</span>
            </div>
            <div className="text-xs text-gray-500 flex items-center justify-center">
              <span>기업규모</span>
              <button className="text-blue-500 ml-1 relative" onClick={() => toggleTooltip("company-size")}>
                <InfoIcon size={12} />
                {showTooltip === "company-size" && (
                  <div className="absolute z-10 w-48 p-2 bg-white border shadow-lg rounded-md text-xs text-left text-gray-700 -translate-x-1/2 left-1/2 mt-1">
                    대기업, 코스피, 주식회사, 외부감사법인, 수출입 기업
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-4 border rounded-md">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <svg
                className="w-5 h-5 text-blue-500 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" rx="4" fill="#E8F0FE" />
                <path
                  d="M17 9C17 12.87 13.64 16 9.5 16L8.57 17.12L8 17.91"
                  stroke="#2365F2"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.5 13.5C5.24 12.53 4.5 10.84 4.5 9C4.5 5.13 7.86 2 12 2C14.93 2 17.42 3.63 18.5 6"
                  stroke="#2365F2"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 22C10.9 22 9.95 21.32 9.67 20.36L9 18H15L14.33 20.36C14.05 21.32 13.1 22 12 22Z"
                  stroke="#2365F2"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-medium">70,462 명</span>
            </div>
            <div className="text-xs text-gray-500 flex items-center justify-center">
              <span>사원수</span>
              <button className="text-blue-500 ml-1 relative" onClick={() => toggleTooltip("employee-count")}>
                <InfoIcon size={12} />
                {showTooltip === "employee-count" && (
                  <div className="absolute z-10 w-48 p-2 bg-white border shadow-lg rounded-md text-xs text-left text-gray-700 -translate-x-1/2 left-1/2 mt-1">
                    출처: 국민연금 (2023년 기준)
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b">
              <td className="py-3 px-4 bg-gray-50 w-24">업종</td>
              <td className="py-3 px-4">승용차 및 기타 여객용 자동차 제조업</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-4 bg-gray-50">대표자명</td>
              <td className="py-3 px-4">정의선/이동석/무뇨스바르셀로호세안토니오</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-4 bg-gray-50">웹사이트</td>
              <td className="py-3 px-4">
                <Link
                  href="https://talent.hyundai.com/main/main.hc"
                  className="text-blue-500 hover:underline"
                  target="_blank"
                >
                  https://talent.hyundai.com/main/main.hc
                </Link>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-4 bg-gray-50">사업자번호</td>
              <td className="py-3 px-4">
                사업자(법인)번호:220-81-02941 / 복수사업자 등록번호 및 사업자번호 확인/관리 등
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 bg-gray-50">주소</td>
              <td className="py-3 px-4">
                서울 서초구 헌릉로 12 <span className="text-blue-500 text-xs cursor-pointer">지도보기</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}