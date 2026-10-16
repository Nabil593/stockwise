"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  MessageSquareWarning,
  PlusCircle,
  UserRound,
  X,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Complaints",
    href: "/dashboard/complaints",
    icon: MessageSquare,
  },
  {
    label: "Submit Complaint",
    href: "/dashboard/complaints/new",
    icon: PlusCircle,
  },
  {
    label: "My Profile",
    href: "/dashboard/profile",
    icon: UserRound,
  },
];

interface DashboardSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function DashboardSidebar({
  isOpen = true,
  onClose,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && onClose && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:sticky lg:top-0 lg:z-0 lg:h-screen lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <Link
          href="/"
          onClick={onClose}
          className="flex shrink-0 items-center gap-2.5"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <MessageSquareWarning size={22} />
          </span>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Complain<span className="text-blue-600">Box</span>
          </span>
        </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Workspace
          </p>

          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive =
              pathname === href ||
              (href !== "/dashboard" && pathname.startsWith(`${href}/`));

            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={19} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-200 p-4">
          <p className="text-xs text-slate-500">
            ComplainBox
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Smart Complaint Management
          </p>
        </div>
      </aside>
    </>
  );
}