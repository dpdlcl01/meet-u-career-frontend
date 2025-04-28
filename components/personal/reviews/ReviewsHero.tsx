"use client"

import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useDebounce } from "@/app/hooks/useDebounce"

interface Props {
  onSearch: (keyword: string) => void
}

export const ReviewsHero = ({ onSearch }: Props) => {
  const [input, setInput] = useState("")
  const debouncedInput = useDebounce(input, 400)

  useEffect(() => {
    onSearch(debouncedInput.trim())
  }, [debouncedInput, onSearch])

  return (
    <div className="bg-white py-12">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 md:mr-8 md:w-1/2">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">기업리뷰</h1>
            <p className="text-gray-600 mb-6">
              일하고 싶은곳 기업은 어떤 곳일까요? 궁금하세요?
              <br />
              합격자, 퇴사자가 알려주는 생생한 기업리뷰
            </p>
            <div className="relative max-w-md">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="어떤 기업의 기업리뷰가 궁금하세요?"
                className="w-full pl-4 pr-10 py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/review/review_01.png"
              alt="기업 리뷰 작성하는 일러스트"
              className="max-w-full h-auto"
              width={400}
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
