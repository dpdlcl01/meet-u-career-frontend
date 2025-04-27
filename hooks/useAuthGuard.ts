// hooks/useAuthGuard.ts
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/api/apiClient";  // axios를 import

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

  const requiredArr = Array.isArray(requiredTypes) ? requiredTypes : [requiredTypes];

  useEffect(() => {
    const token = Cookies.get("accessToken");  // 쿠키에서 accessToken을 가져옵니다.

    if (!token) {
      console.log("토큰 없음, 로그인 페이지로 리디렉션");
      router.replace("/login");
      return;
    }

    (async () => {
      try {
        console.log("API 요청 시작: /api/user/me");
        const { data } = await apiClient.get("/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },  // 헤더에 accessToken을 추가
          withCredentials: true, // 쿠키를 포함한 요청
        });

        console.log("API 응답 받은 데이터:", data);
        const rawRole = data.data.role;
        if (typeof rawRole !== "string")
          throw new Error("role 정보가 없습니다");

        const role = rawRole.toLowerCase();

        // requiredArr 에 들어있는 각 키마다 allowList[키] 들을 모아서 허용 가능한 role 배열 생성
        const allowedRoles = requiredArr.flatMap((k) => allowList[k] || []);

        console.log("사용자 역할(role):", role);
        console.log("허용된 역할(allowedRoles):", allowedRoles);
        
        // console.log({ requiredArr, role, allowedRoles });

        if (!allowedRoles.includes(role)) {
          console.log("권한이 없어서 /unauthorized로 리디렉션");
          router.replace("/unauthorized");
        } else {
          setIsChecking(false);  // 인증 완료 후, isChecking을 false로 설정
        }
      } catch (e) {
        console.error("권한 검사 실패", e);
        router.replace("/login");
      }
    })();
  }, [router, requiredArr]);

  return isChecking;
}
