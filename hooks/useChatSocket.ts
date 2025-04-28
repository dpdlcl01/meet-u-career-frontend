// hooks/useChatSocket.ts
"use client";

import { useEffect, useState } from "react";
import { connectSocket, subscribeToRoom, disconnectSocket, sendChatMessage } from "@/lib/chatSocket";

export interface ChatMessage {
  roomId: number;
  senderId: number;
  senderName: string;
  senderType: number;
  message: string;
  type: string;
  isRead: number;
  companyId?: number;
  businessAccountId?: number;
  personalAccountId?: number;
  resumeId?: number;
}

export const useChatSocket = (chatId: string | null) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!chatId) return;

    const setup = async () => {
      try {
        await connectSocket();
        console.log("✅ 소켓 연결 성공");
        setConnected(true);

        const roomId = parseInt(chatId, 10);
        if (isNaN(roomId)) {
          console.error("Invalid roomId");
          return;
        }

        subscribeToRoom(roomId, (message) => {
          const parsed: ChatMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, parsed]);
        });
      } catch (err) {
        console.error("❌ 소켓 연결 실패", err);
      }
    };

    setup();

    return () => {
      disconnectSocket();
      setConnected(false);
      setMessages([]);
    };
  }, [chatId]);

  const sendMessage = (payload: ChatMessage) => {
    if (!chatId) return;
    const roomId = parseInt(chatId, 10);
    if (isNaN(roomId)) {
      console.error("Invalid roomId");
      return;
    }
    sendChatMessage(roomId, payload);
  };

  return {
    connected,
    messages,
    sendMessage,
  };
};
