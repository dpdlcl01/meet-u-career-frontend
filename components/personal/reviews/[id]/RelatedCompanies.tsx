import Image from "next/image"

export const RelatedCompanies = () => {
  const companies = [
    {
      id: 1,
      name: "(주)현대모비스",
      description: "자동차 부품의 수출입 및 제조",
      employees: "5천명",
      salary: "8천5백만원",
      logo: "/hyundai-mobis-corporate-identity.png",
    },
    {
      id: 2,
      name: "기아(주)",
      description: "승용차 및 기타 여객용 자동차 제조업",
      employees: "3만5천명",
      salary: "8천5백만원/연",
      logo: "/stylized-oval-badge.png",
    },
    {
      id: 3,
      name: "현대오토에버(주)",
      description: "승용차 및 기타 여객용 자동차 제조업",
      employees: "5천명",
      salary: "8천5백만원/연",
      logo: "/abstract-company-logo.png",
    },
    {
      id: 4,
      name: "쏘카 모빌리티",
      description: "승용차 및 기타 여객용 자동차 제조업",
      employees: "5천명",
      salary: "5천만원/연",
      logo: "/abstract-geometric-company.png",
    },
  ]

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">현대자동차(주)와</h2>
        <div className="text-xs text-gray-500">1 / 2</div>
      </div>
      <h3 className="text-base font-medium mb-4">리뷰가 많이 수집됨</h3>

      <div className="space-y-4">
        {companies.map((company, index) => (
          <div key={company.id} className="border rounded-lg p-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                <Image
                  src={company.logo || "https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/placeholder.svg"}
                  alt={`${company.name} 로고`}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <h4 className="font-medium text-sm">
                  {index + 1}. {company.name}
                </h4>
                <p className="text-xs text-gray-600 mt-1">{company.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  직원 {company.employees} · {company.salary}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button className="w-6 h-6 rounded-full border flex items-center justify-center text-gray-400 mr-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button className="w-6 h-6 rounded-full border flex items-center justify-center text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
