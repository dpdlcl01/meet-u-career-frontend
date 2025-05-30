import type { JobProps } from "@/types/job";
import { calculateDday } from "@/common/dateUtils";
import { JobCard } from "./JobCard";

interface BasicJobProps {
  premium: JobProps[];
}

export const BasicJobs = ({ premium }: BasicJobProps) => {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <strong className="text-lg font-normal block text-[#292e41]">
          베이직 광고
        </strong>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {premium.map((job, index) => (
          <JobCard
            key={index}
            index={job.id}
            title={job.title}
            company={job.name}
            dDay={calculateDday(job.expirationDate)}
            hasImage={true}
          />
        ))}
      </div>
    </section>
  );
};
