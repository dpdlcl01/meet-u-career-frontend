"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface CompanyInfoProps {
  company: {
    companyId: number;
    companyName: string;
    representativeName: string;
    industry: string;
    address: string;
    website: string;
    logoKey: string | null;
    foundedDate: string;
    numEmployees: number;
    revenue: number;
  };
  openJobPostingCount: number;
  interviewReviewCount: number;
}

export const CompanyInfo = ({
  company,
  openJobPostingCount,
  interviewReviewCount,
}: CompanyInfoProps) => {
  // 설립일로 업력 계산
  const getYearsSinceFounded = (foundedDate: string) => {
    const foundedYear = new Date(foundedDate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - foundedYear;
  };

  return (
    <div>
      {/* 기업정보 제목 (카드 외부, 좌측 정렬) */}
      <h3 className="text-lg font-bold mb-2 text-left">기업정보</h3>

      {/* 카드 영역 */}
      <div className="border rounded-md overflow-hidden">
        {/* 상단 구역 */}
        <div className="flex justify-between items-start p-6">
          {/* 좌측 + 가운데 */}
          <div className="flex-1 space-y-2">
            {/* 회사명 + 관심기업 */}
            <h2 className="text-xl font-bold mb-2">{company.companyName}</h2>

            {/* 1열: 대표자명 */}
            <div className="flex text-sm text-gray-600">
              <p className="w-28 text-gray-500">대표자명</p>
              <p className="flex-1">{company.representativeName}</p>
            </div>

            {/* 2열: 업종 + 사원수 */}
            <div className="flex text-sm text-gray-600">
              <p className="w-28 text-gray-500">업종</p>
              <p className="flex-1">{company.industry}</p>
              <p className="w-28 text-gray-500">사원수</p>
              <p className="flex-1">{company.numEmployees}명</p>
            </div>

            {/* 3열: 설립일 + 홈페이지 */}
            <div className="flex text-sm text-gray-600">
              <p className="w-28 text-gray-500">설립일</p>
              <p className="flex-1">{company.foundedDate} ({getYearsSinceFounded(company.foundedDate)}년차)</p>
              <p className="w-28 text-gray-500">홈페이지</p>
              <p className="flex-1 truncate" title="www.test.com">{company.website}</p>
            </div>

            {/* 4열: 주소 */}
            <div className="flex text-sm text-gray-600">
              <p className="w-28 text-gray-500">기업주소</p>
              <p className="flex-1 col-span-3 truncate" title={company.address}>
                {company.address}
              </p>
            </div>
          </div>

          {/* 우측 로고 */}
          <div className="w-32 h-20 flex-shrink-0 flex items-center justify-center ml-8">
            <Image
              src={company.logoKey ? company.logoKey : "https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/logo/logo6.png"}
              alt="회사 로고"
              width={100}
              height={50}
              className="object-contain"
            />
          </div>
        </div>

        {/* 버튼 구역 */}
        <div className="p-4 flex flex-wrap gap-2 justify-start">
          <Link href="#" className="flex items-center border rounded-md px-4 py-2 text-sm hover:bg-gray-50">
            채용정보 {openJobPostingCount}건
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
          <Link href="#" className="flex items-center border rounded-md px-4 py-2 text-sm hover:bg-gray-50">
            면접후기 {interviewReviewCount}건
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* 전체보기 버튼 */}
        <div className="border-t p-4 text-center">
          <Link
            href={`/personal/company/${company.companyId}/intro`}
            className="text-sm text-gray-500 font-medium flex justify-center items-center gap-1"
          >
            기업정보 전체보기
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M8.59 16.59L10 18L16 12L10 6L8.59 7.41L13.17 12L8.59 16.59Z" fill="#666666"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
