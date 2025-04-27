"use client"

import type React from "react"

import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface FilterSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export const FilterSection = ({ title, children, defaultOpen = false }: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div>
      <button
        className="w-full px-3 py-2.5 flex items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="font-medium text-sm">{title}</h4>
        {isOpen ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
      </button>

      <div className={cn(isOpen ? "block" : "hidden")}>{children}</div>
    </div>
  )
}