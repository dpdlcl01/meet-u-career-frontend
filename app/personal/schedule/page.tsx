"use client";

import { Header } from "@/components/home/Header";
import { MainNavigation } from "@/components/home/MainNavigation";
import { UnifiedScheduleContent } from "@/components/common/schedule/UnifiedScheduleContent";
import {
  mapDtoToScheduleItem,
  createPersonalSchedule,
  updatePersonalSchedule,
  deletePersonalSchedule,
} from "@/components/personal/schedule/ScheduleContent";
import { ScheduleHeader } from "@/components/personal/schedule/ScheduleHeader";
import { Footer } from "@/components/home/Footer";
import { useUserStore } from "@/store/useUserStore";
import { LoginHeader } from "@/components/home/LoginHeader";

export default function SchedulePage() {
  const { userInfo } = useUserStore();

  return (
    <div className="min-h-screen flex flex-col">
      {userInfo ? <LoginHeader /> : <Header />}
      <MainNavigation />
      <main className="flex-1 bg-gray-50">
        <UnifiedScheduleContent
          userType="personal"
          apiEndpoint="/api/personal/calendar/list"
          createSchedule={createPersonalSchedule}
          updateSchedule={updatePersonalSchedule}
          deleteSchedule={deletePersonalSchedule}
          mapDtoToScheduleItem={mapDtoToScheduleItem}
          headerComponent={<ScheduleHeader />}
        />
      </main>
      <Footer />
    </div>
  );
}
