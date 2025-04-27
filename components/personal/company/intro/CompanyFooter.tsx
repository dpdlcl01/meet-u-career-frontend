export const CompanyFooter = () => {
  return (
    <div className="mt-12 border-t pt-6">
      <div className="text-sm text-gray-500 mb-4">
        <p className="mb-2">
          본 기업정보는 신용평가사(한국기업데이터)에서 제공한 자료입니다. 본사가 운영하는 기업 기본정보는 별도 공지 없이
          변경될 수 있습니다.
        </p>
        <p>기업회원은 직접 기업정보를 관리할 수 있습니다. 실시간 업데이트가 필요한 경우 기업회원으로 가입하세요.</p>
      </div>

      <div className="flex justify-between items-center">
        <button className="inline-flex items-center text-sm text-gray-600 border px-4 py-2 rounded-md hover:bg-gray-50">
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11 5H6C4.89543 5 4 5.89543 4 7V18C4 19.1046 4.89543 20 6 20H17C18.1046 20 19 19.1046 19 18V13M17.5858 3.58579C18.3668 2.80474 19.6332 2.80474 20.4142 3.58579C21.1953 4.36683 21.1953 5.63316 20.4142 6.41421L11.8284 15H9L9 12.1716L17.5858 3.58579Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          기업정보 수정 요청하기
        </button>

        <div className="text-xs text-gray-400">2023-03-24 업데이트 되었습니다</div>
      </div>
    </div>
  )
}