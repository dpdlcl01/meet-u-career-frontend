"use client"

import { useEffect, useState } from "react"
import { apiClient } from "@/api/apiClient"

interface ChatRoom {
  roomId: number
  companyId: number
  businessAccountId: number
  personalAccountId: number
  status: number
  unreadCount: number
}

export function useChatRooms() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await apiClient.get<{ data: ChatRoom[] }>("/api/chat/rooms")
        setChatRooms(response.data.data)
      } catch (err) {
        console.error("❌ 채팅방 리스트 가져오기 실패", err)
        setError("채팅방을 불러오는데 실패했습니다.")
      } finally {
        setLoading(false)
      }
      console.log("현재 accessToken:", sessionStorage.getItem("accessToken"));

    }

    fetchChatRooms()
  }, [])

  // markRoomAsRead 함수 추가
  const markRoomAsRead = async (roomId: number) => {
    try {
      await apiClient.post(`/api/chat/rooms/${roomId}/read`)
      // 상태 업데이트
      setChatRooms((prev) =>
        prev.map((room) =>
          room.roomId === roomId ? { ...room, unreadCount: 0 } : room
        )
      )
      console.log(`✅ 채팅방 ${roomId} 읽음 처리 완료 (프론트 상태 반영)`)
    } catch (error) {
      console.error("❌ 채팅방 읽음 처리 실패", error)
    }
  }

  return {
    chatRooms,
    loading,
    error,
    markRoomAsRead, // markRoomAsRead를 반환
  }
}
