import { CircleAlert, TrendingUp } from "lucide-react";

import type {
  Product,
  ProductStatus,
} from "@/lib/products/product-details-types";

type Props = {
  product: Product;
  status: ProductStatus;
};

export default function InventoryHealth({ product, status }: Props) {
  const stockPercentage =
    product.minStock > 0
      ? Math.min((product.quantity / (product.minStock * 2)) * 100, 100)
      : product.quantity > 0
        ? 100
        : 0;

  const progressClass =
    status === "In Stock"
      ? "bg-emerald-500"
      : status === "Low Stock"
        ? "bg-amber-500"
        : "bg-red-500";

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-bold text-slate-900">Inventory Health</h2>
          <p className="mt-1 text-sm text-slate-500">
            Current quantity compared with the minimum stock level
          </p>
        </div>
        <TrendingUp size={20} className="text-emerald-600" />
      </div>

      <div className="mt-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-3xl font-bold text-slate-900">
            {product.quantity}
          </p>
          <p className="mt-1 text-sm text-slate-500">Units available</p>
        </div>

        <div className="text-right">
          <p className="text-sm font-semibold text-slate-700">
            Minimum: {product.minStock}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            {Math.max(product.quantity - product.minStock, 0)} units above
            minimum
          </p>
        </div>
      </div>

      <div
        role="progressbar"
        aria-label="Current stock level"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={stockPercentage}
        className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100"
      >
        <div
          className={`h-full rounded-full transition-all ${progressClass}`}
          style={{ width: `${stockPercentage}%` }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 text-xs text-slate-400">
        <span>0 units</span>
        <span className="text-right">
          Healthy stock reference: {product.minStock * 2} units
        </span>
      </div>

      {status !== "In Stock" && (
        <div
          className={`mt-5 flex items-start gap-3 rounded-xl border p-4 ${
            status === "Low Stock"
              ? "border-amber-100 bg-amber-50/70"
              : "border-red-100 bg-red-50/70"
          }`}
        >
          <CircleAlert
            size={19}
            className={`mt-0.5 shrink-0 ${
              status === "Low Stock" ? "text-amber-600" : "text-red-600"
            }`}
          />

          <div>
            <p className="text-sm font-semibold text-slate-800">
              {status === "Low Stock"
                ? "Restocking may be needed"
                : "This product is out of stock"}
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              {status === "Low Stock"
                ? `Only ${product.quantity} units remain. The minimum stock threshold is ${product.minStock} units.`
                : "Record an incoming stock movement after receiving inventory."}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}