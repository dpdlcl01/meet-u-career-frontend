import { Calendar, ChevronDown } from "lucide-react"

export interface Filter {
  startDate: string
  endDate: string
  logType: string
  keyword: string
}

export interface LogsFilterProps {
  filter: Filter
  onFilterChange: (newFilter: Filter) => void
}

export default function LogsFilter({ filter, onFilterChange }: LogsFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex flex-col md:flex-row items-end gap-4">
        {/* Date Range */}
        <div className="flex items-end gap-2">
          <div className="flex flex-col">
            <label htmlFor="startDate" className="text-xs font-medium text-gray-600 mb-1">시작일</label>
            <div className="relative w-full md:w-36">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={filter.startDate}
                onChange={(e) => onFilterChange({ ...filter, startDate: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-left focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition duration-150 appearance-none"
                style={{ boxShadow: 'none', appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'textfield' }}
              />
            </div>
          </div>
          <span className="text-gray-400 font-bold text-lg -mb-1">~</span>
          <div className="flex flex-col">
            <label htmlFor="endDate" className="text-xs font-medium text-gray-600 mb-1">종료일</label>
            <div className="relative w-full md:w-36">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={filter.endDate}
                onChange={(e) => onFilterChange({ ...filter, endDate: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-left focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition duration-150 appearance-none"
                style={{ boxShadow: 'none', appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'textfield' }}
              />
            </div>
          </div>
        </div>
        {/* Log Type */}
        <div className="relative">
          <select
            name="logType"
            value={filter.logType}
            onChange={(e) => onFilterChange({ ...filter, logType: e.target.value })}
            className="appearance-none pl-4 pr-10 py-2 border rounded-md w-full md:w-40"
          >
            <option value="">전체</option>
            <option value="SECURITY">보안</option>
            <option value="TRANSACTION">트랜잭션</option>
            <option value="SYSTEM">시스템</option>
            <option value="USER">사용자</option>
            <option value="ERROR">오류</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
        {/* Keyword */}
        <div className="relative w-full">
          <input
            type="text"
            name="keyword"
            value={filter.keyword}
            onChange={(e) => onFilterChange({ ...filter, keyword: e.target.value })}
            placeholder="로그 검색 (계정, 유형, 상세 내용)"
            className="w-full pl-4 pr-4 py-2 border rounded-md"
          />
        </div>
      </div>
    </div>
  )
}