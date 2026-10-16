"use client";

import {
  AlertTriangle,
  ArrowDownUp,
  Boxes,
  Package,
} from "lucide-react";

import type { Product } from "@/lib/products/product-types";
import { formatPrice, getProductStatus } from "@/lib/products/product-utils";
import SummaryCard from "./SummaryCard";

export default function ProductsSummary({
  products,
  loading,
}: {
  products: Product[];
  loading: boolean;
}) {
  const totalUnits = products.reduce(
    (total, product) => total + product.quantity,
    0,
  );

  const lowStock = products.filter(
    (product) => getProductStatus(product) === "Low Stock",
  ).length;

  const inventoryValue = products.reduce(
    (total, product) => total + product.quantity * product.price,
    0,
  );

  const cards = [
    {
      title: "Total Products",
      value: products.length.toString(),
      subtitle: "Products in your catalog",
      icon: <Package size={20} />,
      iconStyle: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Total Units",
      value: totalUnits.toLocaleString("en-BD"),
      subtitle: "Units across all products",
      icon: <Boxes size={20} />,
      iconStyle: "bg-blue-50 text-blue-700",
    },
    {
      title: "Low Stock",
      value: lowStock.toString(),
      subtitle: "Products need restocking",
      icon: <AlertTriangle size={20} />,
      iconStyle: "bg-amber-50 text-amber-700",
    },
    {
      title: "Inventory Value",
      value: formatPrice(inventoryValue),
      subtitle: "Based on current unit prices",
      icon: <ArrowDownUp size={20} />,
      iconStyle: "bg-violet-50 text-violet-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <SummaryCard
          key={card.title}
          {...card}
          value={loading ? "—" : card.value}
        />
      ))}
    </div>
  );
}