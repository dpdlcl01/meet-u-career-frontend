import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export const Pagination = () => {
  return (
    <div className="flex items-center gap-1">
      <Button variant="outline" size="icon" className="h-8 w-8 p-0 border-gray-300">
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button className="h-8 w-8 p-0 bg-blue-500 hover:bg-blue-600">1</Button>

      <Button variant="outline" className="h-8 w-8 p-0 border-gray-300">
        2
      </Button>

      <Button variant="outline" size="icon" className="h-8 w-8 p-0 border-gray-300">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}