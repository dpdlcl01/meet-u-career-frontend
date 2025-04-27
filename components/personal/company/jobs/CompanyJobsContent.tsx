import { CompanySidebar } from "@/components/personal/company/CompanySidebar"
import { JobListings } from "./JobListings"
import { JobFilters } from "./JobFilters"
import { Pagination } from "./Pagination"

interface CompanyJobsContentProps {
  companyId: string
}

export const CompanyJobsContent = ({ companyId }: CompanyJobsContentProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 shrink-0">
          <CompanySidebar companyId={companyId} activeTab="jobs" />
        </div>
        <div className="flex-1">
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">
              진행중 공고 <span className="text-blue-500 font-normal">2건</span>
            </h2>
            <div className="flex border-b">
              <button className="py-2 px-4 border-b-2 border-blue-500 text-blue-500 font-medium">
                전체{" "}
                <span className="inline-flex items-center justify-center bg-blue-500 text-white rounded-full w-5 h-5 text-xs">
                  2
                </span>
              </button>
              <button className="py-2 px-4 text-gray-500 hover:text-gray-700">
                경력우대{" "}
                <span className="inline-flex items-center justify-center bg-gray-200 text-gray-600 rounded-full w-5 h-5 text-xs">
                  2
                </span>
              </button>
            </div>
          </div>

          <JobListings />
          <Pagination />

          <div className="mt-12">
            <h2 className="text-lg font-medium mb-4">
              마감된 공고 <span className="text-blue-500 font-normal">26건</span>
            </h2>
            <JobFilters />
            <JobListings isExpired={true} />
            <Pagination totalPages={6} />
          </div>
        </div>
      </div>
    </div>
  )
}