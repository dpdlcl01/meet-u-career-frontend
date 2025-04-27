import { Eye, Trash2 } from "lucide-react"
import { ApplicationStatusBadge } from "./ApplicationStatusBadge"

export const ApplicationsTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-xs text-gray-600 bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 font-medium">
              기업명/공고
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              지원일
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              마감일
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              지원상태
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              지원이력서
            </th>
            <th scope="col" className="px-6 py-3 font-medium text-center">
              관리
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-8 text-gray-400">해당 상태의 지원 내역이 없습니다.</td>
            </tr>
          ) : (
            data.map(app => (
              <tr key={app.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{app.company}</div>
                  <div className="text-gray-500">{app.position}</div>
                </td>
                <td className="px-6 py-4">{app.appliedAt}</td>
                <td className="px-6 py-4">{app.deadline}</td>
                <td className="px-6 py-4">
                  <ApplicationStatusBadge status={app.status} />
                </td>
                <td className="px-6 py-4">{app.resume}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center space-x-2">
                    {/* 삭제 버튼 클릭 시 지원 취소 API 호출 */}
                    <button
                      type="button"
                      className="p-1.5 text-gray-500 hover:text-red-500 focus:outline-none"
                      aria-label="삭제"
                      onClick={async () => {
                        // 한글 확인창
                        if (!window.confirm("정말로 이 지원을 취소하시겠습니까?")) return;
                        try {
                          // profileId는 테스트용으로 2로 하드코딩
                          await import("axios").then(({ default: axios }) =>
                            axios.put(
                              `/api/personal/mypage/applications/delete/${app.id}?profileId=2`,
                              {},
                              { withCredentials: true }
                            )
                          );
                          alert("지원이 취소되었습니다.");
                          // 새로고침으로 목록 갱신
                          window.location.reload();
                        } catch (e: any) {
                          alert("지원 취소 중 오류가 발생했습니다. 다시 시도해 주세요.");
                        }
                      }}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
