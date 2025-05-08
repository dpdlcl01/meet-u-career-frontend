import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ResumeApplicationDetail,
  type ApplicantStatus,
  statusColors,
} from "@/types/applicants";
import Image from "next/image";

interface BasicInfoCardProps {
  applicant: ResumeApplicationDetail;
  status: ApplicantStatus;
}

export const BasicInfoCard = ({ applicant, status }: BasicInfoCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>기본 정보</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* 프로필 사진 */}
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border mt-2">
            {applicant.profileImageUrl ? (
              <div className="relative w-32 h-32">
                <Image
                  src={applicant.profileImageUrl}
                  alt="프로필 사진"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
            ) : (
              <div className="relative w-32 h-32">
                <Image
                  src="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/profile.png"
                  alt="프로필 사진"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
            )}
          </div>

          {/* 기본 정보 */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">이름</p>
              <p className="font-medium">{applicant.applicantName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">이메일</p>
              <p className="font-medium">{applicant.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">전화번호</p>
              <p className="font-medium">{applicant.phoneNumber}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">지원 포지션</p>
              <p className="font-medium">{applicant.position}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">지원일</p>
              <p className="font-medium">{applicant.appliedDate}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">현재 상태</p>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
              >
                {status}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
