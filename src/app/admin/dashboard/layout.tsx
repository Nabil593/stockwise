import type { ReactNode } from "react";
import DashboardHeader from "@/components/shared/DashboardHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface AdminDashboardLayoutProps {
  children: ReactNode;
}

export default function AdminDashboardLayout({
  children,
}: AdminDashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <AdminSidebar />

      <div className="min-w-0 flex-1">
        <DashboardHeader />

        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}