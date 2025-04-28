import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export interface ChatMessage {
  roomId: string;
  senderId: number;
  senderName: string;
  senderType: number;
  message: string;
  type: "ENTER" | "LEAVE" | "TALK";
  isRead: number;
  companyId: number;
  businessAccountId: number;
  personalAccountId: number;
  resumeId: number;
}

let stompClient: Client | null = null;

/** 1) STOMP 서버에 연결만 합니다. */
export function connectWebSocket(): Promise<void> {
  if (stompClient?.active) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const sock = new SockJS(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/ws-stomp`
    );
    const client = new Client({
      webSocketFactory: () => sock,
      debug: (str) => console.log("[STOMP]", str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("✅ STOMP 연결 성공");
        stompClient = client;
        resolve();
      },
      onStompError: (frame) => {
        console.error("❌ STOMP 에러", frame);
        reject(frame);
      },
    });
    client.activate();
  });
}

/** 2) connectWebSocket + subscribe를 한 번에 처리하는 헬퍼 */
export async function connectToChat(
  roomId: string,
  onMessage: (msg: ChatMessage) => void
): Promise<void> {
  await connectWebSocket();
  if (!stompClient || !stompClient.active) {
    throw new Error("STOMP 연결 실패");
  }
  stompClient!.subscribe(
    `/sub/chat/room/${roomId}`,
    (frame: IMessage) => {
      const payload: ChatMessage = JSON.parse(frame.body);
      onMessage(payload);
    }
  );
  console.log(`🔔 방 ${roomId} 구독 시작`);
}

/** 메시지 발송 */
export function sendSocketMessage(
  payload: Omit<ChatMessage, "roomId">,
  roomId: string
): void {
  if (!stompClient || !stompClient.active) {
    console.error("⚠️ WebSocket이 연결되어 있지 않습니다");
    return;
  }
  stompClient!.publish({
    destination: "/pub/chat/send",
    body: JSON.stringify({ ...payload, roomId }),
  });
}

/** 연결 해제 */
export function disconnectWebSocket(): void {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
    console.log("🔌 STOMP 연결 종료");
  }
}
