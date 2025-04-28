import { Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CardProps {
  title: string
  category: string
  viewCount: string
  imageUrl?: string
  tag?: string
  href: string
}

export const Card = ({
  title,
  category,
  viewCount,
  imageUrl = "/placeholder.svg?height=200&width=300",
  tag,
  href,
}: CardProps) => {
  return (
    <div className="group">
      <Link href={href} className="block">
        <div className="bg-white border rounded-md overflow-hidden transition-all group-hover:shadow-md">
          <div className="relative aspect-video bg-gray-100">
            {imageUrl && <Image src={imageUrl || "https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/placeholder.svg"} alt={title} fill className="object-cover" />}
            {tag && (
              <div className="absolute bottom-2 left-2 bg-yellow-400 text-xs font-medium px-2 py-0.5 rounded">
                {tag}
              </div>
            )}
          </div>
          <div className="p-3">
            <div className="text-xs text-gray-500 mb-1">{category}</div>
            <h3 className="text-sm font-medium line-clamp-2 mb-2 h-10">{title}</h3>
            <div className="flex items-center text-xs text-gray-400">
              <Eye className="h-3 w-3 mr-1" />
              <span>{viewCount}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
