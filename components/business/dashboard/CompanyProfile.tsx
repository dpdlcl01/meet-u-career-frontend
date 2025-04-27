import Image from "next/image"
import Link from "next/link"
import { Building, MapPin, Users } from "lucide-react"

export const CompanyProfile = () => {
  return (
    <div className="bg-white rounded-md shadow-sm p-6 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
            <Image
              src="/images/etc/placeholder.svg?height=64&width=64"
              alt="Company logo"
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-lg font-medium">(주)서울인</h1>
            <div className="flex items-center mt-2 text-sm text-gray-600">
              <div className="flex items-center mr-4">
                <Building className="h-4 w-4 mr-1 text-blue-500" />
                <span>IT/인터넷/서비스</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                <span>서울 구로구 디지털로 34길 43</span>
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm text-gray-600">
              <div className="flex items-center mr-4">
                <Users className="h-4 w-4 mr-1 text-blue-500" />
                <span>500명+</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-500 mr-1">•</span>
                <span>2004년 07월 설립</span>
              </div>
            </div>
          </div>
        </div>
        <Link
          href="/business/profile"
          className="flex items-center text-sm text-gray-600 border border-gray-300 rounded-md px-3 py-1.5 hover:bg-gray-50"
        >
          <span className="mr-1">기업정보 수정</span>
        </Link>
      </div>
    </div>
  )
}
