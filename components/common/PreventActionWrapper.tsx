"use client";

import { ReactNode, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { fetchMyInfo } from "@/api/fetchMyInfo";
import NotificationHandler from "@/components/notification/NotificationHandler";

interface Props {
  children: ReactNode;
}

export default function PreventActionWrapper({ children }: Props) {
  const { restoreTokens, isHydrated, accessToken } = useAuthStore();
  const { restoreUserInfo } = useUserStore();

  useEffect(() => {
    restoreTokens();
    restoreUserInfo();
  }, []);

  useEffect(() => {
    if (isHydrated && accessToken) {
      fetchMyInfo();
    }
  }, [isHydrated, accessToken]);

  const preventAction = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <div
      onContextMenu={preventAction}
      onDragStart={preventAction}
      className="min-h-screen bg-[#fcfcfd]"
    >
      {accessToken && <NotificationHandler />}
      {children}
    </div>
  );
}
