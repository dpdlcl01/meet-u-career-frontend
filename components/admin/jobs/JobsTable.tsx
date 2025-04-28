"use client"

import { useState } from "react"
import { Eye } from "lucide-react"
import JobDetailModal from "./JobDetailModal"

// Mock data for job listings
const jobListings = [
  {
    id: 1,
    title: "프론트엔드 개발자",
    company: "(주)삼성전자",
    status: "승인됨",
    registrationDate: "2023-01-15",
    views: 1245,
    applications: 24,
    deadline: "2023-02-15",
  },
  {
    id: 2,
    title: "백엔드 개발자",
    company: "(주)현대자동차",
    status: "대기 중",
    registrationDate: "2023-02-20",
    views: 890,
    applications: 18,
    deadline: "2023-03-20",
  },
  {
    id: 3,
    title: "데이터 사이언티스트",
    company: "(주)네이버",
    status: "승인됨",
    registrationDate: "2023-03-10",
    views: 1560,
    applications: 32,
    deadline: "2023-04-10",
  },
  {
    id: 4,
    title: "UI/UX 디자이너",
    company: "(주)카카오",
    status: "거부됨",
    registrationDate: "2023-04-05",
    views: 720,
    applications: 15,
    deadline: "2023-05-05",
  },
  {
    id: 5,
    title: "DevOps 엔지니어",
    company: "(주)LG전자",
    status: "대기 중",
    registrationDate: "2023-05-12",
    views: 650,
    applications: 12,
    deadline: "2023-06-12",
  },
  {
    id: 6,
    title: "모바일 앱 개발자",
    company: "(주)SK텔레콤",
    status: "승인됨",
    registrationDate: "2023-06-18",
    views: 980,
    applications: 22,
    deadline: "2023-07-18",
  },
  {
    id: 7,
    title: "시스템 엔지니어",
    company: "(주)롯데쇼핑",
    status: "대기 중",
    registrationDate: "2023-07-22",
    views: 540,
    applications: 10,
    deadline: "2023-08-22",
  },
  {
    id: 8,
    title: "보안 전문가",
    company: "(주)포스코",
    status: "거부됨",
    registrationDate: "2023-08-30",
    views: 420,
    applications: 8,
    deadline: "2023-09-30",
  },
  {
    id: 9,
    title: "클라우드 아키텍트",
    company: "(주)한화",
    status: "승인됨",
    registrationDate: "2023-09-14",
    views: 780,
    applications: 16,
    deadline: "2023-10-14",
  },
  {
    id: 10,
    title: "풀스택 개발자",
    company: "(주)GS리테일",
    status: "대기 중",
    registrationDate: "2023-10-05",
    views: 860,
    applications: 20,
    deadline: "2023-11-05",
  },
]

export default function JobsTable({ activeTab }: { activeTab: string }) {
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter jobs based on active tab
  const filteredJobs = jobListings.filter((job) => {
    if (activeTab === "all") return true
    if (activeTab === "pending") return job.status === "대기 중"
    if (activeTab === "approved") return job.status === "승인됨"
    return true
  })

  const handleOpenModal = (job: any) => {
    setSelectedJob(job)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "승인됨":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
            {status}
          </span>
        )
      case "대기 중":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <span className="w-2 h-2 mr-1 bg-yellow-500 rounded-full"></span>
            {status}
          </span>
        )
      case "거부됨":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <span className="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
            {status}
          </span>
        )
      default:
        return <span>{status}</span>
    }
  }

  return (
    <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                No
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                공고명
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                기업명
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                승인 상태
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                등록일
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                조회수
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                지원자수
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                마감일
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                관리
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(job.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.registrationDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.views.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.applications}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.deadline}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      {job.status === "대기 중" && (
                        <>
                          <button className="px-3 py-1 bg-green-50 text-green-700 rounded hover:bg-green-100 text-xs font-medium">
                            승인
                          </button>
                          <button className="px-3 py-1 bg-red-50 text-red-700 rounded hover:bg-red-100 text-xs font-medium">
                            거부
                          </button>
                        </>
                      )}
                      {job.status === "승인됨" && (
                        <button className="px-3 py-1 bg-orange-50 text-orange-700 rounded hover:bg-orange-100 text-xs font-medium">
                          차단
                        </button>
                      )}
                      <button
                        onClick={() => handleOpenModal(job)}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 text-xs font-medium flex items-center"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        상세
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="px-6 py-10 text-center text-sm text-gray-500">
                  해당 조건에 맞는 공고가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedJob && <JobDetailModal job={selectedJob} onClose={handleCloseModal} />}
    </div>
  )
}