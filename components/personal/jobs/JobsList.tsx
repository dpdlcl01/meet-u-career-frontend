"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { JobsFilter } from "./JobsFilter";
import { JobCard } from "./JobCard";
import { useSearchStore } from "@/hooks/useSearchStore";

type JobDTO = {
  id: number;
  name: string;
  title: string;
  location: { fullLocation: string };
  experienceLevel: number;
  expirationDate: string;
  applyCount: number;
  status: number;
};

type Filters = {
  industry?: string;
  experienceLevel?: number;
  educationLevel?: number;
  locationCode?: string;
  keyword?: string;
};

export const JobsList = () => {
  const [jobs, setJobs] = useState<JobDTO[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [sort, setSort] = useState<"newest" | "popular" | "recommended">("newest");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const { keyword: storeKeyword } = useSearchStore();

  const fetchJobs = async (isNew = false) => {
    setLoading(true);
    const params = new URLSearchParams();

    // 필터 값들을 URL 파라미터로 추가
    if (filters.industry) params.append("industry", filters.industry);
    if (filters.experienceLevel !== undefined) params.append("experienceLevel", filters.experienceLevel.toString());
    if (filters.educationLevel !== undefined) params.append("educationLevel", filters.educationLevel.toString());

    // keyword 값 설정 (storeKeyword 우선)
    const finalKeyword = storeKeyword || filters.keyword;
    if (finalKeyword) {
      params.append("keyword", finalKeyword);
    }

    if (filters.locationCode) {
      const codes = filters.locationCode.split(",");
      codes.forEach(code => params.append("locationCode", code));
    }

    params.append("sort", sort);
    params.append("page", isNew ? "0" : page.toString());
    params.append("size", "20");

    const res = await fetch(`/api/personal/job/list?${params.toString()}`);
    const json = await res.json();

    if (isNew) {
      setJobs(json.data);
    } else {
      setJobs(prev => [...prev, ...json.data]);
    }
    setHasMore(json.data.length > 0);
    setLoading(false);
  };

  useEffect(() => {
    setPage(0);
    fetchJobs(true);
  }, [filters, sort]);

  useEffect(() => {
    if (page === 0) return;
    fetchJobs();
  }, [page]);

  const lastJobRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">오늘의 채용공고</h2>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <button className={sort === "newest" ? "underline" : ""} onClick={() => setSort("newest")}>최신순</button>
          <button className={sort === "popular" ? "underline" : ""} onClick={() => setSort("popular")}>인기순</button>
          <button className={sort === "recommended" ? "underline" : ""} onClick={() => setSort("recommended")}>마감일순</button>
        </div>
      </div>

      {/* 필터 */}
      <JobsFilter onApply={setFilters}></JobsFilter>

      {/* 카드 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {jobs.map((job, index) => {
          if (jobs.length === index + 1) {
            return (
              <div ref={lastJobRef} key={`${job.id}-${index}`}>
                <JobCard
                  name={job.name}
                  title={job.title}
                  location={job.location.fullLocation}
                  requirements={`경력 ${job.experienceLevel}년`}
                  viewCount={new Date(job.expirationDate).toLocaleDateString("ko-KR")}
                  href={`/personal/jobs/${job.id}`}
                  isRecommended={job.status === 2}
                  tag={job.applyCount > 0 ? `지원 ${job.applyCount}건` : undefined}
                />
              </div>
            );
          } else {
            return (
              <div key={`${job.id}-${index}`}>
                <JobCard
                  name={job.name}
                  title={job.title}
                  location={job.location.fullLocation}
                  requirements={`경력 ${job.experienceLevel}년`}
                  viewCount={new Date(job.expirationDate).toLocaleDateString("ko-KR")}
                  href={`/personal/jobs/${job.id}`}
                  isRecommended={job.status === 2}
                  tag={job.applyCount > 0 ? `지원 ${job.applyCount}건` : undefined}
                />
              </div>
            );
          }
        })}
      </div>

      {/* 로딩 스피너 */}
      {loading && (
        <div className="flex justify-center py-8">
          <svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        </div>
      )}
    </div>
  );
};
