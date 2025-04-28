"use client";

import { useState } from "react";
import { ChatSidebar } from "@/components/chat/ChatSidebar"; // 채팅방 목록 컴포넌트
import { ChatMain } from "@/components/chat/ChatMain"; // 채팅 메시지 컴포넌트

export default function ChatPage() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>("1");

  return (
    <div className="flex h-screen bg-white">
      <div className="w-1/4">
        <ChatSidebar selectedChatId={selectedChatId} onSelectChat={setSelectedChatId} />
      </div>
      <div className="flex-1">
        <ChatMain chatId={selectedChatId} />
      </div>
    </div>
  );
}
