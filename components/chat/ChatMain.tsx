"use client";

import { useEffect, useRef, useState } from "react";
import { useChatSocket } from "@/hooks/useChatSocket";
import { useUserStore } from "@/store/useUserStore";
import Image from "next/image";
import { Paperclip, Send, Smile } from "lucide-react";
import { apiClient } from "@/api/apiClient";

interface ChatMainProps {
  chatId: string | null;
  opponentName: string;
  opponentAvatar: string;
  opponentId: number;
}

// ✅ 백엔드 이미지 베이스 URL (로컬 or 배포 환경에 맞게 설정)
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export function ChatMain({ chatId, opponentName, opponentAvatar, opponentId }: ChatMainProps) {
  const { userInfo } = useUserStore();
  const { messages, sendMessage } = useChatSocket(chatId);
  const [newMessage, setNewMessage] = useState("");
  const [isOnline, setIsOnline] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!opponentId) return;
    const fetchStatus = async () => {
      try {
        const res = await apiClient.get(`/api/chat/online-status?accountId=${opponentId}`);
        setIsOnline(res.data.data);
      } catch (error) {
        console.error("상대방 온라인 상태 조회 실패", error);
      }
    };
    fetchStatus();
  }, [opponentId]);

  if (!userInfo) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">사용자 정보가 없습니다.</p>
      </div>
    );
  }

  if (!chatId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">채팅을 선택해주세요</p>
      </div>
    );
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    sendMessage({
      chatRoomId: chatId,
      senderId: userInfo.accountId,
      senderName: userInfo.name,
      senderType: 0,
      message: newMessage,
      type: "TALK",
      isRead: 0,
    });
    setNewMessage("");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !chatId) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await apiClient.post("/api/chat/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const fileUrl = res.data.data;

      sendMessage({
        chatRoomId: chatId,
        senderId: userInfo.accountId,
        senderName: userInfo.name,
        senderType: 0,
        message: fileUrl,
        type: "FILE",
        isRead: 0,
      });
    } catch (err) {
      console.error("파일 업로드 실패", err);
    }
  };

  return (
    <div className="flex flex-col h-full flex-1">
      {/* 상단 헤더 */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative">
            <Image
              src={opponentAvatar || "/placeholder.svg"}
              alt="상대 프로필"
              width={48}
              height={48}
              className="rounded-full"
            />
            <span
              className={`absolute bottom-0 right-0 block w-3 h-3 rounded-full border-2 border-white ${
                isOnline ? "bg-green-500" : "bg-gray-400"
              }`}
            />
          </div>
          <div className="ml-3">
            <h2 className="text-lg font-medium">{opponentName}</h2>
            <p className="text-sm text-gray-500">{isOnline ? "온라인" : "오프라인"}</p>
          </div>
        </div>
      </div>

      {/* 메시지 리스트 */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message, index) => {
          const isMine = message.senderId === userInfo.accountId;
          const isImage =
            message.type === "FILE" &&
            /\.(jpg|jpeg|png|gif|webp)$/i.test(message.message);

          const fullUrl = `${BASE_URL}${message.message}`;

          return (
            <div
              key={index}
              className={`mb-4 flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              {!isMine && (
                <div className="flex-shrink-0 mr-3">
                  <Image
                    src={opponentAvatar || "/placeholder.svg"}
                    alt="상대 프로필"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
              )}
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  isMine
                    ? "bg-blue-500 text-white"
                    : "bg-white border border-gray-200"
                }`}
              >
                {message.type === "FILE" ? (
                  isImage ? (
                    <img
                      src={fullUrl}
                      alt="첨부 이미지"
                      className="rounded-lg max-w-xs object-cover"
                    />
                  ) : (
                    <a
                      href={fullUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-sm"
                    >
                      파일 열기
                    </a>
                  )
                ) : (
                  <p className="text-sm">{message.message}</p>
                )}
                {isMine && (
                  <p className="text-xs mt-1 text-right">
                    {message.isRead === 1 ? "읽음" : "전송됨"}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 입력창 + 파일첨부 input */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t border-gray-200 flex items-center"
      >
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-gray-500 hover:text-gray-700"
        >
          <Paperclip className="h-5 w-5" />
        </button>
        <input
          type="file"
          accept="image/*,application/pdf"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
        />
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
          className="flex-1 mx-2 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button type="button" className="p-2 text-gray-500 hover:text-gray-700">
          <Smile className="h-5 w-5" />
        </button>
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
