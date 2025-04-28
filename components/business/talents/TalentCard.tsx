"use client"

import { Building, GraduationCap } from "lucide-react"
import { SkillTag } from "./SkillTag"
import { Button } from "@/components/ui/button"

interface Talent {
  id: number
  name: string
  title: string
  location: string
  experience: string
  education: string
  skills: string[]
  moreSkills: number
  description: string
  bookmarked: boolean
}

interface TalentCardProps {
  talent: Talent
}

export const TalentCard = ({ talent }: TalentCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-md overflow-hidden flex flex-col h-full">
      <div className="p-4 flex-1">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
            <div>
              <h3 className="font-medium">{talent.name}</h3>
              <p className="text-sm text-gray-600">{talent.title}</p>
              <p className="text-xs text-gray-500 mt-1">{talent.location}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Building className="h-3.5 w-3.5" />
            <span>{talent.experience}</span>
          </div>
          <div className="flex items-center gap-1">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>{talent.education}</span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {talent.skills.map((skill, index) => (
            <SkillTag key={index} name={skill} />
          ))}
          {talent.moreSkills > 0 && (
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded">+{talent.moreSkills}</span>
          )}
        </div>

        <p className="mt-3 text-sm text-gray-700 line-clamp-2">{talent.description}</p>
      </div>

      <div className="flex border-t border-gray-200">
        <Button variant="ghost" className="flex-1 rounded-none h-10 text-blue-500 hover:bg-blue-50">
          이력서 보기
        </Button>
        <div className="w-px bg-gray-200"></div>
        {/* 연락하기 버튼 삭제 */}
      </div>
    </div>
  )
}
