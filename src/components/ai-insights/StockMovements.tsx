import {
  ArrowDownRight,
  ArrowLeftRight,
  ArrowUpRight,
} from "lucide-react";
import type { MovementSummary } from "@/types/ai-insights";
import { numberFormat } from "@/lib/ai-insights";

interface Props {
  movements: MovementSummary;
}

export default function StockMovements({ movements }: Props) {
  const items = [
    {
      title: "Stock In",
      value: movements.stockIn,
      icon: <ArrowDownRight size={20} />,
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Stock Out",
      value: movements.stockOut,
      icon: <ArrowUpRight size={20} />,
      color: "bg-rose-50 text-rose-700",
    },
    {
      title: "Adjustments",
      value: movements.adjustments,
      icon: <ArrowLeftRight size={20} />,
      color: "bg-amber-50 text-amber-700",
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <h2 className="font-bold text-slate-900">Stock movements</h2>
      <p className="mt-1 text-sm text-slate-500">
        Recorded movement counts from your inventory.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.title} className="rounded-xl bg-slate-50 p-4">
            <div
              className={`mb-3 inline-flex rounded-lg p-2 ${item.color}`}
            >
              {item.icon}
            </div>
            <p className="text-sm text-slate-500">{item.title}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {numberFormat(item.value)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <span className="text-sm text-slate-600">Total movements</span>
        <span className="font-bold text-slate-900">
          {numberFormat(movements.totalMovements)}
        </span>
      </div>
    </section>
  );
}