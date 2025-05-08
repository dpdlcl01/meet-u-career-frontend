"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { ApplicantsSearch } from "./ApplicantsSearch";
import { ApplicantsStatistics } from "./ApplicantsStatistics";
import type { ApplicantStatus } from "@/types/applicants";
import { apiClient } from "@/api/apiClient";
import { statusMap, statusColors } from "@/types/applicants";

interface Applicant {
  id: number;
  name: string;
  email: string;
  position: string;
  date: string;
  status: ApplicantStatus;
}

type SortDirection = "asc" | "desc" | null;

interface ApplicantsTableProps {
  applicants: Applicant[];
  searchQuery?: string;
  statusFilter?: ApplicantStatus | null;
}

interface ApplicantsTableWithSearchProps {
  jobPostingId: number;
}

export const ApplicantsTable = ({
  applicants,
  searchQuery = "",
  statusFilter = null,
}: ApplicantsTableProps) => {
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const toggleSort = () => {
    if (sortDirection === null) setSortDirection("desc");
    else if (sortDirection === "desc") setSortDirection("asc");
    else setSortDirection(null);
  };

  let filtered = applicants.filter((applicant) => {
    const matchesSearch =
      searchQuery === "" ||
      applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === null || applicant.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (sortDirection) {
    filtered = [...filtered].sort((a, b) => {
      const dateA = a.date.replace(/\./g, "");
      const dateB = b.date.replace(/\./g, "");
      return sortDirection === "asc"
        ? dateA.localeCompare(dateB)
        : dateB.localeCompare(dateA);
    });
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="grid grid-cols-[2fr,3fr,1fr,1fr] bg-gray-50 border-b border-gray-200">
        <div className="p-4 font-medium text-gray-700">이름</div>
        <div className="p-4 font-medium text-gray-700">지원 포지션</div>
        <div className="p-4 font-medium text-gray-700 flex items-center">
          지원일
          <button className="ml-1" onClick={toggleSort}>
            {sortDirection === "asc" ? (
              <ChevronUp className="w-4 h-4 text-blue-500" />
            ) : (
              <ChevronDown
                className={`w-4 h-4 ${sortDirection === "desc" ? "text-blue-500" : "text-gray-500"
                  }`}
              />
            )}
          </button>
        </div>
        <div className="p-4 font-medium text-gray-700">상태</div>
      </div>

      {filtered.length > 0 ? (
        filtered.map((applicant) => (
          <div
            key={applicant.id}
            className="grid grid-cols-[2fr,3fr,1fr,1fr] border-b border-gray-200 hover:bg-gray-50"
          >
            <div className="p-4">
              <Link href={`/business/applicants/${applicant.id}`}>
                <div className="font-medium">{applicant.name}</div>
                <div className="text-sm text-gray-500">{applicant.email}</div>
              </Link>
            </div>
            <div className="p-4 flex items-center">{applicant.position}</div>
            <div className="p-4 flex items-center">{applicant.date}</div>
            <div className="p-4 flex items-center">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[applicant.status]
                  }`}
              >
                {applicant.status}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="p-8 text-center text-gray-500">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
};

export const ApplicantsTableWithSearch = ({
  jobPostingId,
}: ApplicantsTableWithSearchProps) => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicantStatus | null>(
    null
  );

  useEffect(() => {
    if (!jobPostingId) return;

    const fetchApplicants = async () => {
      try {
        const response = await apiClient.get(
          `/api/business/applicants/${jobPostingId}`
        );
        const formatted = response.data.data.map((applicant: any) => ({
          id: applicant.applicationId,
          name: applicant.applicantName,
          email: applicant.email,
          position: applicant.position || "포지션 정보 없음",
          date: applicant.appliedDate?.replace(/-/g, ".") || "날짜 없음",
          status: statusMap[applicant.status] || "서류검토중",
        }));
        setApplicants(formatted);
      } catch (error) {
        console.error("지원자 조회 실패:", error);
        setApplicants([]); // 실패해도 빈 배열 유지
      }
    };

    fetchApplicants();
  }, [jobPostingId]);

  return (
    <>
      <ApplicantsStatistics
        onStatusSelect={setStatusFilter}
        selectedStatus={statusFilter}
        jobPostingId={jobPostingId || 0}
      />
      <ApplicantsSearch onSearch={setSearchQuery} />
      <ApplicantsTable
        applicants={applicants}
        searchQuery={searchQuery}
        statusFilter={statusFilter}
      />
    </>
  );
};
