import type { ReactNode } from "react";

interface SnapshotRowProps {
  label: string;
  value: string | number;
  icon: ReactNode;
}

export default function SnapshotRow({
  label,
  value,
  icon,
}: SnapshotRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-3 last:border-b-0">
      <div className="flex min-w-0 items-center gap-3">
        <span className="text-slate-500">{icon}</span>
        <span className="truncate text-sm text-slate-600">{label}</span>
      </div>

      <span className="shrink-0 text-sm font-semibold text-slate-900">
        {value}
      </span>
    </div>
  );
}