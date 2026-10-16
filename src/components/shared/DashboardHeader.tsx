"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Bell,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {

  const { data: sessionData } = useSession();

  const user = sessionData?.user as | (NonNullable<typeof sessionData>["user"] & { role?: "user" | "admin" }) | undefined;

  const pathname = usePathname();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const segments = pathname.split("/").filter(Boolean);

  const formatLabel = (segment: string) =>
    segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
        >
          <Menu size={21} />
        </button>

        <div className="flex min-w-0 items-center gap-2 text-sm">
          <LayoutDashboard
            size={17}
            className="shrink-0 text-slate-400"
          />

          <Link
            href="/dashboard"
            className="hidden text-slate-500 hover:text-blue-600 sm:inline"
          >
            Dashboard
          </Link>

          {segments.length > 1 &&
            segments.slice(1).map((segment, index) => (
              <div
                key={`${segment}-${index}`}
                className="flex min-w-0 items-center gap-2"
              >
                <ChevronRight
                  size={15}
                  className="shrink-0 text-slate-400"
                />
                <span className="truncate font-medium text-slate-900">
                  {formatLabel(segment)}
                </span>
              </div>
            ))}

          {segments.length === 1 && (
            <span className="font-medium text-slate-900 sm:hidden">
              Overview
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <div className="relative">
          <button
            type="button"
            onClick={() => setNotificationsOpen((open) => !open)}
            aria-label="Toggle notifications"
            aria-expanded={notificationsOpen}
            className="relative rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-100"
          >
            <Bell size={20} />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
              <p className="font-semibold text-slate-900">
                Notifications
              </p>
              <p className="mt-2 text-sm text-slate-500">
                You&apos;re all caught up!
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
          <div className="flex size-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
            U
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-slate-500">{user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}