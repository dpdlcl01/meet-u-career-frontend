"use client"

import type React from "react"
import { X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export interface AdminData {
  id?: number
  name: string
  email: string
  role?: number
  password?: string
  confirmPassword?: string
}

interface AdminModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: AdminData) => void
  initialData?: AdminData
  mode: "add" | "edit"
}

export default function AdminModal({ isOpen, onClose, onSave, initialData, mode }: AdminModalProps) {
  const [formData, setFormData] = useState<AdminData>({
    name: "",
    email: "",
    role: 2,
    password: "",
    confirmPassword: "",
  })

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (initialData && mode === "edit") {
      setFormData({
        ...initialData,
        password: "",
        confirmPassword: "",
      })
    } else {
      setFormData({
        name: "",
        email: "",
        role: 2,
        password: "",
        confirmPassword: "",
      })
    }
  }, [initialData, mode, isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "level" ? parseInt(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.")
      return
    }
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 id="modal-title" className="text-lg font-semibold">
            {mode === "add" ? "관리자 추가" : "관리자 수정"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              이름
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름을 입력하세요"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일을 입력하세요"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">                      
          </div>
          <div className="mb-4">
            <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
              관리자 레벨
            </label>
            <select
              id="level"
              name="level"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value={1}>레벨 1 (최고 관리자)</option>
              <option value={2}>레벨 2 (일반 관리자)</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
              className="w-full p-2 border rounded-md"
              required={mode === "add"}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호 확인
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호를 다시 입력하세요"
              className="w-full p-2 border rounded-md"
              required={mode === "add"}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
