// components/admin/AdminsSearch.tsx

"use client"

import { useState, useEffect } from "react"

interface AdminsSearchProps {
  onSearch: (keyword: string) => void
}

export default function AdminsSearch({ onSearch }: AdminsSearchProps) {
  const [keyword, setKeyword] = useState("")
  const [debouncedKeyword, setDebouncedKeyword] = useState("")

  // 디바운싱 처리: 입력 후 300ms 지나면 debouncedKeyword 업데이트
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword)
    }, 300)

    return () => clearTimeout(timer)
  }, [keyword])

  // debouncedKeyword 값이 바뀔 때만 onSearch 실행
  useEffect(() => {
    onSearch(debouncedKeyword)
  }, [debouncedKeyword])

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="border px-3 py-2 rounded-md w-[200px]"
      />
    </div>
  )
}
