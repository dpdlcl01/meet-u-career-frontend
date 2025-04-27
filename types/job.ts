export interface JobProps {
    id: string;
    title: string;
    name: string;
    industry: string;
    jobType: string;
    salaryRange: string;
    locationCode: string;
    viewCount: number;
    applyCount: number;
    expirationDate: string;
}

export interface JobCardProps {
    index: string;
    title: string;
    company: string;
    hashtag?: string;
    hasImage?: boolean;
    dDay: string;
    thumbnailUrl?: string;
}

export interface JobPostingType {
    id: number;
    jobPosting: {
        title: string;
        industry: string;
        jobType: string;
        jobUrl: string;
        locationCode: string;
        experienceLevel: number;
        educationLevel: number;
        salaryRange: string;
        postingDate: string;
        expirationDate: string;
        viewCount: number;
        applyCount: number;
        keyword: string;
        description: string | null;
    };
    company: {
        companyId: number;
        companyName: string;
        representativeName: string;
        industry: string;
        address: string;
        website: string;
        logoKey: string | null;
        foundedDate: string;
        numEmployees: number;
        revenue: number;
    };
    bookmarkCount: number;
    companyFollowCount: number;
    openJobPostingCount: number;
    interviewReviewCount: number;
    bookmarked: boolean;
    applied: boolean;
    companyFollowed: boolean;
    applicantStats: {
        totalApplicantCount: number;
        experienceStats: {
            newApplicantCount: number;
            experiencedApplicantCount: number;
        };
        educationStats: {
            highSchoolCount: number;
            collegeCount: number;
            universityCount: number;
            masterCount: number;
            doctorCount: number;
            etcCount: number;
        };
        salaryStats: {
            below4000Count: number;
            range4000to6000Count: number;
            range6000to8000Count: number;
            above8000Count: number;
            negotiableCount: number;
        };
    };
}
