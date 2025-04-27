"use client";

import Image from "next/image";
import { useState } from "react";
import { ReviewModal } from "./review/ReviewModal";

interface Interview {
  id: number;
  company: string;
  position: string;
  date: string;
  status: "scheduled" | "completed" | "canceled";
  logo: string;
  location?: string;
  time?: string;
  interviewer?: string;
  hasReview?: boolean;
  canWriteReview?: boolean;

  companyId: number;
  jobCategoryId: number;
  applicationId: number;
  createdAt?: string;
}


interface InterviewCardProps {
  interview: Interview;
  onEdit?: () => void;
}

export function InterviewCard({ interview }: InterviewCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ 작성 여부는 canWriteReview 우선 → false 또는 hasReview === true일 때 true로 간주
  const [hasReview, setHasReview] = useState(
    interview.canWriteReview === false || interview.hasReview === true
  );

  const formattedDate = new Date(interview.date).toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // ✅ 리뷰 작성 완료 시 호출됨
  const handleReviewComplete = (id: number) => {
    if (id === interview.id) {
      setHasReview(true); // 상태 업데이트
    }
  };

  // ✅ 버튼 조건 설정
  let buttonText = "";
  let buttonDisabled = true;
  let buttonStyle = "w-full py-2 px-4 rounded-md border text-sm font-semibold mt-6 ";

  if (interview.status === "scheduled") {
    buttonText = "후기 작성";
    buttonDisabled = true;
    buttonStyle += "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed";
  } else if (interview.status === "completed") {
    if (hasReview) {
      buttonText = "작성 완료";
      buttonDisabled = true;
      buttonStyle += "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed";
    } else if (interview.canWriteReview) {
      buttonText = "후기 작성";
      buttonDisabled = false;
      buttonStyle += "bg-blue-50 text-blue-600 border-blue-500 hover:bg-blue-100 cursor-pointer";
    }
  } else if (interview.status === "canceled") {
    buttonText = "작성 불가";
    buttonDisabled = true;
    buttonStyle += "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed";
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col h-full max-w-[350px] w-full mx-auto p-6">
      {/* 상태 뱃지 & 날짜 */}
      <div className="flex items-center justify-between mb-4">
        <InterviewStatusBadge status={interview.status} />
        <span className="text-xs text-gray-400 font-medium">{formattedDate.split(' ')[0]}</span>
      </div>

      {/* 회사 및 포지션 */}
      <div className="flex items-center mb-2">
        <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0 border border-gray-200 mr-3">
          <Image
            src={interview.logo || "/images/etc/placeholder.svg"}
            alt={interview.company}
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-base leading-tight">{interview.company}</h4>
          <p className="text-sm text-gray-600 mt-0.5">{interview.position}</p>
        </div>
      </div>

      {/* 면접 상세 정보 */}
      <div className="flex flex-col gap-1 text-sm text-gray-700 mb-6 mt-2">
        {interview.location && (
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {interview.location}
          </div>
        )}
        {interview.time && (
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
            </svg>
            {interview.time}
          </div>
        )}
        {interview.interviewer && (
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {interview.interviewer}
          </div>
        )}
      </div>

      {/* 후기 작성 버튼 */}
      <button
        className={buttonStyle}
        disabled={buttonDisabled}
        onClick={() => !buttonDisabled && setIsModalOpen(true)}
        type="button"
      >
        {buttonText}
      </button>

      {/* 후기 작성 모달 */}
      {isModalOpen && (
        <ReviewModal
          interview={interview}
          onClose={() => setIsModalOpen(false)}
          onComplete={handleReviewComplete}
        />
      )}
    </div>
  );
}

function InterviewStatusBadge({ status }: { status: "scheduled" | "completed" | "canceled" }) {
  switch (status) {
    case "scheduled":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
          </svg>
          면접 예정
        </span>
      );
    case "completed":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-600">
          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          면접 완료
        </span>
      );
    case "canceled":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-600">
          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          면접 취소
        </span>
      );
    default:
      return null;
  }
}