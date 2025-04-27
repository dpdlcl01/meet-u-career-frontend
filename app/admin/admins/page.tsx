"use client";

import { Suspense } from "react"
import { useAuthGuard } from "@/hooks/useAuthGuard"
import { ChatLayout } from "@/components/chat/ChatLayout"
import { ChatSkeleton } from "@/components/chat/ChatSkeleton"

export default function ChatPage() {
  const isChecking = useAuthGuard("any") // 로그인만 되어 있으면 통과

  if (isChecking) return null  // 로딩 중에는 아무것도 렌더링하지 않음

  return (
    <Suspense fallback={<ChatSkeleton />}>
      <ChatLayout />
    </Suspense>
  )
}

