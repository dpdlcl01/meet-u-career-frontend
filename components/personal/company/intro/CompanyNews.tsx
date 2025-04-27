export const CompanyNews = () => {
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">이 기업의 주요 뉴스 확인하기</h2>
        <span className="text-xs text-gray-500">출처: 언론보도</span>
      </div>

      <div className="space-y-6">
        <div className="border-b pb-4">
          <h3 className="font-medium mb-2 hover:text-blue-500 cursor-pointer">
            현대차, 현대차 아산공장 노사합의로 1950억원 설비 기술 투입
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            현대 자동차는 현대자동차가 아산공장에 약 1950억 원의 설비와 기술 투자하며 투자에 사회적책임에 소홀한 현대
            기아차는 20.9조 원을...
          </p>
          <div className="flex justify-between text-xs text-gray-500">
            <span>2023-03-16</span>
            <span>매일경제</span>
          </div>
        </div>

        <div className="border-b pb-4">
          <h3 className="font-medium mb-2 hover:text-blue-500 cursor-pointer">
            현대차 "올해마다 출범 행사 강화한다"는 노동계... 현대차 자동차...
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            현대차는 올 들어서도 3.1일 노동계 현대자동차가 노동조합에 의하면 19개 지회가 상황별 대응하고 있다고
            사측이라고 밝혀 4.1일 현대차...
          </p>
          <div className="flex justify-between text-xs text-gray-500">
            <span>2023-03-13</span>
            <span>매일경제</span>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500 mt-6">
        <p>
          * 뉴스기사는 외부에 제공되는 자료로써 자료의 정확성에 대해서는 책임을 지지 않으며 본 자료는 투자 참고자료로
          활용하시기 바랍니다.
        </p>
      </div>
    </div>
  )
}