"use client";

import { useState } from "react";
import ChatDropdown from "@/components/home/ChatDropdown";
import { ChatMain } from "@/components/chat/ChatMain"; // 네가 만든 거!

export default function ChatPage() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  return (
    <div className="flex h-screen">
      {/* 왼쪽: 채팅방 목록 */}
      <div className="w-1/3 border-r border-gray-200 relative">
        <ChatDropdown onSelectRoom={(roomId) => setSelectedChatId(roomId)} />
      </div>

      {/* 오른쪽: 채팅 메인 */}
      <div className="flex-1">
        <ChatMain chatId={selectedChatId} />
      </div>
    </div>
  );
}
