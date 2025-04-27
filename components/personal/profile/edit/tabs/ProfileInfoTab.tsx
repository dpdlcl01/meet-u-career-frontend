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
  const {userInfo} = useUserStore();
  useEffect(() => {
    const fetchData = async () => {
      const res = await apiClient.get<{ data: ProfileInfo }>("/api/personal/profile/me?profileId=2")
      setForm(res.data.data)
      setProfileImage(`/${res.data.data.profileImageUrl}`)
    }
    fetchData()
  }, [])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    if (!form) return
    setForm({ ...form, [id]: value })
  }
  const handleSave = async () => {
    if (!form) return
    await apiClient.put("/api/personal/profile/me?profileId=" + form.accountId, form)
    alert("저장 완료")
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
          <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer">
            <Camera className="h-4 w-4 text-white" />
            <input
              id="profile-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const reader = new FileReader()
                  reader.onload = (event) => {
                    if (event.target?.result) {
                      setProfileImage(event.target.result as string)
                      if (form) setForm({ ...form, profileImageUrl: event.target.result as string })
                    }
                  }
                  reader.readAsDataURL(e.target.files[0])
                }
              }}
            />
          </label>
        </div>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">이름</label>
            <input type="text" id="name" className="w-full rounded-md border-gray-300" value={form?.name || ""} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
            <input type="email" id="email" className="w-full rounded-md border-gray-300" value={form?.email || ""} disabled />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
            <input type="text" id="phone" className="w-full rounded-md border-gray-300" value={form?.phone || ""} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-1">경력</label>
            <input type="number" id="experienceLevel" className="w-full rounded-md border-gray-300" value={form?.experienceLevel || 0} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="educationLevel" className="block text-sm font-medium text-gray-700 mb-1">학력</label>
            <input type="number" id="educationLevel" className="w-full rounded-md border-gray-300" value={form?.educationLevel || 0} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="desiredSalaryCode" className="block text-sm font-medium text-gray-700 mb-1">희망 연봉</label>
            <input type="number" id="desiredSalaryCode" className="w-full rounded-md border-gray-300" value={form?.desiredSalaryCode || 0} onChange={handleChange} />
          </div>
        </div>
        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">기술 스택</label>
          <input type="text" id="skills" className="w-full rounded-md border-gray-300" value={form?.skills || ""} onChange={handleChange} />
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