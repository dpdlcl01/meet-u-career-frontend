"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ✅ Post 타입 정의
interface Post {
  id: number;
  title: string;
  hashtags: string[];
  likeCount: number;
  commentCount: number;
  author: string;
  date: string;
}

interface PopularPostsResponse {
  data: Post[];
}

export const PopularPosts = () => {
  const [popularPosts, setPopularPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const fallbackPosts: Post[] = [
    {
      id: 1,
      title: "면접 팁 공유합니다",
      hashtags: ["#면접", "#취업"],
      likeCount: 125,
      commentCount: 42,
      author: "취업마스터",
      date: "2025-04-25"
    },
    {
      id: 2,
      title: "이직 성공 후기와 조언",
      hashtags: ["#이직", "#커리어"],
      likeCount: 98,
      commentCount: 31,
      author: "경력자123",
      date: "2025-04-24"
    },
    {
      id: 3,
      title: "자기소개서 작성법 A to Z",
      hashtags: ["#자기소개서", "#취업"],
      likeCount: 87,
      commentCount: 23,
      author: "취업준비생",
      date: "2025-04-23"
    }
  ];

  // ✅ 공통 fetch 함수
  const fetchPosts = async (tagId?: string) => {
    try {
      setIsLoading(true);
      const url = tagId
        ? `/api/community/popular/posts/by-tag/${tagId}?limit=5` // ✨ 수정됨
        : `/api/community/popular/posts/all`;

      const token = typeof window !== "undefined" ? sessionStorage.getItem("accessToken") : null;
      const response = await fetch(url, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (!response.ok) {
        throw new Error("서버 응답 오류");
      }

      const data = (await response.json()) as PopularPostsResponse;
      setPopularPosts(data.data); // 정상 파싱
      setError("");
    } catch (err) {
      console.error("인기글 로딩 실패:", err);
      setPopularPosts(fallbackPosts);
      setError("인기글을 불러오는데 문제가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(selectedTag || undefined);
  }, [selectedTag]);

  // ✅ 해시태그 클릭 핸들러
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag); // 선택된 태그 변경 → useEffect가 재호출
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-bold mb-3 text-gray-800">인기 게시글</h2>

      {isLoading ? (
        <div className="py-4 text-center text-gray-500">
          인기글을 불러오는 중...
        </div>
      ) : (
        <div>
          {error && <p className="text-sm text-gray-500 mb-2">{error}</p>}
          <div className="space-y-3">
            {popularPosts.map((post) => (
              <div key={post.id} className="p-3 border-b last:border-b-0">
                <Link href={`/personal/community/${post.id}`}>
                  <h3 className="font-medium text-gray-800 hover:text-blue-600 cursor-pointer">
                    {post.title}
                  </h3>
                </Link>

                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>{post.author}</span>
                  <div className="flex space-x-2">
                    <span>좋아요 {post.likeCount ?? 0}</span>
                    <span>댓글 {post.commentCount ?? 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
