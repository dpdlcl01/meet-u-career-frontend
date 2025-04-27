"use client"

import { useState } from "react"
import { ReviewsHero } from "./ReviewsHero"
import { FeaturedReviews } from "./FeaturedReviews"
import { CompanyReviewList } from "./CompanyReviewList"
import { ReviewPolicy } from "./ReviewPolicy"

export const ReviewsContent = () => {
  const [searchKeyword, setSearchKeyword] = useState("")

  return (
    <div className="min-h-screen bg-white">
      <ReviewsHero onSearch={(keyword) => setSearchKeyword(keyword)} />
      <FeaturedReviews />
      <CompanyReviewList searchKeyword={searchKeyword} />
      <ReviewPolicy />
    </div>
  )
}
