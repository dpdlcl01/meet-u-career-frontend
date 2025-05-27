import { useState, useEffect } from "react";
import { apiClient } from "@/api/apiClient";
import { TalentsGrid } from "./TalentsGrid";
import { TalentsFilter } from "./TalentsFilter";
import { BusinessHeader } from "../layout/BusinessHeader";
import { TalentsHeader } from "./TalentsHeader";
import { TalentsSearch } from "./TalentsSearch";

// Filter state type
type DateRange = "" | "1w" | "1m" | "3m";
interface FilterState {
  location: string;
  experience: string[];
  education: string;
  employmentType: string[];
  salary: number[];
  applyDate: DateRange;
}

// Backend DTO for talent
interface TalentDto {
  id: number;
  name: string;
  title: string;
  location: string;
  experience: string;
  education: string;
  skills: string[];
  moreSkills: number;
  description: string;
  profileImageKey: string;
}

// API response wrapper
interface ApiResult<T> {
  code: number;
  message: string;
  count: number;
  data: T;
}

// Front-end Model for talent
interface TalentModel extends TalentDto {
  employmentType: string;
  salary: number;
  applyDate: string;
  bookmarked: boolean;
}

export const BusinessTalentsSearch = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    location: "",
    experience: [], // ["0-2", "3-5", "5+"]
    education: "",
    employmentType: [], // ["정규직", "비정규직", "계약직"]
    salary: [0, 15000],
    applyDate: "",
  });

  const handleFilterChange = (newFilters: Partial<FilterState>) =>
    setFilters((f) => ({ ...f, ...newFilters }));
  const handleFilterReset = () =>
    setFilters({
      location: "",
      experience: [],
      education: "",
      employmentType: [],
      salary: [0, 15000],
      applyDate: "",
    });

  // Talents data with loading and error handling
  const [talents, setTalents] = useState<TalentModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTalents = async () => {
      setLoading(true); // Start loading
      try {
        const response = await apiClient.get<ApiResult<TalentDto[]>>(
          "/api/business/talents"
        );
        const dtos = response.data.data || []; // 데이터가 없을 경우 빈 배열로 설정
        const enriched = dtos.map((d) => ({
          id: d.id,
          name: d.name,
          title: d.title,
          location: d.location,
          experience: d.experience,
          education: d.education,
          skills: d.skills,
          moreSkills: d.moreSkills,
          profileImageKey: d.profileImageKey,
          description: d.description,
          employmentType: "",
          salary: 0,
          applyDate: "",
          bookmarked: false,
        }));
        setTalents(enriched);
      } catch (err) {
        console.error(err);
        setError("인재 목록을 불러오는데 실패했습니다.");
        setTalents([]); // 오류 발생 시 빈 배열로 설정
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchTalents();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <BusinessHeader />
      <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl">
        <TalentsHeader />
        <TalentsSearch
          onFilterToggle={() => setIsFilterOpen(!isFilterOpen)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="flex mt-4 gap-6">
          {isFilterOpen && (
            <div className="w-64 shrink-0">
              <TalentsFilter
                filters={filters}
                onFilterChange={handleFilterChange}
                onFilterReset={handleFilterReset}
                onClose={() => setIsFilterOpen(false)}
              />
            </div>
          )}

          <div className="flex-1">
            {/* 로딩 상태, 에러 상태, 그리고 정상 데이터 상태 처리 */}
            {loading ? (
              <div className="py-8 text-center text-gray-400">
                불러오는 중...
              </div>
            ) : error ? (
              <div className="py-8 text-center text-red-500">{error}</div>
            ) : (
              <TalentsGrid
                talents={talents}
                searchQuery={searchQuery}
                filters={filters}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
