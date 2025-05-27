"use client"

import { useState } from "react"
import { ReviewsHero } from "./ReviewsHero"
import { FeaturedReviews } from "./FeaturedReviews"
import { CompanyReviewList } from "./CompanyReviewList"
import { ReviewPolicy } from "./ReviewPolicy"

export const ReviewsContent = () => {
  const [searchKeyword, setSearchKeyword] = useState("")

  return (
    <div className="min-h-screen">
      <ReviewsHero onSearch={(keyword) => setSearchKeyword(keyword)} />

      <div className="max-w-[1200px] mx-auto px-4 flex gap-8">
        {/* 왼쪽 기업 리뷰 */}
        <div className="flex-1">
          <CompanyReviewList searchKeyword={searchKeyword} />
          <ReviewPolicy />
        </div>

        {/* 오른쪽 최신 면접 리뷰 */}
        <aside className="w-[280px]">
          <FeaturedReviews layout="vertical" />
        </aside>
      </div>
    </div>
  )
}
