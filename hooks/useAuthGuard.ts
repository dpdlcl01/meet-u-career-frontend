"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";

type Role = string;

export function useAuthGuard(allowedRoles: Role | Role[]) {
  const router = useRouter();
  const userInfo = useUserStore((state) => state.userInfo);
  const isHydrated = useUserStore((state) => state.isUserInfoHydrated);
  const restoreUserInfo = useUserStore((state) => state.restoreUserInfo);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isHydrated) {
      restoreUserInfo();
      return;
    }

    if (!userInfo) {
      router.replace("/admin/login");
      return;
    }

    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    if (!roles.includes(userInfo.role.toLowerCase())) {
      router.replace("/");
      return;
    }

    setIsChecking(false);
  }, [allowedRoles, isHydrated, userInfo, restoreUserInfo, router]);

  return isChecking;
}