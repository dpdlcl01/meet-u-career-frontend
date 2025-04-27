"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Post } from "./Post";
import { PostFilters } from "./PostFilters";
import { CreatePostInput } from "./CreatePostInput";
import { CreatePostModal } from "./CreatePostModal"; // ✅ 모달 직접 가져옴
import { useUserStore } from "@/store/useUserStore"; // ✅ 추가: user 정보 가져오기

interface PostFeedProps {
  selectedHashtags: string[];
  onOpenFilterModal: () => void;
  onOpenCreatePostModal: () => void;
}

const TAG_ID_TO_NAME: Record<number, string> = {
  1: "이직",
  2: "연봉",
  3: "면접",
  4: "취업",
  5: "자기소개서",
  6: "커리어",
  7: "자격증",
};

interface PostData {
  id: number;
  accountId: number;
  content: string;
  postImageUrl: string;
  postImageKey?: string | null;
  likeCount: number;
  commentCount: number;
  tagId: number;
  profileImageUrl: string | null;
  createdAt: string;
  isLiked?: boolean;
}

export const PostFeed = ({ selectedHashtags, onOpenFilterModal }: PostFeedProps) => {
  const { userInfo } = useUserStore();
  const profileImageUrl = userInfo?.profileImage || "/images/etc/profile.png";
  const userName = userInfo?.name ?? "";

  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false); // ✅ 모달 상태 관리

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = sessionStorage.getItem('accessToken');
        if (!token) {
          console.error("AccessToken 없음! API 요청 중단");
          return;
        }
        const res = await axios.get("/api/personal/community/posts/all-posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const posts = res.data.data.posts;
        setPosts(posts);
      } catch (e) {
        console.error("게시글을 불러오지 못했습니다.", e);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleSelectHashtag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([tag]);
    }
  };

  const handleSelectAll = () => {
    setSelectedTags([]);
  };

  if (loading) return <div>로딩중...</div>;

  return (
    <div className="space-y-4">
      <PostFilters
        selectedHashtags={selectedTags}
        onOpenFilterModal={onOpenFilterModal}
        onSelectHashtag={handleSelectHashtag}
        onSelectAll={handleSelectAll}
      />
      
      {/* ✅ CreatePostInput은 onOpen만 받음 */}
      <CreatePostInput onOpen={() => setIsCreatePostModalOpen(true)} />

      {isCreatePostModalOpen && (
        <CreatePostModal
          onClose={() => setIsCreatePostModalOpen(false)}
          profileImageUrl={profileImageUrl}
          userName={userName}
        />
      )}

      {posts?.filter(post => {
        if (selectedTags.length === 0) return true;
        const tagName = TAG_ID_TO_NAME[post.tagId];
        const hashtag = tagName ? `#${tagName}` : "";
        return selectedTags.includes(hashtag);
      }).map(post => {
          const tagName = TAG_ID_TO_NAME[post.tagId];
          const hashtags = tagName ? [`#${tagName}`] : [];

          return (
            <Post
              key={post.id}
              post={{
                id: post.id,
                author: {
                  name: `user${post.accountId}`,
                  avatar: post.profileImageUrl || "/images/etc/profile.png",
                },
                content: post.content,
                image: post.postImageUrl,
                imageKey: post.postImageKey ?? null,
                likes: post.likeCount,
                isLiked: post.isLiked ?? false,
                comments: post.commentCount,
                tags: hashtags,
                likers: [],
                commentsList: [],
                createdAt: post.createdAt,
              }}
            />
          );
        })}
    </div>
  );
};
