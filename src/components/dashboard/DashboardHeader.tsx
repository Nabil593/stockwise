"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Bell,
  ChevronRight,
  LayoutDashboard,
  Package,
  ArrowLeftRight,
  Sparkles,
  UserRound,
  Settings2,
  Boxes,
  Check,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

export default function DashboardHeader({
  onMenuClick,
}: DashboardHeaderProps) {
  const { data: sessionData } = useSession();

  const user = sessionData?.user as
    | (NonNullable<typeof sessionData>["user"] & {
        role?: "user" | "admin";
      })
    | undefined;

  const pathname = usePathname();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const segments = pathname.split("/").filter(Boolean);

  const formatLabel = (segment: string) =>
    segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

  const breadcrumbIcons: Record<
    string,
    React.ComponentType<{ size?: number; className?: string }>
  > = {
    dashboard: LayoutDashboard,
    products: Package,
    "stock-movements": ArrowLeftRight,
    "ai-insights": Sparkles,
    profile: UserRound,
    settings: Settings2,
  };

  const currentSegment = segments[segments.length - 1];
  const CurrentIcon = breadcrumbIcons[currentSegment] || LayoutDashboard;

  const initials =
    user?.name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "U";

  const roleLabel =
    user?.role === "admin"
      ? "Administrator"
      : user?.role === "user"
        ? "Account"
        : "Member";

  return (
    <header className="sticky top-0 z-30 flex h-[70px] items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      {/* Left: Menu + Breadcrumb */}
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
        >
          <Menu size={21} />
        </button>

        <div className="flex min-w-0 items-center gap-2.5">
          <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 sm:flex">
            <CurrentIcon size={19} />
          </div>

          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-2 text-sm">
              <Link
                href="/dashboard"
                className="hidden shrink-0 text-slate-500 transition-colors hover:text-emerald-700 sm:inline"
              >
                Dashboard
              </Link>

              {segments.length > 1 && (
                <ChevronRight
                  size={15}
                  className="hidden shrink-0 text-slate-300 sm:block"
                />
              )}

              {segments.length > 1 ? (
                <div className="truncate font-semibold text-slate-900">
                  {formatLabel(currentSegment)}
                </div>
              ) : (
                <div className="font-semibold text-slate-900">
                  Overview
                </div>
              )}
            </div>

            <p className="mt-0.5 hidden text-xs text-slate-500 sm:block">
              Manage your inventory with confidence.
            </p>
          </div>
        </div>
      </div>

      {/* Right: Notifications + User */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setNotificationsOpen((open) => !open)}
            aria-label="Toggle notifications"
            aria-expanded={notificationsOpen}
            className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
              notificationsOpen
                ? "bg-emerald-50 text-emerald-700"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Bell size={20} strokeWidth={1.8} />
          </button>

          {notificationsOpen && (
            <>
              <button
                type="button"
                aria-label="Close notifications"
                className="fixed inset-0 z-40 cursor-default"
                onClick={() => setNotificationsOpen(false)}
              />

              <div className="absolute right-0 top-12 z-50 w-[min(320px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      Notifications
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Stay updated on your inventory.
                    </p>
                  </div>

                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                    <Bell size={16} />
                  </span>
                </div>

                <div className="px-4 py-7 text-center">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <Check size={21} />
                  </div>

                  <p className="mt-3 text-sm font-medium text-slate-800">
                    You&apos;re all caught up!
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    New stock alerts and updates will appear here when available.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Divider */}
        <div className="h-9 w-px bg-slate-200" />

        {/* User profile */}
        <Link
          href="/dashboard/profile"
          className="group flex min-w-0 items-center gap-2.5 rounded-xl py-1 pl-1 pr-1 transition hover:bg-slate-50 sm:gap-3 sm:pl-2 sm:pr-3"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-sm font-bold text-emerald-800 ring-1 ring-emerald-200/70 transition group-hover:bg-emerald-200">
            {initials}
          </div>

          <div className="hidden min-w-0 text-left sm:block">
            <p className="max-w-36 truncate text-sm font-semibold text-slate-900">
              {user?.name || "User"}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              {roleLabel}
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}