import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/api/apiClient";

type RoleKey = "personal" | "business" | "admin" | "super" | "any";

const allowList: Record<RoleKey, string[]> = {
  any: ["personal", "business", "admin", "super"],
  personal: ["personal"],
  business: ["business"],
  admin: ["admin", "super"], // admin 요구 시 super 도 함께 허용
  super: ["super"],
};

export function useAuthGuard(requiredTypes: RoleKey | RoleKey[] = "personal") {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  // 매개변수가 단일 문자열이면 배열로 바꿔준다
  const requiredArr = Array.isArray(requiredTypes)
    ? requiredTypes
    : [requiredTypes];

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      router.replace("/login");
      return;
    }

    (async () => {
      try {
        // apiClient.get 사용
        const { data } = await apiClient.get("/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const rawRole = data.data.role;
        if (typeof rawRole !== "string") throw new Error("role 정보가 없습니다");

        const role = rawRole.toLowerCase();
        // requiredArr 에 들어있는 각 키마다 allowList[키] 들을 모아서 허용 가능한 role 배열 생성
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
