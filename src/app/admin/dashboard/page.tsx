import Link from "next/link";
import {
  MessageSquare,
  Clock,
  LoaderCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const stats = [
  {
    title: "Total Complaints",
    value: "0",
    description: "All submitted complaints",
    icon: MessageSquare,
    iconStyle: "bg-blue-50 text-blue-600",
  },
  {
    title: "Pending",
    value: "0",
    description: "Waiting for review",
    icon: Clock,
    iconStyle: "bg-amber-50 text-amber-600",
  },
  {
    title: "In Progress",
    value: "0",
    description: "Currently being handled",
    icon: LoaderCircle,
    iconStyle: "bg-purple-50 text-purple-600",
  },
  {
    title: "Resolved",
    value: "0",
    description: "Successfully resolved",
    icon: CheckCircle2,
    iconStyle: "bg-emerald-50 text-emerald-600",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Page heading */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
            <ShieldCheck size={17} />
            Administration
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Monitor complaints, review AI suggestions, and manage resolutions.
          </p>
        </div>

        <Link
          href="/admin/dashboard/complaints"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          Manage Complaints
          <ArrowRight size={17} />
        </Link>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>

                  <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                    {stat.value}
                  </p>
                </div>

                <div className={`rounded-xl p-3 ${stat.iconStyle}`}>
                  <Icon size={21} />
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-500">
                {stat.description}
              </p>
            </article>
          );
        })}
      </section>

      {/* Complaint management */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Complaints
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review and track submitted complaints.
            </p>
          </div>

          <Link
            href="/admin/dashboard/complaints"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="px-5 py-12 text-center sm:px-6">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-slate-100">
            <MessageSquare size={26} className="text-slate-500" />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            No complaints to display
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Once users submit complaints, you can review their details,
            categories, and resolution status here.
          </p>

          <Link
            href="/admin/dashboard/complaints"
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Open complaint management
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* AI feature information */}
      <section className="flex flex-col gap-4 rounded-2xl border border-violet-200 bg-violet-50/70 p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
          <Sparkles size={24} />
        </div>

        <div className="flex-1">
          <h2 className="font-semibold text-slate-900">
            AI-Powered Complaint Classification
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-600">
            AI suggests complaint categories from the submitted title and
            description. Admins can review and correct categories when needed.
          </p>
        </div>

        <span className="inline-flex w-fit items-center rounded-full border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700">
          AI Feature
        </span>
      </section>
    </div>
  );
}