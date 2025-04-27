'use client'
import axios from "axios"
import { useState, useEffect, useMemo } from "react"
import { OffersHeader } from "@/components/personal/mypage/offers/OffersHeader"
import { OffersStats } from "@/components/personal/mypage/offers/OffersStats"
import { OffersTabs, type TabType } from "@/components/personal/mypage/offers/OffersTabs"
import { OffersFilter } from "@/components/personal/mypage/offers/OffersFilter"
import { OffersList } from "@/components/personal/mypage/offers/OffersList"
interface Offer {
  id: number
  company: string
  position: string
  location: string
  deadline: string
  description: string
  status: '검토중' | '수락함' | '거절함'
}
export default function OffersContent() {
  const [activeTab, setActiveTab] = useState<TabType>('전체')
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const accountId = 1
  const mapStatus = (statusCode: number): '검토중' | '수락함' | '거절함' => {
    switch (statusCode) {
      case 1: return '수락함'
      case 2: return '거절함'
      default: return '검토중'
    }
  }
  useEffect(() => {
    axios
      .get(`/api/personal/mypage/offers/list/all/${accountId}`)
      .then((res) => {
        const rawList = res.data?.data?.offerList ?? []
        const mapped: Offer[] = rawList.map((o: any) => ({
          id: o.id,
          company: o.companyName,
          position: '직무 미정',
          location: o.location,
          deadline: o.offerDate?.split('T')[0] ?? '날짜 미정',
          description: o.message,
          status: mapStatus(o.status)
        }))
        setOffers(mapped)
      })
      .catch((err) => {
        console.error(err)
        setError('오퍼 데이터를 불러올 수 없습니다.')
      })
      .finally(() => setLoading(false))
  }, [])
  const counts = useMemo(() => ({
    전체: offers.length,
    검토중: offers.filter((o) => o.status === '검토중').length,
    수락함: offers.filter((o) => o.status === '수락함').length,
    거절함: offers.filter((o) => o.status === '거절함').length,
  }), [offers])
  const filtered = useMemo(() => {
    return activeTab === '전체'
      ? offers
      : offers.filter((o) => o.status === activeTab)
  }, [offers, activeTab])
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
  }
  const updateOfferStatus = (id: number, nextTab: '수락함' | '거절함') => {
    // 1. 상태 업데이트
    setOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: nextTab } : o))
    )
    // 2. 탭 전환
    setActiveTab(nextTab)
  }
  if (loading) return <p className="text-center p-4">로딩 중...</p>
  if (error) return <p className="text-red-500 text-center p-4">{error}</p>
  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <OffersHeader />
      <OffersStats counts={counts} />
      <div className="bg-white rounded-lg shadow-sm p-6">
        <OffersTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          counts={counts}
        />
        <div className="mt-4 flex justify-end">
          <OffersFilter />
        </div>
        <OffersList
          key={`${activeTab}-${offers.map(o => o.status).join(',')}`} // 리렌더 보장
          offers={filtered}
          onActionComplete={updateOfferStatus}
        />
      </div>
    </div>
  )
}