"use client"
import { useEffect, useState } from "react"
import { Eye, Bookmark } from "lucide-react"
import Link from "next/link"
interface Company {
  companyId: number
  companyName: string
  logoKey: string | null
  reviewCount: number
  industry: string
  address: string
}
interface Props {
  searchKeyword: string
}
export const CompanyReviewList = ({ searchKeyword }: Props) => {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true)
      try {
        const url = searchKeyword
          ? `http://localhost:8080/api/personal/interview-reviews/companies/search?keyword=${encodeURIComponent(
              searchKeyword,
            )}`
          : `http://localhost:8080/api/personal/interview-reviews/companies`
        const res = await fetch(url)
        const json = await res.json()
        setCompanies(json.data)
      } catch (error) {
        console.error("기업 리뷰 데이터 불러오기 실패", error)
        setCompanies([])
      } finally {
        setLoading(false)
      }
    }
    fetchCompanies()
  }, [searchKeyword])
  return (
    <div className="py-10">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">
          {searchKeyword ? `"${searchKeyword}" 검색 결과` : "전체 기업리뷰"}
        </h2>
        {loading ? (
            <p className="text-gray-500 text-sm">불러오는 중...</p>
          ) : !companies || companies.length === 0 ? (
            <p className="text-gray-500 text-sm">검색 결과가 없습니다.</p>
          ) : (
          <div className="space-y-4">
            {companies.map((company) => (
              <div key={company.companyId} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={company.logoKey || "/placeholder.svg"}
                      alt={`${company.companyName} 로고`}
                      className="w-10 h-10 mr-4"
                    />
                    <div>
                      <Link
                        href={`/personal/reviews/${company.companyId}`}
                        className="font-medium hover:text-blue-600"
                      >
                        {company.companyName}
                      </Link>
                      <p className="text-xs text-gray-500">리뷰 개수: {company.reviewCount}건</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Eye className="h-4 w-4 mr-1" />
                      <span>{(Math.random() * 100000 + 10000).toFixed(0)}</span>
                    </div>
                    <button className="text-gray-400 hover:text-yellow-500">
                      <Bookmark className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  #{company.industry} 분야 기업, 주소: {company.address}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}