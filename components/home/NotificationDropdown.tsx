"use client";


import { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { apiClient } from "@/api/apiClient";
import { useNotificationStore } from "@/store/useNotificationStore";

export default function NotificationDropdown() {
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    setNotifications,
  } = useNotificationStore();

  // 최초 알림 목록 불러오기
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await apiClient.get("/api/notification/list");
        const data = res.data?.data || [];
        setNotifications(data);
      } catch (error) {
        console.error("알림 불러오기 실패:", error);
      }
    };

    fetchNotifications();
  }, [setNotifications]);

  // 개별 알림 읽음 처리
  const handleRead = async (id: number) => {
    try {
      await apiClient.post(`/api/notification/read/${id}`);
      markAsRead(id);
    } catch (error) {
      console.error("알림 읽음 처리 실패:", error);
    }
  };

  // 전체 알림 읽음 처리
  const handleReadAll = async () => {
    try {
      await apiClient.post(`/api/notification/readall`);
      markAllAsRead();
    } catch (error) {
      console.error("모두 읽음 처리 실패:", error);
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50 border">
      <div className="p-3 border-b flex justify-between items-center">
        <h3 className="font-medium text-sm">알림</h3>
        <button
          onClick={handleReadAll}
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          모두 읽기
        </button>
      </div>

      <div className="max-h-[17rem] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="py-8 flex flex-col items-center text-gray-500 text-sm">
            <p className="mt-2">새로운 알림이 없습니다.</p>
          </div>
        ) : (
          <ul>
            {notifications.map((notification) => (
              <li
                key={notification.id}
                onClick={() => handleRead(notification.id)}
                className={`p-3 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer ${notification.isRead === 0 ? "bg-white" : "bg-gray-50"
                  }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                        locale: ko,
                      })}
                    </p>
                  </div>
                  {notification.isRead === 0 && (
                    <span className="h-2 w-2 bg-red-500 rounded-full mt-1"></span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
