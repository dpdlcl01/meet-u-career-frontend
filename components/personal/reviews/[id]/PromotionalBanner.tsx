"use client"

import Image from "next/image"

interface Props {
  reviewCount: number
}

export const PromotionalBanner = ({ reviewCount }: Props) => {
  return (
    <div className="bg-[#1EBEC4] rounded-lg p-6 mb-6 relative overflow-hidden">
      <div className="flex items-center">
        <div className="z-10">
          <h3 className="text-white font-bold text-lg mb-1">
            현재 {reviewCount.toLocaleString()}개의 기업리뷰가 등록됐어요!
          </h3>
          <p className="text-white text-sm">
            당신의 회사 경험이 다른 구직자들에게 도움이 될 거예요. <span className="underline">지금 참여하기</span>
          </p>
        </div>
        <div className="absolute right-0 bottom-0">
          <Image
            src="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/review/online-review-typing.png"
            alt="리뷰 작성 일러스트"
            width={180}
            height={120}
            className="object-contain"
          />
        </div>
      </div>
      <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-xs">리뷰어에게 상품 ✓</div>
    </div>
  )
}
