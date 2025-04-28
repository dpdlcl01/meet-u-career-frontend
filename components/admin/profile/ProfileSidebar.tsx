import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera } from "lucide-react"

export default function ProfileSidebar() {
  return (
    <Card>
      <CardContent className="pt-6 flex flex-col items-center">
        <div className="relative mb-4 group">
          <Avatar className="h-32 w-32">
            <AvatarImage src="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/placeholder.svg?height=128&width=128" alt="Profile" />
            <AvatarFallback className="text-3xl">김관</AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <Button variant="ghost" size="icon" className="text-white">
              <Camera className="h-6 w-6" />
            </Button>
          </div>
        </div>
        <h3 className="text-xl font-semibold">김관리</h3>
        <p className="text-sm text-gray-500 mb-4">관리자</p>
        <div className="text-sm text-gray-500 space-y-1 w-full">
          <div className="flex justify-between">
            <span>계정 상태:</span>
            <span className="text-green-600 font-medium">활성</span>
          </div>
          <div className="flex justify-between">
            <span>마지막 로그인:</span>
            <span>2023-04-01</span>
          </div>
          <div className="flex justify-between">
            <span>계정 생성일:</span>
            <span>2022-01-15</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
