"use client";

import { Package, Tag } from "lucide-react";
import type { ProductForm } from "@/lib/products/product-edit-types";
import {
  formatPrice,
  getStockStatus,
} from "@/lib/products/product-edit-utils";

export default function ProductLivePreview({
  form,
}: {
  form: ProductForm;
}) {
  const price = Number(form.price);
  const quantity = Number(form.quantity);
  const minStock = Number(form.minStock);

  const validPrice =
    form.price.trim() !== "" &&
    Number.isFinite(price) &&
    price >= 0;

  const validQuantity =
    form.quantity.trim() !== "" &&
    Number.isSafeInteger(quantity) &&
    quantity >= 0;

  const stockValue =
    validPrice && validQuantity ? price * quantity : 0;

  const stockStatus = getStockStatus(
    validQuantity ? quantity : 0,
    Number.isSafeInteger(minStock) && minStock >= 0 ? minStock : 0,
  );

  const statusClass =
    stockStatus === "In stock"
      ? "bg-emerald-50 text-emerald-700"
      : stockStatus === "Low stock"
        ? "bg-amber-50 text-amber-700"
        : "bg-red-50 text-red-700";

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4">
        <h2 className="font-bold text-slate-900">Live Preview</h2>
        <p className="mt-1 text-xs text-slate-500">
          Updates as you edit.
        </p>
      </div>

      <div className="p-5">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
          <Package className="h-7 w-7" />
        </div>

        <h3 className="break-words text-lg font-bold text-slate-900">
          {form.name.trim() || "Product Name"}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          SKU: {form.sku.trim() || "Not assigned"}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            <Tag className="h-3 w-3" />
            {form.category || "No category"}
          </span>

          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass}`}
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
            <span className="text-sm text-slate-500">Unit price</span>
            <span className="font-semibold text-slate-900">
              {validPrice ? formatPrice(price) : "৳0.00"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-slate-500">
              Current quantity
            </span>
            <span className="font-semibold text-slate-900">
              {form.quantity || "0"} units
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-slate-500">Minimum stock</span>
            <span className="font-semibold text-slate-900">
              {form.minStock || "0"} units
            </span>
          </div>

          <div className="rounded-xl bg-emerald-50 p-4">
            <p className="text-xs font-medium text-emerald-700">
              Estimated Stock Value
            </p>
            <p className="mt-1 break-words text-2xl font-bold tracking-tight text-emerald-800">
              {formatPrice(stockValue)}
            </p>
            <p className="mt-1 text-xs text-emerald-700/80">
              Unit price × current quantity
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}