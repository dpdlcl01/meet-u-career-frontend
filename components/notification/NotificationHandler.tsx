"use client";

import { useEffect, useRef } from "react";
import { toast } from "@/components/ui/use-toast";
import { useNotificationSocket } from "@/hooks/useNotificationSocket";
import { useNotificationStore } from "@/store/useNotificationStore";

export default function NotificationHandler() {
    useNotificationSocket();

    const { notifications } = useNotificationStore();
    const queueRef = useRef<any[]>([]); // 큐 메모리 저장
    const isProcessingRef = useRef(false); // 현재 띄우는 중 여부

    const processQueue = () => {
        if (isProcessingRef.current || queueRef.current.length === 0) return;

        isProcessingRef.current = true;

        const latestNotification = queueRef.current.shift(); // 큐에서 꺼냄

        if (latestNotification) {
            // 타입별 아이콘/색상
            const type = latestNotification.notificationType;

            let icon = "🔔";

            if (type === 1) icon = "📄";
            else if (type === 2) icon = "📅";
            else if (type === 3) icon = "🌟";
            else if (type === 4) icon = "💌";
            else if (type === 5) icon = "💬";
            else if (type >= 21) icon = "⚙️";

            toast({
                title: `${icon} 새 알림`,
                description: latestNotification.message,
            });

            // 다음 알림 띄우기 (4초 뒤)
            setTimeout(() => {
                isProcessingRef.current = false;
                processQueue(); // 재귀 호출
            }, 4000);
        }
    };

    useEffect(() => {
        if (notifications.length === 0) return;

        const latestNotification = notifications[0];

        if (latestNotification.isRead === 0) {
            queueRef.current.push(latestNotification);
            processQueue(); // 새 알림 오면 처리
        }
    }, [notifications]);

    return null;
}