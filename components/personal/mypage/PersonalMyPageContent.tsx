"use client"

import { useEffect, useState } from "react"
import { apiClient } from "@/api/apiClient"
import { PersonalMyPageInfo } from "@/types/personal"
import { ProfileCard } from "./ProfileCard"
import { RecentApplications } from "./RecentApplications"
import { RecommendedJobs } from "./RecommendedJobs"

export function PersonalMyPageContent() {
  const [data, setData] = useState<PersonalMyPageInfo>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get<{ data: PersonalMyPageInfo }>("/api/personal/mypage")
        setData(res.data.data);
      } catch (err) {
        console.error("❌ 마이페이지 데이터 불러오기 실패", err)
      }
    }
    fetchData()
  }, [])

  if (!data) return <div className="text-center text-gray-400 py-10">로딩 중...</div>

  return (
    <div className="space-y-10">
      <ProfileCard
        profileImageUrl={data.profile.profileImageUrl}
        name={data.account.name}
        experience={data.profile.experienceLevel}
        skills={data.profile.skills!= null ? data.profile.skills.split(",").map(s => s.trim()) : []}
        resumeViews={data.resumeViewCount}
        offerCount={data.offerCount}
        bookmarkCount={data.bookmarkCount}
        completeness={data.profileCompleteness}
      />

      <RecentApplications
        applications={data.recentApplications}
        summary={data.summary}
      />

      <RecommendedJobs
        jobs={data.recommendedJobs.map(job => ({
          company: job.companyName,
          title: job.jobTitle,
          location: job.location,
          salary: job.salaryRange,
          deadline: job.deadline,
          skills: job.preferredSkills.split(","),
        }))}
      />
    </div>
  )
}
