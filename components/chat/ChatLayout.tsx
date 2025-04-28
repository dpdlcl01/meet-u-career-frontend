import { useState } from "react";
import { ChatSidebar } from "./ChatSidebar";
import { ChatMain } from "./ChatMain";

export function ChatLayout() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>("1");

  return (
    <div className="flex h-full bg-white">
      {/* 왼쪽: 채팅방 목록 */}
      <div className="w-1/4 bg-gray-100 border-r">
        <ChatSidebar selectedChatId={selectedChatId} onSelectChat={setSelectedChatId} />
      </div>
      {/* 오른쪽: 채팅 */}
      <div className="flex-1 bg-gray-50">
        <ChatMain chatId={selectedChatId} />
      </div>
    </div>
  );
}
