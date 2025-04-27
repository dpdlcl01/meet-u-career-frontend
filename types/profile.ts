export interface Profile {
    id: number;
    accountId: number;
    locationId?: number | null;
    experienceLevel?: number | null;
    educationLevel?: number | null;
    skills?: string | null;
    desiredJobCategoryId?: number | null;
    desiredLocationId?: number | null;
    desiredSalaryCode?: number | null;
    profileImageKey?: string | null;
    createdAt: string;
    updatedAt: string;
  }