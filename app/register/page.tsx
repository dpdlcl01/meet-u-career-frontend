"use client";

import { useState } from "react";
import Script from "next/script";
import { RegisterHeader } from "@/components/register/RegisterHeader";
import { RegisterTabs } from "@/components/register/RegisterTabs";
import { RegisterForm } from "@/components/register/RegisterForm";

export default function RegisterPage() {
  const [showDetailForm, setShowDetailForm] = useState(false);

  const handleCreateIdClick = () => {
    setShowDetailForm(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 다음 주소 스크립트 추가 */}
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="afterInteractive"
      />

      <RegisterHeader />
      <main className="flex-1 flex flex-col">
        {showDetailForm ? <RegisterForm /> : <RegisterTabs onCreateIdClick={handleCreateIdClick} />}
      </main>
    </div>
  );
}
