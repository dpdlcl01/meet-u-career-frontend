"use client"

import { useState, useRef, type ChangeEvent } from "react"
import { Upload, X, Check, ChevronRight, Eye, EyeOff } from "lucide-react"
import { apiClient } from "@/api/apiClient"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

// window 타입 확장 (다음 주소 API)
declare global {
  interface Window {
    daum: any;
  }
}



// Zod 스키마 정의
const businessRegisterSchema = z.object({
  businessNumber: z
    .string()
    .min(1, "사업자등록번호를 입력해주세요")
    .regex(/^[0-9]{3}-[0-9]{2}-[0-9]{5}$/, "올바른 형식: 123-45-67890"),
  companyName: z.string().min(1, "기업명을 입력해주세요"),
  representativeName: z.string().min(1, "대표자명을 입력해주세요"),
  companyAddress: z.string().min(1, "회사 주소를 입력해주세요"),
  detailAddress: z.string().optional(),
  businessFileKey: z.string().optional(),
  businessFileName: z.string().optional(),
  foundingDate: z
    .string()
    .min(8, "설립일을 입력해주세요")
    .regex(/^\d{8}$/, "YYYYMMDD 형식으로 입력해주세요"),
  companyType: z.enum(["일반", "벤처기업", "공공기관/비영리법인"]),
  loginId: z
    .string()
    .min(4, "4~20자의 영문, 숫자, 특수문자 '_'사용가능")
    .max(20, "4~20자의 영문, 숫자, 특수문자 '_'사용가능")
    .regex(/^[a-zA-Z0-9_]+$/, "올바른 아이디 형식이 아닙니다"),
  password: z
    .string()
    .min(8, "8~16자리/영문 대소문자, 숫자, 특수문자 조합")
    .max(16, "8~16자리/영문 대소문자, 숫자, 특수문자 조합")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
      "비밀번호 형식이 올바르지 않습니다"
    ),
  confirmPassword: z.string(),
  email: z.string().email("올바른 이메일 주소를 입력해주세요."),
  website: z.string().optional(),
  industry: z.string().min(1, "업종은 필수 입력입니다."),
  allConsent: z.boolean(),
  serviceConsent: z.boolean(),
  privacyConsent: z.boolean(),
  marketingEmailConsent: z.boolean(),
  marketingSmsConsent: z.boolean(),
  thirdPartyConsent: z.boolean(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["confirmPassword"],
});

