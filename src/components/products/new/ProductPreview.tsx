
"use client";

import {
  ClipboardList,
  Package,
} from "lucide-react";

import {
  formatBDT,
} from "@/lib/products/product-form-types";

import type {
  ProductForm,
} from "@/lib/products/product-form-types";

type Props = {
  form: ProductForm;
};

export default function ProductPreview({ form }: Props) {
  const quantity = Number(form.quantity) || 0;
  const minimumStock = Number(form.minStock) || 0;
  const price = Number(form.price) || 0;

  const stockStatus =
    quantity === 0
      ? "Out of Stock"
      : quantity <= minimumStock
        ? "Low Stock"
        : "In Stock";

  const stockStatusStyles =
    stockStatus === "In Stock"
      ? "bg-emerald-50 text-emerald-700"
      : stockStatus === "Low Stock"
        ? "bg-amber-50 text-amber-700"
        : "bg-red-50 text-red-700";

  return (
    <aside className="space-y-5 xl:sticky xl:top-6">
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="font-bold text-slate-900">
            Product Preview
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Updates as you fill in the form
          </p>
        </div>

        <div className="p-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
            <Package size={30} />
          </div>

          <h3 className="mt-4 break-words text-lg font-bold text-slate-900">
            {form.name.trim() || "Product name"}
          </h3>

          <p className="mt-1 break-words text-sm text-slate-400">
            {form.sku.trim() || "SKU will appear here"}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
              {form.category || "Uncategorized"}
            </span>

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${stockStatusStyles}`}
            >
              {stockStatus}
            </span>
          </div>

          {form.description && (
            <p className="mt-4 break-words text-sm leading-6 text-slate-500">
              {form.description}
            </p>
          )}

          <div className="mt-5 space-y-4 border-t border-slate-100 pt-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-slate-500">
                Unit price
              </span>

              <span className="font-bold text-slate-900">
                {form.price.trim() !== "" &&
                Number.isFinite(Number(form.price)) &&
                Number(form.price) >= 0
                  ? formatBDT(price)
                  : "৳0.00"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-slate-500">
                Initial quantity
              </span>

              <span className="font-semibold text-slate-800">
                {form.quantity || "0"} units
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-slate-500">
                Minimum stock
              </span>

              <span className="font-semibold text-slate-800">
                {form.minStock || "0"} units
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <span className="text-sm font-medium text-slate-600">
                Estimated stock value
              </span>

              <span className="text-right font-bold text-emerald-700">
                {formatBDT(price * quantity)}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-amber-100 bg-amber-50/70 p-5">
        <div className="flex items-center gap-2 text-amber-800">
          <ClipboardList size={19} />
          <h3 className="text-sm font-bold">Before you save</h3>
        </div>

        <ul className="mt-3 space-y-2.5 text-xs leading-5 text-amber-900/80">
          <li>• Make sure the SKU is unique.</li>
          <li>• Double-check the unit price and quantity.</li>
          <li>• Set a sensible minimum stock threshold.</li>
          <li>• Your account must be authenticated.</li>
        </ul>
      </section>
    </aside>
  );
}
