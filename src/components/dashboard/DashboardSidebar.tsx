"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ArrowLeftRight,
  Sparkles,
  UserRound,
  Settings2,
  Boxes,
  X,
  ChevronRight,
} from "lucide-react";

const navItems = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    label: "Stock Movements",
    href: "/dashboard/stock",
    icon: ArrowLeftRight,
  },
  {
    label: "AI Insights",
    href: "/dashboard/ai-insights",
    icon: Sparkles,
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
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200/80 bg-white transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:z-0 lg:h-screen lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex h-[70px] shrink-0 items-center justify-between border-b border-slate-100 px-6">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5"
          >
            <span className="flex h-10 w-10 items-center justify-center text-emerald-600">
              <Boxes size={35} />
            </span>

            <span className="text-xl font-bold tracking-tight text-slate-900">
              Stock
              <span className="text-emerald-600">Wise</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-7">
          <div>
            <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Workspace
            </p>

            <div className="space-y-1.5">
              {navItems.map(({ label, href, icon: Icon }) => {
                const isActive =
                  pathname === href ||
                  (href !== "/dashboard" && pathname.startsWith(`${href}/`));

                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-[13px] font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute bottom-2.5 left-0 top-2.5 w-[3px] rounded-r-full bg-emerald-600" />
                    )}

                    <Icon
                      size={19}
                      strokeWidth={isActive ? 2.2 : 1.8}
                      className={`shrink-0 transition-colors ${
                        isActive
                          ? "text-emerald-600"
                          : "text-slate-400 group-hover:text-slate-700"
                      }`}
                    />

                    <span className="flex-1">{label}</span>

                    {isActive && (
                      <ChevronRight size={15} className="text-emerald-600" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* AI feature card */}
          <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Sparkles size={18} />
            </div>

            <p className="text-sm font-semibold text-slate-900">
              Smarter inventory
            </p>

            <p className="mt-1.5 text-xs leading-5 text-slate-500">
              Get AI-assisted insights to help you make better stock decisions.
            </p>

            <Link
              href="/dashboard/ai-insights"
              onClick={onClose}
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
            >
              Explore insights
              <ChevronRight size={14} />
            </Link>
          </div>
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t border-slate-100 p-2">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm ring-1 ring-slate-200/70">
              <Boxes size={18} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-800">StockWise</p>
              <p className="mt-0.5 text-[11px] text-slate-500">
                Inventory, made simpler.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
