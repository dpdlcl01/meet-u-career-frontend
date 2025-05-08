export type ApplicantStatus =
  | "서류검토중"
  | "서류합격"
  | "서류불합격"
  | "면접완료";

export const statusMap: Record<number, ApplicantStatus> = {
  0: "서류검토중",
  1: "서류합격",
  2: "서류불합격",
  3: "면접완료",
};

export const statusToCodeMap: Record<ApplicantStatus, number> = {
  서류검토중: 0,
  서류합격: 1,
  서류불합격: 2,
  면접완료: 3,
}

export const statusColors: Record<ApplicantStatus, string> = {
  서류검토중: "bg-blue-100 text-blue-800",
  서류합격: "bg-green-100 text-green-800",
  서류불합격: "bg-red-100 text-red-800",
  면접완료: "bg-amber-100 text-amber-800",
};

export interface ResumeApplicationDetail {
  applicationId: number;
  profileId: number;
  applicantName: string;
  email: string;
  phoneNumber: string;
  position: string;
  appliedDate: string;
  applicationStatus: number; // 숫자로 유지

  profileImageUrl: string;

  resumeId: number;
  resumeTitle: string;
  overview: string;
  resumeTypeLabel: string;
  resumeFileName: string | null;
  resumeFileKey: string | null;
  resumeFileType: string | null;
  resumeFileUrl: string | null;
  resumeUrl: string | null;
  extraLink1: string | null;
  extraLink2: string | null;

  resumeContents: ResumeContentItem[];
  coverLetterTitle: string | null;
  coverLetterContents: CoverLetterContentItem[];

  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: string[];
  languages: Language[];
  certificates: Certificate[];
}


export interface Education {
  school: string;
  degree: string;
  period: string;
  gpa: string;
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
}

export interface Project {
  name: string;
  period: string;
  description: string;
  role: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Certificate {
  name: string;
  date: string;
}

export interface Applicant {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  applyDate: string;
  status: ApplicantStatus;
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
  languages: Language[];
  certificates: Certificate[];
  coverLetter: string;
}

export interface DynamicApplicantDetailProps {
  applicant: ResumeApplicationDetail;
  status: ApplicantStatus;
}

export interface ResumeContentItem {
  sectionTitle: string;
  organization: string;
  title: string;
  field: string;
  description: string;
  dateFrom: string | null;
  dateTo: string | null;
}

export interface CoverLetterContentItem {
  sectionTitle: string;
  content: string;
}

export interface CoverLetterContentProps {
  title: string | null;
  contents: CoverLetterContentItem[];
}

export interface DocumentsContentProps {
  fileName: string | null;
  fileType: string | null;
  fileUrl: string | null;
}

export interface ProfilePhotoCardProps {
  profileImageUrl: string;
}
