"use client";

import { BrainCircuit, RefreshCw, Sparkles } from "lucide-react";

interface Props {
  loading: boolean;
  onRefresh: () => void;
}

export default function InsightsHeader({ loading, onRefresh }: Props) {
  return (
    <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-700">
          <BrainCircuit size={26} />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">
              AI Insights
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
              <Sparkles size={13} /> Smart analysis
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Understand your inventory and make better decisions.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onRefresh}
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
        {loading ? "Refreshing..." : "Refresh insights"}
      </button>
    </header>
  );
}