"use client";

import { useState, useEffect, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { PersonalLoginForm } from "./PersonalLoginForm";
import { BusinessLoginForm } from "./BusinessLoginForm";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { PromotionalBanner } from "./PromotionalBanner";

interface LoginTabsProps {
  onTabChange?: (tab: "personal" | "business") => void;
}

// 왼쪽 고정 영역 컴포넌트
const LoginLeftPanel = memo(({ buttonLabel }: { buttonLabel: string }) => (
  <div className="w-full md:w-1/2 p-10 flex flex-col h-full min-h-[600px]">
    {/* 로고 */}
    <div className="flex flex-col items-center justify-center">
      <Image
        src="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/login/login_03.png"
        alt="Login Logo"
        width={360}
        height={280}
        className="object-contain mb-8"
      />
    </div>

    <div className="flex-1" />

    {/* 버튼 */}
    <Link
      href="/register"
      className="block w-full text-center py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors mt-auto"
    >
      {buttonLabel}
    </Link>
  </div>
));
LoginLeftPanel.displayName = "LoginLeftPanel";

export const LoginTabs = ({ onTabChange }: LoginTabsProps) => {
  const [activeTab, setActiveTab] = useState<"personal" | "business">(
    "personal"
  );

  useEffect(() => {
    onTabChange?.(activeTab);
  }, [activeTab, onTabChange]);

  // 탭에 따라 버튼 텍스트 변경
  const buttonLabel =
    activeTab === "personal" ? "개인 회원가입" : "기업 회원가입";

  return (
    <div className="max-w-[1100px] mx-auto px-4 py-24">
      <div className="border rounded-2xl overflow-hidden bg-white flex flex-col md:flex-row min-h-[600px]">
        {/* 왼쪽 고정 패널 */}
        <LoginLeftPanel buttonLabel={buttonLabel} />

        {/* 가운데 구분선 */}
        <div className="hidden md:flex w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent" />

        {/* 오른쪽 로그인 폼 */}
        <div className="w-full md:w-[35%] p-10 flex flex-col mx-auto">
          {/* 탭 버튼 */}
          <div className="flex mb-8">
            <button
              className={`flex-1 py-2 text-center font-semibold text-2xl ${activeTab === "personal"
                ? "text-[#1D3557] border-b-4 border-blue-600"
                : "text-gray-400"
                }`}
              onClick={() => setActiveTab("personal")}
            >
              개인회원
            </button>
            <button
              className={`flex-1 py-2 text-center font-semibold text-2xl ${activeTab === "business"
                ? "text-[#1D3557] border-b-4 border-blue-600"
                : "text-gray-400"
                }`}
              onClick={() => setActiveTab("business")}
            >
              기업회원
            </button>
          </div>

          {/* 로그인 폼 영역 */}
          <div className="flex-1 flex flex-col">
            {activeTab === "personal" ? (
              <>
                <PersonalLoginForm />
                <div className="mt-8 text-center">
                  <p className="text-xs text-gray-500 mb-4">
                    소셜 계정으로 간편 로그인
                  </p>
                  <SocialLoginButtons />
                </div>
                <div className="mt-8">
                  <PromotionalBanner />
                </div>
              </>
            ) : (
              <>
                <BusinessLoginForm />
                {/* 높이 맞추기 */}
                <div className="mt-8 h-[160px]" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
