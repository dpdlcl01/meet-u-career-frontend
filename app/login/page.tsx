"use client"

import { useState } from "react"
import { LoginHeader } from "@/components/login/Header"
import { LoginTabs } from "@/components/login/LoginTabs"
import { StatisticsSection } from "@/components/login/StatisticsSection"
import { Footer } from "@/components/home/Footer"

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"personal" | "business">("personal")

  const handleTabChange = (tab: "personal" | "business") => {
    setActiveTab(tab)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <LoginHeader />
      <main className="flex-1">
        <LoginTabs onTabChange={handleTabChange} />
        {activeTab === "business" && (
          <>
            <StatisticsSection />
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
