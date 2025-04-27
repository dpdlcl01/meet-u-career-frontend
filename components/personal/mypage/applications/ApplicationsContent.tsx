import { useState, useEffect } from "react";
import axios from "axios";
import { ApplicationsHeader } from "./ApplicationsHeader";
import { ApplicationsStats } from "./ApplicationsStats";
import { ApplicationsTabs } from "./ApplicationsTabs";
import { ApplicationsSearch } from "./ApplicationsSearch";
import { ApplicationsFilter } from "./ApplicationsFilter";
import { ApplicationsTable } from "./ApplicationsTable";
import { ApplicationsPagination } from "./ApplicationsPagination";


export const ApplicationsContent = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // activeTab은 상태코드(null, 0, 1, 2)
  const [activeTab, setActiveTab] = useState<null | number>(null);
  // 검색어 상태
  const [search, setSearch] = useState('');
  // 기간 필터 상태
  const [duration, setDuration] = useState<string>('all');
  // 정렬 상태
  const [sort, setSort] = useState<string>('recent');

  useEffect(() => {
    setLoading(true);
    /*
    //
    // 테스트 profileId 수정필수!!
    //
    */
    const profileId = 2;
    axios.get(`/api/personal/mypage/applications?profileId=${profileId}`, { withCredentials: true })
      .then(res => {
        // If backend wraps in ResultData, use res.data.data
        const list = Array.isArray(res.data) ? res.data : res.data.data;
        // Status code to label mapping
        const statusMap: Record<number, string> = {
          0: "지원완료",
          1: "서류통과",
          2: "면접예정",
          3: "최종합격",
          4: "불합격",
        };
        const mapped = list.map((item: any) => ({
          id: item.applicationId,
          company: item.companyName,
          position: item.jobTitle,
          appliedAt: item.appliedAt ? new Date(item.appliedAt).toLocaleString() : '-',
          deadline: item.expirationDate ? new Date(item.expirationDate).toLocaleDateString() : '-',
          status: statusMap[item.status] || 'Unknown', // 화면 표시용
          _status: item.status, // 실제 코드값(필터링용)
          resume: item.resumeTitle || '-',
        }));
        setApplications(mapped);
        setLoading(false);
      })
      .catch(err => {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      });
  }, []);

  // 날짜 필터링 함수
  function isWithinDuration(app: any): boolean {
    if (duration === 'all') return true;
    if (!app.appliedAt || app.appliedAt === '-') return false;
    // app.appliedAt is in locale string, so parse to Date
    const appDate = new Date(app.appliedAt);
    const now = new Date();
    if (duration === 'today') {
      return appDate.toDateString() === now.toDateString();
    }
    if (duration === '7days') {
      const diff = (now.getTime() - appDate.getTime()) / (1000 * 60 * 60 * 24);
      return diff <= 7 && diff >= 0;
    }
    if (duration === 'month') {
      return appDate.getFullYear() === now.getFullYear() && appDate.getMonth() === now.getMonth();
    }
    return true;
  }

  // 1차: 검색어 필터 (기업명, 공고)
  const searchFiltered = search.trim() === ''
    ? applications
    : applications.filter(app =>
      app.company.toLowerCase().includes(search.trim().toLowerCase()) ||
      app.position.toLowerCase().includes(search.trim().toLowerCase())
    );

  // 2차: 기간 필터
  const dateFiltered = searchFiltered.filter(isWithinDuration);

  // 3차: activeTab(상태코드) 필터
  const tabFiltered = activeTab === null
    ? dateFiltered
    : dateFiltered.filter(app => app._status === activeTab);

  // 4차: 정렬
  const filtered = [...tabFiltered].sort((a, b) => {
    if (sort === 'recent') {
      // 최신순: appliedAt 내림차순
      const dateA = a.appliedAt && a.appliedAt !== '-' ? new Date(a.appliedAt).getTime() : 0;
      const dateB = b.appliedAt && b.appliedAt !== '-' ? new Date(b.appliedAt).getTime() : 0;
      return dateB - dateA;
    } else if (sort === 'name') {
      // 가나다순: company, 그 다음 position 오름차순
      const comp = a.company.localeCompare(b.company, 'ko')
      if (comp !== 0) return comp;
      return a.position.localeCompare(b.position, 'ko');
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      <ApplicationsHeader />
      <ApplicationsStats
        total={applications.length}
        applied={applications.filter(a => a._status === 0).length}
        passed={applications.filter(a => a._status === 1).length}
        rejected={applications.filter(a => a._status === 2).length}
      />
      <div className="bg-white rounded-lg shadow-sm p-6">
        <ApplicationsTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          total={applications.length}
          applied={applications.filter(a => a._status === 0).length}
          passed={applications.filter(a => a._status === 1).length}
          rejected={applications.filter(a => a._status === 2).length}
        />
        <div className="mt-6 space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <ApplicationsSearch
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />
            <ApplicationsFilter
              duration={duration}
              onDurationChange={setDuration}
              sort={sort}
              onSortChange={setSort}
            />
          </div>
          {loading ? (
            <div className="py-8 text-center text-gray-400">불러오는 중...</div>
          ) : error ? (
            <div className="py-8 text-center text-red-500">{error}</div>
          ) : (
            <ApplicationsTable data={filtered} />
          )}
          <ApplicationsPagination />
        </div>
      </div>
    </div>
  );
};