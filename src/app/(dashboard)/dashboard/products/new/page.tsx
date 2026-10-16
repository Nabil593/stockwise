
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Info,
  RotateCcw,
  Save,
} from "lucide-react";

import ProductBasicInfo from "@/components/products/new/ProductBasicInfo";
import ProductPricing from "@/components/products/new/ProductPricing";
import ProductPreview from "@/components/products/new/ProductPreview";

import {
  initialForm,
  productCategories,
} from "@/lib/products/product-form-types";

import type {
  ProductField,
  ProductForm,
  ProductFormErrors,
} from "@/lib/products/product-form-types";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const PRODUCTS_URL = API_URL.endsWith("/api")
  ? `${API_URL}/products`
  : `${API_URL}/api/products`;

export default function NewProductPage() {
  const router = useRouter();

  const [form, setForm] = useState<ProductForm>(initialForm);
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const updateField = (field: ProductField, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));

    setErrorMessage("");
    setSuccessMessage("");
  };

  const validate = (): boolean => {
    const nextErrors: ProductFormErrors = {};

    const name = form.name.trim();
    const sku = form.sku.trim();
    const description = form.description.trim();

    if (!name) {
      nextErrors.name = "Product name is required.";
    } else if (name.length < 2) {
      nextErrors.name = "Product name must be at least 2 characters.";
    } else if (name.length > 120) {
      nextErrors.name = "Product name cannot exceed 120 characters.";
    }

    if (!sku) {
      nextErrors.sku = "SKU is required.";
    } else if (!/^[A-Za-z0-9_-]+$/.test(sku)) {
      nextErrors.sku =
        "Use only letters, numbers, hyphens, and underscores.";
    } else if (sku.length > 64) {
      nextErrors.sku = "SKU cannot exceed 64 characters.";
    }

    if (!form.category) {
      nextErrors.category = "Please select a category.";
    } else if (!productCategories.includes(form.category)) {
      nextErrors.category = "Please select a valid category.";
    }

    if (description.length > 500) {
      nextErrors.description =
        "Description cannot exceed 500 characters.";
    }

    const price = Number(form.price);

    if (
      form.price.trim() === "" ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      nextErrors.price = "Enter a valid price of 0 or more.";
    }

    const quantity = Number(form.quantity);

    if (
      form.quantity.trim() === "" ||
      !Number.isSafeInteger(quantity) ||
      quantity < 0
    ) {
      nextErrors.quantity =
        "Quantity must be a whole number of 0 or more.";
    }

    const minStock = Number(form.minStock);

    if (
      form.minStock.trim() === "" ||
      !Number.isSafeInteger(minStock) ||
      minStock < 0
    ) {
      nextErrors.minStock =
        "Minimum stock must be a whole number of 0 or more.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (submitting || !validate()) return;

    setSubmitting(true);

    try {
      const response = await fetch(PRODUCTS_URL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          sku: form.sku.trim().toUpperCase(),
          category: form.category,
          description: form.description.trim(),
          price: Number(form.price),
          quantity: Number(form.quantity),
          minStock: Number(form.minStock),
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error(
            "Your session is missing or expired. Please sign in again.",
          );
        }

        if (response.status === 409) {
          setErrors((current) => ({
            ...current,
            sku: "This SKU already exists in your inventory.",
          }));

          throw new Error("Please use a unique SKU.");
        }

        throw new Error(
          result?.message ||
            `Unable to save product (HTTP ${response.status}).`,
        );
      }

      setSuccessMessage("Product created successfully.");

      router.push("/dashboard/products");
      router.refresh();
    } catch (error) {
      if (error instanceof TypeError) {
        setErrorMessage(
          "Cannot connect to the backend. Check that your Express server is running and NEXT_PUBLIC_API_URL is correct.",
        );
      } else {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unable to save the product. Please try again.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    if (submitting) return;

    setForm(initialForm);
    setErrors({});
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div className="min-h-screen space-y-7 bg-slate-50/70 p-4 sm:p-6 lg:p-8">
      {/* Page header */}
      <div>
        <Link
          href="/dashboard/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-700"
        >
          <ArrowLeft size={16} />
          Back to Products
        </Link>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <Link
                href="/dashboard"
                className="hover:text-emerald-700"
              >
                Dashboard
              </Link>

              <span>/</span>

              <Link
                href="/dashboard/products"
                className="hover:text-emerald-700"
              >
                Products
              </Link>

              <span>/</span>

              <span className="font-medium text-slate-700">
                New Product
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Add New Product
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Add a product to your inventory and define its stock levels.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
            <CheckCircle2 size={17} />
            Inventory setup
          </div>
        </div>
      </div>

      {/* Error message */}
      {errorMessage && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <Info size={19} className="mt-0.5 shrink-0" />
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Success message */}
      {successMessage && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
        >
          <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
          <p>{successMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          {/* Form sections */}
          <div className="space-y-6">
            <ProductBasicInfo
              form={form}
              errors={errors}
              updateField={updateField}
            />

            <ProductPricing
              form={form}
              errors={errors}
              updateField={updateField}
            />

            {/* Form actions */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handleReset}
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                <RotateCcw size={16} />
                Reset Form
              </button>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dashboard/products"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save size={17} />
                  {submitting ? "Saving..." : "Save Product"}
                </button>
              </div>
            </div>
          </div>

          {/* Reusable live preview */}
          <ProductPreview form={form} />
        </div>
      </form>
    </div>
  );
}