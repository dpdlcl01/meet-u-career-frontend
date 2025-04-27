"use client";

import { Review } from "@/types/review";
import { InterviewReviewCard } from "./InterviewReviewCard";

// ✅ props 타입 정의
interface InterviewReviewListProps {
  reviews: Review[];
  onEditReview: (review: Review) => void;
  onViewReview: (review: Review) => void;
}

// ✅ 면접 리뷰 리스트 컴포넌트
export function InterviewReviewList({
  reviews,
  onEditReview,
  onViewReview,
}: InterviewReviewListProps) {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <InterviewReviewCard
          key={review.id}
          review={review}
          onEdit={() => onEditReview(review)}
          onView={() => onViewReview(review)}
        />
      ))}
    </div>
  );
}