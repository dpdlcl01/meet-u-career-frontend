"use client";

import {
  type ResumeApplicationDetail,
  type ApplicantStatus,
  statusMap,
} from "@/types/applicants";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApplicantDetailHeader } from "./ApplicantDetailHeader";
import { BasicInfoCard } from "./BasicInfoCard";
import { StatusManagementCard } from "./StatusManagementCard";
import { ResumeContent } from "./ResumeContent";
import { CoverLetterContent } from "./CoverLetterContent";
import { DocumentsContent } from "./DocumentsContent";

interface ApplicantDetailProps {
  applicant: ResumeApplicationDetail | null;
  status: ApplicantStatus;
}

export default function ApplicantDetail({
  applicant,
  status,
}: ApplicantDetailProps) {
  if (!applicant) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Skeleton className="h-32 w-32 rounded-full" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-8 w-48" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <Skeleton className="h-6 w-40 mb-4" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ApplicantDetailHeader resumeId={applicant.resumeId} resumeTitle={applicant.resumeTitle} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <BasicInfoCard applicant={applicant} status={statusMap[applicant.applicationStatus]} />
          <Tabs defaultValue="resume">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="resume">이력서</TabsTrigger>
              <TabsTrigger value="coverLetter">자기소개서</TabsTrigger>
              <TabsTrigger value="documents">첨부 서류</TabsTrigger>
            </TabsList>

            <TabsContent value="resume">
              <ResumeContent applicant={applicant} />
            </TabsContent>

            <TabsContent value="coverLetter">
              <CoverLetterContent
                title={applicant.coverLetterTitle}
                contents={applicant.coverLetterContents}
              />
            </TabsContent>

            <TabsContent value="documents">
              <DocumentsContent
                fileName={applicant.resumeFileName}
                fileType={applicant.resumeFileType}
                fileUrl={applicant.resumeFileUrl}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <StatusManagementCard applicationId={applicant.applicationId} currentStatus={statusMap[applicant.applicationStatus]} onStatusChange={() => { }} />
        </div>
      </div>
    </div>
  );
}
