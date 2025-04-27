"use client"

import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import AdminsStats from "./AdminsStats"
import AdminsSearch from "./AdminsSearch"
import AdminsTable from "./AdminsTable"
import AdminModal, { type AdminData } from "./AdminModal"
import { fetchAdmins, createAdmin, updateAdmin, deleteAdmin } from "@/lib/adminApi"

export default function AdminsManagement() {
  const [admins, setAdmins] = useState<AdminData[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentAdmin, setCurrentAdmin] = useState<AdminData | undefined>(undefined)
  const [modalMode, setModalMode] = useState<"add" | "edit">("add")
  const [searchKeyword, setSearchKeyword] = useState("")

  const loadAdmins = async () => {
    const data = await fetchAdmins(searchKeyword)
    setAdmins(data)
  }

  useEffect(() => {
    loadAdmins()
  }, [searchKeyword])

  const handleOpenAddModal = () => {
    setCurrentAdmin(undefined)
    setModalMode("add")
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (admin: AdminData) => {
    setCurrentAdmin(admin)
    setModalMode("edit")
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setCurrentAdmin(undefined)
  }

  const handleSaveAdmin = async (adminData: Partial<AdminData> & { password?: string }) => {
    try {
      if (modalMode === "add") {
        const dataToSend = {
          name: adminData.name,
          email: adminData.email,
          password: adminData.password,
          role: adminData.role, // ⭐️ level을 role로 변환
        }
        await createAdmin(dataToSend)
      } else if (modalMode === "edit" && currentAdmin) {
        const dataToSend = {
          id: currentAdmin.id!,
          name: adminData.name,
          email: adminData.email,
          password: adminData.password,
          role: adminData.role, // ⭐️ 수정할 때도 level → role 변환
        }
        await updateAdmin(dataToSend)
      }
      await loadAdmins()
      handleCloseModal()
    } catch (error: any) {
      console.error("⭐ 저장 실패", error.response?.data || error.message)
      alert("저장 실패: " + (error.response?.data?.msg || error.message))
    }
  }

  const handleDeleteAdmin = async (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      await deleteAdmin(id)
      await loadAdmins()
    }
  }

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">관리자 계정 관리</h1>
        <p className="text-gray-600">관리자 계정을 관리하고 권한을 설정합니다.</p>
      </div>

      <AdminsStats
        level1Count={admins.filter((a) => a.role === 1).length}
        level2Count={admins.filter((a) => a.role === 2).length}
      />

      <div className="bg-white rounded-lg shadow mt-6 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <AdminsSearch onSearch={handleSearch} />
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} />
            <span>관리자 추가</span>
          </button>
        </div>

        <AdminsTable admins={admins} onEdit={handleOpenEditModal} onDelete={handleDeleteAdmin} />
      </div>

      <AdminModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveAdmin}
        initialData={currentAdmin}
        mode={modalMode}
      />
    </div>
  )
}
