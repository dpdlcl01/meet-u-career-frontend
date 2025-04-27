import { useState } from "react";
import { Paperclip, Send, Smile } from "lucide-react";
import Image from "next/image";
import { useChatSocket } from "@/hooks/useChatSocket";
import { useUserStore } from "@/store/useUserStore";

interface ChatMainProps {
  chatId: string | null;
}

export function ChatMain({ chatId }: ChatMainProps) {
  const { userInfo } = useUserStore(); // userInfo는 PersonalMyPageInfo | null
  const { messages, connected, sendMessage } = useChatSocket(chatId); // sendMessage 반환 받음
  const [newMessage, setNewMessage] = useState("");

  if (!userInfo) {
    // userInfo가 없으면 화면에 사용자 정보 없음 표시
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">사용자 정보가 없습니다.</p>
      </div>
    );
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !chatId) return;

    // 메시지 데이터 객체 생성 (isRead를 0으로 설정)
    const messageData = {
      roomId: chatId,
      senderId: userInfo.account.id,  // userInfo에서 accountId 사용
      senderName: userInfo.account.name,  // userInfo에서 name 사용
      senderType: 0,  // accountType 사용 (0: 개인, 1: 기업)
      message: newMessage,  // 전송할 메시지
      type: "TALK",  // 메시지 타입
      isRead: 0,  // 메시지 전송 시 기본적으로 '읽지 않음' 상태로 설정
    };

    // WebSocket을 통해 메시지 전송
    sendMessage(messageData);

    setNewMessage("");  // 메시지 전송 후 입력창 초기화
  };

  if (!chatId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">채팅을 선택해주세요</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* 채팅방 헤더 */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={selectedChat.avatar || "/images/etc/placeholder.svg"}
            alt={selectedChat.name}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div className="ml-3">
            <h2 className="text-lg font-medium">채팅방 {chatId}</h2>
            <p className="text-sm text-gray-500">{connected ? "온라인" : "오프라인"}</p>
          </div>
        </div>
      </div>

      {/* 메시지 목록 */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${message.senderId === userInfo.account.id ? "justify-end" : "justify-start"}`}
          >
            {message.senderId !== userInfo.account.id && (
              <div className="flex-shrink-0 mr-3">
                <Image
                  src={selectedChat.avatar || "/images/etc/placeholder.svg"}
                  alt={selectedChat.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
            )}
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.senderId === userInfo.account.id
                  ? "bg-blue-500 text-white"
                  : "bg-white border border-gray-200"
              }`}
            >
              <p className="text-sm">{message.message}</p>
              {/* 읽음 여부 표시 */}
              {message.senderId === userInfo.account.id && (
                <p className="text-xs mt-1 text-right">
                  {message.isRead === 1 ? "읽음" : "전송됨"}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 메시지 입력창 */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex items-center">
        <button type="button" className="p-2 text-gray-500 hover:text-gray-700" aria-label="파일 첨부">
          <Paperclip className="h-5 w-5" />
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
          className="flex-1 mx-2 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button type="button" className="p-2 text-gray-500 hover:text-gray-700" aria-label="이모지 추가">
          <Smile className="h-5 w-5" />
        </button>
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="메시지 전송"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
