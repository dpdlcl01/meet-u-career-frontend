"use client";

import { useState, useEffect } from "react";
import { ChatSidebar } from "./ChatSidebar";
import { ChatMain } from "./ChatMain";

interface ChatLayoutProps {
  initialRoomId: string | null;
}

export function ChatLayout({ initialRoomId }: ChatLayoutProps) {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  useEffect(() => {
    if (initialRoomId) {
      setSelectedChatId(initialRoomId);
    }
  }, [initialRoomId]);

  return (
    <div className="flex h-screen bg-white">
      <ChatSidebar
        selectedChatId={selectedChatId}
        onSelectChat={setSelectedChatId}
      />
      <ChatMain chatId={selectedChatId} />
    </div>
  );
}
