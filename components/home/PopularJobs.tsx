import type { JobProps } from "@/types/job";
import { calculateDday } from "@/common/dateUtils";
import { JobCard } from "./JobCard";
import { SkeletonJobCard } from "./SkeletonJobCard";

interface PopularJobProps {
  popular: JobProps[];
  isLoading?: boolean;
}

export const PopularJobs = ({
  popular,
  isLoading = false,
}: PopularJobProps) => {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <strong className="text-lg font-normal block text-[#292e41]">
          조회수 높은 공고
        </strong>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
            <SkeletonJobCard key={index} />
          ))
          : popular.map((job, index) => (
            <JobCard
              key={job.id}
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
