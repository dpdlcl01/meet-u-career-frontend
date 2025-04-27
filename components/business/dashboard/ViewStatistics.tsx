import { BusinessDashboardData } from "@/lib/fetchBusinessDashboard";
import { Eye, Users } from "lucide-react";

interface Props {
  data: BusinessDashboardData;
}

export const ViewStatistics = ({ data }: Props) => {
  return (
    <div className="bg-white rounded-md shadow-sm p-6 mb-6">
      <h2 className="text-lg font-medium mb-4">채용 현황</h2>
      <div className="grid grid-cols-2 gap-8 text-center">
        <div>
          <Eye className="h-8 w-8 mx-auto text-blue-500" />
          <p className="mt-2 text-sm text-gray-600">전체 조회수</p>
          <p className="text-2xl font-bold mt-1">
            {(data?.totalViews ?? 0).toLocaleString()}명
          </p>
        </div>
        <div>
          <Users className="h-8 w-8 mx-auto text-green-500" />
          <p className="mt-2 text-sm text-gray-600">전체 지원자수</p>
          <p className="text-2xl font-bold mt-1">
            {(data?.totalApplications ?? 0).toLocaleString()}명
          </p>
        </div>
      </div>
    </div>
  );
};
