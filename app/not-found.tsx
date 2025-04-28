"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/"); // 없는 페이지 -> 홈으로 보내기
    }, [router]);

    return null; // 아무것도 안 보여줘도 되고, 로딩 스피너 보여줄 수도 있음
}
