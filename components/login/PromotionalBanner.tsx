import Image from "next/image"
import Link from "next/link"

export const PromotionalBanner = () => {
  return (
    <Link href="/promotion" className="block">
      <div className="bg-pink-100 rounded-md p-3 text-center relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-xs text-pink-800 mb-1">타로 상담과 함께도 다이스 어때요!?</p>
          <p className="text-sm font-bold text-pink-800">
            <span className="text-white bg-pink-500 px-1 py-0.5 rounded mr-1">봄날엔</span>
            <span className="text-pink-600">타로</span>
            <span className="text-blue-600">페스타!</span>
          </p>
        </div>
        <div className="absolute right-2 bottom-0">
          <Image
            src="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/placeholder.svg?height=40&width=60"
            alt="Promotional illustration"
            width={60}
            height={40}
            className="object-contain"
          />
        </div>
      </div>
    </Link>
  )
}
