import { JobsHeader } from "./JobsHeader"
import { JobsList } from "./JobsList"

export const JobsContent = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <JobsHeader />
      <JobsList />
    </div>
  )
}
