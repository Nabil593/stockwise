import {
  AlertTriangle,
  Boxes,
  Package,
  Wallet,
} from "lucide-react";
import type { Summary } from "@/types/ai-insights";
import { currency, numberFormat } from "@/lib/ai-insights";
import MetricCard from "./MetricCard";

interface Props {
  summary: Summary;
}

export default function InsightsMetrics({ summary }: Props) {
  const metrics = [
    {
      title: "Total Products",
      value: numberFormat(summary.totalProducts),
      description: "Distinct products in inventory",
      icon: <Package size={21} />,
      iconClass: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Total Units",
      value: numberFormat(summary.totalUnits),
      description: "Units currently in stock",
      icon: <Boxes size={21} />,
      iconClass: "bg-blue-50 text-blue-600",
    },
    {
      title: "Inventory Value",
      value: currency(summary.totalInventoryValue),
      description: "Estimated value of current stock",
      icon: <Wallet size={21} />,
      iconClass: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Low / Out of Stock",
      value: numberFormat(
        summary.lowStockCount + summary.outOfStockCount,
      ),
      description: `${summary.lowStockCount} low · ${summary.outOfStockCount} out of stock`,
      icon: <AlertTriangle size={21} />,
      iconClass: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </section>
  );
}