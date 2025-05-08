"use client";
import { useEffect, useState } from "react";

export interface CompanyInfoDTO {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  businessNumber: string;
  representativeName: string;
  industry: string;
  foundedDate: string;
  numEmployees: number;
  revenue: number;
  website: string;
  logoKey: string;
  address: string;
  companyType: string;
  corpCode: string;
  operatingProfit: number;
  status: number;
  avgAnnualSalary: number;
}

interface EmployeeStatisticsProps {
  companyId: string;
}

export const EmployeeStatistics = ({ companyId }: EmployeeStatisticsProps) => {
  const [company, setCompany] = useState<CompanyInfoDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!companyId) return;
    setLoading(true);
    fetch(`/api/personal/companies/${companyId}/info`)
      .then((res) => res.json())
      .then((data) => {
        setCompany(data.data);
        setError(null);
      })
      .catch(() => {
        setError("기업 정보를 불러오지 못했습니다.");
        setCompany(null);
      })
      .finally(() => setLoading(false));
  }, [companyId]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 설립`;
  };
  const formatNumber = (num?: number) => (num || 0).toLocaleString();


};
