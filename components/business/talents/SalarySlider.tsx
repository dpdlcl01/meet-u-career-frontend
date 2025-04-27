
"use client"

import { useState } from "react"
import * as Slider from "@radix-ui/react-slider"

interface SalarySliderProps {
  value: number[]
  onValueChange: (val: number[]) => void
}

export const SalarySlider = ({ value, onValueChange }: SalarySliderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-xs text-gray-500">
        <span>최소</span>
        <span>최대</span>
      </div>

      <div className="relative pt-1">
        <div className="h-1 bg-gray-200 rounded-full">
          <div
            className="absolute h-1 bg-blue-500 rounded-full"
            style={{
              left: `${(value[0] / 15000) * 100}%`,
              width: `${((value[1] - value[0]) / 15000) * 100}%`,
            }}
          ></div>
        </div>

        <Slider.Root
          className="relative flex items-center w-full h-5 select-none touch-none"
          value={value}
          max={15000}
          step={100}
          onValueChange={onValueChange}
        >
          <Slider.Track className="relative h-1 w-full grow rounded-full bg-transparent">
            <Slider.Range className="absolute h-full bg-transparent" />
          </Slider.Track>
          <Slider.Thumb
            className="block h-4 w-4 rounded-full bg-blue-500 shadow-md focus:outline-none"
            aria-label="Minimum salary"
          />
          <Slider.Thumb
            className="block h-4 w-4 rounded-full bg-blue-500 shadow-md focus:outline-none"
            aria-label="Maximum salary"
          />
        </Slider.Root>
      </div>

      <div className="text-center text-sm font-medium">
        {value[0].toLocaleString()}만원 - {value[1].toLocaleString()}만원
      </div>
    </div>
  )
}
