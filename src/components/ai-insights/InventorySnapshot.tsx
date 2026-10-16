import {
  AlertTriangle,
  Boxes,
  Layers3,
  Package,
  TrendingUp,
} from "lucide-react";
import type { Category, Summary } from "@/types/ai-insights";
import { numberFormat } from "@/lib/ai-insights";
import SnapshotRow from "./SnapshotRow";

interface Props {
  summary: Summary;
  categories: Category[];
}

export default function InventorySnapshot({
  summary,
  categories,
}: Props) {
  const rows = [
    {
      label: "Total units in stock",
      value: numberFormat(summary.totalUnits),
      icon: <Boxes size={18} />,
    },
    {
      label: "Out of stock",
      value: numberFormat(summary.outOfStockCount),
      icon: <AlertTriangle size={18} />,
    },
    {
      label: "Low stock",
      value: numberFormat(summary.lowStockCount),
      icon: <TrendingUp size={18} />,
    },
    {
      label: "Overstocked products",
      value: numberFormat(summary.overstockCount),
      icon: <Package size={18} />,
    },
    {
      label: "Categories",
      value: numberFormat(categories.length),
      icon: <Layers3 size={18} />,
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <h2 className="font-bold text-slate-900">Inventory snapshot</h2>
      <p className="mt-1 text-sm text-slate-500">
        A quick overview of current stock health.
      </p>

      <div className="mt-4">
        {rows.map((row) => (
          <SnapshotRow key={row.label} {...row} />
        ))}
      </div>
    </section>
  );
}