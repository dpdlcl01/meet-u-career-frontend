"use client";

import { apiClient } from "@/api/apiClient";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

interface MyPostsModalProps {
  onClose: () => void;
}

export const MyPostsModal = ({ onClose }: MyPostsModalProps) => {
  const { userInfo } = useUserStore();
  const { accessToken } = useAuthStore();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"posts" | "comments">("posts");
  const [myPosts, setMyPosts] = useState<any[]>([]);
  const [myComments, setMyComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!userInfo?.accountId || !accessToken) return;

      try {
        const isLocalhost = typeof window !== "undefined" && window.location.hostname === "localhost";

        if (activeTab === "posts") {
          const response = await apiClient.get(`/api/personal/community/posts/my/${userInfo.accountId}`, {
            withCredentials: !isLocalhost,
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          setMyPosts(response.data.data);
        } else if (activeTab === "comments") {
          const response = await apiClient.get(`/api/community/comments/my/${userInfo.accountId}`, {
            withCredentials: !isLocalhost,
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          setMyComments(response.data.data);
        }
      } catch (error) {
        console.error("내 글/댓글 목록 불러오기 실패", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, userInfo?.accountId, accessToken]);

  const handleTabChange = (tab: "posts" | "comments") => {
    setLoading(true);
    setActiveTab(tab);
  };

  const handleGoToPostDetail = (postId: number) => {
    onClose(); // 모달 먼저 닫고
    router.push(`/personal/community/${postId}`); // 상세페이지 이동
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>

        {/* 탭 메뉴 */}
        <div className="flex border-b mb-4">
          <button
            className={`flex-1 text-center py-2 font-semibold ${activeTab === "posts" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
            onClick={() => handleTabChange("posts")}
          >
            내가 쓴 글
          </button>
          <button
            className={`flex-1 text-center py-2 font-semibold ${activeTab === "comments" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
            onClick={() => handleTabChange("comments")}
          >
            내가 쓴 댓글
          </button>
        </div>

        {/* 컨텐츠 */}
        {loading ? (
          <p className="text-center text-gray-500">로딩 중...</p>
        ) : (
          <>
            {activeTab === "posts" ? (
              myPosts.length === 0 ? (
                <p className="text-center text-gray-500">작성한 글이 없습니다.</p>
              ) : (
                <ul className="space-y-4 max-h-96 overflow-y-auto">
                  {myPosts.map((post) => (
                    <li
                      key={post.id}
                      onClick={() => handleGoToPostDetail(post.id)}
                      className="border-b pb-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                    >
                      <p className="font-medium">{post.content}</p>
                      <p className="text-xs text-gray-500">{post.createdAt.slice(0, 10)}</p>
                    </li>
                  ))}
                </ul>
              )
            ) : (
              myComments.length === 0 ? (
                <p className="text-center text-gray-500">작성한 댓글이 없습니다.</p>
              ) : (
                <ul className="space-y-4 max-h-96 overflow-y-auto">
                  {myComments.map((comment) => (
                    <li
                      key={comment.id}
                      onClick={() => comment.postId && handleGoToPostDetail(comment.postId)}
                      className="border-b pb-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                    >
                      <p className="text-sm">{comment.content}</p>
                      <p className="text-xs text-gray-500">{comment.createdAt.slice(0, 10)}</p>
                    </li>
                  ))}
                </ul>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};
