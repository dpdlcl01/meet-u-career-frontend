"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Share2, ChevronRight, ChevronLeft } from "lucide-react"

interface CompanyReviewDetailProps {
  companyId: string
}

export const CompanyReviewDetail = ({ companyId }: CompanyReviewDetailProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false)

  // Mock data for the company
  const company = {
    id: companyId,
    name: "현대자동차(주)",
    logo: "/stylized-oval-badge.png",
    registrationNumber: "12/123-00000-00",
    employees: "10,482명",
    industry: "완성차 제조업",
    address: "서울특별시 서초구 헌릉로 12 (양재동)",
    reviewCount: 345767,
  }

  // Mock data for related companies
  const relatedCompanies = [
    {
      id: 1,
      name: "(주)현대모비스",
      logo: "/hyundai-mobis-corporate-identity.png",
      avgSalary: "6천만원 이상",
      avgSalaryRange: "6천만원~8천만원/년",
    },
    {
      id: 2,
      name: "기아(주)",
      logo: "/stylized-oval-badge.png",
      avgSalary: "6천만원 이상",
      avgSalaryRange: "6천만원~8천만원/년",
    },
    {
      id: 3,
      name: "현대자동차그룹(주)",
      logo: "/stylized-oval-badge.png",
      avgSalary: "6천만원 이상",
      avgSalaryRange: "6천만원~8천만원/년",
    },
    {
      id: 4,
      name: "쏘카 모빌리티",
      logo: "/stylized-oval-badge.png",
      avgSalary: "5천만원 이상",
      avgSalaryRange: "5000만원/년",
    },
  ]

  // Mock data for review statistics
  const reviewStats = [
    {
      question: "어떤 복장으로 출근하시나요?",
      answers: [
        { text: "캐주얼 복장", percentage: 83.3 },
        { text: "세미정장", percentage: 12.5 },
        { text: "정장 착용", percentage: 4.2 },
      ],
    },
    {
      question: "어떤 사내문화가 있어 좋았나요?",
      answers: [
        { text: "존중하는 태도", percentage: 76.2 },
        { text: "수평적인 의사소통", percentage: 23.8 },
      ],
    },
    {
      question: "연차는 어떻게 사용하시나요?",
      answers: [
        { text: "자유롭게 사용", percentage: 74.8 },
        { text: "눈치보며 사용", percentage: 17.7 },
        { text: "잘 사용하지 못함", percentage: 7.5 },
      ],
    },
    {
      question: "출근이 자유로운 편인가요?",
      answers: [
        { text: "정해진 시간에 출근", percentage: 73.0 },
        { text: "자율출퇴근 사용", percentage: 24.7 },
        { text: "재택근무 허용", percentage: 2.3 },
      ],
    },
    {
      question: "회사의 어떤점 긍정적이었나요?",
      answers: [
        { text: "복지와 급여 좋음", percentage: 70.8 },
        { text: "안정적인 일자리", percentage: 19.0 },
      ],
    },
    {
      question: "회사의 평균 연령대는?",
      answers: [
        { text: "40대 이상", percentage: 70.2 },
        { text: "30대", percentage: 24.4 },
      ],
    },
  ]

  // Mock data for interview experiences
  const interviewExperiences = [
    {
      question: "면접 경험은 어땠나요?",
      answers: [{ text: "나쁨 100%", percentage: 100 }],
    },
    {
      question: "면접 시 제시된 어떤점 있나요?",
      answers: [{ text: "좋지 않음 좋음", percentage: 100 }],
    },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Company Profile Header */}
      <div className="bg-indigo-600 py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start gap-4">
              <div className="bg-white p-2 rounded-md border w-24 h-24 flex items-center justify-center">
                <Image src={company.logo || "https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/placeholder.svg"} alt={`${company.name} 로고`} width={80} height={80} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold">{company.name}</h1>
                  <span className="text-xs text-gray-500 border border-gray-300 rounded px-1">기업정보</span>
                </div>
                <div className="mt-2 text-xs text-gray-500 flex flex-wrap gap-x-4">
                  <span>사업자 등록번호 {company.registrationNumber}</span>
                  <span>직원수 {company.employees}</span>
                  <span>업계 {company.industry}</span>
                  <span>{company.address}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="flex items-center justify-center w-8 h-8 rounded-full border"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Heart className={`h-4 w-4 ${isBookmarked ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                </button>
                <button className="flex items-center justify-center w-8 h-8 rounded-full border">
                  <Share2 className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-md">
                <div className="bg-blue-100 rounded-full p-2">
                  <Heart className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-sm">
                  <div className="font-medium">리뷰어가 뽑은</div>
                  <div className="text-blue-600 font-bold">BEST 기업문화</div>
                </div>
              </div>

              <button className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-md">
                <Image src="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/generic-app-icon.png" alt="회사 정보" width={36} height={36} />
                <span className="text-sm">회사에 대해 기재</span>
              </button>

              <button className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-md">
                <Image src="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/generic-app-icon.png" alt="리뷰 작성" width={36} height={36} />
                <span className="text-sm">리뷰쓰기</span>
              </button>

              <button className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-md">
                <Image src="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/generic-app-icon.png" alt="채용 정보" width={36} height={36} />
                <span className="text-sm">채용공고 보기</span>
              </button>

              <button className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-md">
                <Image src="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/generic-app-icon.png" alt="연봉 정보" width={36} height={36} />
                <span className="text-sm">평균 연봉 4000만원</span>
              </button>

              <button className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-md">
                <Image src="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/generic-app-icon.png" alt="면접 후기" width={36} height={36} />
                <span className="text-sm">면접 후 합격</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Content */}
          <div className="flex-1">
            {/* Banner */}
            <div className="bg-teal-500 text-white rounded-lg p-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 rounded-full p-3">
                  <Image src="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/diverse-group-chatting.png" alt="메시지 아이콘" width={40} height={40} />
                </div>
                <div>
                  <h2 className="text-lg font-bold">
                    현재 {company.reviewCount.toLocaleString()}명의 기업리뷰가 사람인에 등록됐어요!
                  </h2>
                  <p className="text-sm mt-1">당신 또한 회사 경험을 나눠 다른 구직자들을 도와주세요. 리뷰쓰기</p>
                </div>
              </div>
            </div>

            {/* Review Statistics */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-bold mb-4">전체 리뷰 통계</h2>

              <div className="flex gap-2 mb-4 overflow-x-auto">
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-full">전체</button>
                <button className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200">초보자용</button>
                <button className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200">경영진</button>
                <button className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200">근무 환경</button>
                <button className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200">성장 및 학습</button>
                <button className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200">자기계발</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviewStats.map((stat, index) => (
                  <div key={index} className="border-b pb-4">
                    <h3 className="text-sm font-medium mb-3 flex items-center">
                      <span className="inline-block w-5 h-5 bg-gray-200 rounded-full text-center text-xs mr-2">Q</span>
                      {stat.question}
                    </h3>
                    <div className="space-y-3">
                      {stat.answers.map((answer, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between text-xs mb-1">
                            <span>{answer.text}</span>
                            <span>{answer.percentage.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${answer.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-4">
                <button className="text-sm text-gray-500">
                  펼쳐보기 <ChevronRight className="inline h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Interview Experiences */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-bold mb-4">인사담당자가 직접 답변했어요!</h2>
              <p className="text-sm text-gray-600 mb-4">
                2022-11-03 [현대자동차] 대리님 및 기타사원 관리/운영 업체에 등록된 인사담당자입니다.
              </p>

              <div className="space-y-6">
                {interviewExperiences.map((exp, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <h3 className="text-sm font-medium mb-3 flex items-center">
                      <span className="inline-block w-5 h-5 bg-gray-200 rounded-full text-center text-xs mr-2">
                        Q{index + 1}
                      </span>
                      {exp.question}
                    </h3>
                    <div className="space-y-3">
                      {exp.answers.map((answer, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <span className="text-sm">{answer.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-4">
                <button className="text-sm text-gray-500">
                  펼쳐보기 <ChevronRight className="inline h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full md:w-72">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">현대자동차(주)와</h3>
                <div className="text-xs text-gray-500">1 / 2</div>
              </div>
              <h4 className="text-sm mb-4">리뷰가 유사한 주변기업</h4>

              <div className="space-y-4">
                {relatedCompanies.map((company, index) => (
                  <div key={index} className="border-b pb-3 last:border-b-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{index + 1}</span>
                      <Link
                        href={`/personal/reviews/${company.id}`}
                        className="text-sm font-medium hover:text-blue-600"
                      >
                        {company.name}
                      </Link>
                    </div>
                    <div className="text-xs text-gray-500 ml-6">
                      <p>평균 연봉 {company.avgSalary}</p>
                      <p>{company.avgSalaryRange}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-2">
                <button className="p-1 bg-gray-100 rounded-full mr-1">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button className="p-1 bg-gray-100 rounded-full">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
