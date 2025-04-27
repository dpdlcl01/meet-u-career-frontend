"use client";

import { Review } from "@/types/review";
import { InterviewReviewList } from "./InterviewReviewList";

// ✅ props 타입 정의
interface InterviewReviewTabProps {
  reviews: Review[];
  onEditReview: (review: Review) => void;
  onViewReview: (review: Review) => void;
}

// ✅ 면접 리뷰 탭 컴포넌트
export default function InterviewReviewTab({
  reviews,
  onEditReview,
  onViewReview,
}: InterviewReviewTabProps) {
  if (!reviews.length) {
    return (
      <div className="text-center text-gray-400 py-8">
        등록된 면접 리뷰가 없습니다.
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      <InterviewReviewList
        reviews={reviews}
        onEditReview={onEditReview}
        onViewReview={onViewReview}
      />
    </div>
  );
}