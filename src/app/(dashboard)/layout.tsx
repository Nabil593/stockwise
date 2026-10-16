"use client";

import { Suspense, useState } from "react";
import type { ReactNode } from "react";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function UserDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      {/* Sidebar */}
      <Suspense
        fallback={
          <div className="hidden w-64 animate-pulse bg-white lg:block" />
        }
      >
        <DashboardSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </Suspense>

      {/* Main Content */}
      <div className="min-w-0 flex-1">
        {/* Header */}
        <Suspense
          fallback={
            <div className="h-[70px] animate-pulse border-b border-slate-200 bg-white" />
          }
        >
          <DashboardHeader
            onMenuClick={() => setSidebarOpen(true)}
          />
        </Suspense>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}