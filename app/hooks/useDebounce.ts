import { useEffect, useState } from "react"

/**
 * 입력값 변경 후 일정 시간(delay) 동안 추가 입력이 없으면 값을 확정해서 반환
 * - 실시간 검색, 자동 저장 등에 유용
 */
export const useDebounce = (value: string, delay = 400): string => {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debounced
}
