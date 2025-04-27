export const SalaryDisclaimer = () => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 text-sm text-gray-600">
      <ul className="space-y-2">
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <p>본 자료는 사람인 내부 자체 데이터, 기업정보공시, 국민연금공단을 통해 수집하여 추정하였습니다.</p>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <p>
            연봉 데이터는 통계 목적 등의 이유로 어느 정도 오차가 있을 수 있으며, 실제 기업의 정보와 다를 수 있으니, 실제
            기업의 연봉과 복지는 입사지원시 기업에게 직접 문의하시기 바랍니다.
          </p>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <p>연봉정보 및 채용정보 등은 나이스평가정보 등의 기업정보를 바탕으로 산정하였습니다.</p>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <p>본 자료의 저작권은 (주)사람인에게 있으며 자료의 무단 재배포 및 상업적 이용을 금합니다.</p>
        </li>
      </ul>
    </div>
  )
}