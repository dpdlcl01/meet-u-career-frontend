"use client";
import { useEffect, useState } from "react";
import { useChatSocket } from "@/hooks/useChatSocket";
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
  const { userInfo } = useUserStore(); // userInfo에서 accessToken을 가져옴
  const [rooms, setRooms] = useState<Room[]>([]);
  const { connected } = useChatSocket(null);
  useEffect(() => {
    if (!userInfo || !userInfo.accessToken) return; // userInfo나 accessToken이 없으면 채팅방 목록을 가져오지 않음
    const fetchRooms = async () => {
      try {
        const response = await fetch("/api/chat/rooms", {
          method: "GET",
          credentials: "include", // 쿠키를 포함한 요청
          headers: {
            "Authorization": `Bearer ${userInfo.accessToken}`, // accessToken을 Authorization 헤더에 추가
          },
        });
        const json = await response.json();
        if (json.data) {
          setRooms(json.data); // 받은 채팅방 목록을 state에 저장
        }
      } catch (error) {
        console.error("채팅방 목록을 불러오는데 실패했습니다.", error);
      }
    };
    fetchRooms();
  }, [userInfo]); // userInfo가 변경될 때마다 채팅방 목록을 다시 가져옴
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50 border">
      <div className="px-4 py-2 border-b">
        <h2 className="font-bold text-lg">채팅</h2>
        <p className="text-xs text-gray-500">{connected ? "온라인" : "오프라인"}</p>
      </div>
      <ul className="divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
        {rooms.length > 0 ? (
          rooms.map((room, index) => (
            <li
              key={room.roomId || index}
              onClick={() => onSelectRoom(room.roomId)} // 방 클릭 시 선택한 채팅방으로 이동
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