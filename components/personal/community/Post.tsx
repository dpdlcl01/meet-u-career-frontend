"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Heart, MessageSquare, Share2, MoreHorizontal } from "lucide-react"
import Image from "next/image"
import axios from "axios"
import { CreatePostModal } from "./CreatePostModal"
import { useUserStore } from "@/store/useUserStore"

//----------------------------------------
// 인터페이스 정의
//----------------------------------------
interface Author {
  name: string
  avatar: string
}

interface Comment {
  id: number
  accountId: number
  authorAvatar: string
  authorName: string
  content: string
  createdAt: string
}

interface Liker {
  id: number
  name: string
  avatar: string
}

interface PostProps {
  post: {
    id: number
    author: Author
    content: string
    image: string | null
    imageKey: string | null
    likes: number
    isLiked: boolean
    comments: number
    tags: string[]
    likers: Liker[]
    commentsList: Comment[]
    createdAt: string  // 게시글 작성 시간
  }
}

//----------------------------------------
// 시간 표시용 포맷 함수
//----------------------------------------
export const formatTimeAgo = (timestamp: string): string => {
  if (!timestamp) return "";

  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    return "";
  }

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 5) return "방금 전";
  if (diffSec < 60) return `${diffSec}초 전`;

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}분 전`;

  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}시간 전`;

  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 7) return `${diffDay}일 전`;

  // 7일 초과면 yyyy.MM.dd로 표시
  return `${date.getFullYear()}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;
};



export const Post = ({ post }: PostProps) => {
  //----------------------------------------
  // 상태 관리
  //----------------------------------------
  // 게시글 관련 상태
  const [showMenu, setShowMenu] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // 좋아요 관련 상태
  const [showLikes, setShowLikes] = useState(false)
  const [likesCount, setLikesCount] = useState(post.likes)
  const [isLiked, setIsLiked] = useState(post.isLiked)

  // 댓글 관련 상태
  const [showComments, setShowComments] = useState(false)
  const [commentsCount, setCommentsCount] = useState(post.comments)
  const [comments, setComments] = useState<Comment[]>(post.commentsList || [])
  const [commentContent, setCommentContent] = useState("")
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)
  const [editingContent, setEditingContent] = useState<string>("")

  // 사용자 정보
  const { userInfo } = useUserStore();

  //----------------------------------------
  // 외부 클릭 감지용 참조
  //----------------------------------------
  const likesRef = useRef<HTMLDivElement>(null)
  const commentsRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  //----------------------------------------
  // 이펙트
  //----------------------------------------
  // 외부 클릭 시 메뉴/좋아요/댓글 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (likesRef.current && !likesRef.current.contains(event.target as Node)) {
        setShowLikes(false)
      }
      if (commentsRef.current && !commentsRef.current.contains(event.target as Node)) {
        setShowComments(false)
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  //----------------------------------------
  // 게시글 관련 함수
  //----------------------------------------
  // 메뉴 열기/닫기
  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowMenu(!showMenu)
  }

  // 게시글 수정 버튼 클릭
  const handleEdit = () => {
    setIsEditModalOpen(true)
    setShowMenu(false)
  }

  // 게시글 삭제
  const handleDelete = async () => {
    setShowMenu(false)
    if (confirm("게시글을 삭제하시겠습니까?")) {
      try {
        const token = sessionStorage.getItem('accessToken');
        await axios.post(`/api/personal/community/posts/delete/${post.id}`,
          {
            accountId: userInfo?.accountId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        alert("게시글이 삭제되었습니다.")
        window.location.reload()
      } catch (error) {
        console.error("게시글 삭제 실패", error)
        alert("게시글 삭제에 실패했습니다.")
      }
    }
  }

  //----------------------------------------
  // 좋아요 관련 함수
  //----------------------------------------
  // 좋아요 팝업 열기/닫기
  const toggleLikes = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowLikes(!showLikes)
    if (showComments) setShowComments(false)
  }

  // 좋아요 토글
  const handleToggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      const token = sessionStorage.getItem('accessToken');
      const response = await axios.post(
        "/api/community/likes/toggle",
        {
          accountId: userInfo?.accountId,
          postId: post.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.status === 200) {
        if (!isLiked && response.data.count === 1) {
          setLikesCount((prev) => prev + 1)
          setIsLiked(true)
        } else if (isLiked && response.data.count === 0) {
          setLikesCount((prev) => Math.max(0, prev - 1))
          setIsLiked(false)
        }
      }
    } catch (error) {
      console.error("좋아요 처리 실패", error)
    }
  }
  

  //----------------------------------------
  // 댓글 관련 함수
  //----------------------------------------
  // 댓글 열기/닫기 + 열 때 서버에서 새로 가져오기
  const toggleComments = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextShowComments = !showComments;
    setShowComments(nextShowComments);
    if (nextShowComments) {
      await fetchComments(); // 댓글 목록 다시 불러오기
    }
    if (showLikes) setShowLikes(false);
  };

  // 댓글 목록 불러오기
  const fetchComments = async () => {
    try {
      const token = sessionStorage.getItem('accessToken');
      const response = await axios.get(`/api/community/comments/${post.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log("서버에서 내려준 댓글 리스트:", response.data.data);
        setComments(response.data.data); // 서버에서 댓글 리스트 받아오기
      }
    } catch (error) {
      console.error("댓글 불러오기 실패", error);
    }
  }

  // 댓글 작성
  const handleCreateComment = async () => {
    if (!commentContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
  
    try {
      const token = sessionStorage.getItem('accessToken');
      const response = await axios.post(
        "/api/community/comments/create",
        {
          accountId: userInfo?.accountId,
          postId: post.id,
          content: commentContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        alert("댓글이 등록되었습니다.");
        setCommentContent(""); 
        setCommentsCount(prev => prev + 1); 
        fetchComments(); 
      }
    } catch (error) {
      console.error("댓글 작성 실패", error);
      alert("댓글 작성 실패했습니다.");
    }
  }
  

  // 댓글 삭제
  const handleDeleteComment = async (commentId: number) => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;
  
    try {
      const token = sessionStorage.getItem('accessToken');
      await axios.post(
        `/api/community/comments/delete/${commentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("댓글이 삭제되었습니다!");
  
      // 댓글 리스트에서 삭제한 댓글 제거
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
  
      // 댓글 수 -1 감소
      setCommentsCount((prev) => Math.max(0, prev - 1));
  
    } catch (error) {
      console.error("댓글 삭제 실패", error);
      alert("댓글 삭제에 실패했습니다.");
    }
  };
  
  

  // 댓글 수정 모드로 전환
  const handleEditClick = (comment: Comment) => {
    setEditingCommentId(comment.id)
    setEditingContent(comment.content)
  }

  // 댓글 수정 저장
  const handleSaveEdit = async () => {
    if (editingCommentId === null) return;
  
    try {
      const token = sessionStorage.getItem('accessToken');
      await axios.post(
        "/api/community/comments/update",
        {
          id: editingCommentId,
          accountId: userInfo?.accountId,
          content: editingContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      alert("댓글이 수정되었습니다!");
  
      // ✅ 수정된 댓글을 바로 반영
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === editingCommentId
            ? { ...comment, content: editingContent }
            : comment
        )
      );
  
      setEditingCommentId(null);
      setEditingContent("");
  
    } catch (error) {
      console.error("댓글 수정 실패", error);
      alert("댓글 수정에 실패했습니다.");
    }
  };

  // 공유 버튼 클릭 핸들러
  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const shareUrl = `${window.location.origin}/personal/community/${post.id}`;
      await navigator.clipboard.writeText(shareUrl);
      alert("링크가 복사되었습니다!");
    } catch (error) {
      console.error("링크 복사 실패", error);
      alert("링크 복사에 실패했습니다.");
    }
  };
  

  //----------------------------------------
  // 컴포넌트 렌더링
  //----------------------------------------
  return (
    <div className="bg-white rounded-md overflow-hidden mb-4 relative">
      <div className="p-4">
        {/* 작성자 프로필 + 이름 + 작성 시간 + ⋯ 메뉴버튼 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src={post.author.avatar || "/images/etc/profile.png"}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/etc/profile.png";
              }}
              alt="작성자 프로필"
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <div>
              <h3 className="font-medium flex items-center gap-2">
                {post.author.name}
                {/* 게시글 작성 시간 표시 */}
                <span className="text-xs text-gray-400">{formatTimeAgo(post.createdAt)}</span>
              </h3>
            </div>
          </div>

          {/* ⋯ 메뉴 버튼 */}
          <div className="relative">
            <button onClick={toggleMenu}>
              <MoreHorizontal className="h-5 w-5 text-gray-500" />
            </button>

            {/* 수정/삭제 메뉴 */}
            {showMenu && (
              <div
                ref={menuRef}
                className="absolute right-0 mt-2 w-24 bg-white border rounded shadow-md z-10 flex flex-col text-sm"
              >
                <button onClick={handleEdit} className="px-3 py-2 hover:bg-gray-100 text-left">
                  수정
                </button>
                <button onClick={handleDelete} className="px-3 py-2 hover:bg-gray-100 text-left text-red-500">
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 글 내용 */}
        <p className="text-sm mb-4">{post.content}</p>

        {/* 해시태그 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs text-gray-500">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 게시글 이미지 */}
      {post.image && (
        <div className="bg-gray-100 aspect-video relative">
          <Image src={post.image} alt="게시글 이미지" fill className="object-contain object-center" />
        </div>
      )}

      {/* 좋아요/댓글/공유 버튼 */}
      <div className="p-4 flex items-center">
        {/* 좋아요 버튼 */}
        <button
          className={`flex items-center gap-1 ${isLiked ? "text-red-500" : "text-gray-500 hover:text-gray-700"}`}
          onClick={handleToggleLike}
        >
          <Heart
            className="h-5 w-5"
            fill={isLiked ? "red" : "none"}
            stroke={isLiked ? "red" : "currentColor"}
          />
          <span className="text-sm">{likesCount}</span>
        </button>

        {/* 댓글 버튼 */}
        <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 ml-4" onClick={toggleComments}>
          <MessageSquare className="h-5 w-5" />
          <span className="text-sm">{commentsCount}</span>
        </button>

        {/* 공유 버튼 */}
        <button className="ml-auto text-gray-500 hover:text-gray-700"
          onClick={handleShare}>
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      {/* 댓글 섹션 (조건부 렌더링) */}
      {showComments && (
        <>
          {/* 댓글 리스트 */}
          <div className="p-4 space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-3">
                <img src={comment.authorAvatar || "/images/etc/profile.png"} alt="프로필" className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/etc/profile.png";
                  }}
                />
                <div className="flex-1 bg-gray-100 p-2 rounded-md">
                  {/* 댓글 작성자, 작성 시간 */}
                  <p className="text-sm font-medium flex items-center gap-2">
                    {comment.authorName || "알 수 없음"}
                    {/* 댓글 작성 시간 표시 */}
                    <span className="text-xs text-gray-400">{formatTimeAgo(comment.createdAt)}</span>
                  </p>

                  {/* 댓글 수정 모드 */}
                  {editingCommentId === comment.id ? (
                    <>
                      <textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 h-16"
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={handleSaveEdit}
                          className="px-3 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600"
                        >
                          저장
                        </button>
                        <button
                          onClick={() => setEditingCommentId(null)}
                          className="px-3 py-1 bg-gray-300 text-xs rounded-md hover:bg-gray-400"
                        >
                          취소
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* 댓글 표시 모드 */}
                      <p className="text-sm">{comment.content}</p>

                      {/* 수정/삭제 버튼은 내가 쓴 댓글만 표시 */}
                      {comment.accountId === userInfo?.accountId && (
                        <div className="flex gap-2 mt-1">
                          <button
                            onClick={() => handleEditClick(comment)}
                            className="text-xs text-blue-500 hover:underline"
                          >
                            수정
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-xs text-red-500 hover:underline"
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 댓글 입력창 */}
          <div className="flex items-start gap-3 p-4 border-t">
            <img
              src="/images/etc/profile.png"
              alt="내 프로필"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="댓글을 입력하세요..."
                className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 h-16"
                rows={2}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleCreateComment}
                  className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                >
                  등록
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 수정 모달 */}
      {isEditModalOpen && (
        <CreatePostModal
          onClose={() => setIsEditModalOpen(false)}
          profileImageUrl={post.author.avatar || "/images/etc/profile.png"}
          userName={post.author.name}
          initialContent={post.content}
          initialTag={post.tags?.[0]?.replace("#", "") ?? null}
          initialImageUrl={post.image ?? undefined}
          initialImageKey={post.imageKey ?? undefined}
          isEditMode={true}
          postId={post.id}
        />
      )}
    </div>
  )
}