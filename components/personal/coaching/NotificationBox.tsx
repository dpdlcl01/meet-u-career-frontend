"use client";
import { FileText } from "lucide-react";
import { useRouter } from "next/navigation";

export const NotificationBox = () => {
  const router = useRouter();

  return (
    <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-6 flex items-start">
      <div className="bg-blue-500 text-white rounded-full p-2 mr-3">
        <FileText className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-700 font-semibold">
          로그인하면 AI 코칭 결과를 저장할 수 있어요 — 기본 항목은 물론, 내가 추가한 항목까지!
        </p>
        <p className="text-xs text-gray-500 mt-1">
          자기소개서 항목별 피드백은 물론, <span className="font-bold text-blue-600">직무적합도 분석</span>까지 무료로 경험할 수 있습니다.
        </p>
      </div>
      <button
        onClick={() => router.push("/login")}
        className="bg-blue-500 text-white text-sm px-4 py-1.5 rounded-md hover:bg-blue-600"
      >
        로그인하기
      </button>
    </div>
  );
};
