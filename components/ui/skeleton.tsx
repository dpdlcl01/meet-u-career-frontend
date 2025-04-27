import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn("bg-gray-200 animate-pulse rounded", className)} />
}

export const SkeletonCard = () => (
  <div className="bg-gray-200 rounded-md shadow-sm p-6 animate-pulse">
    <div className="flex space-x-4 mb-4">
      <div className="w-16 h-16 bg-gray-300 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-3 bg-gray-300 rounded w-1/2" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-300 rounded w-1/3" />
      <div className="h-3 bg-gray-300 rounded w-1/2" />
    </div>
  </div>
);

export const SkeletonJobList = () => (
  <div className="space-y-4">
    {[...Array(5)].map((_, index) => (
      <div key={index} className="border border-gray-200 rounded-md p-4 animate-pulse">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mb-2" />
            <div className="h-3 bg-gray-300 rounded w-1/3" />
          </div>
          <div className="flex space-x-4 items-center">
            <div className="h-3 bg-gray-300 rounded w-16" />
            <div className="h-3 bg-gray-300 rounded w-16" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const SkeletonViewStatistics = () => (
  <div className="bg-white rounded-md shadow-sm p-6 mb-6 animate-pulse">
    <h2 className="text-lg font-medium mb-4 h-6 bg-gray-300 rounded w-1/4" />
    <div className="grid grid-cols-2 gap-8 text-center">
      <div>
        <div className="h-8 w-8 mx-auto bg-gray-300 rounded-full" />
        <p className="mt-2 text-sm text-gray-600 h-3 bg-gray-300 rounded w-1/2 mx-auto" />
        <p className="text-2xl font-bold mt-1 h-6 bg-gray-300 rounded w-1/3 mx-auto" />
      </div>
      <div>
        <div className="h-8 w-8 mx-auto bg-gray-300 rounded-full" />
        <p className="mt-2 text-sm text-gray-600 h-3 bg-gray-300 rounded w-1/2 mx-auto" />
        <p className="text-2xl font-bold mt-1 h-6 bg-gray-300 rounded w-1/3 mx-auto" />
      </div>
    </div>
  </div>
);

export const SkeletonJobStatistics = () => (
  <div className="grid grid-cols-4 gap-4 mb-6">
    {[...Array(4)].map((_, index) => (
      <div key={index} className="bg-white rounded-md shadow-sm p-4 flex items-center animate-pulse">
        <div className="mr-4 w-8 h-8 bg-gray-300 rounded-full" />
        <div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
          <div className="h-3 bg-gray-300 rounded w-1/3" />
        </div>
      </div>
    ))}
  </div>
);
