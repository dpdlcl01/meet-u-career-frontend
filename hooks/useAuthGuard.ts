import { useMemo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/api/apiClient";

type RoleKey = "personal" | "business" | "admin" | "super" | "any";

const allowList: Record<RoleKey, string[]> = {
  any: ["personal", "business", "admin", "super"],
  personal: ["personal"],
  business: ["business"],
  admin: ["admin"],
  super: ["super"],
};

export function useAuthGuard(requiredTypes: RoleKey | RoleKey[] = "personal") {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  const requiredArr = useMemo(
    () => (Array.isArray(requiredTypes) ? requiredTypes : [requiredTypes]),
    [requiredTypes]
  );

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      router.replace("/login");
      return;
    }

    (async () => {
      try {
        const { data } = await apiClient.get("/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const rawRole = data.data.role;
        if (typeof rawRole !== "string") throw new Error("role 정보가 없습니다");

        const role = rawRole.toLowerCase();
        const allowedRoles = requiredArr.flatMap((k) => allowList[k] || []);

        if (!allowedRoles.includes(role)) {
          router.replace("/unauthorized");
        } else {
          setIsChecking(false);
        }
      } catch (e) {
        console.error("권한 검사 실패", e);
        router.replace("/login");
      }
    })();
  }, [router, requiredArr]);

  return isChecking;
}
