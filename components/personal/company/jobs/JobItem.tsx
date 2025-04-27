"use client"
import { MapPin, Clock, Users, Building } from "lucide-react"

interface JobItemProps {
  job: {
    id: string
    title: string
    departments: string[]
    skills?: string[]
    experience: string
    employmentType: string
    location: string
    deadline: string
    daysLeft: string
  }
  isExpired?: boolean
}

export const JobItem = ({ job, isExpired = false }: JobItemProps) => {
  return (
    <div className="border rounded-md overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium">{job.title}</h3>
          {!isExpired && (
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span className="text-gray-500">{job.daysLeft}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {job.departments.map((department, index) => (
            <span key={index} className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
              {department}
            </span>
          ))}
          {job.skills &&
            job.skills.map((skill, index) => (
              <span key={index} className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
                {skill}
              </span>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-gray-500 mb-3">
          <div className="flex items-center">
            <Users className="h-3.5 w-3.5 mr-1.5" />
            <span>{job.experience}</span>
          </div>
          <div className="flex items-center">
            <Building className="h-3.5 w-3.5 mr-1.5" />
            <span>{job.employmentType}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-3.5 w-3.5 mr-1.5" />
            <span>{job.location}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{job.deadline}</span>
            {isExpired && <span className="ml-2 text-gray-500">{job.daysLeft}</span>}
          </div>
          <button className="px-4 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            {isExpired ? "마감된 공고" : "지원하기"}
          </button>
        </div>
      </div>
    </div>
  )
}