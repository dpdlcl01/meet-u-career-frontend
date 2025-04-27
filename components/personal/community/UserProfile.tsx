"use client"

import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useAuthStore } from "@/store/useAuthStore";
import { apiClient } from "@/api/apiClient";
import { Profile } from "@/types/profile";
import { MyPostsModal } from "./MyPostsModal"; // ✅ 새 모달 컴포넌트 가져오기
import { useRouter } from "next/navigation";

export const UserProfile = () => {
  const router = useRouter();
  const { userInfo } = useUserStore();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [showMyPostsModal, setShowMyPostsModal] = useState(false);

  const handleOpenMyPostsModal = () => {
    setShowMyPostsModal(true);
  };

  const handleCloseMyPostsModal = () => {
    setShowMyPostsModal(false);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userInfo?.profileId) return;
      try {
        const isLocalhost = typeof window !== "undefined" && window.location.hostname === "localhost";
        const response = await apiClient.get(`/api/personal/profile/me?profileId=${userInfo.profileId}`, {
          withCredentials: !isLocalhost,
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
          },
        });
        setProfile(response.data.data);
      } catch (error) {
        console.error("프로필 조회 실패", error);
      }
    };
    fetchProfile();
  }, [userInfo?.profileId]);

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
          <span className="text-lg">{userInfo?.name?.charAt(0) || "?"}</span>
        </div>
        <h2 className="text-lg font-medium">{userInfo?.name || "사용자"}</h2>
      </div>

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
          {profile?.skills ? (
            <ul className="list-disc list-inside text-gray-700">
              {profile.skills.split(",").map((skill, idx) => (
                <li key={idx}>{skill.trim()}</li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-700">-</span>
          )}
        </div>
      </div>

      <div className="border-t p-4 space-y-2">
        <button
          className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 text-sm hover:bg-gray-50"
          onClick={handleOpenMyPostsModal}
        >
          <MessageSquare className="h-4 w-4" />
          <span>내가 쓴 글/댓글 조회</span>
        </button>
      </div>

      {/* 내가 쓴 글/댓글 모달 */}
      {showMyPostsModal && (
        <MyPostsModal onClose={handleCloseMyPostsModal} />
      )}
    </div>
  );
};
