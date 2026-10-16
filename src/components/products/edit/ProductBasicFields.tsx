"use client";

import { Info } from "lucide-react";
import { categories } from "@/lib/products/product-edit-types";
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

export default function ProductBasicFields({
  form,
  errors,
  onChange,
}: Props) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-6 flex items-start gap-3 border-b border-slate-100 pb-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Info className="h-5 w-5" />
        </div>

        <div>
          <h2 className="font-bold text-slate-900">
            Basic Information
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Product name, SKU, category, and description.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Product Name <span className="text-red-500">*</span>
          </label>

          <input
            id="name"
            value={form.name}
            onChange={(event) => onChange("name", event.target.value)}
            className={getInputClass("name", errors)}
            maxLength={120}
          />

          {errors.name && (
            <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="sku"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              SKU <span className="text-red-500">*</span>
            </label>

            <input
              id="sku"
              value={form.sku}
              onChange={(event) =>
                onChange("sku", event.target.value.toUpperCase())
              }
              className={getInputClass("sku", errors)}
              maxLength={64}
            />

            {errors.sku && (
              <p className="mt-1.5 text-xs text-red-600">{errors.sku}</p>
            )}

            <p className="mt-1.5 text-xs text-slate-400">
              Unique product identifier.
            </p>
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Category <span className="text-red-500">*</span>
            </label>

            <select
              id="category"
              value={form.category}
              onChange={(event) =>
                onChange("category", event.target.value)
              }
              className={getInputClass("category", errors)}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {errors.category && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.category}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Description{" "}
            <span className="font-normal text-slate-400">
              (Optional)
            </span>
          </label>

          <textarea
            id="description"
            rows={4}
            maxLength={500}
            value={form.description}
            onChange={(event) =>
              onChange("description", event.target.value)
            }
            className={`${getInputClass("description", errors)} resize-y`}
          />

          <p className="mt-1.5 text-right text-xs text-slate-400">
            {form.description.length}/500 characters
          </p>

          {errors.description && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}