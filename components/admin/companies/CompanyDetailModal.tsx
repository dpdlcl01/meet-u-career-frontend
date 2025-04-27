"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import { approveCompany, rejectCompany, blockCompany } from "@/lib/companyAdmin"
import type { CompanyDetail } from "@/types/admin/CompanyDetail"

interface CompanyDetailModalProps {
  company: CompanyDetail | null
  onClose: () => void
  onChange?: (newStatus: string) => void
}

export default function CompanyDetailModal({ company, onClose, onChange }: CompanyDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousedown", handleClickOutside)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "auto"
    }
  }, [onClose])

  if (!company) return null

  const handleAction = async (action: () => Promise<any>, newStatusName: string) => {
    await action()
    if (onChange) onChange(newStatusName)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 id="modal-title" className="text-xl font-bold text-gray-900">기업 상세 정보</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">기본 정보</h3>
              <div className="space-y-3">
                <Info label="기업명" value={company.name} />
                <Info label="사업자등록번호" value={company.businessNumber} />              
                <Info label="업종" value={company.industry} />
                <Info label="기업 규모" value={company.numEmployees} />
                <Info label="설립연도" value={company.createdAt} />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">연락처 정보</h3>
              <div className="space-y-3">
                <Info label="주소" value={company.address} />
                <Info label="웹사이트" value={company.website} />                         
                <div>
                  <p className="text-sm text-gray-500">승인 상태</p>
                  <p
                    className={`text-sm font-medium ${
                      company.statusName === "활성"
                        ? "text-green-600"
                        : company.statusName === "대기"
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {company.statusName}
                  </p>
                </div>
              </div>
            </div>
          </div>


          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">채용 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoBox label="채용공고" value={`${company.jobPostingCount ?? 0}개`} />
              <InfoBox label="채용관리자" value={`${company.managerCount ?? 0}명`} />
            </div>
          </div>

          <div className="mt-8 flex gap-3 justify-start">
            {company.statusName === "활성" && (
              <button
                onClick={() => handleAction(() => rejectCompany(company.id), "비활성")}
                className="px-4 py-2 bg-red-50 text-red-600 border border-red-500 rounded-md hover:bg-red-100"
              >
                비활성
              </button>
            )}

            {company.statusName === "비활성" && (
              <button
                onClick={() => handleAction(() => approveCompany(company.id), "활성")}
                className="px-4 py-2 bg-green-50 text-green-600 border border-green-500 rounded-md hover:bg-green-100"
              >
                활성
              </button>
            )}

            {company.statusName === "대기" && (
              <>
                <button
                  onClick={() => handleAction(() => approveCompany(company.id), "활성")}
                  className="px-4 py-2 bg-green-50 text-green-600 border border-green-500 rounded-md hover:bg-green-100"
                >
                  활성
                </button>
                <button
                  onClick={() => handleAction(() => rejectCompany(company.id), "비활성")}
                  className="px-4 py-2 bg-red-50 text-red-600 border border-red-500 rounded-md hover:bg-red-100"
                >
                  비활성
                </button>
              </>
            )}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Info({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  )
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-xl font-bold text-blue-600">{value}</p>
    </div>
  )
}
