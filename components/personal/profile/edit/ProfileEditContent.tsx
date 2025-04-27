"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/api/apiClient"
import { ProfileInfoTab } from "./tabs/ProfileInfoTab"
import { PasswordChangeTab } from "./tabs/PasswordChangeTab"
import { AccountSettingsTab } from "./tabs/AccountSettingsTab"
import { AccountDeleteTab } from "./tabs/AccountDeleteTab"
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

export const ProfileEditContent = () => {
  const [activeTab, setActiveTab] = useState<string>("기본 정보")
  
  const tabs = ["기본 정보", "비밀번호 변경", "계정 설정", "회원 탈퇴"]

  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await apiClient.get<{ data: ProfileInfo }>("/api/personal/profile/me")
    }
    fetchUserInfo()
  }, [])

  const renderTabContent = () => {
    switch (activeTab) {
      case "기본 정보":
        return <ProfileInfoTab />
      case "비밀번호 변경":
        return <PasswordChangeTab />
      case "계정 설정":
        return <AccountSettingsTab />
      case "회원 탈퇴":
        return <AccountDeleteTab />
      default:
        return null
    }
  }

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-2">내 정보 관리</h1>
        <p className="text-sm text-gray-500 text-center">개인 정보와 계정 설정을 관리할 수 있습니다.</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-3 text-sm font-medium flex-1 ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6">{renderTabContent()}</div>
      </div>
    </div>
  )
}
