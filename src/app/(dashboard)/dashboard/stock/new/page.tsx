"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  Boxes,
  CheckCircle2,
  ChevronDown,
  LoaderCircle,
  Package,
  RefreshCw,
  ShieldAlert,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

interface Product {
  _id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  quantity: number;
  minStock: number;
}

type MovementType = "IN" | "OUT" | "ADJUSTMENT";

interface ApiResponse {
  success: boolean;
  message?: string;
  errors?: string[];
  data?: Product[] | Product | { products?: Product[] };
}

async function readApiResponse(response: Response): Promise<ApiResponse> {
  const body = await response.text();

  try {
    return JSON.parse(body) as ApiResponse;
  } catch {
    console.error("API response is not JSON:", {
      url: response.url,
      status: response.status,
      body: body.slice(0, 300),
    });

    throw new Error(
      `API returned a non-JSON response. HTTP ${response.status}. Check the browser console.`,
    );
  }
}

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const API_BASE = API_URL.endsWith("/api") ? API_URL : `${API_URL}/api`;

const PRODUCT_URL = `${API_BASE}/products`;
const MOVEMENT_URL = `${API_BASE}/stock/movements`;

const initialForm = {
  productId: "",
  type: "IN" as MovementType,
  quantity: "1",
  reason: "",
  notes: "",
};

