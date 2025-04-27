"use client"

import { useEffect, useState } from "react"
import {
  fetchCompanyList,
  fetchCompanyDetail,
} from "@/lib/companyAdmin"
import CompanyDetailModal from "./CompanyDetailModal"
import type { CompanyDetail } from "@/types/admin/CompanyDetail"

interface CompanyTableProps {
  activeTab: "all" | "pending" | "approved"
}

type SortOption = "default" | "foundedDate" | "size"

const ITEMS_PER_PAGE = 5

export default function CompanyTable({ activeTab }: CompanyTableProps) {
  const [companies, setCompanies] = useState<CompanyDetail[]>([])
  const [selected, setSelected] = useState<CompanyDetail | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [searchText, setSearchText] = useState("")
  const [keyword, setKeyword] = useState("")
  const [sortOption, setSortOption] = useState<SortOption>("default")

  // 🔁 debounce keyword (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setKeyword(searchText.trim())
      setCurrentPage(1)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchText])

  // 📡 기업 목록 불러오기
  const load = async () => {
    const res = await fetchCompanyList(
      currentPage - 1,
      ITEMS_PER_PAGE,
      activeTab,
      keyword,
      sortOption
    )
    setCompanies(res.content ?? [])
    setTotalPages(res.totalPages)
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab, sortOption])

  useEffect(() => {
    load()
  }, [currentPage, activeTab, keyword, sortOption])

  const openDetail = async (id: number) => {
    const detail = await fetchCompanyDetail(id)
    setSelected(detail)
  }

  const updateStatus = (id: number, newStatusName: string) => {
    setCompanies((prev) =>
      prev.map((company) =>
        company.id === id ? { ...company, statusName: newStatusName } : company
      )
    )
  }

  return (
    <>
      {/* 🔍 검색 + 정렬 */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="search"
          placeholder="기업명 검색"
          className="w-full max-w-[1200px] px-4 py-2 border rounded-md text-l"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
          className="px-4 py-2 border rounded-md text-l"
        >
          <option value="default">전체</option>
          <option value="foundedDate">설립일 순</option>
          <option value="size">규모 순</option>
        </select>
      </div>

      {/* 📄 테이블 */}
      <table className="w-full text-base text-left mt-6 border-t table-fixed">
        <thead className="bg-gray-100">
          <tr className="h-[56px]">
            <th className="px-4 w-[5%] text-center">No</th>
            <th className="px-4 w-[15%]">기업명</th>
            <th className="px-4 w-[15%]">업종</th>
            <th className="px-4 w-[10%]">규모</th>
            <th className="px-4 w-[15%]">설립일</th>
            <th className="px-4 w-[25%]">주소</th>
            <th className="px-4 w-[10%]">상태</th>
            <th className="px-4 w-[10%] text-center">관리</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => {
            const company = companies[idx]
            return (
              <tr key={idx} className="border-b hover:bg-gray-50 h-[56px]">
                <td className="px-4 text-center">{(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}</td>
                <td className="px-4">{company?.name ?? "-"}</td>
                <td className="px-4">{company?.industry ?? "-"}</td>
                <td className="px-4">{company?.numEmployees ? `${company.numEmployees}명` : "-"}</td>
                <td className="px-4">{company?.foundedDate ?? "-"}</td>
                <td className="px-4 truncate">{company?.address ?? "-"}</td>
                <td className="px-4">{renderStatus(company?.statusName ?? "-")}</td>
                <td className="px-4 text-center">
                  {company ? (
                    <button
                      onClick={() => openDetail(company.id)}
                      className="text-blue-600 border border-blue-500 bg-blue-50 hover:bg-blue-100 rounded px-2 py-1 text-xs"
                    >
                      상세
                    </button>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* ⬅️ 페이지네이션 */}
      <div className="mt-6 flex justify-center items-center gap-2 text-base min-h-[48px]">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`px-2 py-1 rounded border min-w-[50px] h-[38px] ${
            currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"
          }`}
        >
          이전
        </button>

        {Array.from({ length: totalPages }, (_, idx) => idx + 1)
          .slice(Math.max(0, currentPage - 3), Math.max(5, Math.min(totalPages, currentPage + 2)))
          .map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded border min-w-[40px] h-[38px] ${
                page === currentPage ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`px-2 py-1 rounded border min-w-[50px] h-[38px] ${
            currentPage === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"
          }`}
        >
          다음
        </button>
      </div>

      {/* 🔍 상세 모달 */}
      <CompanyDetailModal
        company={selected}
        onClose={() => setSelected(null)}
        onChange={(newStatus) => {
          if (selected) updateStatus(selected.id, newStatus)
        }}
      />
    </>
  )
}

function renderStatus(status: string) {
  if (status === "활성") return <span className="text-green-600 font-medium">{status}</span>
  if (status === "대기") return <span className="text-yellow-600 font-medium">{status}</span>
  if (["비활성", "차단됨", "거부"].includes(status))
    return <span className="text-red-600 font-medium">{status}</span>
  return status
}
