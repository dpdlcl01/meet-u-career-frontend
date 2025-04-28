import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";  // STOMP 클라이언트
import { useUserStore } from "@/store/useUserStore";

export const useChatSocket = (chatId: string | null) => {
  const [messages, setMessages] = useState<any[]>([]);  // 메시지 상태
  const [connected, setConnected] = useState(false);  // WebSocket 연결 상태
  const [stompClient, setStompClient] = useState<Client | null>(null);  // STOMP 클라이언트
  const { userInfo } = useUserStore();  // 사용자 정보 가져오기

  useEffect(() => {
    if (!chatId || !userInfo) return;

    // WebSocket 연결
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws-stomp",  // 서버 WebSocket URL
      connectHeaders: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
      onConnect: () => {
        setConnected(true);
        client.subscribe(`/sub/chat/room/${chatId}`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
      },
      onDisconnect: () => {
        setConnected(false);
      },
    });

    client.activate();
    setStompClient(client);

    // 컴포넌트 언마운트 시 WebSocket 연결 종료
    return () => {
      client.deactivate();
    };
  }, [chatId, userInfo]);

  // 메시지 보내기
  const sendMessage = (message: any) => {
    if (stompClient && connected) {
      stompClient.publish({
        destination: "/pub/chat/send",
        body: JSON.stringify(message),
      });
    }
  };

  return { messages, connected, sendMessage };
};
