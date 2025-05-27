"use client"

import { LoginHeader } from "@/components/login/LoginHeader"
import { FindPasswordSteps } from "./FindPasswordSteps"
import { FindPasswordForm } from "./FindPasswordForm"
import { useState } from "react"
import FindPasswordVerification from "./FindPasswordVerification"
import FindPasswordReset from "./FindPasswordReset"

type Step = "form" | "verification" | "reset"

export const FindPasswordContent = () => {
  const [currentStep, setCurrentStep] = useState<Step>("form")
  const [email, setEmail] = useState("")
  const [userId, setUserId] = useState("")
  const [name, setName] = useState("");
  const [verificationToken, setVerificationToken] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [socialProvider, setSocialProvider] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: Find Password - send email, name, userId
  const handleFormSubmit = async (emailInput: string, userIdInput: string, nameInput: string) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/password/find", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput, userId: userIdInput, name: nameInput })
      });
      const data = await response.json();
      if (data?.data?.sent && data?.data?.verificationToken) {
        setEmail(emailInput);
        setUserId(userIdInput);
        setName(nameInput);
        setVerificationToken(data.data.verificationToken);
        setCurrentStep("verification");
        setSocialProvider(null);
      } else if (data?.data?.socialProvider) {
        setSocialProvider(data.data.socialProvider);
        setEmail(data.data.email);
        setCurrentStep("form");
        setError("소셜 로그인 계정입니다. 비밀번호를 찾을 수 없습니다.");
      } else {
        setError("해당 정보로 가입된 계정을 찾을 수 없습니다.");
      }
    } catch (err: any) {
      setError("오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify code
  const handleVerificationSubmit = async (codeInput: string) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/password/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verificationToken, code: codeInput })
      });
      const data = await response.json();
      if (data?.data) {
        setCode(codeInput);
        setCurrentStep("reset");
      } else {
        setError("인증 코드가 올바르지 않습니다.");
      }
    } catch (err: any) {
      setError("오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Reset password
  const handlePasswordReset = async (_: string, newPassword: string) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/password/reset", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verificationToken, code, newPassword })
      });
      const data = await response.json();
      if (data?.data) {
        setCurrentStep("form");
        setEmail("");
        setUserId("");
        setName("");
        setVerificationToken("");
        setCode("");
        setError("");
        alert("비밀번호가 성공적으로 변경되었습니다. 로그인해 주세요.");
      } else {
        setError("비밀번호 변경에 실패했습니다.");
      }
    } catch (err: any) {
      setError("오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LoginHeader />

      <main className="flex-1 flex flex-col items-center justify-center py-10 px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-sm border p-8">
          <h1 className="text-2xl font-bold text-center mb-6">비밀번호 찾기</h1>

          <FindPasswordSteps currentStep={currentStep} />

          {currentStep === "form" && (
            <FindPasswordForm onSubmit={handleFormSubmit} isLoading={isLoading} error={error} />
          )}

          {currentStep === "verification" && (
            <FindPasswordVerification
              email={email}
              onSubmit={handleVerificationSubmit}
              onBack={() => setCurrentStep("form")}
            />
          )}
          {currentStep === "reset" && (
            <FindPasswordReset
              userId={userId}
              code={code}
              onSubmit={handlePasswordReset}
              onBack={() => setCurrentStep("verification")}
              isLoading={isLoading}
              error={error}
            />
          )}
        </div>
      </main>
    </div>
  )
}