export type BusinessRegisterFormData = z.infer<typeof businessRegisterSchema>;
export const BusinessRegistrationForm = () => {

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [companyAddress, setCompanyAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginIdMsg, setUserIdMsg] = useState<string | null>(null);
  const [emailCheckMsg, setEmailCheckMsg] = useState<string | null>(null);
  const [laterVerification, setLaterVerification] = useState(false);
  
  // 이메일 인증 관련 상태
  const [emailCertificationRequested, setEmailCertificationRequested] = useState(false);
  const [certificationCode, setCertificationCode] = useState("");
  const [certificationVerified, setCertificationVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // 폼 설정
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<BusinessRegisterFormData>({
    resolver: zodResolver(businessRegisterSchema),
    mode: "onChange",
    defaultValues: {
      companyType: "일반",
      allConsent: false,
      serviceConsent: false,
      privacyConsent: false,
      marketingEmailConsent: false,
      marketingSmsConsent: false,
      thirdPartyConsent: false,
    },
  });

  // 주소 검색 처리
  const handleAddressSearch = () => {
    if (typeof window === "undefined" || !window.daum || !window.daum.Postcode) {
      alert("주소 검색 기능이 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.");
      return;
    }
  
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        const addr = data.roadAddress || data.jibunAddress;
        if (addr) {
          setValue("companyAddress", addr); 
          setCompanyAddress(addr);
          trigger("companyAddress");
        }
      },
    }).open();
  };

  // 체크박스 전체 동의 처리
  const allConsent = watch("allConsent")
  const businessNumber = watch("businessNumber")

  // 파일업로드 처리
  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await apiClient.post<{ data: string }>("/api/account/business/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setValue("businessFileKey", res.data.data);
      setValue("businessFileName", file.name);
      setIsUploading(false);
    } catch (e) {
      alert("파일 업로드 실패");
      setFileUploaded(false);
      setFileName("");
      setIsUploading(false);
    }
  };
  
  // 파일 선택 처리
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split(".").pop()?.toLowerCase();
    const allowed = ["jpg", "jpeg", "png", "pdf", "tiff"];
    if (!allowed.includes(ext || "")) {
      alert("JPG, PNG, PDF, TIFF 파일만 업로드 가능합니다.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setFileUploaded(true);
    setFileName(file.name);
    handleFileUpload(file);
  };
  
  // 사업자등록번호 입력 형식 처리
  const handleBusinessNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 숫자만 추출
    let value = e.target.value.replace(/[^0-9]/g, '');
    
    // 10자리를 넘어가면 잘라내기
    if (value.length > 10) {
      value = value.substring(0, 10);
    }
    
    // 하이픈 추가 형식 적용 (3-2-5)
    let formattedValue = value;
    if (value.length > 5) {
      formattedValue = `${value.substring(0, 3)}-${value.substring(3, 5)}-${value.substring(5)}`;
    } else if (value.length > 3) {
      formattedValue = `${value.substring(0, 3)}-${value.substring(3)}`;
    }
    
    setValue("businessNumber", formattedValue);
    trigger("businessNumber");
  };

  // 전체 동의 체크박스 처리
  const handleAllConsentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setValue("allConsent", checked)
    setValue("serviceConsent", checked)
    setValue("privacyConsent", checked)
    setValue("marketingEmailConsent", checked)
    setValue("marketingSmsConsent", checked)
    setValue("thirdPartyConsent", checked)
  }

  // 파일 제거 처리
  const handleRemoveFile = () => {
    setFileUploaded(false)
    setFileName("")
    setValue("businessFileKey", undefined)
    setValue("businessFileName", undefined)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // 이메일 중복 확인
  const handleEmailCheck = async () => {
    const email = watch("email");
    
    if (!email) return alert("이메일을 입력해주세요.");
    
    try {
      const res = await apiClient.post("/api/account/business/check/email", { email });
      const isAvailable = !res.data.data;
      setEmailCheckMsg(isAvailable ? "사용 가능한 이메일입니다." : "이미 등록된 이메일입니다.");
    } catch (err) {
      console.error("이메일 중복 확인 오류", err);
      setEmailCheckMsg("확인 중 오류가 발생했습니다.");
    }
  };

  // 이메일 인증코드 요청
  const handleEmailCertification = async () => {
  const email = watch("email");
  const companyName = watch("companyName"); // 추가

  if (!email || !companyName) { // 추가
    alert("이메일과 회사명을 입력해주세요.");
    return;
  }

  try {
    const res = await apiClient.post("/api/account/business/certification", {
      name: companyName, // 수정
      email: email,
    });
    if (res.data.count === 1) {
      setEmailCertificationRequested(true);
      setTimeLeft(300);
      alert("인증코드가 이메일로 발송되었습니다.");
    } else {
      alert(res.data.msg || "이메일 인증 요청 실패");
    }
  } catch {
    alert("이메일 인증 요청 실패");
  }
};


  // 인증코드 확인
  const handleVerifyCertification = async () => {
    const email = watch("email");
    if (!email) return;
    try {
      const res = await apiClient.post("/api/account/business/certification/verify", {
        email,
        code: certificationCode,
      });
      if (res.data.count === 1) {
        setCertificationVerified(true);
        setEmailCertificationRequested(false);
        alert("이메일 인증 완료!");
      } else {
        alert(res.data.msg || "인증 실패");
      }
    } catch {
      alert("이메일 인증 실패");
    }
  };

  // 다음에 인증 체크박스 처리
  const handleLaterVerificationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLaterVerification(e.target.checked);
  };

  // 폼 제출 처리
  const onSubmit = async (data: BusinessRegisterFormData) => {
    // 필수 약관 확인
    if (!data.serviceConsent || !data.privacyConsent) {
      alert("필수 약관에 모두 동의해야 가입할 수 있습니다.");
      return;
    }

    // 파일 업로드 검증 (다음에 인증하지 않을 경우)
    if (!laterVerification && !data.businessFileKey) {
      alert("사업자등록증명원을 업로드하거나 '다음에 인증할게요'를 선택해주세요.");
      return;


    }

    const payload = {
      ...data,
      foundingDate: `${data.foundingDate.slice(0, 4)}-${data.foundingDate.slice(4, 6)}-${data.foundingDate.slice(6, 8)}`,
      website: data.website || "",
    };
    
 
    
    try {
      const response = await apiClient.post("/api/account/business/signup", {
        ...data,
        foundingDate: `${data.foundingDate.slice(0, 4)}-${data.foundingDate.slice(4, 6)}-${data.foundingDate.slice(6, 8)}`,
        website: data.website || "",
      });
  
      if (response.data.success && response.data.count === 1) {
        alert("기업회원 가입이 완료되었습니다!");
        router.push("/login"); // 로그인 페이지로 이동
      } else {
        alert(response.data.msg || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 오류", error);
      alert("서버 오류가 발생했습니다.");
    }
  };
  
  // 팁 섹션 컴포넌트 (중복 제거용)
  const TipSection = () => (
    <div className="border rounded-md p-6">
      <div className="flex items-start mb-4">
        <span className="text-yellow-400 text-xl mr-2">★</span>
        <h3 className="text-base font-medium">TIP.</h3>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium mb-2">1. 사업자등록증명원이 뭐예요?</h4>
          <div className="bg-gray-100 p-3 rounded-md">
            <p className="text-xs text-gray-700 mb-1">
              사업자등록증과 달리 <span className="font-medium">국세 정직을 통해</span>
            </p>
            <p className="text-xs text-gray-700">
              <span className="font-medium">발급 받을 수 있는 서류</span>가 기재되어 있어요!
            </p>
          </div>
          <button
            type="button"
            className="w-full mt-2 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
            onClick={() =>
              window.open(
                "https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=12100000016",
                "_blank"
              )
            }
          >
            사업자등록증명원 발급
          </button>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">2. 기업인증은 왜 하나요?</h4>
          <div className="bg-gray-100 p-3 rounded-md">
            <p className="text-xs text-gray-700 mb-1">
              안전한 채용공고를 위해 <span className="font-medium">기업 서비스 이용 전</span>
            </p>
            <p className="text-xs text-gray-700">
              <span className="font-medium">기업인증이 필요</span>합니다.
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">3. 제출 서류</h4>
          <div className="bg-gray-100 p-3 rounded-md">
            <p className="text-xs text-gray-700 mb-1">
              <span className="font-medium">📄 일반 기업, 개인, 병원의 경우</span>
            </p>
            <p className="text-xs text-gray-700">
              사업자등록증명원 <span className="text-gray-500">(발급 3개월 이내)</span>
            </p>
          </div>
          <div className="bg-gray-100 p-3 rounded-md mt-2">
            <p className="text-xs text-gray-700 mb-1">
              <span className="font-medium">🏢 벤처기업 · 학교</span>
            </p>
            <p className="text-xs text-gray-700">
              사업자등록증명원 + <span className="text-gray-500">벤처기업확인서 or 학교인증서</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-8">
      <h1 className="text-center text-xl font-medium mb-8">Meet U 통합 기업회원 가입</h1>

      {/* 메인 컨테이너 (반응형 레이아웃) */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 팁 섹션 - 데스크탑에서는 왼쪽, 모바일에서는 숨김 */}
        <div className="hidden lg:block lg:w-1/3">
          <TipSection />
        </div>

        {/* 폼 섹션 - 데스크탑에서는 오른쪽, 모바일에서는 전체 너비 */}
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 사업자등록번호 */}
            <div>
              <label htmlFor="businessNumber" className="block text-sm font-medium text-gray-700 mb-1">
                사업자등록번호
              </label>
              <input
                type="text"
                id="businessNumber"
                placeholder="사업자 등록번호 직접 입력 (10자리)"
                className={`w-full px-3 py-2.5 border ${
                  errors.businessNumber ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                onChange={handleBusinessNumberChange}
                maxLength={12}
              />
              {errors.businessNumber && <p className="text-red-500 text-xs mt-1">{errors.businessNumber.message}</p>}
              <p className="text-xs text-blue-600 mt-1">
                사업자등록증을 확인하여, 기업인증에 사업자등록증명원을 첨부해 주세요.
              </p>
            </div>

            {/* 기업 인증 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">기업 인증</label>
              <div className="border border-blue-100 rounded-md p-4 bg-blue-50">
                <p className="text-sm text-center mb-4">사업자등록증명원을 첨부해주세요</p>

                <div className="flex justify-center gap-8 mb-4">
                  <div className="text-center">
                    <div className="w-24 h-32 bg-white border rounded-md flex items-center justify-center mb-2">
                      <div className="w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center">
                        <Check className="h-8 w-8 text-blue-500" />
                      </div>
                    </div>
                    <p className="text-xs">사업자등록증명원</p>
                  </div>

                  <div className="text-center">
                    <div className="w-24 h-32 bg-white border rounded-md flex items-center justify-center mb-2">
                      <div className="w-16 h-16 rounded-full border-4 border-gray-300 flex items-center justify-center">
                        <X className="h-8 w-8 text-gray-300" />
                      </div>
                    </div>
                    <p className="text-xs">사업자등록증</p>
                  </div>
                </div>

                {fileUploaded ? (
                  <div className="flex items-center justify-between bg-white border rounded-md p-2 mb-4">
                    <span className="text-sm truncate max-w-[80%]">{fileName}</span>
                    <button type="button" onClick={handleRemoveFile} className="text-red-500 hover:text-red-700">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : null}

                <div className="flex justify-center">
                  <input
                    type="file"
                    id="businessCertificate"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf,.tiff"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-blue-600 text-white rounded-md py-2.5 hover:bg-blue-700 transition-colors flex items-center justify-center"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        파일 선택
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="laterVerification"
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    checked={laterVerification}
                    onChange={handleLaterVerificationChange}
                  />
                  <label htmlFor="laterVerification" className="ml-2 text-xs text-gray-600">
                    다음에 인증할게요
                  </label>
                </div>
              </div>
            </div>

            {/* 모바일용 팁 섹션 */}
            <div className="block lg:hidden">
              <TipSection />
            </div>

            {/* 기업명 */}
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                기업명
              </label>
              <input
                type="text"
                id="companyName"
                placeholder="기업명 입력 (사업자등록증명원 기재명)"
                className={`w-full px-3 py-2.5 border ${
                  errors.companyName ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                {...register("companyName")}
              />
              {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>}
            </div>

            {/* 대표자 */}
            <div>
              <label htmlFor="representativeName" className="block text-sm font-medium text-gray-700 mb-1">
                대표자
              </label>
              <input
                type="text"
                id="representativeName"
                placeholder="(주) 회사명 외 1명 (사업자등록증명원 대표자명)"
                className={`w-full px-3 py-2.5 border ${
                  errors.representativeName ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                {...register("representativeName")}
              />
              {errors.representativeName && (
                <p className="text-red-500 text-xs mt-1">{errors.representativeName.message}</p>
              )}
            </div>

            {/* 회사 주소 */}
            <div>
              <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700 mb-1">
                회사 주소
              </label>
              <div className="flex mb-2">
                <input
                  type="text"
                  id="companyAddress"
                  placeholder="주소찾기"
                  className={`flex-1 px-3 py-2.5 border ${
                    errors.companyAddress ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  readOnly
                  {...register("companyAddress")}
                />
                <button
                  type="button"
                  onClick={handleAddressSearch}
                  className="ml-2 px-4 py-2.5 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50"
                >
                  주소
                </button>
              </div>
              <input
                type="text"
                id="detailAddress"
                placeholder="상세주소"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                {...register("detailAddress")}
              />
              {errors.companyAddress && <p className="text-red-500 text-xs mt-1">{errors.companyAddress.message}</p>}
            </div>

            {/* 설립일 */}
            <div>
              <label htmlFor="foundingDate" className="block text-sm font-medium text-gray-700 mb-1">
                설립일
              </label>
              <input
                type="text"
                id="foundingDate"
                placeholder="설립일 입력 (YYYYMMDD)"
                className={`w-full px-3 py-2.5 border ${
                  errors.foundingDate ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                {...register("foundingDate")}
              />
              {errors.foundingDate && <p className="text-red-500 text-xs mt-1">{errors.foundingDate.message}</p>}
            </div>

            {/* 기업구분 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">기업구분</label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="일반"
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    {...register("companyType")}
                  />
                  <span className="ml-2 text-sm">일반</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="벤처기업"
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    {...register("companyType")}
                  />
                  <span className="ml-2 text-sm">벤처기업</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="공공기관/비영리법인"
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    {...register("companyType")}
                  />
                  <span className="ml-2 text-sm">공공기관/비영리법인</span>
                </label>
              </div>
            </div>

            {/* 업종 */}
            <div>
              <label
                htmlFor="industry"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                업종
              </label>
              <input
                type="text"
                id="industry"
                {...register("industry")}
                placeholder="예: IT, 제조업, 금융 등"
                className={`w-full px-3 py-2.5 border ${
                  errors.industry ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.industry && (
                <p className="text-red-500 text-xs mt-1">{errors.industry.message}</p>
              )}
            </div>

            {/* 아이디 */}
            <div>
              <label htmlFor="loginId" className="block text-sm font-medium text-gray-700 mb-1">
                아이디
              </label>
              <input
                type="text"
                id="loginId"
                placeholder="4~20자의 영문, 숫자, 특수문자 '_'사용가능"
                className={`w-full px-3 py-2.5 border ${
                  errors.loginId ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                {...register("loginId")}
              />
              {errors.loginId && <p className="text-red-500 text-xs mt-1">{errors.loginId.message}</p>}
              {loginIdMsg && (
                <p className={`text-xs mt-1 ${loginIdMsg.includes("사용 가능") ? "text-green-500" : "text-red-500"}`}>
                  {loginIdMsg}
                </p>
              )}
            </div>
              {/* 비밀번호 */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                비밀번호
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="8~16자리/영문 대소문자, 숫자, 특수문자 조합"
                  className={`w-full px-3 py-2.5 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {/* 비밀번호 확인 */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                비밀번호 확인
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="비밀번호 재입력"
                  className={`w-full px-3 py-2.5 border ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {/* 이메일 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                이메일
              </label>
              <div className="flex mb-2">
                <input
                  type="email"
                  id="email"
                  placeholder="이메일 입력"
                  className={`flex-1 px-3 py-2.5 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  {...register("email")}
                />
                <button
                  type="button"
                  onClick={handleEmailCertification}   // ⬅️ 바로 인증코드 발송
                  className="ml-2 px-4 py-2.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  이메일 인증
                </button>
              </div>

              {/* 에러 메세지 출력 */}
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}

              {/* 인증코드 요청 후 입력칸 표시 */}
              {emailCertificationRequested && (
                <div className="mt-2 space-y-2">
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="인증코드 입력"
                      value={certificationCode}
                      onChange={(e) => setCertificationCode(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyCertification}
                      className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      확인
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    남은 시간: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </p>
                </div>
              )}

              {/* 인증 완료 시 표시 */}
              {certificationVerified && (
                <p className="text-green-500 text-xs mt-1">인증 완료되었습니다!</p>
              )}
            </div>


            {/* 웹사이트 (선택) */}
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                웹사이트 <span className="text-gray-400 text-xs">(선택)</span>
              </label>
              <input
                type="text"
                id="website"
                placeholder="회사 웹사이트 주소"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                {...register("website")}
              />
            </div>


            {/* 약관 동의 */}
            <div className="space-y-3 border-t pt-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={allConsent}
                  onChange={handleAllConsentChange}
                  {...register("allConsent")}
                />
                <span className="ml-2 text-sm font-medium">전체 동의</span>
              </label>
              
              <div className="pl-6 space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    {...register("serviceConsent")}
                  />
                  <span className="ml-2 text-sm">
                    [필수] 서비스 이용약관 동의 
                    <button type="button" className="ml-1 text-blue-500 underline text-xs">보기</button>
                  </span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    {...register("privacyConsent")}
                  />
                  <span className="ml-2 text-sm">
                    [필수] 개인정보 수집 및 이용 동의
                    <button type="button" className="ml-1 text-blue-500 underline text-xs">보기</button>
                  </span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    {...register("marketingEmailConsent")}
                  />
                  <span className="ml-2 text-sm">
                    [선택] 마케팅 목적 이메일 수신 동의
                    <button type="button" className="ml-1 text-blue-500 underline text-xs">보기</button>
                  </span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    {...register("marketingSmsConsent")}
                  />
                  <span className="ml-2 text-sm">
                    [선택] 마케팅 목적 SMS 수신 동의
                    <button type="button" className="ml-1 text-blue-500 underline text-xs">보기</button>
                  </span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    {...register("thirdPartyConsent")}
                  />
                  <span className="ml-2 text-sm">
                    [선택] 제3자 정보제공 동의
                    <button type="button" className="ml-1 text-blue-500 underline text-xs">보기</button>
                  </span>
                </label>
              </div>
            </div>

            {/* 제출 버튼 */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "회원가입"
                )}
              </button>
            </div>            
            </form>
                    </div>
                  </div>
                </div>
              );
            };