"use client"

import { BusinessHeader } from "@/components/business/layout/BusinessHeader"
import { TalentsHeader } from "./TalentsHeader"
import { TalentsSearch } from "./TalentsSearch"
import { TalentsFilter } from "./TalentsFilter"
import { TalentsGrid } from "./TalentsGrid"
import { useState, useEffect } from "react"
import axios from "axios"

// Filter state type
type DateRange = '' | '1w' | '1m' | '3m'
interface FilterState {
  location: string
  experience: string[]
  education: string
  employmentType: string[]
  salary: number[]
  applyDate: DateRange
}

// Backend DTO for talent
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
  profileImageKey: string
}

// API response wrapper
interface ApiResult<T> {
  code: number
  message: string
  count: number
  data: T
}

// Front-end Model for talent
interface TalentModel extends TalentDto {
  employmentType: string
  salary: number
  applyDate: string
  bookmarked: boolean
}

export const BusinessTalentsSearch = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<FilterState>({
    location: "",
    experience: [], // ["0-2", "3-5", "5+"]
    education: "",
    employmentType: [], // ["정규직", "비정규직", "계약직"]
    salary: [0, 15000],
    applyDate: "",
  })

  const handleFilterChange = (newFilters: Partial<FilterState>) =>
    setFilters(f => ({ ...f, ...newFilters }))
  const handleFilterReset = () => setFilters({
    location: "",
    experience: [],
    education: "",
    employmentType: [],
    salary: [0, 15000],
    applyDate: "",
  })

  // Fetch talents from backend
  const [talents, setTalents] = useState<TalentModel[]>([])
  useEffect(() => {
    axios.get<ApiResult<TalentDto[]>>("http://localhost:8080/business/talents")
      .then(response => {
        const dtos = response.data.data
        const enriched = dtos.map(d => ({
          id: d.id,
          name: d.name,
          title: d.title,
          location: d.location,
          experience: d.experience,
          education: d.education,
          skills: d.skills,
          moreSkills: d.moreSkills,
          profileImageKey: d.profileImageKey,
          description: d.description,
          employmentType: '',
          salary: 0,
          applyDate: '',
          bookmarked: false,
        }))
        setTalents(enriched)
      })
      .catch(console.error)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <BusinessHeader />
      <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl">
        <TalentsHeader />
        <TalentsSearch
          onFilterToggle={() => setIsFilterOpen(!isFilterOpen)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="flex mt-4 gap-6">
          {isFilterOpen && (
            <div className="w-64 shrink-0">
              <TalentsFilter
                filters={filters}
                onFilterChange={handleFilterChange}
                onFilterReset={handleFilterReset}
                onClose={() => setIsFilterOpen(false)}
              />
            </div>
          )}

          <div className="flex-1">
            <TalentsGrid talents={talents} searchQuery={searchQuery} filters={filters} />
          </div>
        </div>
      </main>
    </div>
  )
}
