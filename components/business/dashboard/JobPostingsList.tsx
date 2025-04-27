interface Props {
  data: {
    jobPostingId: number;
    title: string;
    location: string;
    postedDate: string;
    deadline: string;
    viewCount: number;
    applicationCount: number;
    industry: string;
    jobType: string;
    salaryRange: string;
    keyword: string;
  }[] | undefined;
}

export const JobPostingsList = ({ data }: Props) => {
  return (
    <div className="bg-white rounded-md shadow-sm p-6">
      <h2 className="text-lg font-medium mb-4">채용공고 목록</h2>
      <div className="space-y-4">
        {Array.isArray(data) && data.length === 0 ? (
          <div className="text-gray-500 text-center py-8">등록된 채용공고가 없습니다.</div>
        ) : (
          data?.map((job) => (
            <div key={job.jobPostingId} className="border border-gray-200 rounded-md p-4 hover:shadow-sm transition-shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">{job.title}</h3>
                  <div className="text-sm text-gray-500 mt-1">
                    {job.location} | {job.jobType} | {job.salaryRange}
                  </div>
                </div>
                <div className="flex space-x-4 items-center">
                  <div className="text-sm text-gray-500">조회 {job.viewCount}</div>
                  <div className="text-sm text-gray-500">지원 {job.applicationCount}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
