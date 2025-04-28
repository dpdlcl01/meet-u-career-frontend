// components/chat/types.ts
export interface ChatRoom {
  roomId: number;
  companyId: number;
  businessAccountId: number;
  personalAccountId: number;
  status: number;
  unreadCount: number;
  companyName?: string;
  lastMessageContent?: string;
  lastMessageTime?: string;
  personalAccountName?: string;
  personalProfileImage?: string;
}

export interface ChatSidebarProps {
  chatRooms: ChatRoom[];
  loading: boolean;
  error: string | null;
  selectedChatId: string | null;
  onSelectChat: (id: string) => void;
  markRoomAsRead: (roomId: number) => void;
}
