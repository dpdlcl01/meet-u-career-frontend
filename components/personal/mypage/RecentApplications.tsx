"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { ApplicationStatusChart } from "./ApplicationStatusChart"

interface Summary {
  passedDocument: number
  interview1st: number
  finalAccepted: number
  rejected: number
}

interface Application {
  companyName: string
  jobTitle: string
  status: number
}

interface Props {
  applications: Application[]
  summary: Summary
}

export function RecentApplications({ applications, summary }: Props) {
  const latestApp = applications.find(app => app.status !== 0)

  const getProgress = (status: number) => {
    switch (status) {
      case 1: return { width: "25%", color: "#10B981" } // 서류 통과
      case 2: return { width: "50%", color: "#3B82F6" } // 1차 면접
      case 3: return { width: "75%", color: "#8B5CF6" } // 최종 합격
      case 4: return { width: "100%", color: "#EF4444" } // 불합격
      default: return { width: "0%", color: "#9CA3AF" } // 회색
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">최근 지원 현황</h2>
        <Link href="/personal/applications" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
          전체보기 <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {latestApp && (
              <div className="rounded-lg border border-gray-100 shadow-md p-6">
                <div className="text-sm font-medium text-blue-600">{latestApp.companyName}</div>
                <div className="text-gray-800 font-semibold text-base">{latestApp.jobTitle}</div>
                <div className="text-xs text-gray-500 mt-1">
                  상태: {
                    latestApp.status === 1 ? "서류 통과" :
                    latestApp.status === 2 ? "1차 면접" :
                    latestApp.status === 3 ? "최종 합격" : "불합격"
                  }
                </div>

                {/* 진행상태 바 */}
                <div className="mt-10 min-h-[40px]">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: getProgress(latestApp.status).width,
                        backgroundColor: "#3B82F6"
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center justify-center">
            <h3 className="text-sm font-medium text-gray-700 mb-4">총 지원현황</h3>
            <ApplicationStatusChart
              data={{
                passedDocument: summary.passedDocument,
                interview1st: summary.interview1st,
                finalAccepted: summary.finalAccepted,
                rejected: summary.rejected
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
