"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"

interface JobDetailModalProps {
  job: any
  onClose: () => void
}

export default function JobDetailModal({ job, onClose }: JobDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

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

    // Prevent scrolling of the body when modal is open
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "auto"
    }
  }, [onClose])

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
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500" aria-label="닫기">
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
                  <p className="font-medium">{job.company}</p>
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
                  <p className="font-medium">{job.views.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">지원자수</p>
                  <p className="font-medium">{job.applications}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">승인 상태</p>
                  <p className="font-medium">{job.status}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">공고 내용</h3>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-700">
                이 공고는 {job.company}에서 {job.title} 포지션을 채용하기 위해 등록되었습니다. 지원자는 관련 경험과
                기술을 갖추고 있어야 합니다. 자세한 내용은 공고를 참조하세요.
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            {job.status === "대기 중" && (
              <>
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium">
                  승인하기
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-medium">
                  거부하기
                </button>
              </>
            )}
            {job.status === "승인됨" && (
              <button className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 text-sm font-medium">
                차단하기
              </button>
            )}
            {job.status === "거부됨" && (
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium">
                승인하기
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm font-medium"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}