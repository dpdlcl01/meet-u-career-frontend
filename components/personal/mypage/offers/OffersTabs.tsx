export type TabType = '전체' | '검토중' | '수락함' | '거절함'
interface OffersTabsProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
  counts: Record<TabType, number>
}
export function OffersTabs({ activeTab, onTabChange, counts }: OffersTabsProps) {
  const tabs: { id: TabType; label: string }[] = [
    { id: '전체', label: '전체' },
    { id: '검토중', label: '검토중' },
    { id: '수락함', label: '수락' },
    { id: '거절함', label: '거절' },
  ]
  return (
    <div className="border-b border-gray-200">
      <nav className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={
              "py-4 px-4 text-sm font-medium border-b-2 whitespace-nowrap " +
              (activeTab === tab.id
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300")
            }
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
            <span className={activeTab === tab.id ? "text-blue-600 ml-1" : "text-gray-500 ml-1"}>
              {counts[tab.id]}
            </span>
          </button>
        ))}
      </nav>
    </div>
  )
}