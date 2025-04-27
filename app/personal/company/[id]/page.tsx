import { Header } from "@/components/home/Header"
import { MainNavigation } from "@/components/home/MainNavigation"
import { Footer } from "@/components/home/Footer"
import { CompanyReviewDetail } from "@/components/personal/company"

export default function CompanyReviewPage({ params }: { params: { id: string } }) {
  return (
    <>
      <Header />
      <MainNavigation />
      <CompanyReviewDetail companyId={params.id} />
      <Footer />
    </>
  )
}
