"use client"

import { useState } from "react"
import LogsFilter from "./LogsFilter"
import LogsTable from "./LogsTable"
import LogsPagination from "./LogsPagination"

export default function LogsManagement() {
  const [filter, setFilter] = useState({
    startDate: "",
    endDate: "",
    logType: "",
    keyword: "",
  })

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">시스템 로그</h1>
        <p className="text-gray-600">
          시스템 전체 로그를 조회하고 관리합니다. 날짜, 키워드, 로그 유형으로 필터링할 수 있습니다.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <LogsFilter filter={filter} onFilterChange={setFilter} />
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <LogsTable filter={filter} />
        <div className="p-4 border-t">
          <LogsPagination />
        </div>
      </div>
    </div>
  )
}