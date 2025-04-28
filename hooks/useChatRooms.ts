"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/api/apiClient";
import { toast } from "@/components/ui/use-toast";

export interface Room {
  roomId: number;
  companyId: number;
  businessAccountId: number;
  personalAccountId: number;
  status: number;
  unreadCount: number;
}

export function useChatRooms() {
  const [chatRooms, setChatRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const resp = await apiClient.get<{ data: any[] }>("/api/chat/rooms");
        const mapped: Room[] = resp.data.data.map((r) => ({
          roomId: r.id,
          companyId: r.companyId,
          businessAccountId: r.businessAccountId,
          personalAccountId: r.personalAccountId,
          status: r.status,
          unreadCount: r.unreadCount,
        }));
        setChatRooms(mapped);
      } catch (e) {
        console.error("❌ 채팅방 리스트 가져오기 실패", e);
        setError("채팅방을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const markRoomAsRead = async (roomId: number) => {
    try {
      await apiClient.post(`/api/chat/rooms/${roomId}/read`);
      setChatRooms((prev) =>
        prev.map((room) =>
          room.roomId === roomId ? { ...room, unreadCount: 0 } : room
        )
      );
    } catch (e) {
      console.warn("읽음 처리 실패", e);
      toast({
        title: "오류",
        description: "읽음 처리 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  return { chatRooms, loading, error, markRoomAsRead };
}
