"use client"

import { useEffect, useState } from "react"

export interface DashboardData {
  companyName: string
  industry: string
  address: string
  foundedDate: string
  employeeScale: string
  totalJobPostings: number
  activeJobPostings: number
  closedJobPostings: number
  nearingDeadlineJobPostings: number
  totalViews: number
  totalApplications: number
  jobCategoryViewCount: Record<string, number>
  jobCategoryApplicationCount: Record<string, number>
  jobPostings: {
    jobPostingId: number
    title: string
    location: string
    postedDate: string
    deadline: string
    viewCount: number
    applicationCount: number
  }[]
}

export const useDashboardData = (companyId: number) => {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/business/dashboard/${companyId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        setData(json.data)
        setLoading(false)
      })
  }, [companyId])

  return { data, loading }
}
