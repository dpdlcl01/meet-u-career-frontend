import { Info, X } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

export interface Log {
  id: string;
  userId: string;
  type: string;
  action: string;
  ipAddress: string;
  createdAt: string;
}

export interface LogsTableProps {
  filter: {
    startDate: string;
    endDate: string;
    logType: string;
    keyword: string;
  };
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "SECURITY":
      return "bg-orange-100 text-orange-800";
    case "TRANSACTION":
      return "bg-green-100 text-green-800";
    case "SYSTEM":
      return "bg-blue-100 text-blue-800";
    case "USER":
      return "bg-purple-100 text-purple-800";
    case "ERROR":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function LogsTable({ filter }: LogsTableProps) {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/admin/logs")
      .then((res) => setLogs(res.data.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [filter]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  const closeModal = () => setSelectedLog(null);

  const filteredLogs = logs.filter((log) => {
    // filter by selected type if provided
    if (filter.logType && log.type !== filter.logType) {
      return false;
    }
    // filter by date range (inclusive)
    const logDate = log.createdAt?.slice(0, 10); // YYYY-MM-DD
    if (filter.startDate && logDate < filter.startDate) {
      return false;
    }
    if (filter.endDate && logDate > filter.endDate) {
      return false;
    }
    // filter by keyword (userId, action, ipAddress)
    const keyword = filter.keyword.trim().toLowerCase();
    if (keyword) {
      const userId = log.userId?.toLowerCase() || "";
      const action = log.action?.toLowerCase() || "";
      const ip = log.ipAddress?.toLowerCase() || "";
      if (!userId.includes(keyword) && !action.includes(keyword) && !ip.includes(keyword)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredLogs.map((log) => (
            <tr
              key={log.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedLog(log)}
            >
              <td className="px-6 py-4 text-sm font-medium text-amber-800">{log.id}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{log.userId}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(log.type)}`}>{log.type}</span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">{log.action}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{log.ipAddress}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{log.createdAt}</td>
              <td className="px-6 py-4 text-right text-sm font-medium">
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={(e) => { e.stopPropagation(); setSelectedLog(log); }}
                >
                  <Info className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedLog && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <X className="h-5 w-5" />
            </button>
            <div className="space-y-2">
              <p><strong>ID:</strong> {selectedLog.id}</p>
              <p><strong>User:</strong> {selectedLog.userId}</p>
              <p><strong>Type:</strong> {selectedLog.type}</p>
              <p><strong>Action:</strong> {selectedLog.action}</p>
              <p><strong>IP:</strong> {selectedLog.ipAddress}</p>
              <p><strong>Date:</strong> {selectedLog.createdAt}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}