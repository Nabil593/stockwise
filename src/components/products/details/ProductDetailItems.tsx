import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="mt-2 break-words text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

export function SummaryLine({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="max-w-[60%] break-words text-right text-xs font-semibold text-slate-800">
        {value}
      </span>
    </div>
  );
}

type QuickActionProps = {
  href: string;
  icon: ReactNode;
  title: string;
  description: string;
  iconClass: string;
};

export function QuickAction({
  href,
  icon,
  title,
  description,
  iconClass,
}: QuickActionProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl border border-slate-200 p-3.5 transition hover:border-emerald-200 hover:bg-emerald-50/50"
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>

      <ArrowRight size={16} className="shrink-0 text-slate-400" />
    </Link>
  );
}