"use client"

import { Calendar, Star } from "lucide-react"

interface Review {
  id: number
  jobCategoryName: string
  interviewYearMonth: string
  rating: number
  createdAt: string
  questionsAsked: string
  result: number
}

interface Props {
  reviews: Review[]
}

export const InterviewExperience = ({ reviews }: Props) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">면접 후기</h2>
      {reviews.map((review) => (
        <div
          key={review.id}
          className="border rounded-lg p-4 bg-white hover:shadow transition-shadow"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">{review.jobCategoryName}</p>
              <p className="text-base font-semibold text-gray-800">
                {review.interviewYearMonth} 면접 후기
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-yellow-600">
              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-500" />
              <span>{review.rating} / 2</span>
            </div>
          </div>
          <p className="text-sm mt-3 text-gray-700 whitespace-pre-wrap">
            {review.questionsAsked}
          </p>
          <div className="text-xs text-gray-400 mt-2 flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(review.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  )
}
