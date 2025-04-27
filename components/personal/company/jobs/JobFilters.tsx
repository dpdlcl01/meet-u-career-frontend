
export const JobFilters = () => {
  const filters = [
    { id: "all", label: "전체" },
    { id: "dev", label: "기술개발" },
    { id: "marketing", label: "마케팅/영업/사업" },
    { id: "design", label: "디자인/UX/UI" },
    { id: "planning", label: "기획/전략/PM" },
    { id: "it", label: "IT/테크/개발" },
    { id: "design2", label: "디자인" },
    { id: "management", label: "영업/관리/영업" },
    { id: "finance", label: "금융/재무/M&D" },
    { id: "sales", label: "영업" },
    { id: "building", label: "건설/건축" },
    { id: "research", label: "연구/R&D" },
    { id: "education", label: "교육" },
    { id: "media", label: "미디어/콘텐츠/스포츠" },
    { id: "medical", label: "의료/제약" },
  ]

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`px-3 py-1.5 text-xs rounded-full border ${filter.id === "all"
                ? "bg-blue-50 text-blue-600 border-blue-200"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  )
}
