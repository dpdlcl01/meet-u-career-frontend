"use client"

import { apiClient } from "@/api/apiClient";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"
import { Profile } from "@/types/profile"; 
import axios from "axios";

export const UserProfile = () => {
  const router = useRouter()
  const { userInfo } = useUserStore();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [showMyPosts, setShowMyPosts] = useState(false);

  const handleToggleMyPosts = () => {
    setShowMyPosts(prev => !prev);
  }

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userInfo?.profileId) return; // profileId 없으면 스킵
      try {
        const isLocalhost = typeof window !== "undefined" && window.location.hostname === "localhost";
        const response = await apiClient.get(`/api/personal/profile/me?profileId=${userInfo.profileId}`, {
          withCredentials: !isLocalhost,
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
          },
        });
        setProfile(response.data.data); // ✅ API 결과 저장
      } catch (error) {
        console.error("프로필 조회 실패", error);
      }
    };
    fetchProfile();
  }, [userInfo?.profileId]);

  // 학력 매핑 테이블
  const EDUCATION_LEVEL_MAP: Record<number, string> = {
    1: "고등학교 졸업",
    2: "전문학사",
    3: "학사",
    4: "석사",
    5: "박사",
  };

  return (
    <div className="bg-white border rounded-md overflow-hidden">
      <div className="flex flex-col items-center py-6">
        <div className="w-20 h-20 rounded-full bg-[#15274a] text-white flex items-center justify-center mb-2">
          {/* 이름 첫 글자 */}
          <span className="text-lg">{userInfo?.name?.charAt(0) || "?"}</span>
        </div>
        {/* 이름 전체 */}
        <h2 className="text-lg font-medium">{userInfo?.name || "사용자"}</h2>
      </div>

      {/* 프로필 정보 영역 */}
      <div className="border-t px-4 py-3 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">경력</span>
          <span>{profile?.experienceLevel ? `${profile.experienceLevel}년` : "-"}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">학력</span>
          <span>{profile?.educationLevel ? EDUCATION_LEVEL_MAP[profile.educationLevel] : "-"}</span>
        </div>
        <div className="flex flex-col text-sm">
          <span className="text-gray-500 mb-1">보유기술</span>
          {profile?.skills
            ? (
              <ul className="list-disc list-inside text-gray-700">
                {profile.skills.split(",").map((skill, idx) => (
                  <li key={idx}>{skill.trim()}</li>
                ))}
              </ul>
            )
            : <span className="text-gray-700">-</span>}
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="border-t p-4 space-y-2">
        <button
          className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 text-sm hover:bg-gray-50"
          onClick={handleToggleMyPosts} // 클릭 시 토글
        >
          <MessageSquare className="h-4 w-4" />
          <span>내가 쓴 글/댓글 조회</span>
        </button>

        {/* 글/댓글 토글 영역 */}
        {showMyPosts && (
          <div className="mt-4 text-sm text-gray-700">
            <p>내가 쓴 글, 댓글 목록이 여기에 나옵니다.</p>
            {/* 실제 글/댓글 리스트를 추가하려면 여기에 fetch 해서 리스트 렌더링 */}
          </div>
        )}
      </div>
    </div>
  )
}
