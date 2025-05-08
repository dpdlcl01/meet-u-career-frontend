"use client"

import { useEffect, useState } from "react";
import { InfoIcon, TrendingUp } from "lucide-react";

interface CompanyInfoDTO {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  businessNumber: string;
  representativeName: string;
  industry: string;
  foundedDate: string;
  numEmployees: number;
  revenue: number;
  website: string;
  logoKey: string;
  address: string;
  companyType: string;
  corpCode: string;
  operatingProfit: number;
  status: number;
  avgAnnualSalary: number;
}

interface SalaryOverviewProps {
  companyId: string;
}

export const SalaryOverview = ({ companyId }: SalaryOverviewProps) => {
  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  const [company, setCompany] = useState<CompanyInfoDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!companyId) return;
    setLoading(true);
    fetch(`/api/personal/companies/${companyId}/info`)
      .then((res) => res.json())
      .then((data) => {
        setCompany(data.data);
      })
      .finally(() => setLoading(false));
  }, [companyId]);

  const toManwon = (num?: number) => Math.floor((num || 0) / 10000);
  const formatNumber = (num?: number) => toManwon(num).toLocaleString();

  if (loading || !company) return null;

  const avgAnnualSalary = company.avgAnnualSalary || 0;
  const minSalary = Math.round(avgAnnualSalary * 0.75);
  const maxSalary = Math.round(avgAnnualSalary * 1.8);

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
          <h3 className="text-base font-medium">2024년 평균연봉</h3>
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
            {formatNumber(avgAnnualSalary)}<span className="text-xl font-normal ml-1">만원</span>
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
            <span>{formatNumber(minSalary)}만원</span>
            <span>{formatNumber(maxSalary)}만원</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-md p-3">
            <p className="text-xs text-gray-500 mb-1">2022년 대비</p>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <p className="text-lg font-bold text-green-500">12.29%</p>
            </div>
          </div>

          <div className="border rounded-md p-3">
            <p className="text-xs text-gray-500 mb-1">제조/화학업 순위</p>
            <p className="text-lg font-bold">17위</p>
          </div>

          <div className="border rounded-md p-3">
            <div className="flex items-center mb-1">
              <p className="text-xs text-gray-500">연봉정보 신뢰도</p>
              <button
                className="ml-1 text-gray-400 relative"
                onClick={() => toggleTooltip("reliability")}
                aria-label="신뢰도 정보"
              >
                <InfoIcon size={12} />
                {showTooltip === "reliability" && (
                  <div className="absolute z-10 w-64 p-3 bg-white border shadow-lg rounded-md text-xs text-left text-gray-700 -translate-x-1/2 left-1/2 mt-1">
                    <p className="font-medium mb-1">신뢰도 산정 기준</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>데이터 수집량</li>
                      <li>최근 업데이트 시점</li>
                      <li>데이터 일관성</li>
                    </ul>
                  </div>
                )}
              </button>
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full">
              <div className="absolute left-0 top-0 h-full w-[80%] bg-blue-500 rounded-full"></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>낮음</span>
              <span className="text-blue-500 font-medium">높음</span>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="bg-white border rounded-lg p-6">
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
          2023년 동종 업종 평균 대비 <span className="font-bold">+44.52%</span> 높은 수준
        </div>
      </div> */}
    </div>
  )
}