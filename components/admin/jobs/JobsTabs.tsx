"use client"

interface JobsTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function JobsTabs({ activeTab, onTabChange }: JobsTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        <button
          onClick={() => onTabChange("all")}
          className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === "all"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
          aria-current={activeTab === "all" ? "page" : undefined}
          role="tab"
          aria-selected={activeTab === "all"}
        >
          전체 공고
        </button>
        <button
          onClick={() => onTabChange("pending")}
          className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === "pending"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
          aria-current={activeTab === "pending" ? "page" : undefined}
          role="tab"
          aria-selected={activeTab === "pending"}
        >
          검수 대기 공고
        </button>
        <button
          onClick={() => onTabChange("approved")}
          className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === "approved"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
          aria-current={activeTab === "approved" ? "page" : undefined}
          role="tab"
          aria-selected={activeTab === "approved"}
        >
          검수 완료 공고
        </button>
      </nav>
    </div>
  )
}