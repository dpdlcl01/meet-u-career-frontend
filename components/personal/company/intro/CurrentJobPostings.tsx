"use client";
import Link from "next/link";

import { useEffect, useState } from "react";

interface JobPosting {
  id: number;
  companyName: string;
  title: string;
  location: string;
  employmentType: string;
  career: string;
  deadline: string;
  thumbnailUrl: string;
  dDay: string;
}

interface CurrentJobPostingsProps {
  companyId: string;
}

export const CurrentJobPostings = ({ companyId }: CurrentJobPostingsProps) => {
  const [postings, setPostings] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!companyId) {
      setPostings([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`/api/personal/companies/${companyId}/jobs`)
      .then((res) => res.json())
      .then((data) => {
        // Debug: log companyId and data
        console.log('CurrentJobPostings: companyId', companyId);
        console.log('CurrentJobPostings: fetched data', data);
        setPostings(data.data || []);
      })
      .catch((err) => {
        console.error('CurrentJobPostings: fetch error', err);
        setPostings([]);
      })
      .finally(() => setLoading(false));
  }, [companyId]);

  if (loading) return null;
  if (!postings.length) return null;

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">현재 채용 중인 공고</h2>
        <Link href={`/personal/company/${companyId}/jobs`} className="text-xs text-blue-500 flex items-center">
          채용공고 더보기
          <svg
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.59 16.59L10 18L16 12L10 6L8.59 7.41L13.17 12L8.59 16.59Z"
              fill="#2365f2"
            ></path>
          </svg>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {postings.map((job) => (
          <a
            key={job.id}
            className="block border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
            href={`/personal/jobs/${job.id}`}
          >
            <div className="h-1 w-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"></div>
            <div className="p-3 text-center">
              <div className="text-sm font-semibold text-gray-700">{job.companyName}</div>
            </div>
            <div className="px-3 pb-3 text-left">
              <h3 className="text-sm font-medium text-gray-800 leading-tight line-clamp-2 min-h-[2.5rem] pl-1">
                {job.title}
              </h3>
            </div>
            <div className="relative w-full aspect-video overflow-hidden">
              <img
                alt="thumbnail"
                decoding="async"
                className="object-cover"
                src={job.thumbnailUrl}
                style={{ position: "absolute", height: "100%", width: "100%", inset: 0, color: "transparent" }}
              />
            </div>
            <div className="flex justify-between items-center px-3 py-2 text-white text-xs">
              <div></div>
              <div className="flex items-center space-x-2 text-red-600">
                <span>{job.dDay}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
