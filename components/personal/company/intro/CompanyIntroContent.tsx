import { CompanySidebar } from "@/components/personal/company/CompanySidebar"
import { CompanyOverview } from "./CompanyOverview"
import { CompanyIntroduction } from "./CompanyIntroduction"
import { CurrentJobPostings } from "./CurrentJobPostings"
import { EmployeeStatistics } from "./EmployeeStatistics"
import { WorkforceSalary } from "./WorkforceSalary"
import { CompanyNews } from "./CompanyNews"
import { CompanyFooter } from "./CompanyFooter"

interface CompanyIntroContentProps {
  companyId: string
}

export const CompanyIntroContent = ({ companyId }: CompanyIntroContentProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 shrink-0">
          <CompanySidebar companyId={companyId} activeTab="intro" />
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold mb-6">한눈에 보는 우리 회사, 미리 확인해 보세요!</h1>
          <CompanyOverview />
          <CompanyIntroduction />
          <CurrentJobPostings />
          <EmployeeStatistics />
          <WorkforceSalary />
          <CompanyNews />
          <CompanyFooter />
        </div>
      </div>
    </div>
  )
}