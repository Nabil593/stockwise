
"use client";

import {
  CircleDollarSign,
  Info,
} from "lucide-react";

import {
  getInputClass,
} from "@/lib/products/product-form-types";

import type {
  ProductField,
  ProductForm,
  ProductFormErrors,
} from "@/lib/products/product-form-types";

type Props = {
  form: ProductForm;
  errors: ProductFormErrors;
  updateField: (field: ProductField, value: string) => void;
};

export default function ProductPricing({
  form,
  errors,
  updateField,
}: Props) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5 sm:px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
          <CircleDollarSign size={20} />
        </div>

        <div>
          <h2 className="font-bold text-slate-900">
            Pricing & Stock
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Set the unit price and inventory thresholds
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
        <div>
          <label
            htmlFor="product-price"
            className="text-sm font-semibold text-slate-700"
          >
            Unit Price (BDT) <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
              ৳
            </span>

            <input
              id="product-price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(event) =>
                updateField("price", event.target.value)
              }
              placeholder="0.00"
              className={`${getInputClass("price", errors)} pl-9`}
              aria-invalid={!!errors.price}
            />
          </div>

          {errors.price && (
            <p className="mt-2 text-xs text-red-600">
              {errors.price}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="product-quantity"
            className="text-sm font-semibold text-slate-700"
          >
            Initial Quantity <span className="text-red-500">*</span>
          </label>

          <input
            id="product-quantity"
            type="number"
            min="0"
            step="1"
            value={form.quantity}
            onChange={(event) =>
              updateField("quantity", event.target.value)
            }
            className={getInputClass("quantity", errors)}
            aria-invalid={!!errors.quantity}
          />

          {errors.quantity && (
            <p className="mt-2 text-xs text-red-600">
              {errors.quantity}
            </p>
          )}

          <p className="mt-2 text-xs text-slate-400">
            Use 0 if the product is not yet in stock.
          </p>
        </div>

        <div>
          <label
            htmlFor="product-min-stock"
            className="text-sm font-semibold text-slate-700"
          >
            Minimum Stock Level{" "}
            <span className="text-red-500">*</span>
          </label>

          <input
            id="product-min-stock"
            type="number"
            min="0"
            step="1"
            value={form.minStock}
            onChange={(event) =>
              updateField("minStock", event.target.value)
            }
            className={getInputClass("minStock", errors)}
            aria-invalid={!!errors.minStock}
          />

          {errors.minStock && (
            <p className="mt-2 text-xs text-red-600">
              {errors.minStock}
            </p>
          )}

          <p className="mt-2 text-xs text-slate-400">
            Get alerted when stock reaches this level or below.
          </p>
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
            <Info
              size={18}
              className="mt-0.5 shrink-0 text-blue-600"
            />

            <div>
              <p className="text-sm font-semibold text-blue-900">
                Stock tracking
              </p>

              <p className="mt-1 text-xs leading-5 text-blue-800/80">
                This form saves the initial quantity with the product.
                For complete stock history, the backend should also
                record an initial stock movement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
