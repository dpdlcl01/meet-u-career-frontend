export type CompanyDetail = {
    id: number                     // 기업 고유 ID
    name: string                   // 기업명
    registrationNumber: string     // 사업자 등록번호
    status: number                 // 상태 (0: 대기, 1: 활성, 2: 비활성 등)
    registrationDate: string       // 등록일 (ISO string)
    address: string                // 주소
    ceo: string                    // 대표자
    industry: string               // 업종
    size: string                   // 기업 규모
    foundedYear: string            // 설립 연도
    website: string                // 웹사이트
    phone: string                  // 전화번호
    email: string                  // 이메일
    description: string            // 기업 소개
    jobPostings: number            // 채용공고 수 (서버에서 넘겨줄 수도 있고 프론트 계산일 수도 있음)
    recruitmentManagers: number    // 채용 관리자 수 (동일)
    statusName: string             // 상태명 (ex: "대기", "활성", "비활성")
    businessNumber: number         // 사업자번호 (정수형으로 추가 저장된 경우)
    createdAt: number              // 생성일 타임스탬프 (millis 기준)
    jobPostingCount: number        // 채용공고 수 (정확한 명칭으로 보강된 필드)
    managerCount: number           // 채용 관리자 수
    numEmployees: number
    foundedDate: number
  }
  