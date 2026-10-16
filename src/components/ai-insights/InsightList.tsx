"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Insight, Severity } from "@/types/ai-insights";
import InsightCard from "./InsightCard";

interface Props {
  insights: Insight[];
  loading: boolean;
}

type Filter = "all" | Severity;

export default function InsightList({ insights, loading }: Props) {
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState<Filter>("all");

  const filteredInsights = useMemo(() => {
    const query = search.trim().toLowerCase();

    return insights.filter((insight) => {
      const matchesSearch = [
        insight.title,
        insight.description,
        insight.product?.name,
        insight.product?.sku,
        insight.recommendation,
      ]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(query));

      return (
        matchesSearch &&
        (severity === "all" || insight.severity === severity)
      );
    });
  }, [insights, search, severity]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Inventory recommendations
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {insights.length} recommendations available
          </p>
        </div>

        <span className="inline-flex items-center gap-2 text-sm text-slate-500">
          <SlidersHorizontal size={16} />
          Search and filter
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_190px]">
        <div className="relative">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search recommendations or products..."
            aria-label="Search recommendations"
            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <select
          value={severity}
          onChange={(event) => setSeverity(event.target.value as Filter)}
          aria-label="Filter recommendations by severity"
          className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-indigo-400"
        >
          <option value="all">All severity</option>
          <option value="critical">Critical</option>
          <option value="warning">Warning</option>
          <option value="positive">Positive</option>
          <option value="info">Info</option>
        </select>
      </div>

      <div className="mt-5 space-y-3">
        {loading ? (
          <div className="space-y-3" aria-live="polite">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-28 animate-pulse rounded-xl bg-slate-100"
              />
            ))}
            <p className="text-sm text-slate-500">
              Loading recommendations...
            </p>
          </div>
        ) : filteredInsights.length > 0 ? (
          filteredInsights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 px-4 py-10 text-center">
            <Search className="mx-auto text-slate-400" size={26} />
            <p className="mt-3 font-medium text-slate-800">
              No recommendations found
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Try a different search term or severity filter.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}