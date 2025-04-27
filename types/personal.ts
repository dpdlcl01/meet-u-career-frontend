// types/personal.ts

export interface mypagePersonalInfo {
  account: {
    id: number;
    email: string;
    name: string;
    profileImageKey: string;
  };
}

export interface PersonalMyPageInfo {
  account: {
    id: number;
    email: string;
    name: string;
    profileImageKey: string;
  };
  profile: {
    experienceLevel: number;
    skills: string;
    profileImageUrl: string;
  };
  resumeViewCount: number;
  offerCount: number;
  bookmarkCount: number;
  profileCompleteness: number;
  recentApplications: {
    companyName: string;
    jobTitle: string;
    status: number;
  }[];
  summary: {
    passedDocument: number;
    interview1st: number;
    finalAccepted: number;
    rejected: number;
  };
  recommendedJobs: {
    companyName: string;
    jobTitle: string;
    location: string;
    salaryRange: string;
    deadline: string;
    preferredSkills: string;
  }[];
  accessToken?: string;  // accessToken 속성 추가
}
