import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useUserStore } from "@/store/useUserStore";

// 채팅 소켓 연결 URL
const getChatSocketUrl = (): string => {
  if (typeof window === "undefined") return "";
  const hostname = window.location.hostname;
  if (hostname === "localhost") {
    return "http://localhost:8080/ws/chat";
  }
  return "https://meet-u-career.com/ws/chat";
};

// Hook: 채팅 WebSocket 연결 상태 제공
export const useChatSocket = (roomId: string | null) => {
  const { userInfo } = useUserStore();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!userInfo?.accessToken) return;

    const socketUrl = getChatSocketUrl();
    const sock = new SockJS(socketUrl);
    const client = new Client({
      webSocketFactory: () => sock,
      reconnectDelay: 5000,
      connectHeaders: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
      onConnect: () => {
        setConnected(true);
        console.log("🟢 Chat WebSocket connected");
        // 추후 roomId가 있을 때 구독 처리 가능
        if (roomId) {
          client.subscribe(`/topic/chat/${roomId}`, (message) => {
            // 메시지 처리 로직
          });
        }
      },
      onDisconnect: () => {
        setConnected(false);
        console.log("🔴 Chat WebSocket disconnected");
      },
      onStompError: (frame) => {
        console.error("Chat STOMP error", frame);
      },
    });

    client.activate();
    return () => void client.deactivate();
  }, [userInfo, roomId]);

  return { connected };
};
