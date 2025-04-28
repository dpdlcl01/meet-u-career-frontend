import { useEffect, useState } from "react";
import { apiClient } from "@/api/apiClient";
import { useUserStore } from "@/store/useUserStore";
import { useAuthStore } from "@/store/useAuthStore";

export interface Room {
  roomId: number;             // DB에서 숫자로 내려오는 방 ID
  businessAccountId: number;
  personalAccountId: number;
  companyName: string;
  unreadCount: number;
}

export function useChatRooms() {
  const { accessToken } = useAuthStore();
  const { userInfo } = useUserStore();

  const [chatRooms, setChatRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const resp = await apiClient.get<{ data: Room[] }>(
          "/api/chat/rooms",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setChatRooms(resp.data.data);
      } catch (err: any) {
        setError(err.message || "채팅방 조회 실패");
      } finally {
        setLoading(false);
      }
    };

    if (accessToken && userInfo) {
      fetchRooms();
    }
  }, [accessToken, userInfo]);

  const markRoomAsRead = async (roomId: number) => {
    try {
      await apiClient.post(
        `/api/chat/rooms/${roomId}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setChatRooms((prev) =>
        prev.map((r) =>
          r.roomId === roomId ? { ...r, unreadCount: 0 } : r
        )
      );
    } catch {
      /* 무시 */
    }
  };

  return { chatRooms, loading, error, markRoomAsRead };
}
