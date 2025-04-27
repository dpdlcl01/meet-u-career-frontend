import Link from "next/link"

export const CurrentJobPostings = () => {
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">현재 채용 중인 공고</h2>
        <Link href="#" className="text-xs text-blue-500 flex items-center">
          채용공고 더보기
          <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.59 16.59L10 18L16 12L10 6L8.59 7.41L13.17 12L8.59 16.59Z" fill="#2365f2"></path>
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-md p-4">
          <div className="flex items-center mb-2">
            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">경력무관</span>
            <span className="text-xs text-gray-500 ml-2">서울 • 대규모</span>
          </div>
          <h3 className="font-medium mb-2">[현대자동차] 경력채용 테스트 스크립트 및 개발자 채용</h3>
          <div className="flex text-xs text-gray-500 mb-2">
            <span>개발직군</span>
            <span className="mx-1">•</span>
            <span>정규직</span>
            <span className="mx-1">•</span>
            <span>서울 서초구</span>
          </div>
          <div className="text-right text-xs text-gray-500">~03/28 (목)</div>
          <button className="mt-2 w-full py-1.5 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
            상세보기
          </button>
        </div>

        <div className="border rounded-md p-4">
          <div className="flex items-center mb-2">
            <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">신입</span>
            <span className="text-xs text-gray-500 ml-2">서울 • 대규모</span>
          </div>
          <h3 className="font-medium mb-2">3월 현대자동차(글로벌 서비스 수석전문 연구원)</h3>
          <div className="flex text-xs text-gray-500 mb-2">
            <span>연구직군</span>
            <span className="mx-1">•</span>
            <span>정규직</span>
            <span className="mx-1">•</span>
            <span>서울 서초구</span>
          </div>
          <div className="text-right text-xs text-gray-500">~03/28 (목)</div>
          <button className="mt-2 w-full py-1.5 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
            상세보기
          </button>
        </div>
      </div>
    </div>
  )
}