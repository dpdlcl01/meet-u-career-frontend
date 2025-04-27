"use client"

import Image from "next/image"

interface Props {
  companyName: string
  logoKey: string | null
  industry: string
  address: string
  businessNumber: string
  website: string
}

export const CompanyHeader = ({
  companyName,
  logoKey,
  industry,
  address,
  businessNumber,
  website,
}: Props) => {
  return (
    <div className="bg-[#4054E9] pt-12 pb-6">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="bg-white rounded-lg p-6 relative shadow-sm">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-[120px] h-[120px] bg-white rounded-md border flex items-center justify-center overflow-hidden">
              <Image
                src={logoKey || "/images/etc/placeholder.svg"}
                alt={`${companyName} 로고`}
                width={100}
                height={40}
                className="object-contain"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">{companyName}</h1>
                <span className="text-[11px] text-blue-700 border border-blue-500 rounded px-1 py-[2px] font-medium">
                  기업정보
                </span>
              </div>

              <div className="text-sm text-gray-600 mb-1">
                {industry} <span className="mx-2">|</span> {address}
              </div>

              <div className="text-sm text-gray-600 mb-1">
                사업자번호: <span className="font-semibold">{businessNumber}</span>
              </div>

              <div className="text-sm mt-1">
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800 transition"
                >
                  {website}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
