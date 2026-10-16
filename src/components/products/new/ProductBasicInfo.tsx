
"use client";

import {
  ChevronDown,
  Package,
  Tag,
} from "lucide-react";

import {
  getInputClass,
  productCategories,
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

export default function ProductBasicInfo({
  form,
  errors,
  updateField,
}: Props) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5 sm:px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
          <Package size={20} />
        </div>

        <div>
          <h2 className="font-bold text-slate-900">
            Basic Information
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Product name, identifier, and category
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
        <div className="sm:col-span-2">
          <label
            htmlFor="product-name"
            className="text-sm font-semibold text-slate-700"
          >
            Product Name <span className="text-red-500">*</span>
          </label>

          <input
            id="product-name"
            value={form.name}
            onChange={(event) =>
              updateField("name", event.target.value)
            }
            placeholder="e.g. Wireless Mouse"
            maxLength={120}
            className={getInputClass("name", errors)}
            aria-invalid={!!errors.name}
          />

          {errors.name && (
            <p className="mt-2 text-xs text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="product-sku"
            className="text-sm font-semibold text-slate-700"
          >
            SKU <span className="text-red-500">*</span>
          </label>

          <input
            id="product-sku"
            value={form.sku}
            onChange={(event) =>
              updateField("sku", event.target.value.toUpperCase())
            }
            placeholder="e.g. WM-001"
            maxLength={64}
            className={getInputClass("sku", errors)}
            aria-invalid={!!errors.sku}
          />

          {errors.sku ? (
            <p className="mt-2 text-xs text-red-600">
              {errors.sku}
            </p>
          ) : (
            <p className="mt-2 text-xs text-slate-400">
              Must be unique within your inventory.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="product-category"
            className="text-sm font-semibold text-slate-700"
          >
            Category <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <Tag
              size={17}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              id="product-category"
              value={form.category}
              onChange={(event) =>
                updateField("category", event.target.value)
              }
              className={`${getInputClass("category", errors)} appearance-none pl-10 pr-10`}
              aria-invalid={!!errors.category}
            >
              <option value="">Select a category</option>

              {productCategories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          {errors.category && (
            <p className="mt-2 text-xs text-red-600">
              {errors.category}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="product-description"
            className="text-sm font-semibold text-slate-700"
          >
            Description{" "}
            <span className="font-normal text-slate-400">
              (Optional)
            </span>
          </label>

          <textarea
            id="product-description"
            value={form.description}
            onChange={(event) =>
              updateField("description", event.target.value)
            }
            placeholder="Describe the product and its specifications..."
            rows={4}
            maxLength={500}
            className={`${getInputClass("description", errors)} resize-y`}
            aria-invalid={!!errors.description}
          />

          <div className="mt-2 flex justify-between gap-3">
            {errors.description ? (
              <p className="text-xs text-red-600">
                {errors.description}
              </p>
            ) : (
              <span />
            )}

            <p className="text-xs text-slate-400">
              {form.description.length}/500 characters
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
