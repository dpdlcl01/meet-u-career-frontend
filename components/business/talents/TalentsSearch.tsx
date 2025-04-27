"use client"

import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TalentsSearchProps {
  onFilterToggle: () => void
  searchQuery: string
  onSearchChange: (value: string) => void
}

export const TalentsSearch = ({ onFilterToggle, searchQuery, onSearchChange }: TalentsSearchProps) => {
  return (
    <div className="flex gap-2">
      <div className="flex flex-1 gap-2">
        <Button variant="outline" className="h-10 flex items-center gap-1 border-gray-300" onClick={onFilterToggle}>
          <SlidersHorizontal className="h-4 w-4" />
          <span>필터</span>
        </Button>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            className="pl-10 h-10 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="이름, 기술, 키워드로 인재 검색..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}