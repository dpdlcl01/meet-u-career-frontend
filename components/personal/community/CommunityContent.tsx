"use client"

import { useState } from "react"
import { UserProfile } from "./UserProfile"
import { PostFeed } from "./PostFeed"
import { NewsSidebar } from "./NewsSidebar"
import { HashtagFilterModal } from "./HashtagFilterModal"
import { CreatePostModal } from "./CreatePostModal"
import { PopularPosts } from "./PopularPosts"

export const CommunityContent = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false)
  // 상단 태그 목록: 대표 태그만 #포함해서 노출
  const TAG_NAMES = ["면접", "이직", "연봉", "취업", "자기소개서", "커리어", "자격증"];
  const hashtagList = TAG_NAMES.map((name) => `#${name}`);
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([...hashtagList])

  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true)
  }

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false)
  }

  const handleOpenCreatePostModal = () => {
    setIsCreatePostModalOpen(true)
  }

  const handleCloseCreatePostModal = () => {
    setIsCreatePostModalOpen(false)
  }

  const handleUpdateHashtags = (hashtags: string[]) => {
    setSelectedHashtags(hashtags)
    setIsFilterModalOpen(false)
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64">
          <UserProfile />
        </div>
        <div className="flex-1">
          <PostFeed
            selectedHashtags={selectedHashtags}
            onOpenFilterModal={handleOpenFilterModal}
            onOpenCreatePostModal={handleOpenCreatePostModal}
          />
        </div>
        <div className="w-full md:w-64 flex flex-col gap-6">
          <NewsSidebar selectedTags={selectedHashtags} />
          <PopularPosts /> {/* 뉴스 사이드바 바로 아래에 인기글 컴포넌트 추가 */}
        </div>
      </div>

      {isFilterModalOpen && (
        <HashtagFilterModal
          onClose={handleCloseFilterModal}
          selectedHashtags={selectedHashtags}
          onUpdateHashtags={handleUpdateHashtags}
        />
      )}

      {isCreatePostModalOpen && (
        <CreatePostModal
          onClose={handleCloseCreatePostModal}
          profileImageUrl="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/profile.png" // 기본 프로필 이미지
          userName="User1"               // 기본 사용자 이름
        />
      )}
    </div>
  )
}