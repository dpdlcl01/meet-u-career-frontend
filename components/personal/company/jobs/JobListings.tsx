"use client"
import { JobItem } from "./JobItem"

interface JobListingsProps {
  isExpired?: boolean
}

export const JobListings = ({ isExpired = false }: JobListingsProps) => {
  // This would typically come from an API or server component
  const activeJobs = [
    {
      id: "1",
      title: "[연구직 전환 가능] 서비스운영 및 일상지원 자체개발자",
      departments: ["자동차", "개발자"],
      skills: ["일상지원"],
      experience: "경력 없어도 지원가능",
      employmentType: "정규직",
      location: "서울",
      deadline: "~04.21(일)",
      daysLeft: "2일 남음",
    },
    {
      id: "2",
      title: "다우기술 경력•신입 대규모 인재채용",
      departments: ["기술개발", "테이터분석가", "테이터엔지니어", "백엔드/서버개발", "보안전문가 외"],
      experience: "경력 없어도 지원가능",
      employmentType: "인턴 • 정규 전환가능",
      location: "서울",
      deadline: "~04.21(일)",
      daysLeft: "31일 남음",
    },
  ]

  const expiredJobs = [
    {
      id: "3",
      title: "[연구직 전환 가능] 서비스운영 및 일상지원 자체개발자",
      departments: ["자동차", "개발자"],
      skills: ["일상지원"],
      experience: "경력 없어도 지원가능",
      employmentType: "정규직",
      location: "서울",
      deadline: "~04.07(일)",
      daysLeft: "마감 9일 남음",
    },
    {
      id: "4",
      title: "[보훈대상자 채용장려/장학지] 기술 및 경영지원 채용",
      departments: ["기술개발", "백엔드/서버개발", "경영지원", "보훈대상자", "프론트엔드 외"],
      experience: "경력 없어도 지원가능",
      employmentType: "정규직",
      location: "서울",
      deadline: "~04.01(월)",
      daysLeft: "마감 15일 남음",
    },
    {
      id: "5",
      title: "업무지원팀 개발 직무직 경력사원 채용",
      departments: ["백엔드/서버개발", "경영지원", "업무지원", "DBA", "DB 외"],
      experience: "1~4년",
      employmentType: "정규직",
      location: "서울",
      deadline: "~03.30(토)",
      daysLeft: "마감 21일 남음",
    },
    {
      id: "6",
      title: "다우기술 경력•신입 대규모 인재채용",
      departments: ["기술개발", "테이터분석가", "테이터엔지니어", "백엔드/서버개발", "보안전문가 외"],
      experience: "서울 거주 가능",
      employmentType: "인턴 • 정규",
      location: "서울",
      deadline: "~03.30(토)",
      daysLeft: "마감 34일 남음",
    },
    {
      id: "7",
      title: "AI 서비스 개발",
      departments: ["데이터분석가", "클라우드", "프론트엔드", "데이터엔지니어링", "테이터엔지니어 외"],
      experience: "3년~10년",
      employmentType: "정규직",
      location: "서울",
      deadline: "~03.19(화)",
      daysLeft: "마감 28일 남음",
    },
  ]

  const jobs = isExpired ? expiredJobs : activeJobs

  return (
    <div className="space-y-4 mb-8">
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} isExpired={isExpired} />
      ))}
    </div>
  )
}