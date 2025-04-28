"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";

interface Room {
  roomId: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
}

interface ChatDropdownProps {
  onSelectRoom: (roomId: string) => void;
}

export default function ChatDropdown({ onSelectRoom }: ChatDropdownProps) {
  const { accessToken, isHydrated: isAuthHydrated } = useAuthStore();
  const { userInfo, isUserInfoHydrated } = useUserStore();
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      if (!accessToken || !userInfo?.accountId) {
        console.error("❗ accessToken 또는 userInfo.accountId 없음");
        return;
      }

      try {
        const response = await fetch("/api/chat/rooms", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.data) {
          const mappedRooms: Room[] = result.data.map((room: any) => ({
            roomId: room.id.toString(),
            name: room.companyName ?? "알 수 없음",
            lastMessage: room.lastMessageContent ?? "메시지가 없습니다.",
            lastMessageTime: room.lastMessageTime ?? "",
          }));

          setRooms(mappedRooms);
        }
      } catch (error) {
        console.error("채팅방 목록 불러오기 실패", error);
      }
    };

    if (isAuthHydrated && isUserInfoHydrated) {
      fetchRooms();
    }
  }, [accessToken, userInfo, isAuthHydrated, isUserInfoHydrated]);

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50 border">
      <div className="px-4 py-2 border-b">
        <h2 className="font-bold text-lg">채팅</h2>
        <p className="text-xs text-gray-500">{rooms.length > 0 ? "온라인" : "오프라인"}</p>
      </div>

      <ul className="divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <li
              key={room.roomId}
              onClick={() => onSelectRoom(room.roomId)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <div className="font-medium">{room.name}</div>
              <div className="text-xs text-gray-500 truncate">{room.lastMessage}</div>
              <div className="text-xs text-right text-gray-400">{room.lastMessageTime}</div>
            </li>
          ))
        ) : (
          <li className="p-4 text-gray-500 text-sm">채팅방이 없습니다.</li>
        )}
      </ul>

      <div className="p-2 border-t text-center">
        <button className="text-blue-500 hover:underline text-sm">
          채팅 더보기
        </button>
      </div>
    </div>
  );
}
