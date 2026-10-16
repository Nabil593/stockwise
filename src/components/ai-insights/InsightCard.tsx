import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Info,
  ShieldAlert,
} from "lucide-react";
import type { Insight } from "@/types/ai-insights";
import { severityStyles } from "@/lib/ai-insights";

interface Props {
  insight: Insight;
}

const severityIcons = {
  critical: ShieldAlert,
  warning: AlertTriangle,
  positive: CheckCircle2,
  info: Info,
};

export default function InsightCard({ insight }: Props) {
  const severity = severityStyles[insight.severity] ?? severityStyles.info;
  const SeverityIcon =
    severityIcons[insight.severity] ?? severityIcons.info;

  const productId = insight.product?._id;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-indigo-200 hover:shadow-sm">
      <div className="flex items-start gap-3">
        <div className={`rounded-xl border p-2 ${severity.className}`}>
          <SeverityIcon size={19} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-slate-900">
              {insight.title}
            </h3>
            <span
              className={`rounded-full border px-2 py-0.5 text-xs font-medium ${severity.className}`}
            >
              {severity.label}
            </span>
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {insight.description}
          </p>

          {insight.product && (
            <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-sm">
              <span className="font-medium text-slate-800">
                {insight.product.name}
              </span>
              <span className="ml-2 text-slate-500">
                SKU: {insight.product.sku}
              </span>
            </div>
          )}

          {insight.recommendation && (
            <p className="mt-3 text-sm text-slate-700">
              <span className="font-semibold">Recommendation: </span>
              {insight.recommendation}
            </p>
          )}

          {productId && (
            <Link
              href={`/dashboard/stock/new?productId=${encodeURIComponent(productId)}`}
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-700 hover:text-indigo-900"
            >
              Review product <ArrowRight size={15} />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}