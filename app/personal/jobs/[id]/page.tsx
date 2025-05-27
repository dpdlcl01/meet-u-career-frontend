"use client";

import { useEffect, useRef, useState, use } from "react";
import { Header } from "@/components/home/Header";
import { LoginHeader } from "@/components/home/LoginHeader";
import { MainNavigation } from "@/components/home/MainNavigation";
import { JobDetailContent } from "@/components/personal/jobs/JobDetailContent";
import { JobSidebar } from "@/components/personal/jobs/JobSidebar";
import { Footer } from "@/components/home/Footer";
import { useUserStore } from "@/store/useUserStore";
// import { MiniHeader } from "@/components/personal/jobs/MiniHeader";

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const { userInfo, isUserInfoHydrated } = useUserStore();
  const { id } = use(params);

  const [isScrolled, setIsScrolled] = useState(false);

  const postRef = useRef<HTMLDivElement>(null);
  const applyRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const scrollTop = window.scrollY;
        if (scrollTop > 80) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }, 50); // 50ms 정도 딜레이 주기
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isUserInfoHydrated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfd]">
      {userInfo ? <LoginHeader /> : <Header />}
      <MainNavigation />

      {/* 본문 */}
      <main className="flex-1">
        <div className="max-w-[1200px] mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="hidden md:block w-16">
              <JobSidebar scrollToSection={{ postRef, applyRef, companyRef }} />
            </div>
            <div className="flex-1">
              <JobDetailContent
                jobId={id}
                sectionRefs={{ postRef, applyRef, companyRef }}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
