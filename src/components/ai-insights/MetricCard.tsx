import type { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  iconClass?: string;
}

export default function MetricCard({
  title,
  value,
  description,
  icon,
  iconClass = "bg-indigo-50 text-indigo-600",
}: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </p>
        </div>

        <div className={`rounded-xl p-3 ${iconClass}`}>
          {icon}
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500">{description}</p>
    </div>
  );
}