export interface ChatMessageDTO {
    roomId: string;
    senderId: number;
    senderName: string;
    senderType: number;  // (0: 개인, 1: 기업)
    message: string;
    type: "TALK" | "ENTER" | "LEAVE";
    isRead: number; // (0: 읽지 않음, 1: 읽음)
    companyId: number;
    businessAccountId: number;
    personalAccountId: number;
    resumeId: number;
  }