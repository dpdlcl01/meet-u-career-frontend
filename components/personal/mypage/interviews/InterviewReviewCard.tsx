"use client";

import { Review } from "@/types/review";
import Image from "next/image";

// ✅ props 타입 정의
interface InterviewReviewCardProps {
  review: Review;
  onEdit?: () => void;
  onView?: () => void;
}

// ✅ 면접 리뷰 카드 컴포넌트
export function InterviewReviewCard({ review, onEdit, onView }: InterviewReviewCardProps) {
  return (
    <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200">
      {/* 상단: 회사명 / 날짜 */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Image
            src={review.logo || "https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/placeholder.svg"}
            alt={review.company}
            width={36}
            height={36}
            className="rounded border"
          />
          <div>
            <div className="text-base font-semibold text-gray-900">{review.company}</div>
            <div className="text-xs text-gray-500">{review.date}</div>
          </div>
        </div>
        <div className="text-sm text-gray-400">{review.interviewYearMonth}</div>
      </div>

      {/* 직무 및 평가 정보 */}
      <div className="text-sm text-gray-700 mt-2">
        <p className="font-medium">직무: {review.jobCategory}</p>
        <p>평가: {["부정적", "보통", "긍정적"][review.rating]}</p>
        <p>난이도: {review.difficulty}점</p>
        <p className="mt-2 text-gray-800 line-clamp-2">{review.questionsAsked}</p>
      </div>

      {/* 하단 버튼 */}
      <div className="flex gap-3 justify-end mt-4 text-sm">
        {onEdit && (
          <button
            onClick={onEdit}
            className="text-blue-600 hover:underline font-medium"
          >
            수정
          </button>
        )}
        {onView && (
          <button
            onClick={onView}
            className="text-gray-500 hover:underline"
          >
            보기
          </button>
        )}
      </div>
    </div>
  );
}
