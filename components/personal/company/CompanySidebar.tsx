"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Share2 } from "lucide-react";

interface CompanySidebarProps {
  companyId: string;
  activeTab?: "intro" | "reviews" | "salary" | "jobs";
}



export interface CompanyInfoDTO {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  businessNumber: string;
  representativeName: string;
  industry: string;
  foundedDate: string;
  numEmployees: number;
  revenue: number;
  website: string;
  logoKey: string;
  address: string;
  companyType: string;
  corpCode: string;
  operatingProfit: number;
  status: number;
  avgAnnualSalary: number;
}

export const CompanySidebar = ({
  companyId,
  activeTab = "intro",
}: CompanySidebarProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [company, setCompany] = useState<CompanyInfoDTO | null>(null);

  useEffect(() => {
    if (!companyId) return;
    fetch(`/api/personal/companies/${companyId}/info`)
      .then((res) => res.json())
      .then((data) => {
        setCompany(data.data);
      });
  }, [companyId]);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  if (!company) return <div>Loading...</div>;

  // Formatters
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 설립`;
  };
  const formatNumber = (num: number) => (num || 0).toLocaleString();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-4 border-b">
        <div className="flex justify-center mb-4">
          <div
            className="w-32 h-12 relative"
            style={{ marginBottom: "80px", marginTop: "10px" }}
          >
            <Image
              src={`/images/etc/${company.logoKey}?height=48&width=128`}
              alt={company.name}
              width={128}
              height={48}
              className="object-contain"
            />
          </div>
        </div>
        <h2
          className="text-base font-bold text-center"
          style={{ marginBottom: "5px" }}
        >
          {company.name}
        </h2>
        <p
          className="text-xs text-gray-500 text-center mb-3"
          style={{ marginBottom: "10px" }}
        >
          {formatDate(company.foundedDate)}
        </p>
        <div className="flex justify-between items-center relative z-10">
          <button
            onClick={toggleLike}
            className="flex items-center text-xs text-gray-500 hover:text-gray-700"
            style={{ marginLeft: "20px" }}
          >
            <Heart
              className={`w-4 h-4 mr-1 ${
                isLiked ? "fill-red-500 text-red-500" : ""
              }`}
              size={16}
            />
            찜하기
          </button>
          <button
            className="flex items-center text-xs text-gray-500 hover:text-gray-700"
            style={{ marginRight: "30px" }}
          >
            <Share2 className="w-4 h-4 mr-1" size={16} />
            공유
          </button>
        </div>
      </div>

      <nav className="p-2">
        <ul className="space-y-1">
          <li>
            <Link
              href={`/personal/company/${companyId}/intro`}
              className={`flex items-center px-3 py-2 text-sm rounded-md ${
                activeTab === "intro"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
              기업소개
            </Link>
          </li>

          <li>
            <Link
              href={`/personal/company/${companyId}/salary`}
              className={`flex items-center px-3 py-2 text-sm rounded-md ${
                activeTab === "salary"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <svg
                className="w-5 h-5 mr-2 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              연봉정보
            </Link>
          </li>
          <li>
            <Link
              href={`/personal/jobs/319`}
              className={`flex items-center px-3 py-2 text-sm rounded-md ${
                activeTab === "jobs"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <svg
                className="w-5 h-5 mr-2 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              채용공고
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
