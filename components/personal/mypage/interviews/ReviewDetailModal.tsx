"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// ✅ 후기 타입 정의
interface ReviewDetail {
  id: number;
  company: string;
  position: string;
  date: string;
  difficulty: number;
  result: number;
  logo?: string;
  jobCategory?: string;
  careerLevel?: number;
  interviewYearMonth?: string;
  rating?: number;
  interviewType?: number;
  interviewParticipants?: number;
  questionsAsked?: string;
  interviewTip?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ✅ 라벨 매핑
const resultMap = ["불합격", "합격", "대기중"];
const ratingMap = ["부정적", "보통", "긍정적"];
const difficultyMap = ["1점(매우 쉬움)", "2점", "3점(보통)", "4점", "5점(매우 어려움)"];
const careerLevelMap = ["신입", "경력"];
const participantMap = ["1:1 면접", "지원자 1명, 면접관 다수", "그룹면접"];
const interviewTypeLabels = [
  { value: 1, label: "직무/인성면접" },
  { value: 2, label: "토론면접" },
  { value: 4, label: "인적성 검사" },
  { value: 8, label: "PT면접" },
  { value: 16, label: "실무 과제 및 시험" },
  { value: 32, label: "기타" },
];

// ✅ 비트맵 -> 라벨 배열 추출
function getInterviewTypeLabels(typeBitmap?: number): string[] {
  if (!typeBitmap) return [];
  return interviewTypeLabels
    .filter((t) => (typeBitmap & t.value) !== 0)
    .map((t) => t.label);
}

// ✅ 상세 모달 컴포넌트
export function ReviewDetailModal({
  isOpen,
  onClose,
  review,
}: {
  isOpen: boolean;
  onClose: () => void;
  review: ReviewDetail;
}) {
  if (!review) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">면접 리뷰 상세</DialogTitle>
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>{review.company}</span>
            <span>{review.interviewYearMonth || review.date}</span>
          </div>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-6 my-4">
          {/* 좌측 정보 */}
          <div className="flex flex-col items-center min-w-[120px]">
            <Image src={review.logo || "https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/placeholder.svg"} alt={review.company} width={60} height={60} className="rounded-md border mb-2" />
            <div className="font-semibold text-base text-center">{review.position}</div>
            <div className="text-xs text-gray-500 mt-1">{review.jobCategory || "-"}</div>
            <div className="text-xs text-gray-500 mt-1">{careerLevelMap[review.careerLevel ?? 0]}</div>
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <span className="font-medium">면접 연월:</span> {review.interviewYearMonth || "-"}
            </div>
            <div>
              <span className="font-medium">전반적 평가:</span> {typeof review.rating === "number" ? ratingMap[review.rating] : "-"}
            </div>
            <div>
              <span className="font-medium">난이도:</span> {typeof review.difficulty === "number" ? difficultyMap[review.difficulty - 1] : "-"}
            </div>
            <div>
              <span className="font-medium">면접 유형:</span> {getInterviewTypeLabels(review.interviewType).join(", ") || "-"}
            </div>
            <div>
              <span className="font-medium">면접 인원:</span> {typeof review.interviewParticipants === "number" ? participantMap[review.interviewParticipants] : "-"}
            </div>
            <div>
              <span className="font-medium">합격 여부:</span> {typeof review.result === "number" ? resultMap[review.result] : "-"}
            </div>
            <div>
              <span className="font-medium">받았던 질문:</span>
              <div className="whitespace-pre-line bg-gray-50 rounded p-2 mt-1 text-gray-700 min-h-[40px]">
                {review.questionsAsked || "-"}
              </div>
            </div>

            <div>
              <span className="font-medium">면접 팁:</span>
              <div className="whitespace-pre-line bg-gray-50 rounded p-2 mt-1 text-gray-700 min-h-[40px]">
                {review.interviewTip || "-"}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>닫기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
