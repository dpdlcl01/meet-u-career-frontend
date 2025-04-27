import Image from "next/image"
import Link from "next/link"

interface Props {
  profileImageUrl: string,
  name: string
  experience: number
  skills: string[]
  resumeViews: number
  offerCount: number
  bookmarkCount: number
  completeness: number
}

export function ProfileCard({
  profileImageUrl,
  name,
  experience,
  skills,
  resumeViews,
  offerCount,
  bookmarkCount,
  completeness,
}: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      {/* 상단: 프로필 이미지 + 기본 정보 */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden relative">
            {profileImageUrl && (
              <Image
                src={`/${profileImageUrl}`}
                alt="프로필 이미지"
                fill
                className="object-cover"
              />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
              <Link
                href="/personal/profile/edit"
                className="bg-gray-100 text-xs px-2 py-0.5 rounded text-blue-600 hover:underline"
              >
                프로필 수정
              </Link>
            </div>
            <p className="text-base text-gray-600 mb-2">경력 {experience}년</p>
            <div className="flex gap-2 mb-2 flex-wrap">              
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 프로필 완성도 */}
        <div className="min-w-[220px]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-700">프로필 완성도</span>
            <span className="text-sm font-semibold text-blue-600">{completeness}%</span>
          </div>
          <div className="w-44 bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${completeness}%` }}
            />
          </div>
        </div>
      </div>

      {/* 하단 통계 */}
      <div className="grid grid-cols-4 divide-x bg-white rounded-lg">
        <StatBox label="지원 현황" count={resumeViews} />
        <StatBox label="이력서 열람" count={resumeViews} />
        <StatBox label="받은 제안" count={offerCount} />
        <StatBox label="스크랩" count={bookmarkCount} />
      </div>
    </div>
  )
}

function StatBox({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex flex-col items-center py-4">
      <span className="text-lg font-bold text-gray-900">{count}</span>
      <span className="text-xs text-gray-500 mt-1">{label}</span>
    </div>
  )
}
