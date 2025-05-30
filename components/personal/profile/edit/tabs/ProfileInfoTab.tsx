"use client"

import { useEffect, useState } from "react"
import { apiClient } from "@/api/apiClient"
import { Camera, User } from "lucide-react"
import Image from "next/image"
import { useUserStore } from "@/store/useUserStore"

interface ProfileInfo {
  accountId: number
  name: string
  email: string
  phone: string
  experienceLevel: number
  educationLevel: number
  skills: string
  desiredSalaryCode: number
  profileImageUrl: string
}

export const ProfileInfoTab = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [form, setForm] = useState<ProfileInfo | null>(null)
  const { userInfo } = useUserStore()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get<{ data: ProfileInfo }>("/api/personal/profile/me")
        setForm(res.data.data)
        setProfileImage(`/${res.data.data.profileImageUrl}`)
      } catch (error) {
        console.error("프로필 정보를 불러오는 데 실패했습니다:", error)
      }
    }
    fetchData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    if (!form) return
    setForm({ ...form, [id]: value })
  }

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        setProfileImage(event.target.result as string)
        if (form) setForm({ ...form, profileImageUrl: event.target.result as string })
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSave = async () => {
    if (!form) return
    try {
      await apiClient.post("/api/personal/profile/me", form)
      alert("저장 완료")
    } catch (error) {
      console.error("프로필 저장 실패", error)
      alert("저장 중 오류가 발생했습니다.")
    }
  }

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">프로필 이미지</h2>
      <div className="mb-8 flex flex-col items-center">
        <div className="w-28 h-28 rounded-full bg-gray-100 relative mb-2 flex items-center justify-center overflow-hidden">
          {profileImage ? (
            <Image src={profileImage} alt="Profile" fill className="object-cover" />
          ) : (
            <User className="h-16 w-16 text-gray-300" />
          )}
          <label
            htmlFor="profile-upload"
            className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer"
          >
            <Camera className="h-4 w-4 text-white" />
            <input
              id="profile-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleImageUpload(e.target.files[0])
                }
              }}
            />
          </label>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">이름</label>
            <input
              type="text"
              id="name"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={form?.name || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
            <input
              type="email"
              id="email"
              disabled
              className="w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-100"
              value={form?.email || ""}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">전화번호</label>
            <input
              type="text"
              id="phone"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={form?.phone || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-2">경력</label>
            <select
              id="experienceLevel"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={form?.experienceLevel ?? ""}
              onChange={handleChange}
            >
              <option value="">선택</option>
              <option value={0}>신입</option>
              <option value={1}>1~2년</option>
              <option value={2}>3~5년</option>
              <option value={3}>6년 이상</option>
            </select>
          </div>

          <div>
            <label htmlFor="educationLevel" className="block text-sm font-medium text-gray-700 mb-2">학력</label>
            <select
              id="educationLevel"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={form?.educationLevel ?? ""}
              onChange={handleChange}
            >
              <option value="">선택</option>
              <option value={0}>고등학교 졸업</option>
              <option value={1}>전문학사</option>
              <option value={2}>학사</option>
              <option value={3}>석사 이상</option>
            </select>
          </div>

          <div>
            <label htmlFor="desiredSalaryCode" className="block text-sm font-medium text-gray-700 mb-2">희망 연봉</label>
            <select
              id="desiredSalaryCode"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={form?.desiredSalaryCode ?? ""}
              onChange={handleChange}
            >
              <option value="">선택</option>
              <option value={1}>2,000만원 이하</option>
              <option value={2}>2,000~3,000만원</option>
              <option value={3}>3,000~4,000만원</option>
              <option value={4}>4,000~5,000만원</option>
              <option value={5}>5,000만원 이상</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">기술 스택</label>
          <input
            type="text"
            id="skills"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            value={form?.skills || ""}
            onChange={handleChange}
            placeholder="예: Java, Spring Boot, MySQL"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  )
}
