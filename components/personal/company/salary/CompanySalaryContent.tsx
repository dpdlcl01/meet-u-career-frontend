import { CompanySidebar } from "../CompanySidebar"
import { SalaryOverview } from "./SalaryOverview"
import { SalaryDisclaimer } from "./SalaryDisclaimer"

interface CompanySalaryContentProps {
  companyId: string
}

export const CompanySalaryContent = ({ companyId }: CompanySalaryContentProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 shrink-0">
          <CompanySidebar companyId={companyId} activeTab="salary" />
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold mb-6">연봉정보</h1>
          <SalaryOverview companyId={companyId} />
          <SalaryDisclaimer />
        </div>
      </div>
    </div>
  )
}