"use client";

import { useNotificationStore } from "@/store/useNotificationStore";
import { useUserStore } from "@/store/useUserStore";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useEffect, useRef } from "react";

const getSocketUrl = () => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname === "localhost") {
      return "http://localhost:8080/ws/notification";
    } else {
      return "https://meet-u-career.com/ws/notification";
    }
  }
  return "";
};

export const useNotificationSocket = () => {
  const { userInfo } = useUserStore();
  const { addNotifications } = useNotificationStore();
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!userInfo) return;

    const SOCKET_URL = getSocketUrl();
    const socket = new SockJS(SOCKET_URL);

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("🟢 WebSocket 연결 성공 (SockJS)");

        // ✅ 알림 구독
        client.subscribe(`/sub/notification/${userInfo.accountId}`, (message) => {
          try {
            const body = JSON.parse(message.body);

            addNotifications([
              {
                id: Date.now(), // 임시 ID
                message: body.message,
                isRead: 0,
                createdAt: body.createdAt,
                notificationType: body.notificationType,
              },
            ]);
          } catch (error) {
            console.error("메시지 파싱 에러:", error);
          }
        });
      },
      onStompError: (frame) => {
        console.error("Broker reported error:", frame);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [userInfo, addNotifications]);

  /**
   * ✅ 알림 발행 함수
   */
  const sendNotification = (message: string, notificationType: string) => {
    if (!clientRef.current || !userInfo) return;

    const payload = {
      receiverId: userInfo.accountId, // 수신자 ID
      message,
      createdAt: new Date().toISOString(), // ISO 포맷
      notificationType, // 타입 예: "MESSAGE", "ALERT"
    };

    clientRef.current.publish({
      destination: "/pub/notification/send",
      body: JSON.stringify(payload),
    });

    console.log("🚀 알림 발행:", payload);
  };

  return { sendNotification };
};
