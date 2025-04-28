"use client"

import { Grid, List, ChevronDown } from "lucide-react"
import { TalentCard } from "./TalentCard"
import { Pagination } from "./Pagination"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface TalentDto {
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
  employmentType: string
  salary?: number
  applyDate?: string
  profileImageKey?: string
}

interface TalentsGridProps {
  talents: TalentDto[]
  searchQuery: string
  filters: {
    location: string
    experience: string[]
    education: string
    employmentType: string[]
    salary: number[]
    applyDate: string
  }
}

export const TalentsGrid = ({ talents, searchQuery, filters }: TalentsGridProps) => {
  const [viewType, setViewType] = useState<"grid" | "list">("grid")
  const [sortType, setSortType] = useState<'latest' | 'alpha'>('latest')
  const lower = searchQuery.trim().toLowerCase();
  const filteredTalents = talents.filter(talent => {
    // Search query filter
    const matchesSearch = !lower || (
      talent.name.toLowerCase().includes(lower) ||
      talent.skills.some(skill => skill.toLowerCase().includes(lower)) ||
      talent.description.toLowerCase().includes(lower)
    );

    // Location filter
    const matchesLocation = !filters.location || talent.location === filters.location;

    // Experience filter (parse years and match to range)
    let matchesExperience = true;
    if (filters.experience.length > 0) {
      // Extract number from '경력 3년', '경력 4년', etc.
      const match = talent.experience.match(/(\d+)/);
      const years = match ? parseInt(match[1], 10) : 0;
      matchesExperience = filters.experience.some(range => {
        if (range === "0-2") return years >= 0 && years <= 2;
        if (range === "3-5") return years >= 3 && years <= 5;
        if (range === "5+") return years >= 5;
        return false;
      });
    }

    // Education filter: match only the degree part (고졸, 대졸, 석사, 박사)
    let matchesEducation = true;
    if (filters.education) {
      // Extract degree from '학력 대졸', '학력 석사', etc.
      const degree = talent.education.replace(/^학력\s*/, "");
      matchesEducation = degree === filters.education;
    }

    // Employment type filter
    let matchesEmploymentType = true;
    if (filters.employmentType && filters.employmentType.length > 0) {
      matchesEmploymentType = filters.employmentType.includes(talent.employmentType);
    }

    // Salary filter
    const salaryVal = talent.salary ?? 0;
    const matchesSalary = salaryVal >= filters.salary[0] && salaryVal <= filters.salary[1];

    // Apply-date filter
    let matchesApplyDate = true;
    if (filters.applyDate && talent.applyDate) {
      const daysMap: Record<string, number> = { '1w': 7, '1m': 30, '3m': 90 };
      const daysAgo = daysMap[filters.applyDate] || 0;
      const diffDays = (Date.now() - new Date(talent.applyDate).getTime()) / (1000 * 60 * 60 * 24);
      matchesApplyDate = diffDays <= daysAgo;
    }

    return (
      matchesSearch &&
      matchesLocation &&
      matchesExperience &&
      matchesEducation &&
      matchesEmploymentType &&
      matchesSalary &&
      matchesApplyDate
    );
  });

  // Apply sorting
  const sortedTalents = [...filteredTalents].sort((a, b) => {
    if (sortType === 'latest') {
      const aDate = a.applyDate ? new Date(a.applyDate).getTime() : 0;
      const bDate = b.applyDate ? new Date(b.applyDate).getTime() : 0;
      return bDate - aDate;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm font-medium">
          <span className="text-blue-500">{sortedTalents.length}</span> 명의 인재
        </div>

        <div className="flex items-center gap-2">
          <div className="flex border border-gray-200 rounded-md overflow-hidden">
            <button
              className={`p-1.5 ${viewType === "grid" ? "bg-blue-100 text-blue-500" : "bg-white text-gray-500"}`}
              onClick={() => setViewType("grid")}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              className={`p-1.5 ${viewType === "list" ? "bg-blue-100 text-blue-500" : "bg-white text-gray-500"}`}
              onClick={() => setViewType("list")}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          {/* Sort selector */}
          <select
            value={sortType}
            onChange={e => setSortType(e.target.value as 'latest' | 'alpha')}
            className="justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 text-sm h-8 flex items-center gap-1 border-gray-300"
          >
            <option value="latest">최신순</option>
            <option value="alpha">가나다순</option>
          </select>
        </div>
      </div>

      <div className={`grid ${viewType === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"} gap-4`}>
        {sortedTalents.map((talent) => (
          <TalentCard key={talent.id} talent={talent} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Pagination />
      </div>
    </div>
  )
}
