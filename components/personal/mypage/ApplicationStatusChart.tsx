"use client"

import { useEffect, useRef } from "react"

interface Summary {
  passedDocument: number
  interview1st: number
  finalAccepted: number
  rejected: number
}

interface Props {
  data: Summary
}

export function ApplicationStatusChart({ data }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const size = 150
    canvas.width = size
    canvas.height = size

    const chartData = [
      { value: data.passedDocument, color: "#569ad6" },
      { value: data.interview1st, color: "#d66156" },
      { value: data.finalAccepted, color: "#d68556" },
      { value: data.rejected, color: "#8356d6" },
    ].filter(item => item.value > 0)

    const total = chartData.reduce((sum, item) => sum + item.value, 0)

    let startAngle = 0
    chartData.forEach((item) => {
      const sliceAngle = (2 * Math.PI * item.value) / total

      ctx.beginPath()
      ctx.moveTo(size / 2, size / 2)
      ctx.arc(size / 2, size / 2, size / 2 - 10, startAngle, startAngle + sliceAngle)
      ctx.closePath()

      ctx.fillStyle = item.color
      ctx.fill()
      startAngle += sliceAngle
    })

    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 4, 0, 2 * Math.PI)
    ctx.fillStyle = "white"
    ctx.fill()

    ctx.font = "bold 20px Arial"
    ctx.fillStyle = "#1F2937"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(total.toString(), size / 2, size / 2 - 5)

    ctx.font = "12px Arial"
    ctx.fillStyle = "#6B7280"
    ctx.fillText("건", size / 2, size / 2 + 15)
  }, [data])

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full">
      <div className="flex flex-col items-center">
        <canvas ref={canvasRef} width="150" height="150" />

        <div className="grid grid-cols-2 gap-2 mt-4 text-sm w-full max-w-[180px]">
          <LegendDot color="#569ad6" label="서류 통과" value={data.passedDocument} />
          <LegendDot color="#d66156" label="1차 면접" value={data.interview1st} />
          <LegendDot color="#d68556" label="최종 합격" value={data.finalAccepted} />
          <LegendDot color="#8356d6" label="불합격" value={data.rejected} />
        </div>
      </div>
    </div>
  )
}

function LegendDot({ color, label, value }: { color: string, label: string, value: number }) {
  return (
    <div className="flex items-center">
      <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color }}></span>
      <span className="text-xs text-gray-600">{label}</span>
      <span className="ml-auto text-xs font-medium">{value}건</span>
    </div>
  )
}
