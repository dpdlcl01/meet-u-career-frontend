"use client";

import { useEffect, useState } from "react";
import { connectSocket, disconnectSocket, subscribeToRoom, sendSocketMessage } from "@/lib/chatSocket";
import { IMessage } from "@stomp/stompjs";

interface ChatMessage {
  senderId: number;
  senderName: string;
  message: string;
  isRead: number;
  type: string;
}

export function useChatSocket(roomId: string | null) {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!roomId) return;

    const connectAndSubscribe = async () => {
      try {
        await connectSocket();  // ✅ 소켓 연결
        setConnected(true);

        subscribeToRoom(roomId, (message: IMessage) => {
          const body = JSON.parse(message.body);
          setMessages((prev) => [...prev, body]);
        });
      } catch (error) {
        console.error("소켓 연결 실패", error);
      }
    };

    connectAndSubscribe();

    return () => {
      disconnectSocket(); // ✅ 컴포넌트 언마운트시 연결 끊기
      setConnected(false);
    };
  }, [roomId]);

  const sendMessage = (payload: ChatMessage) => {
    if (connected && roomId) {
      sendSocketMessage(roomId, payload);
    }
  };

  return { connected, messages, sendMessage };
}
