"use client";

import { apiClient } from "@/api/apiClient";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Post } from "@/components/personal/community/Post";

export default function PostDetailPage() {
  const params = useParams();
  const postId = params?.postId as string;

  const router = useRouter();
  const [postData, setPostData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = useAuthStore.getState().accessToken;

        if (!token) {
          alert("로그인이 필요합니다.");
          router.push("/login"); // 토큰 없으면 로그인 페이지로 이동
          return;
        }

        const isLocalhost = typeof window !== "undefined" && window.location.hostname === "localhost";
        const response = await apiClient.get(`/api/personal/community/posts/detail/${postId}`, {
          withCredentials: !isLocalhost,
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
          },
        });
        console.log("받은 상세 데이터:", response.data.data);
        setPostData(mapPostData(response.data.data)); // Post 컴포넌트용 변환
      } catch (err) {
        console.error("게시글 불러오기 실패", err);
        setError("게시글을 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  if (loading) return <div className="p-6 text-center text-gray-500">로딩 중...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!postData) return <div className="p-6 text-center text-gray-500">게시글이 존재하지 않습니다.</div>;

  return (
    <div className="flex justify-center py-10 px-4 bg-gray-50 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <Post post={postData} />
      </div>
    </div>
  );
}

/**
 * 서버에서 받은 게시글 상세 데이터(CommunityPostDTO 형태)를
 * Post 컴포넌트가 기대하는 형태로 변환하는 매핑 함수
 */
function mapPostData(data: any) {
  return {
    id: data.id,
    author: {
      name: `user${data.accountId}`, // accountId로 임시 표시 (추후 닉네임 연동 가능)
      avatar: data.profileImageUrl || "https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/profile.png",
    },
    content: data.content,
    image: data.postImageUrl || null,
    imageKey: data.postImageKey || null,
    likes: data.likeCount,
    isLiked: false,
    comments: data.commentCount,
    tags: [`#${mapTagIdToName(data.tagId)}`],
    likers: [],
    commentsList: [],
    createdAt: data.createdAt,
  };
}

/**
 * 태그 ID → 이름 매핑
 */
function mapTagIdToName(tagId: number) {
  const TAG_ID_TO_NAME: Record<number, string> = {
    1: "이직",
    2: "연봉",
    3: "면접",
    4: "취업",
    5: "자기소개서",
    6: "커리어",
    7: "자격증",
  };
  return TAG_ID_TO_NAME[tagId] || "기타";
}
