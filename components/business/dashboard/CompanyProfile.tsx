import Image from "next/image";
import Link from "next/link";
import { Building, MapPin, Users } from "lucide-react";
import { BusinessDashboardData } from "@/lib/fetchBusinessDashboard";

interface Props {
  data: BusinessDashboardData;
}

export const CompanyProfile = ({ data }: Props) => {
  const companyName = data.companyName || "회사명 미제공";
  const industry = data.industry || "산업 미제공";
  const address = data.address || "주소 미제공";
  const employeeScale = data.employeeScale || "직원 수 미제공";
  const foundedDate = data.foundedDate || "설립일 미제공";

  return (
    <div className="bg-white rounded-md shadow-sm p-6 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
            <Image
              src="/images/etc/placeholder.svg?height=64&width=64"
              alt="Company logo"
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-lg font-medium">{companyName}</h1>
            <div className="flex items-center mt-2 text-sm text-gray-600">
              <div className="flex items-center mr-4">
                <Building className="h-4 w-4 mr-1 text-blue-500" />
                <span>{industry}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                <span>{address}</span>
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm text-gray-600">
              <div className="flex items-center mr-4">
                <Users className="h-4 w-4 mr-1 text-blue-500" />
                <span>{employeeScale}</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-500 mr-1">•</span>
                <span>{foundedDate}</span>
              </div>
            </div>
          </div>
        </div>
        <Link
          href="/business/profile"
          className="flex items-center text-sm text-gray-600 border border-gray-300 rounded-md px-3 py-1.5 hover:bg-gray-50"
        >
          <span className="mr-1">기업정보 수정</span>
        </Link>
      </div>
    </div>
  );
};
