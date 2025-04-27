"use client"

import { Star } from "lucide-react"

interface Review {
  id: number
  rating: number
}

interface Props {
  reviews: Review[]
}

export function ActionButtons({ reviews }: Props) {
  const reviewCount = reviews.length
  const average =
    reviewCount > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount).toFixed(1)
      : "0.0"

  return (
    <div className="bg-white rounded-md p-4 mb-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-300" />
        </div>
        <div className="text-sm">
          <div className="font-medium">
            리뷰 {reviewCount.toLocaleString()}건 / 평균 평점 {average}점
          </div>
        </div>
      </div>
    </div>
  )
}
