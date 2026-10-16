"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import DashboardSidebar from "@/components/shared/DashboardSidebar";
import DashboardHeader from "@/components/shared/DashboardHeader";

export default function UserDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-w-0 flex-1">
        <DashboardHeader
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}