"use client"

import { useState } from "react"
import FindIdForm from "./FindIdForm"
import FindIdSteps from "./FindIdSteps"
import FindIdResult from "./FindIdResult"

export default function FindIdContent() {
  const [step, setStep] = useState<"form" | "result">("form")
  const [foundId, setFoundId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFindId = async (name: string, email: string) => {
    setLoading(true);
    setError(null);
    setFoundId(null);
    try {
      const response = await fetch("/api/find-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });
      if (!response.ok) {
        throw new Error("서버 오류가 발생했습니다.");
      }
      const data = await response.json();
      // Expecting: { data: { userId: "..." }, ... }
      if (data?.data?.userId) {
        setFoundId(data.data.userId);
        setStep("result");
      } else {
        setError("일치하는 아이디를 찾을 수 없습니다.");
      }
    } catch (err: any) {
      setError(err.message || "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep("form")
    setFoundId(null)
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">아이디 찾기</h1>
          <p className="text-gray-600">가입 시 등록한 이름과 이메일로 아이디를 찾을 수 있습니다.</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <FindIdSteps currentStep={step} />

          {step === "form" ? (
            <>
              <FindIdForm onSubmit={handleFindId} />
              {loading && (
                <div className="text-center text-blue-600 mt-4">조회 중...</div>
              )}
              {error && (
                <div className="text-center text-red-600 mt-4">{error}</div>
              )}
            </>
          ) : (
            <FindIdResult id={foundId} onReset={handleReset} />
          )}
        </div>

        <div className="text-center text-sm text-gray-500">
          <p className="mb-2">
            도움이 더 필요하신가요?{" "}
            <a href="/contact" className="text-blue-600 hover:underline">
              고객센터 문의
            </a>
          </p>
          <p>
            <a href="/login" className="text-blue-600 hover:underline">
              로그인으로 돌아가기
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
