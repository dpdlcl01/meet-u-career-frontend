"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { type ApplicantStatus, statusToCodeMap } from "@/types/applicants";
import { apiClient } from "@/api/apiClient";

interface StatusManagementCardProps {
  applicationId: number;
  currentStatus: ApplicantStatus;
  onStatusChange: (status: ApplicantStatus) => void;
}

const STATUSES: ApplicantStatus[] = [
  "서류검토중",
  "서류합격",
  "서류불합격",
  "면접완료",
];

export const StatusManagementCard = ({
  applicationId,
  currentStatus,
  onStatusChange,
}: StatusManagementCardProps) => {
  const [selected, setSelected] = useState<ApplicantStatus | "">("");

  useEffect(() => {
    if (currentStatus) {
      setSelected(currentStatus);
    }
  }, [currentStatus]);

  const handleChange = (value: string) => {
    const next = value as ApplicantStatus;
    const current = selected as ApplicantStatus;

    const isValidTransition =
      (current === "서류검토중" && (next === "서류합격" || next === "서류불합격")) ||
      (current === "서류합격" && next === "면접완료") ||
      (current === "서류불합격" && next === "면접완료");

    const isSame = current === next;

    // 허용된 전이 또는 동일 상태일 경우만 상태 변경
    if (isValidTransition || isSame) {
      setSelected(next);
    } else {
      alert("해당 상태로 변경할 수 없습니다.");
    }
  };

  const handleSave = async () => {
    if (!selected) return;

    try {
      const statusCode = statusToCodeMap[selected as ApplicantStatus];
      const response = await apiClient.put(`/api/business/applicants/${applicationId}/status`, {
        status: statusCode,
      });

      if (response.data?.msg === "success") {
        onStatusChange(selected as ApplicantStatus);
        alert("지원 상태가 성공적으로 변경되었습니다.");
      }
    } catch (error) {
      console.error("지원 상태 저장 실패:", error);
      alert("지원 상태 변경에 실패했습니다.");
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>지원 상태 변경</CardTitle>
      </CardHeader>
      <CardContent className="mt-2">
        <RadioGroup value={selected} onValueChange={handleChange}>
          {STATUSES.map((status) => (
            <div key={status} className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value={status} id={status} />
              <Label className="cursor-pointer" htmlFor={status}>{status}</Label>
            </div>
          ))}
        </RadioGroup>

        <div className="mt-4">
          <Button onClick={handleSave} className="w-full bg-[#1842a3]">
            저장
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};