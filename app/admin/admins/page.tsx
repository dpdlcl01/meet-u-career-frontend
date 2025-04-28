"use client";

import { useState, useEffect } from "react";
import ChatDropdown from "@/components/personal/mypage/ChatDropdown";
import { ChatMain } from "@/components/chat/ChatMain";
import useUserStore from "@/store/useUserStore";

export default function ChatPage() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  // 페이지 진입 시 userInfo 복구
  useEffect(() => {
    useUserStore.getState().restoreUserInfo();
  }, []);

  return (
    <div className="flex h-screen">
      {/* 왼쪽: 채팅방 목록 */}
      <div className="w-1/3 border-r border-gray-200 relative">
        <ChatDropdown onSelectRoom={(roomId) => setSelectedChatId(roomId)} />
      </div>

      {/* 오른쪽: 채팅 메인 */}
      <div className="flex-1">
        {/* key를 주면 roomId 변경 시 완전 리마운트 */}
        <ChatMain key={selectedChatId ?? "none"} chatId={selectedChatId} />
      </div>
    </div>
  );
}
}