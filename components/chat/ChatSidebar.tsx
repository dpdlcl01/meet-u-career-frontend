import { useEffect, useState } from "react";
import axios from "axios";

interface ChatRoom {
  roomId: number;
  companyName: string;
  personalAccountName: string;
  lastMessageContent: string;
  unreadCount: number;
}

export function ChatSidebar({ selectedChatId, onSelectChat }: any) {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    // 내 채팅방 목록을 가져오는 API 호출
    axios
      .get("/api/chat/rooms")
      .then((response) => {
        setChatRooms(response.data.data);
      })
      .catch((error) => {
        console.error("채팅방 목록을 가져오는 데 실패했습니다:", error);
      });
  }, []);

  return (
    <div className="w-1/4 bg-gray-100 border-r h-full">
      <h1 className="text-lg font-bold p-4">채팅</h1>
      <div className="overflow-y-auto p-4">
        {chatRooms.map((room) => (
          <div
            key={room.roomId}
            className={`p-4 cursor-pointer hover:bg-gray-200 ${selectedChatId === room.roomId ? "bg-gray-200" : ""}`}
            onClick={() => onSelectChat(room.roomId)}
          >
            <div className="text-sm font-medium">{room.companyName}</div>
            <div className="text-sm">{room.personalAccountName}</div>
            <div className="text-xs text-gray-500">{room.lastMessageContent}</div>
            <div className="text-xs text-gray-400">미읽음: {room.unreadCount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
