"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowLeftRight,
  ArrowRight,
  ArrowUpFromLine,
  Boxes,
  Clock3,
  LoaderCircle,
  Package,
  Plus,
  RefreshCw,
  Search,
  ShieldAlert,
  TrendingDown,
  Warehouse,
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

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: Product[] | { products?: Product[] };
}

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const PRODUCTS_URL = API_URL.endsWith("/api")
  ? `${API_URL}/products`
  : `${API_URL}/api/products`;

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(amount);

function getStockStatus(product: Product) {
  if (product.quantity <= 0) {
    return {
      label: "Out of stock",
      className: "bg-red-50 text-red-700 ring-red-600/20",
    };
  }

  if (product.quantity <= product.minStock) {
    return {
      label: "Low stock",
      className: "bg-amber-50 text-amber-700 ring-amber-600/20",
    };
  }

  return {
    label: "In stock",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  };
}

function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
  iconClass,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 break-words text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
          <p className="mt-2 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

export default function StockPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [stockFilter, setStockFilter] = useState("All stock");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadProducts = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const response = await fetch(PRODUCTS_URL, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      });

      const result: ApiResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to load inventory products.",
        );
      }

      const data = result.data;

      const productList = Array.isArray(data)
        ? data
        : data?.products ?? [];

      setProducts(productList);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading stock.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  const categories = useMemo(
    () => [
      "All categories",
      ...Array.from(new Set(products.map((product) => product.category)))
        .filter(Boolean)
        .sort(),
    ],
    [products],
  );

  const stats = useMemo(() => {
    const totalProducts = products.length;

    const totalUnits = products.reduce(
      (sum, product) => sum + product.quantity,
      0,
    );

    const inventoryValue = products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0,
    );

    const lowStockCount = products.filter(
      (product) => product.quantity > 0 && product.quantity <= product.minStock,
    ).length;

    const outOfStockCount = products.filter(
      (product) => product.quantity <= 0,
    ).length;

    return {
      totalProducts,
      totalUnits,
      inventoryValue,
      lowStockCount,
      outOfStockCount,
    };
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products
      .filter((product) => {
        const matchesSearch =
          !normalizedSearch ||
          product.name.toLowerCase().includes(normalizedSearch) ||
          product.sku.toLowerCase().includes(normalizedSearch);

        const matchesCategory =
          category === "All categories" || product.category === category;

        const matchesStock =
          stockFilter === "All stock" ||
          (stockFilter === "In stock" &&
            product.quantity > product.minStock) ||
          (stockFilter === "Low stock" &&
            product.quantity > 0 &&
            product.quantity <= product.minStock) ||
          (stockFilter === "Out of stock" && product.quantity <= 0);

        return matchesSearch && matchesCategory && matchesStock;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products, search, category, stockFilter]);

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-7 pb-10">
      {/* Page header */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Warehouse size={16} />
            <span>Inventory management</span>
            <ArrowRight size={14} />
            <span className="font-medium text-emerald-700">Stock overview</span>
          </div>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Stock Overview
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Monitor inventory levels, identify stock shortages, and manage
            product movements from one place.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => void loadProducts(true)}
            disabled={loading || refreshing}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={refreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>

          <Link
            href="/dashboard/stock/history"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Clock3 size={17} />
            Stock history
          </Link>

          <Link
            href="/dashboard/stock/new"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            <Plus size={18} />
            Record movement
          </Link>
        </div>
      </section>

      {/* Error state */}
      {error && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 shrink-0 text-red-600" size={20} />
            <div>
              <p className="text-sm font-semibold text-red-800">
                Could not load stock
              </p>
              <p className="mt-1 text-sm text-red-700">{error}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => void loadProducts(true)}
            className="inline-flex h-9 shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-red-200 bg-white px-3 text-sm font-semibold text-red-700 hover:bg-red-100 sm:self-center"
          >
            <RefreshCw size={14} />
            Try again
          </button>
        </div>
      )}

      {/* Summary cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total products"
          value={loading ? "—" : stats.totalProducts.toLocaleString("en-US")}
          description="Unique products in your inventory"
          icon={Package}
          iconClass="bg-blue-50 text-blue-700"
        />

        <SummaryCard
          title="Total stock units"
          value={loading ? "—" : stats.totalUnits.toLocaleString("en-US")}
          description="Units currently recorded across products"
          icon={Boxes}
          iconClass="bg-violet-50 text-violet-700"
        />

        <SummaryCard
          title="Inventory value"
          value={loading ? "—" : formatCurrency(stats.inventoryValue)}
          description="Based on unit price × available quantity"
          icon={ArrowDownToLine}
          iconClass="bg-emerald-50 text-emerald-700"
        />

        <SummaryCard
          title="Stock alerts"
          value={
            loading
              ? "—"
              : (stats.lowStockCount + stats.outOfStockCount).toLocaleString(
                  "en-US",
                )
          }
          description={`${stats.lowStockCount} low stock · ${stats.outOfStockCount} out of stock`}
          icon={TrendingDown}
          iconClass="bg-amber-50 text-amber-700"
        />
      </section>

      {/* Stock alerts */}
      {!loading &&
        (stats.lowStockCount > 0 || stats.outOfStockCount > 0) && (
          <section className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <ShieldAlert size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-slate-900">
                  Inventory needs attention
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {stats.outOfStockCount > 0 &&
                    `${stats.outOfStockCount} product${stats.outOfStockCount === 1 ? " is" : "s are"} out of stock`}
                  {stats.outOfStockCount > 0 && stats.lowStockCount > 0 && " and "}
                  {stats.lowStockCount > 0 &&
                    `${stats.lowStockCount} product${stats.lowStockCount === 1 ? " is" : "s are"} below or at the minimum stock level`}
                  . Review the affected items below.
                </p>
              </div>
            </div>
          </section>
        )}

      {/* Product stock table */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-900/[0.02]">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Product stock levels
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {loading
                ? "Loading your inventory..."
                : `${filteredProducts.length} of ${products.length} products`}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="relative sm:col-span-1">
              <Search
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search product or SKU"
                aria-label="Search products by name or SKU"
                className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
              />
            </div>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              aria-label="Filter by category"
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-500"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={stockFilter}
              onChange={(event) => setStockFilter(event.target.value)}
              aria-label="Filter by stock status"
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-500"
            >
              <option>All stock</option>
              <option>In stock</option>
              <option>Low stock</option>
              <option>Out of stock</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3 px-5 py-12">
            <LoaderCircle className="animate-spin text-emerald-600" size={30} />
            <p className="text-sm text-slate-500">Loading stock levels...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-5 py-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
              <Package size={25} />
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              {products.length === 0
                ? "No products yet"
                : "No matching products"}
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              {products.length === 0
                ? "Add a product to your inventory before recording stock movements."
                : "Try another search term or change the category and stock filters."}
            </p>

            {products.length === 0 && (
              <Link
                href="/dashboard/products/new"
                className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                <Plus size={16} />
                Add product
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse text-left">
                <thead>
                  <tr className="bg-slate-50/80">
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Product
                    </th>
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Category
                    </th>
                    <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Unit price
                    </th>
                    <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Available
                    </th>
                    <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Minimum
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </th>
                    <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((product) => {
                    const status = getStockStatus(product);

                    return (
                      <tr
                        key={product._id}
                        className="transition-colors hover:bg-slate-50/70"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                              <Package size={19} />
                            </div>
                            <div className="min-w-0">
                              <p className="max-w-56 truncate text-sm font-semibold text-slate-900">
                                {product.name}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                SKU: {product.sku}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {product.category}
                        </td>

                        <td className="px-5 py-4 text-right text-sm font-medium tabular-nums text-slate-700">
                          {formatCurrency(product.price)}
                        </td>

                        <td className="px-5 py-4 text-right">
                          <span
                            className={`text-sm font-bold tabular-nums ${
                              product.quantity <= 0
                                ? "text-red-700"
                                : product.quantity <= product.minStock
                                  ? "text-amber-700"
                                  : "text-slate-900"
                            }`}
                          >
                            {product.quantity.toLocaleString("en-US")}
                          </span>
                          <p className="mt-1 text-xs text-slate-400">units</p>
                        </td>

                        <td className="px-5 py-4 text-right text-sm tabular-nums text-slate-600">
                          {product.minStock.toLocaleString("en-US")}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${status.className}`}
                          >
                            {status.label}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-right">
                          <Link
                            href={`/dashboard/stock/new?productId=${encodeURIComponent(product._id)}`}
                            aria-label={`Record stock movement for ${product.name}`}
                            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                          >
                            Manage
                            <ArrowRight size={14} />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-500">
                Stock values reflect the latest product quantities.
              </p>

              <Link
                href="/dashboard/stock/history"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
              >
                View stock movement history
                <ArrowRight size={15} />
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Quick actions */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Link
          href="/dashboard/stock/new"
          className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-900/5"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-100">
            <ArrowLeftRight size={22} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-slate-900">Record stock movement</h3>
            <p className="mt-1 text-sm leading-5 text-slate-500">
              Record incoming stock, outgoing stock, or adjustments.
            </p>
          </div>

          <ArrowRight
            size={18}
            className="shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-emerald-700"
          />
        </Link>

        <Link
          href="/dashboard/stock/history"
          className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-md hover:shadow-blue-900/5"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-100">
            <Clock3 size={22} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-slate-900">View movement history</h3>
            <p className="mt-1 text-sm leading-5 text-slate-500">
              Review previously recorded inventory changes.
            </p>
          </div>

          <ArrowRight
            size={18}
            className="shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700"
          />
        </Link>
      </section>

      {/* Footer note */}
      <p className="flex items-center justify-center gap-2 text-center text-xs text-slate-400">
        <ArrowUpFromLine size={14} />
        Stock changes should be recorded through the stock movement form.
      </p>
    </div>
  );
}