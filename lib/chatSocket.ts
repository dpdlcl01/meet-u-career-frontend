// lib/chatSocket.ts
"use client";

import { Client, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { ChatMessage } from "@/hooks/useChatSocket";

let stompClient: Client;
let subscription: StompSubscription | null = null;

export const connectSocket = async () => {
  return new Promise<void>((resolve, reject) => {
    stompClient = new Client({
      brokerURL: undefined,
      webSocketFactory: () => new SockJS(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ws-stomp`),
      reconnectDelay: 5000,
      debug: (str) => console.log("[STOMP]", str),
    });

    stompClient.onConnect = () => resolve();
    stompClient.onStompError = (frame) => reject(frame.headers["message"]);

    stompClient.activate();
  });
};

export const subscribeToRoom = (roomId: number, callback: (message: any) => void) => {
  if (!stompClient || !stompClient.connected) throw new Error("STOMP not connected");

  subscription = stompClient.subscribe(`/sub/chat/room/${roomId}`, callback);
  console.log(`🔑 방 ${roomId} 구독 시작`);
};

export const disconnectSocket = () => {
  if (subscription) subscription.unsubscribe();
  if (stompClient) stompClient.deactivate();
  console.log("🔓 WebSocket 연결 해제");
};

export const sendChatMessage = (roomId: number, message: ChatMessage) => {
  if (!stompClient || !stompClient.connected) throw new Error("STOMP not connected");

  stompClient.publish({
    destination: "/pub/chat/message",
    body: JSON.stringify(message),
  });
};