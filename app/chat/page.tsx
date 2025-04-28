"use client";

import { useSearchParams } from "next/navigation";
import { ChatLayout } from "@/components/chat/ChatLayout";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId"); // 쿼리 파라미터에서 roomId 추출

  return <ChatLayout initialRoomId={roomId} />;
}
