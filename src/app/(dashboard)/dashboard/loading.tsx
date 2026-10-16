import {
  ArrowDownLeft,
  ArrowUpRight,
  Boxes,
  Package,
  Sparkles,
} from "lucide-react";

function Skeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-slate-200/80 ${className}`}
    />
  );
}

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-slate-50/60">
      <div className="mx-auto max-w-[1600px] space-y-7 p-4 sm:p-6 lg:p-8">
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-3">
            <Skeleton className="h-7 w-44 sm:h-8 sm:w-56" />
            <Skeleton className="h-4 w-64 max-w-full" />
          </div>

          <div className="flex gap-3">
            <Skeleton className="h-10 w-28 rounded-xl" />
            <Skeleton className="h-10 w-36 rounded-xl" />
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[0, 1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/[0.02]"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-8 w-24" />
                </div>

                <Skeleton className="h-11 w-11 rounded-xl" />
              </div>

              <div className="mt-5 flex items-center gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-28" />
              </div>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
          {/* Inventory chart */}
          <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-56 max-w-full" />
              </div>
              <Skeleton className="h-9 w-24 rounded-lg" />
            </div>

            <div className="mt-8 flex h-56 items-end gap-3 border-b border-l border-slate-100 px-3 sm:h-64 sm:gap-5">
              {[38, 56, 45, 72, 60, 84, 67, 92, 74, 100, 80, 88].map(
                (height, index) => (
                  <Skeleton
                    key={index}
                    className="min-w-0 flex-1 rounded-t-md rounded-b-none"
                    {...{ }}
                  />
                )
              )}
            </div>

            <div className="mt-4 flex justify-between gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-3 w-10 max-w-full"
                />
              ))}
            </div>
          </section>

          {/* Low stock panel */}
          <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-9 w-9 rounded-xl" />
            </div>

            <div className="mt-6 space-y-4">
              {[0, 1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 p-3"
                >
                  <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <Skeleton className="h-4 w-28 max-w-full" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-6 w-14 rounded-full" />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Recent stock movements */}
        <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="flex items-center justify-between gap-4 border-b border-slate-100 p-5 sm:px-6">
            <div className="space-y-2">
              <Skeleton className="h-5 w-44" />
              <Skeleton className="h-4 w-52 max-w-full" />
            </div>
            <Skeleton className="h-9 w-24 rounded-lg" />
          </div>

          <div className="space-y-0 divide-y divide-slate-100">
            {[0, 1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 px-5 py-4 sm:gap-4 sm:px-6"
              >
                <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />

                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-4 w-36 max-w-full" />
                  <Skeleton className="h-3 w-24" />
                </div>

                <div className="hidden space-y-2 sm:block">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>

                <Skeleton className="h-7 w-16 shrink-0 rounded-full" />
              </div>
            ))}
          </div>
        </section>

        {/* AI insights placeholder */}
        <section className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
              <Sparkles
                size={21}
                className="text-emerald-700"
              />
            </div>

            <div className="flex-1 space-y-3">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-full max-w-2xl" />
              <Skeleton className="h-4 w-4/5 max-w-xl" />
              <Skeleton className="mt-2 h-9 w-32 rounded-xl" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}