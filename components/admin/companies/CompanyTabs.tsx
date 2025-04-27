"use client"

type Tab = {
  id: string
  label: string
}

const tabs: Tab[] = [
  { id: "all", label: "전체 기업" },
  { id: "pending", label: "검수 대기 기업" },
  { id: "approved", label: "검수 완료 기업" },
]

interface CompanyTabsProps {
  activeTab: string
  onTabChange: (tabId: string) => void
}

export default function CompanyTabs({ activeTab, onTabChange }: CompanyTabsProps) {
  return (
    <div className="border-b border-gray-200 mb-6">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-2 px-1 -mb-px font-medium text-l ${
              activeTab === tab.id ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
