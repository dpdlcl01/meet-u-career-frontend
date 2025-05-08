"use client";

import { useEffect, useState } from "react";
import { InfoIcon } from "lucide-react";
import Link from "next/link";

export interface CompanyInfoDTO {
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

interface CompanyOverviewProps {
  companyId: string;
}

export const CompanyOverview = ({ companyId }: CompanyOverviewProps) => {
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [company, setCompany] = useState<CompanyInfoDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!companyId) return;
    setLoading(true);
    fetch(`/api/personal/companies/${companyId}/info`)
      .then((res) => res.json())
      .then((data) => {
        setCompany(data.data);
        setError(null);
      })
      .catch((err) => {
        setError("기업 정보를 불러오지 못했습니다.");
        setCompany(null);
      })
      .finally(() => setLoading(false));
  }, [companyId]);

  const toggleTooltip = (id: string) => {
    if (showTooltip === id) {
      setShowTooltip(null);
    } else {
      setShowTooltip(id);
    }
  };

    // Helper: calculate years since founding
  const getYearsSinceFounded = (foundedDate?: string) => {
    if (!foundedDate) return null;
    const foundedYear = new Date(foundedDate).getFullYear();
    const currentYear = 2025; // Use provided local time context
    return currentYear - foundedYear + 1;
  };

  // Helper: format founded date
  const formatFoundedDate = (foundedDate?: string) => {
    if (!foundedDate) return "-";
    const date = new Date(foundedDate);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 설립`;
  };

  const formatNumber = (num?: number) => (num || 0).toLocaleString();

  if (loading) {
    return <div className="mb-10">기업 정보를 불러오는 중입니다...</div>;
  }
  if (error || !company) {
    return <div className="mb-10 text-red-500">{error || "기업 정보가 없습니다."}</div>;
  }

  const years = getYearsSinceFounded(company.foundedDate);
  const foundedDateDisplay = formatFoundedDate(company.foundedDate);

  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* 설립일 */}
        <div className="flex items-center justify-center p-4 border rounded-md">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <svg className="w-5 h-5 text-blue-500 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="4" fill="#E8F0FE" />
                <path d="M12 8v4l2 2M12 4c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8z" stroke="#2365F2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-medium">{years ? `설립 ${years}년차` : "-"}</span>
            </div>
            <p className="text-xs text-gray-500">{foundedDateDisplay}</p>
          </div>
        </div>
        {/* 사원수 */}
        <div className="flex items-center justify-center p-4 border rounded-md">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <svg className="w-5 h-5 text-blue-500 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="4" fill="#E8F0FE" />
                <path d="M17 9C17 12.87 13.64 16 9.5 16L8.57 17.12L8 17.91" stroke="#2365F2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.5 13.5C5.24 12.53 4.5 10.84 4.5 9C4.5 5.13 7.86 2 12 2C14.93 2 17.42 3.63 18.5 6" stroke="#2365F2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 22C10.9 22 9.95 21.32 9.67 20.36L9 18H15L14.33 20.36C14.05 21.32 13.1 22 12 22Z" stroke="#2365F2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-medium">{formatNumber(company.numEmployees)} 명</span>
            </div>
            <div className="text-xs text-gray-500 flex items-center justify-center">
              <span>사원수</span>
              <button className="text-blue-500 ml-1 relative" onClick={() => toggleTooltip("employee-count")}> <InfoIcon size={12} />
                {showTooltip === "employee-count" && (
                  <div className="absolute z-10 w-48 p-2 bg-white border shadow-lg rounded-md text-xs text-left text-gray-700 -translate-x-1/2 left-1/2 mt-1">
                    출처: 국민연금 (2023년 기준)
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* 평균연봉 */}
        <div className="flex items-center justify-center p-4 border rounded-md">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <svg className="w-5 h-5 text-blue-500 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="4" fill="#E8F0FE" />
                <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="#2365F2" strokeWidth="1.5" />
                <path d="M20 18C20 15.7909 16.4183 14 12 14C7.58172 14 4 15.7909 4 18" stroke="#2365F2" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M20 18V20H4V18" stroke="#2365F2" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="font-medium">{formatNumber(Math.floor((company.avgAnnualSalary || 0) / 10000))} 만원</span>
            </div>
            <div className="text-xs text-gray-500 flex items-center justify-center">
              <span>평균연봉</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b">
              <td className="py-3 px-4 bg-gray-50 w-24">업종</td>
              <td className="py-3 px-4">{company.industry}</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-4 bg-gray-50">대표자명</td>
              <td className="py-3 px-4">{company.representativeName}</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-4 bg-gray-50">웹사이트</td>
              <td className="py-3 px-4">
                <a
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  href={company.website ? (company.website.startsWith("http") ? company.website : `https://${company.website}`) : "#"}
                  rel="noopener noreferrer"
                >
                  {company.website}
                </a>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-4 bg-gray-50">사업자번호</td>
              <td className="py-3 px-4">{company.businessNumber}</td>
            </tr>
            <tr>
              <td className="py-3 px-4 bg-gray-50">주소</td>
              <td className="py-3 px-4">
                {company.address}{" "}
                <span className="text-blue-500 text-xs cursor-pointer">지도보기</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
