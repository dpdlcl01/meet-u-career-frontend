import { Header } from "@/components/home/Header"
import { Footer } from "@/components/home/Footer"
import { CompanyIntroContent } from "@/components/personal/company/intro/CompanyIntroContent"

export default function CompanyIntroPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <CompanyIntroContent companyId={params.id} />
      </main>
      <Footer />
    </div>
  )
}