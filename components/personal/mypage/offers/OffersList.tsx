import { OfferCard } from "./OfferCard"

interface Offer {
  id: number
  company: string
  position: string
  location: string
  deadline: string
  description: string
  status: '검토중' | '수락함' | '거절함'
}

interface OffersListProps {
  offers: Offer[]
  onActionComplete?: (id: number, nextTab: '수락함' | '거절함') => void // ✅ id 포함해야 맞음
}

export function OffersList({ offers, onActionComplete }: OffersListProps) {
  if (!offers || !Array.isArray(offers) || offers.length === 0) {
    return <div className="text-center text-gray-400 py-8">해당 상태의 제안이 없습니다.</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {offers.map((offer) => (
        <OfferCard
        key={offer.id}
        offer={offer}
        onActionComplete={(id, nextTab) => onActionComplete?.(id, nextTab)} // ✅ 안전하게 호출
      />      
      ))}
    </div>
  )
}
