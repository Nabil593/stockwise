import type { ReactNode } from "react";

type SummaryCardProps = {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
  iconStyle: string;
};

export default function SummaryCard({
  title,
  value,
  subtitle,
  icon,
  iconStyle,
}: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 break-words text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>

        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconStyle}`}>
          {icon}
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500">{subtitle}</p>
    </div>
  );
}