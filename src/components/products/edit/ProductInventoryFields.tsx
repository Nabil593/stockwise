"use client";

import { Boxes, DollarSign } from "lucide-react";
import type {
  ProductField,
  ProductForm,
  ProductFormErrors,
} from "@/lib/products/product-edit-types";
import { getInputClass } from "@/lib/products/product-edit-utils";

type Props = {
  form: ProductForm;
  errors: ProductFormErrors;
  onChange: (field: ProductField, value: string) => void;
};

export default function ProductInventoryFields({
  form,
  errors,
  onChange,
}: Props) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-6 flex items-start gap-3 border-b border-slate-100 pb-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
          <Boxes className="h-5 w-5" />
        </div>

        <div>
          <h2 className="font-bold text-slate-900">
            Inventory & Pricing
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage pricing, available stock, and low-stock alerts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="price"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Unit Price (BDT) <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <DollarSign className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(event) =>
                onChange("price", event.target.value)
              }
              className={`${getInputClass("price", errors)} pl-10`}
            />
          </div>

          {errors.price && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.price}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="quantity"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Current Quantity <span className="text-red-500">*</span>
          </label>

          <input
            id="quantity"
            type="number"
            min="0"
            step="1"
            value={form.quantity}
            onChange={(event) =>
              onChange("quantity", event.target.value)
            }
            className={getInputClass("quantity", errors)}
          />

          {errors.quantity && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.quantity}
            </p>
          )}

          <p className="mt-1.5 text-xs text-slate-400">
            For audited inventory, use stock movements to change quantity.
          </p>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="minStock"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Minimum Stock Level <span className="text-red-500">*</span>
          </label>

          <input
            id="minStock"
            type="number"
            min="0"
            step="1"
            value={form.minStock}
            onChange={(event) =>
              onChange("minStock", event.target.value)
            }
            className={getInputClass("minStock", errors)}
          />

          {errors.minStock && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.minStock}
            </p>
          )}

          <p className="mt-1.5 text-xs text-slate-400">
            The product is flagged when quantity reaches this level or lower.
          </p>
        </div>
      </div>
    </section>
  );
}