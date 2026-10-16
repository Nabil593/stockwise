import Link from "next/link";
import {
  MessageSquare,
  Clock,
  CheckCircle2,
  Plus,
  ArrowRight,
  FileText,
} from "lucide-react";

const stats = [
  {
    label: "Total Complaints",
    value: "0",
    icon: MessageSquare,
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Pending",
    value: "0",
    icon: Clock,
    color: "bg-amber-50 text-amber-600",
  },
  {
    label: "In Progress",
    value: "0",
    icon: FileText,
    color: "bg-purple-50 text-purple-600",
  },
  {
    label: "Resolved",
    value: "0",
    icon: CheckCircle2,
    color: "bg-green-50 text-green-600",
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Workspace
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Track your complaints and stay updated on their progress.
          </p>
        </div>

        <Link
          href="/dashboard/complaints/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Submit Complaint
        </Link>
      </div>

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                {label}
              </p>
              <div className={`rounded-xl p-3 ${color}`}>
                <Icon size={20} />
              </div>
            </div>

            <p className="mt-4 text-3xl font-bold text-slate-900">
              {value}
            </p>
          </div>
        ))}
      </section>

      {/* Recent Complaints */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5 sm:px-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Complaints
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Your latest submitted complaints
            </p>
          </div>

          <Link
            href="/dashboard/complaints"
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="flex flex-col items-center px-5 py-14 text-center sm:px-6">
          <div className="rounded-2xl bg-slate-100 p-4">
            <MessageSquare size={30} className="text-slate-500" />
          </div>

          <h3 className="mt-5 text-base font-semibold text-slate-900">
            No complaints yet
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
            When you submit a complaint, its status and latest updates
            will appear here.
          </p>

          <Link
            href="/dashboard/complaints/new"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Plus size={17} />
            Create your first complaint
          </Link>
        </div>
      </section>
    </div>
  );
}