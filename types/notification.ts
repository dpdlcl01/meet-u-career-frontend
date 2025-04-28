export interface Notification {
    id: number;
    message: string;
    isRead: number; // 읽음 여부 (0 = 읽지 않음, 1 = 읽음)
    createdAt: string;
    notificationType: number;
}
