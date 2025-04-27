"use client";

import { Interview } from "@/types/interview"; // 타입은 하나로 통일
import { InterviewCard } from "./InterviewCard";

// ✅ props 타입 정의
interface InterviewListProps {
  interviews: Interview[];
  onEditReview: (interview: Interview) => void;
}

// ✅ 인터뷰 리스트 렌더링
export function InterviewList({ interviews, onEditReview }: InterviewListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 justify-center">
      {interviews.map((interview) => {
        // 숫자 status → 텍스트 status 변환
        const mappedStatus =
          interview.status === 3
            ? "completed"
            : interview.status === 4
            ? "canceled"
            : "scheduled";

        return (
          <div key={interview.id} className="flex justify-center h-full">
            <InterviewCard
              interview={{ ...interview, status: mappedStatus }}
              onEdit={() => onEditReview(interview)}
            />
          </div>
        );
      })}
    </div>
  );
}