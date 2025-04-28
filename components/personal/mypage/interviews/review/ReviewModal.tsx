"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Interview {
  id: number;
  company: string;
  position: string;
  date?: string;
  location?: string;
  time?: string;
  interviewer?: string;
  status?: string;
  hasReview?: boolean;
  canWriteReview?: boolean;
  companyId: number;
  jobCategoryId: number;
  applicationId: number;
  createdAt?: string;

  // ✅ 후기 관련 필드 (수정용)
  rating?: number;
  difficulty?: number;
  questionsAsked?: string;
  interviewTip?: string;
}

interface ReviewModalProps {
  interview: Interview;
  onClose: () => void;
  onComplete: (id: number) => void;
}

export function ReviewModal({ interview, onClose, onComplete }: ReviewModalProps) {
  // ✅ 폼 상태
  const [rating, setRating] = useState(2);
  const [difficulty, setDifficulty] = useState(3);
  const [questions, setQuestions] = useState("");
  const [tip, setTip] = useState("");

  // ✅ 수정 가능 여부 (30일 제한)
  const created = interview.createdAt ? new Date(interview.createdAt) : null;
  const now = new Date();
  const editable = created ? ((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)) <= 30 : true;

  // ✅ 기존 값이 있으면 상태 초기화
  useEffect(() => {
    if (interview) {
      if (typeof interview.rating === "number") setRating(interview.rating);
      if (typeof interview.difficulty === "number") setDifficulty(interview.difficulty);
      if (typeof interview.questionsAsked === "string") setQuestions(interview.questionsAsked);
      if (typeof interview.interviewTip === "string") setTip(interview.interviewTip);
    }
  }, [interview]);

  // ✅ 저장 처리
  const handleSubmit = async () => {
    try {
      const payload = {
        applicationId: interview.applicationId,
        companyId: interview.companyId,
        jobCategoryId: interview.jobCategoryId,
        rating,
        difficulty,
        careerLevel: 0,
        interviewYearMonth: interview.date?.slice(0, 7) || "2025-04",
        interviewType: 1 | 8,
        interviewParticipants: 1,
        hasFrequentQuestions: false,
        questionsAsked: questions,
        interviewTip: tip,
        result: 1,
      };

      await axios.post("/api/personal/interview-reviews", payload);
      alert("면접 후기가 저장되었습니다.");
      onComplete(interview.id);
      onClose();
    } catch (err) {
      alert("후기 저장 중 문제가 발생했습니다.");
      console.error("❌ 후기 저장 실패", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
        <h2 className="text-xl font-bold text-gray-800 mb-4">면접 후기 작성</h2>

        {/* 회사 / 직무 */}
        <div className="mb-2">
          <p className="text-sm text-gray-500">{interview.company}</p>
          <p className="font-medium">{interview.position}</p>
        </div>

        {/* 평가 */}
        <div className="mt-4">
          <label className="text-sm font-medium">전반적인 평가</label>
          <select
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="w-full border px-3 py-2 rounded mt-1"
          >
            <option value={0}>부정적</option>
            <option value={1}>보통</option>
            <option value={2}>긍정적</option>
          </select>
        </div>

        {/* 난이도 */}
        <div className="mt-4">
          <label className="text-sm font-medium">면접 난이도 (1~5)</label>
          <input
            type="number"
            min={1}
            max={5}
            value={difficulty}
            onChange={(e) => setDifficulty(parseInt(e.target.value))}
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>

        {/* 질문 */}
        <div className="mt-4">
          <label className="text-sm font-medium">받았던 질문</label>
          <textarea
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
            placeholder="예: 자기소개, 협업 경험 등"
            rows={3}
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>

        {/* 팁 */}
        <div className="mt-4">
          <label className="text-sm font-medium">면접 팁</label>
          <textarea
            value={tip}
            onChange={(e) => setTip(e.target.value)}
            placeholder="예: 사전 준비와 자신감 있게 설명하세요"
            rows={2}
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>

        {/* 저장 버튼 */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!editable}
          className={`w-full mt-6 py-2 px-4 rounded ${editable
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
        >
          {editable ? "후기 저장" : "수정 기한 만료"}
        </button>

        {/* 닫기 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
}
