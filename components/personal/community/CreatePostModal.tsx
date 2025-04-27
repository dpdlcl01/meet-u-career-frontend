"use client"

import { useState, useRef, useEffect } from "react"
import { X, ImageIcon } from "lucide-react"
import axios from "axios"
import { useUserStore } from "@/store/useUserStore"

interface CreatePostModalProps {
  onClose: () => void
  profileImageUrl: string
  userName: string
  initialContent?: string
  initialTag?: string | null
  initialImageUrl?: string | null
  initialImageKey?: string | null
  isEditMode?: boolean
  postId?: number


}

export const CreatePostModal = ({
  onClose,
  profileImageUrl,
  userName = "",
  initialContent = "",
  initialTag = null,
  initialImageUrl = null,
  initialImageKey = null,
  isEditMode = false,
  postId,
}: CreatePostModalProps) => {
  const { userInfo } = useUserStore();
  const [content, setContent] = useState(initialContent)
  const [selectedTag, setSelectedTag] = useState<string | null>(initialTag)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(initialImageUrl)
  const [imageKey, setImageKey] = useState<string | null>(initialImageKey)


  const modalRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const TAG_NAME_TO_ID: Record<string, number> = {
    "이직": 1,
    "연봉": 2,
    "면접": 3,
    "취업": 4,
    "자기소개서": 5,
    "커리어": 6,
    "자격증": 7,
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  // 파일명 추출 함수
  const extractFileName = (url: string) => {
    try {
      const decodedUrl = decodeURIComponent(url)
      const parts = decodedUrl.split("/")
      return parts[parts.length - 1].split("?")[0]
    } catch {
      return "이미지 파일"
    }
  }

  const handlePostSubmit = async () => {
    if (!content.trim()) {
      alert("내용을 입력해주세요!");
      return;
    }
    if (!selectedTag) {
      alert("해시태그를 선택해주세요!");
      return;
    }

    try {
      const formData = new FormData();

      const json: any = {
        content: content,
        tagId: TAG_NAME_TO_ID[selectedTag],
        accountId: userInfo?.accountId,
        title: "임시 제목",
        id: isEditMode ? postId : undefined,
      };

      if (isEditMode) {
        if (selectedImage) {
          formData.append("image", selectedImage);
        } else if (previewImage && imageKey) {
          if (!previewImage.includes("/images/etc/profile.png") && !previewImage.includes("generic-app-icon.png")) {
            json.postImageKey = imageKey;
          }
        } else {
          // 이미지가 없으면 명시적으로 postImageKey를 null로 설정!
          json.postImageKey = null;
        }
      }


      const blob = new Blob([JSON.stringify(json)], { type: "application/json" });
      formData.append("data", blob);

      if (!isEditMode && selectedImage) {
        formData.append("image", selectedImage);
      }
      console.log("FormData 보내기 직전:", [...formData.entries()]);

      const token = sessionStorage.getItem('accessToken');
      if (isEditMode) {
        await axios.post("/api/personal/community/posts/edit", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("게시글이 수정되었습니다!");
      } else {
        await axios.post("/api/personal/community/posts/create", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("게시글이 등록되었습니다!");
      }

      onClose();
      window.location.reload();
    } catch (error) {
      console.error("게시글 등록/수정 실패", error);
      alert("게시글 등록/수정에 실패했습니다.");
    }
  };



  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag)
  }

  const handleImageUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const availableTags = ["면접", "이직", "연봉", "취업", "자기소개서", "커리어", "자격증"]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg w-full max-w-md shadow-lg">

        {/* 상단: 제목 + 닫기 버튼 */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">{isEditMode ? "게시글 수정" : "게시글 작성"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 프로필 + 닉네임 */}
        <div className="flex items-center gap-3 p-4">
          <img
            src={profileImageUrl || "/images/etc/profile.png"}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="text-gray-800 font-medium text-sm">{userName}</div>
        </div>

        {/* 글 작성 textarea */}
        <div className="p-4">
          <textarea
            placeholder="나누고 싶은 생각을 공유해보세요!"
            className="w-full h-32 p-3 border rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        {/* 해시태그 선택 */}
        <div className="p-4">
          <h3 className="text-sm font-medium mb-2">해시태그 선택</h3>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagSelect(tag)}
                className={`px-3 py-1 rounded-full text-sm ${selectedTag === tag
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* 파일 업로드 + 미리보기 */}
        <div className="p-4 flex flex-col gap-2">
          {/* 기존 업로드된 이미지 표시 */}
          {previewImage && !selectedImage && (
            <div className="flex items-center text-xs text-gray-600 p-2 bg-gray-50 rounded-md justify-between">
              <span>현재 이미지: {extractFileName(previewImage)}</span>
              <button onClick={() => {
                setPreviewImage(null);
                setImageKey(null); // 이미지 삭제 시 키도 함께 삭제
              }} className="text-red-500 ml-2">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* 새로 선택한 파일 표시 */}
          {selectedImage && (
            <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded-md">
              첨부된 파일: {selectedImage.name}
            </div>
          )}

          <div className="flex justify-between items-center">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setSelectedImage(file);
                  // 여기서 previewImage를 없애지 않는다.
                  // 새 파일 선택해도 기존 preview 유지 (submit 시 결정)
                }
              }}
            />

            {/* 이미지 첨부 버튼 */}
            <button onClick={handleImageUploadClick} className="flex items-center text-gray-700">
              <ImageIcon className="h-5 w-5 mr-1" />
              <span className="text-sm">이미지 첨부</span>
            </button>

            {/* 게시하기 버튼 */}
            <button
              onClick={handlePostSubmit}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
            >
              {isEditMode ? "수정하기" : "게시하기"}
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}
