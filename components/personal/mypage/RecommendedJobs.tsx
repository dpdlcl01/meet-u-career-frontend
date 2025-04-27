import Link from "next/link"
import { ChevronRight, MapPin, Calendar, DollarSign, Bookmark } from "lucide-react"

interface Job {
  company: string
  title: string
  location: string
  salary: string
  deadline: string
  skills: string[]
}

interface Props {
  jobs: Job[]
}

export function RecommendedJobs({ jobs }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">추천 공고</h2>
        <Link href="/personal/jobs" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
          전체보기 <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col h-full p-6"
            >
              {/* 상단: 회사명 및 포지션 */}
              <div className="flex items-center mb-2">
                <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0 border border-gray-200 mr-3 bg-gray-200" />
                <div>
                  <h4 className="font-bold text-gray-900 text-base leading-tight">{job.company}</h4>
                  <p className="text-sm text-gray-600 mt-0.5">{job.title}</p>
                </div>
              </div>

              {/* 상세 정보 */}
              <div className="flex flex-col gap-1 text-sm text-gray-700 mb-4 mt-2">
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>마감일: {job.deadline}</span>
                </div>
              </div>

              {/* 스킬 태그 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* 하단 영역 (지원, 북마크 등 향후 확장 가능) */}
              <div className="flex items-end justify-between mt-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
