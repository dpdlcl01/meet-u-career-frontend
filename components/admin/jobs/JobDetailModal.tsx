"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"

interface JobDetailModalProps {
  job: any
  onClose: () => void
  onAction: (id: number, action: "approve" | "reject" | "block") => void
}

export default function JobDetailModal({
  job,
  onClose,
  onAction,
}: JobDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  const getStatusText = (status: string | number) => {
    const statusMap: { [key: string]: string } = {
      "0": "반려",
      "1": "승인",
      "2": "대기중",
      "3": "차단됨",
      
    }
    return statusMap[String(status)] ?? "알 수 없음"
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    document.addEventListener("mousedown", handleClickOutside)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "auto"
    }
  }, [onClose])

  const statusText = getStatusText(job.status)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h2 id="modal-title" className="text-xl font-semibold">
            공고 상세 정보
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">기본 정보</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">공고명</p>
                  <p className="font-medium">{job.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">기업명</p>
                  <p className="font-medium">{job.companyName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">등록일</p>
                  <p className="font-medium">{job.registrationDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">마감일</p>
                  <p className="font-medium">{job.deadline}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">통계</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">조회수</p>
                  <p className="font-medium">
                    {job.viewCount?.toLocaleString?.() ?? "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">지원자수</p>
                  <p className="font-medium">{job.applyCount ?? "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">승인 상태</p>
                  <p className="font-medium">{statusText}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">공고 내용</h3>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-700">
                {job.description ||
                  `${job.companyName}에서 ${job.title} 포지션을 채용 중입니다.`}
              </p>
            </div>
          </div>

                <div className="flex justify-end space-x-3">
            {String(job.status) === "2" && (
              <>
                <button
                  onClick={() => onAction(job.id, "approve")}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium"
                >
                  승인하기
                </button>
                <button
                  onClick={() => onAction(job.id, "reject")}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-medium">
                  반려하기
                </button>
              </>
            )}

            {String(job.status) === "1" && (
              <button
                onClick={() => onAction(job.id, "block")}
                className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 text-sm font-medium">
                차단하기
              </button>
            )}

            {String(job.status) === "0" && (
              <button
                onClick={() => onAction(job.id, "approve")}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium">
                승인하기
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm font-medium">
              닫기
            </button>
      </div>

        </div>
      </div>
    </div>
  )
}
