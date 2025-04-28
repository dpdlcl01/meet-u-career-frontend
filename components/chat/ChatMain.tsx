import { useState, useEffect } from "react";
import { useChatSocket } from "@/hooks/useChatSocket";  // WebSocket 훅
import { Paperclip, Send, Smile } from "lucide-react";
import Image from "next/image";

interface ChatMainProps {
  chatId: string | null;
}

export function ChatMain({ chatId }: ChatMainProps) {
  const { messages, connected, sendMessage } = useChatSocket(chatId);  // WebSocket 연결
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    // 메시지 전송
    const message = {
      roomId: chatId,
      senderId: 1,  // 실제 사용자 ID로 변경
      senderName: "사용자",  // 사용자 이름
      senderType: 0,  // 예: 0 = 개인, 1 = 기업
      message: newMessage,
      type: "TALK",
    };

    sendMessage(message);  // WebSocket으로 메시지 전송
    setNewMessage("");  // 입력창 초기화
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* 채팅방 메시지 리스트 */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${message.senderId === 1 ? "justify-end" : "justify-start"}`}
          >
            {message.senderId !== 1 && (
              <div className="flex-shrink-0 mr-3">
                <Image
                  src="/mystical-forest-spirit.png"
                  alt="상대방"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
            )}
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.senderId === 1 ? "bg-blue-500 text-white" : "bg-white border border-gray-200"
              }`}
            >
              <p className="text-sm">{message.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 메시지 입력창 */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex items-center">
        <button type="button" className="p-2 text-gray-500 hover:text-gray-700">
          <Paperclip className="h-5 w-5" />
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
          className="flex-1 mx-2 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
