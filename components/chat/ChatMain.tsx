// 1️⃣ 프론트 수정 (ChatMain.tsx)

"use client";

import { useEffect, useState, FormEvent } from "react";
import { Paperclip, Send, Smile } from "lucide-react";
import Image from "next/image";
import { useChatSocket, ChatMessage } from "@/hooks/useChatSocket";
import { useUserStore } from "@/store/useUserStore";
import { apiClient } from "@/api/apiClient";

interface ChatMainProps {
  chatId: string | null;
}

export function ChatMain({ chatId }: ChatMainProps) {
  const { userInfo } = useUserStore();
  const { connected, messages: socketMessages, sendMessage } = useChatSocket(chatId);
  const [historyMessages, setHistoryMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!chatId) return;
    apiClient
      .get<{ data: ChatMessage[] }>(`/api/chat/rooms/${chatId}/messages`)
      .then((resp) => setHistoryMessages(resp.data.data))
      .catch((err) => console.error("이전 메시지 로드 실패", err));
  }, [chatId]);

  const allMessages = [...historyMessages, ...socketMessages];

  if (!userInfo || !chatId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">{!userInfo ? "사용자 정보 없음" : "채팅 선택"}</p>
      </div>
    );
  }

  const profileImageUrl = userInfo.profileImage
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${userInfo.profileImage}`
    : "/images/etc/placeholder.svg";

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const payload: ChatMessage = {
      roomId: Number(chatId), // ✅ 반드시 숫자 변환!
      senderId: userInfo.accountId,
      senderName: userInfo.name,
      senderType: userInfo.role === "BUSINESS" ? 1 : 0,
      message: newMessage.trim(),
      type: "TALK",   // ✅ type 꼭 TALK 넣어줘야 저장됨
      isRead: 0,
      companyId: userInfo.companyId,
      businessAccountId: userInfo.businessAccountId,
      personalAccountId: userInfo.accountId,
      resumeId: userInfo.resumeId ?? 0,
    };

    sendMessage(payload);
    setNewMessage("");
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 flex items-center">
        <Image src={profileImageUrl} alt="프로필" width={48} height={48} className="rounded-full" />
        <div className="ml-3">
          <h2 className="text-lg font-medium">채팅방 {chatId}</h2>
          <p className="text-sm text-gray-500">{connected ? "온라인" : "오프라인"}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {allMessages.map((m, i) => (
          <div key={i} className={`mb-4 flex ${m.senderId === userInfo.accountId ? "justify-end" : "justify-start"}`}>
            {m.senderId !== userInfo.accountId && (
              <div className="flex-shrink-0 mr-3">
                <Image src={profileImageUrl} alt="프로필" width={40} height={40} className="rounded-full" />
              </div>
            )}
            <div className={`max-w-[70%] rounded-lg p-3 ${m.senderId === userInfo.accountId ? "bg-blue-500 text-white" : "bg-white border border-gray-200"}`}>
              <p className="text-sm">{m.message}</p>
              {m.senderId === userInfo.accountId && (
                <p className="text-xs mt-1 text-right">{m.isRead === 1 ? "읽음" : "전송됨"}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-gray-200 flex items-center">
        <button type="button" className="p-2 text-gray-500 hover:text-gray-700">
          <Paperclip className="h-5 w-5" />
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
          className="flex-1 mx-2 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="button" className="p-2 text-gray-500 hover:text-gray-700">
          <Smile className="h-5 w-5" />
        </button>
        <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}