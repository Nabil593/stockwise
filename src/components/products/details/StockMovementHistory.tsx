import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  ClipboardList,
  Clock3,
} from "lucide-react";

import type { StockMovement } from "@/lib/products/product-details-types";
import { formatDateTime } from "@/lib/products/product-details-utils";

type Props = {
  movements: StockMovement[];
  movementError: string;
};

export default function StockMovementHistory({
  movements,
  movementError,
}: Props) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="font-bold text-slate-900">
            Recent Stock Movements
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Inventory transaction history for this product
          </p>
        </div>

        <Link
          href="/dashboard/stock/history"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
        >
          View history
          <ArrowRight size={16} />
        </Link>
      </div>

      {movementError ? (
        <div className="p-6">
          <p className="text-sm text-amber-700">
            Stock history could not be loaded: {movementError}
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Product details are available, but the movement history API may
            not be implemented yet.
          </p>
        </div>
      ) : movements.length === 0 ? (
        <div className="px-5 py-10 text-center sm:px-6">
          <ClipboardList size={25} className="mx-auto text-slate-400" />
          <p className="mt-3 text-sm font-semibold text-slate-700">
            No stock movements found
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Movement records will appear here after they are recorded.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {movements.map((movement) => {
            const incoming = movement.type === "IN";
            const adjustment = movement.type === "ADJUSTMENT";

            const iconClass = incoming
              ? "bg-emerald-50 text-emerald-700"
              : adjustment
                ? "bg-amber-50 text-amber-700"
                : "bg-blue-50 text-blue-700";

            const amountClass = incoming
              ? "text-emerald-600"
              : adjustment
                ? "text-amber-600"
                : "text-blue-600";

            return (
              <div
                key={movement.id}
                className="flex items-center gap-3 px-5 py-4 sm:px-6"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
                >
                  {incoming ? (
                    <ArrowDownLeft size={19} />
                  ) : (
                    <ArrowUpRight size={19} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800">
                    {incoming
                      ? "Stock In"
                      : adjustment
                        ? "Stock Adjustment"
                        : "Stock Out"}
                  </p>

                  <p className="mt-1 truncate text-xs text-slate-500">
                    {movement.note || "No note provided"}
                  </p>

                  <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                    <Clock3 size={12} />
                    {formatDateTime(movement.createdAt)}
                  </p>
                </div>

                <p className={`shrink-0 text-sm font-bold ${amountClass}`}>
                  {incoming ? "+" : adjustment ? "±" : "-"}
                  {movement.quantity}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}