"use client"

import { useState } from "react"
import JobsTabs from "./JobsTabs"
import JobsSearch from "./JobsSearch"
import JobsTable from "./JobsTable"

export default function JobsManagement() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">채용 공고 관리</h1>
        <p className="text-gray-600">채용 공고를 조회하고 검수 상태를 관리할 수 있습니다.</p>
      </div>

      <JobsTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <JobsSearch />
      <JobsTable activeTab={activeTab} />
    </div>
  )
}