import { Header } from "@/components/home/Header"
import { Footer } from "@/components/home/Footer"
import { CompanySalaryContent } from "@/components/personal/company/salary/CompanySalaryContent"

export default function CompanySalaryPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <CompanySalaryContent companyId={params.id} />
      </main>
      <Footer />
    </div>
  )
}