export default function NewStockPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(initialForm);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const selectedProduct = products.find(
    (product) => product._id === form.productId,
  );

  const loadProducts = useCallback(async () => {
    setLoadingProducts(true);
    setError("");

    try {
      const response = await fetch(PRODUCT_URL, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
        headers: { Accept: "application/json" },
      });

      const result: ApiResponse = await readApiResponse(response);

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to load products.");
      }

      const data = result.data;
      const list = Array.isArray(data)
        ? data
        : data && "products" in data
          ? (data.products ?? [])
          : [];

      setProducts(list);

      const requestedId = searchParams.get("productId");
      const initialProduct = list.find(
        (product) => product._id === requestedId,
      );

      setForm((current) => ({
        ...current,
        productId:
          current.productId || initialProduct?._id || list[0]?._id || "",
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products.");
    } finally {
      setLoadingProducts(false);
    }
  }, [searchParams]);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  function updateField(field: keyof typeof initialForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
    setSuccess("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.productId) {
      setError("Please select a product.");
      return;
    }

    const quantity = Number(form.quantity);

    if (!Number.isSafeInteger(quantity) || quantity <= 0) {
      setError("Quantity must be a positive whole number.");
      return;
    }

    if (!form.reason.trim()) {
      setError("Please provide a reason for this stock movement.");
      return;
    }

    if (
      form.type === "OUT" &&
      selectedProduct &&
      quantity > selectedProduct.quantity
    ) {
      setError(
        `Only ${selectedProduct.quantity} units are available for this product.`,
      );
      return;
    }

    if (form.type === "ADJUSTMENT" && !Number.isSafeInteger(quantity)) {
      setError("The adjusted stock must be a whole number.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        productId: form.productId,
        type: form.type,
        quantity,
        reason: form.reason.trim(),
        notes: form.notes.trim(),
      };

      const response = await fetch(MOVEMENT_URL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result: ApiResponse = await readApiResponse(response);

      if (!response.ok || !result.success) {
        throw new Error(
          result.errors?.join(", ") ||
            result.message ||
            "Could not record stock movement.",
        );
      }

      setSuccess("Stock movement recorded successfully.");

      router.push("/dashboard/stock/history");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const movementOptions: {
    type: MovementType;
    title: string;
    description: string;
    icon: typeof TrendingUp;
    activeClass: string;
    iconClass: string;
  }[] = [
    {
      type: "IN",
      title: "Stock In",
      description: "Add units to inventory",
      icon: TrendingUp,
      activeClass:
        "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/10",
      iconClass: "bg-emerald-100 text-emerald-700",
    },
    {
      type: "OUT",
      title: "Stock Out",
      description: "Remove units from inventory",
      icon: TrendingDown,
      activeClass: "border-rose-500 bg-rose-50 ring-2 ring-rose-500/10",
      iconClass: "bg-rose-100 text-rose-700",
    },
    {
      type: "ADJUSTMENT",
      title: "Adjustment",
      description: "Set a corrected stock count",
      icon: ArrowLeftRight,
      activeClass: "border-blue-500 bg-blue-50 ring-2 ring-blue-500/10",
      iconClass: "bg-blue-100 text-blue-700",
    },
  ];

  const quantityAfter =
    selectedProduct && form.quantity.trim() !== ""
      ? form.type === "IN"
        ? selectedProduct.quantity + Math.max(0, Number(form.quantity) || 0)
        : form.type === "OUT"
          ? selectedProduct.quantity - Math.max(0, Number(form.quantity) || 0)
          : Math.max(0, Number(form.quantity) || 0)
      : null;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-7 pb-10">
      <div>
        <Link
          href="/dashboard/stock"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-700"
        >
          <ArrowLeft size={16} />
          Back to Stock Overview
        </Link>

        <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2 text-sm text-emerald-700">
              <ArrowLeftRight size={16} />
              <span>Inventory management</span>
            </div>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Record Stock Movement
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Record incoming inventory, outgoing inventory, or a stock count
              correction with a reason for your records.
            </p>
          </div>

          <Link
            href="/dashboard/stock/history"
            className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:self-auto"
          >
            <Boxes size={16} />
            View History
          </Link>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800"
        >
          <ShieldAlert size={19} className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
        >
          <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
          <p>{success}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 lg:grid-cols-3"
      >
        <div className="space-y-6 lg:col-span-2">
          {/* Movement type */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                1. Choose movement type
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Select the type of inventory change you want to record.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {movementOptions.map((option) => {
                const Icon = option.icon;
                const active = form.type === option.type;

                return (
                  <button
                    key={option.type}
                    type="button"
                    onClick={() => updateField("type", option.type)}
                    aria-pressed={active}
                    className={`rounded-xl border p-4 text-left transition ${
                      active
                        ? option.activeClass
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${option.iconClass}`}
                    >
                      <Icon size={20} />
                    </span>

                    <span className="mt-3 block text-sm font-semibold text-slate-900">
                      {option.title}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500">
                      {option.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Product and quantity */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-base font-bold text-slate-900">
              2. Product and quantity
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Select the product and enter the amount involved.
            </p>

            <div className="mt-5 space-y-5">
              <div>
                <label
                  htmlFor="productId"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Product <span className="text-rose-500">*</span>
                </label>

                <div className="relative">
                  <select
                    id="productId"
                    value={form.productId}
                    onChange={(event) =>
                      updateField("productId", event.target.value)
                    }
                    disabled={loadingProducts || products.length === 0}
                    required
                    className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 disabled:bg-slate-50"
                  >
                    <option value="">
                      {loadingProducts
                        ? "Loading products..."
                        : products.length === 0
                          ? "No products available"
                          : "Select a product"}
                    </option>

                    {products.map((product) => (
                      <option key={product._id} value={product._id}>
                        {product.name} — {product.sku}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={17}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>

                {loadingProducts && (
                  <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <LoaderCircle size={13} className="animate-spin" />
                    Loading inventory...
                  </p>
                )}

                {!loadingProducts && products.length === 0 && !error && (
                  <p className="mt-2 text-xs text-amber-700">
                    Create a product first, then record its stock movement.
                  </p>
                )}
              </div>

              {selectedProduct && (
                <div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:grid-cols-3">
                  <div>
                    <p className="text-xs text-slate-500">SKU</p>
                    <p className="mt-1 break-all text-sm font-semibold text-slate-800">
                      {selectedProduct.sku}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Current stock</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {selectedProduct.quantity.toLocaleString("en-US")} units
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Minimum stock</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {selectedProduct.minStock.toLocaleString("en-US")} units
                    </p>
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="quantity"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  {form.type === "ADJUSTMENT"
                    ? "New total quantity"
                    : "Quantity"}{" "}
                  <span className="text-rose-500">*</span>
                </label>

                <input
                  id="quantity"
                  type="number"
                  min={form.type === "ADJUSTMENT" ? 0 : 1}
                  step="1"
                  inputMode="numeric"
                  value={form.quantity}
                  onChange={(event) =>
                    updateField("quantity", event.target.value)
                  }
                  required
                  placeholder="Enter quantity"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                />

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {form.type === "IN" &&
                    "These units will be added to the current stock."}
                  {form.type === "OUT" &&
                    "These units will be removed from the current stock."}
                  {form.type === "ADJUSTMENT" &&
                    "Enter the actual total stock count. This will replace the current quantity."}
                </p>
              </div>
            </div>
          </section>

          {/* Reason */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-base font-bold text-slate-900">
              3. Movement details
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Explain why this inventory change is taking place.
            </p>

            <div className="mt-5 space-y-5">
              <div>
                <label
                  htmlFor="reason"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Reason <span className="text-rose-500">*</span>
                </label>

                <select
                  id="reason"
                  value={form.reason}
                  onChange={(event) =>
                    updateField("reason", event.target.value)
                  }
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                >
                  <option value="">Select a reason</option>

                  {(form.type === "IN"
                    ? [
                        "Purchase / Restock",
                        "Customer Return",
                        "Opening Stock",
                        "Transfer In",
                        "Other",
                      ]
                    : form.type === "OUT"
                      ? [
                          "Customer Sale",
                          "Damaged Goods",
                          "Expired Goods",
                          "Transfer Out",
                          "Internal Use",
                          "Other",
                        ]
                      : [
                          "Physical Stock Count",
                          "Damaged / Lost Stock",
                          "Data Correction",
                          "Other",
                        ]
                  ).map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="notes"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Notes{" "}
                  <span className="font-normal text-slate-400">(optional)</span>
                </label>

                <textarea
                  id="notes"
                  value={form.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  maxLength={500}
                  rows={4}
                  placeholder="Add reference numbers or other useful details..."
                  className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                />

                <p className="mt-1 text-right text-xs text-slate-400">
                  {form.notes.length}/500
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Summary sidebar */}
        <aside className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <h2 className="font-bold text-slate-900">Movement summary</h2>
            <p className="mt-1 text-sm text-slate-500">
              Review the details before saving.
            </p>

            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                  <Package size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500">Selected product</p>
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {selectedProduct?.name || "No product selected"}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
                <span className="text-sm text-slate-500">Movement</span>
                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-700">
                  {form.type === "IN"
                    ? "Stock In"
                    : form.type === "OUT"
                      ? "Stock Out"
                      : "Adjustment"}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-sm text-slate-500">
                  {form.type === "ADJUSTMENT" ? "New total" : "Quantity"}
                </span>
                <span className="text-sm font-bold text-slate-900">
                  {form.quantity || "0"} units
                </span>
              </div>

              {selectedProduct && quantityAfter !== null && (
                <div className="mt-3 flex items-center justify-between gap-3 border-t border-slate-200 pt-3">
                  <span className="text-sm text-slate-500">Expected stock</span>
                  <span
                    className={`text-sm font-bold ${
                      quantityAfter <= selectedProduct.minStock
                        ? "text-amber-700"
                        : "text-emerald-700"
                    }`}
                  >
                    {quantityAfter.toLocaleString("en-US")} units
                  </span>
                </div>
              )}
            </div>

            {selectedProduct &&
              quantityAfter !== null &&
              quantityAfter <= selectedProduct.minStock && (
                <div className="mt-4 flex gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3">
                  <ShieldAlert
                    size={17}
                    className="mt-0.5 shrink-0 text-amber-700"
                  />
                  <p className="text-xs leading-5 text-amber-800">
                    This movement may leave the product at or below its minimum
                    stock level.
                  </p>
                </div>
              )}

            <div className="mt-5 space-y-3">
              <button
                type="submit"
                disabled={
                  submitting || loadingProducts || products.length === 0
                }
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <LoaderCircle size={17} className="animate-spin" />
                    Saving movement...
                  </>
                ) : (
                  <>
                    Save movement
                    <ArrowRight size={17} />
                  </>
                )}
              </button>

              <Link
                href="/dashboard/stock"
                className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
            <div className="flex items-center gap-2 text-blue-800">
              <ShieldAlert size={18} />
              <h3 className="text-sm font-semibold">Important</h3>
            </div>

            <p className="mt-2 text-sm leading-6 text-blue-800/80">
              Every stock movement should have a clear reason. Verify the
              product and quantity before submitting.
            </p>
          </section>

          <button
            type="button"
            onClick={() => void loadProducts()}
            disabled={loadingProducts}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60"
          >
            <RefreshCw
              size={15}
              className={loadingProducts ? "animate-spin" : ""}
            />
            Reload products
          </button>
        </aside>
      </form>
    </div>
  );
}
