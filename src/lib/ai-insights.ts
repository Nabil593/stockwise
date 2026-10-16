import type {
  BackendInsight,
  Insight,
  MovementSummary,
  Summary,
} from "@/types/ai-insights";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://stockwise-server.vercel.app/api";

export const EMPTY_SUMMARY: Summary = {
  totalProducts: 0,
  totalUnits: 0,
  totalInventoryValue: 0,
  lowStockCount: 0,
  outOfStockCount: 0,
  overstockCount: 0,
};

export const EMPTY_MOVEMENTS: MovementSummary = {
  stockIn: 0,
  stockOut: 0,
  adjustments: 0,
  totalMovements: 0,
};

export const currency = (value: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(value || 0);

export const numberFormat = (value: number) =>
  new Intl.NumberFormat("en-US").format(value || 0);

export const mapInsight = (
  insight: BackendInsight,
  index: number,
): Insight => ({
  ...insight,
  id: `${insight.product?._id ?? "general"}-${insight.title}-${index}`,
});

export const severityStyles = {
  critical: {
    label: "Critical",
    className: "border-rose-200 bg-rose-50 text-rose-700",
  },
  warning: {
    label: "Warning",
    className: "border-amber-200 bg-amber-50 text-amber-700",
  },
  positive: {
    label: "Positive",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  info: {
    label: "Info",
    className: "border-indigo-200 bg-indigo-50 text-indigo-700",
  },
} as const;