import { Heart } from "lucide-react"

interface ReviewCardProps {
  tag: string
  title: string
  isHot?: boolean
  isRecommended?: boolean
  color?: "blue" | "teal" | "white"
}

export const ReviewCard = ({
  tag,
  title,
  isHot = false,
  isRecommended = false,
  color = "white",
}: ReviewCardProps) => {
  const getBgColor = () => {
    switch (color) {
      case "blue":
        return "bg-blue-500"
      case "teal":
        return "bg-teal-500"
      default:
        return "bg-white"
    }
  }

  const getTextColor = () => {
    return color === "white" ? "text-gray-800" : "text-white"
  }

  return (
    <div
      className={`${getBgColor()} rounded-md shadow-sm p-3 h-[140px] flex flex-col justify-between transition-transform hover:shadow-md hover:-translate-y-0.5`}
    >
      <div>
        {isHot && (
          <div className="text-[10px] font-semibold text-blue-600 mb-1 uppercase">
            {color !== "white" ? <span className="text-white">HOT</span> : "HOT"}
          </div>
        )}
        {isRecommended && (
          <div className="text-[10px] font-semibold text-blue-600 mb-1 uppercase">
            {color !== "white" ? <span className="text-white">추천</span> : "추천"}
          </div>
        )}
        <div className={`text-[11px] mb-1 ${color !== "white" ? "text-white/80" : "text-gray-500"}`}>
          {tag}
        </div>
        <h3 className={`font-medium ${getTextColor()} text-sm leading-snug`}>
          {title}
        </h3>
      </div>
      <div className="flex justify-end">
        <button className="text-gray-400 hover:text-red-500">
          <Heart className={`h-4 w-4 ${color !== "white" ? "text-white/80" : ""}`} />
        </button>
      </div>
    </div>
  )
}
