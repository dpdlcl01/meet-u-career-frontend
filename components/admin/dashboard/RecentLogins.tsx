"use client"

import { useState } from "react"
import { Maximize2 } from "lucide-react"

const recentLogins = [
  {
    id: 1,
    name: "김대표",
    company: "인재히어로",
    views: 105,
    avatar: "https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "(주)테크솔루션",
    company: "채용공고 등록",
    views: 258,
    avatar: "https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "이민수",
    company: "지원 완료",
    views: 423,
    avatar: "https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "박서연",
    company: "커뮤니티 게시글 작성",
    views: 1420,
    avatar: "https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "(주)디자인허브",
    company: "채용공고 수정",
    views: 2410,
    avatar: "https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/placeholder.svg?height=40&width=40",
  },
]

export function RecentLogins() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium">최근 활동</h3>
        <div className="flex items-center">
          <button className="text-sm text-blue-500 mr-4">모두 보기</button>
          <button onClick={() => setExpanded(!expanded)} className="text-gray-400 hover:text-gray-600">
            <Maximize2 size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {recentLogins.map((login) => (
          <div key={login.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                <img src={login.avatar || "/placeholder.svg"} alt={login.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-medium">{login.name}</div>
                <div className="text-sm text-gray-500">{login.company}</div>
              </div>
            </div>
            <div className="text-sm text-gray-500">{login.views} 회</div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="text-sm text-gray-500 hover:text-gray-700">더 보기</button>
      </div>
    </div>
  )
}
