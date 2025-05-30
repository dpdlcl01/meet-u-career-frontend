"use client";

import { TopCompanyJobPostings } from "@/types/dashboard";

interface TopCompanyJobPostingsProps {
  data: TopCompanyJobPostings[];
}

export function TopApplicationCompanies({ data }: TopCompanyJobPostingsProps) {
  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-medium">지원자 많은 기업 TOP 5</h3>
        </div>

        <div className="space-y-4">
          {data.map((company, index) => (
            <div key={index} className="flex items-center">
              <div className="flex-shrink-0 mr-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 text-xs">로고</span>
                </div>
              </div>
              <div className="flex-grow">
                <h4 className="text-sm font-medium">{company.companyName}</h4>
                <p className="text-xs text-gray-500">
                  {company.jobPostingCount} 개 지원
                </p>
              </div>
              <div className="flex-shrink-0 text-blue-500 font-medium">
                #{index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
