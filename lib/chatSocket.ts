// lib/chatSocket.ts
import { Client, IMessage } from "@stomp/stompjs";

let stompClient: Client | null = null;

// 소켓 연결
export async function connectSocket() {
  if (stompClient && stompClient.connected) {
    return;
  }

  stompClient = new Client({
    brokerURL: "ws://localhost:8080/ws", // ✅ WebSocket 서버 주소 맞게!
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: () => {
      console.log("STOMP 소켓 연결 완료");
    },
    onDisconnect: () => {
      console.log("STOMP 소켓 연결 끊김");
    },
    debug: (str) => {
      console.log(str);
    },
  });

  stompClient.activate();
}

// 소켓 해제
export function disconnectSocket() {
  stompClient?.deactivate();
}

// 방 구독
export function subscribeToRoom(roomId: string, callback: (message: IMessage) => void) {
  return stompClient?.subscribe(`/sub/chat/${roomId}`, callback) ?? null;
}

// 메시지 전송
export function sendSocketMessage(roomId: string, payload: any) {
  if (!stompClient || !stompClient.connected) {
    console.error("STOMP 연결 없음");
    return;
  }
  stompClient.publish({
    destination: `/pub/chat/message`, // ✅ 이건 서버 채널에 맞게 수정해
    body: JSON.stringify(payload),
  });
}
