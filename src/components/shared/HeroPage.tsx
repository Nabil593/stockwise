
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  MessageSquareWarning,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const HeroPage = () => {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-indigo-100/50 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(#2563eb 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
        {/* Left Content */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            <Sparkles size={16} />
            A smarter way to solve problems
          </div>

          <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Speak Up.
            <br />
            Get Things
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text pb-2 text-transparent">
              Resolved.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            Report issues, track every update, and stay informed until
            your problem is resolved. ComplainBox makes complaint
            management simple, transparent, and organized.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Get Started Free
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              Sign In
              <ArrowUpRight size={17} />
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 size={17} className="text-emerald-600" />
              Easy complaint tracking
            </span>

            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={17} className="text-emerald-600" />
              Secure accounts
            </span>
          </div>

          {/* Stats */}
          <div className="mt-12 grid max-w-lg grid-cols-3 border-t border-slate-200 pt-7">
            <div className="pr-3">
              <p className="text-2xl font-bold text-slate-900 sm:text-3xl">
                24/7
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                Submit anytime
              </p>
            </div>

            <div className="border-l border-slate-200 px-4">
              <p className="text-2xl font-bold text-slate-900 sm:text-3xl">
                One
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                Organized platform
              </p>
            </div>

            <div className="border-l border-slate-200 pl-4">
              <p className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Clear
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                Status updates
              </p>
            </div>
          </div>
        </div>

        {/* Right Dashboard Preview */}
        <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
          {/* Floating Badge */}
          <div className="absolute -right-2 -top-5 z-10 flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-lg sm:-right-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <TrendingUp size={19} />
            </span>
            <div>
              <p className="text-xs text-slate-500">Stay updated</p>
              <p className="text-sm font-semibold text-slate-900">
                Track progress
              </p>
            </div>
          </div>

          {/* Dashboard Card */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/70">
            {/* Dashboard Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <MessageSquareWarning size={21} />
                </span>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    My Complaints
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Your activity overview
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Dashboard
              </span>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-3 p-4 sm:gap-4 sm:p-6">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 sm:p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <MessageSquareWarning size={17} />
                </div>
                <p className="mt-3 text-xl font-bold text-slate-900">12</p>
                <p className="mt-1 text-xs text-slate-500">Total</p>
              </div>

              <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-3 sm:p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                  <Clock3 size={17} />
                </div>
                <p className="mt-3 text-xl font-bold text-slate-900">04</p>
                <p className="mt-1 text-xs text-slate-500">Pending</p>
              </div>

              <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3 sm:p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <CheckCircle2 size={17} />
                </div>
                <p className="mt-3 text-xl font-bold text-slate-900">08</p>
                <p className="mt-1 text-xs text-slate-500">Resolved</p>
              </div>
            </div>

            {/* Recent Complaints */}
            <div className="px-4 pb-5 sm:px-6 sm:pb-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">
                  Recent Complaints
                </h3>
                <span className="text-xs font-medium text-blue-600">
                  Preview
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                    <MessageSquareWarning size={19} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      Internet connection issue
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Internet · #CMP-1024
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                    Pending
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                    <MessageSquareWarning size={19} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      Classroom maintenance
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Maintenance · #CMP-1023
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                    In Progress
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={19} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      Water supply problem
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Facilities · #CMP-1022
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                    Resolved
                  </span>
                </div>
              </div>
            </div>

            {/* Dashboard Footer */}
            <div className="flex items-center gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:px-6">
              <ShieldCheck size={17} className="text-emerald-600" />
              <p className="text-xs text-slate-600">
                Your complaints, organized in one place.
              </p>
            </div>
          </div>

          {/* Bottom Floating Badge */}
          <div className="absolute -bottom-5 -left-2 flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-lg sm:-left-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={21} />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Every concern matters
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                Clear status tracking
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPage;
