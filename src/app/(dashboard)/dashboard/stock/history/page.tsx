"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  CalendarDays,
  Clock,
  Download,
  FileClock,
  Loader2,
  Package,
  RefreshCw,
  Search,
  SlidersHorizontal,
  TrendingUp,
} from "lucide-react";

interface StockMovement {
  _id: string;
  productId:
    | string
    | {
        _id: string;
        name: string;
        sku: string;
      };
  type: "IN" | "OUT" | "ADJUSTMENT";
  quantity: number;
  reason?: string;
  notes?: string;
  createdAt: string;
}

interface ApiResponse {
  success: boolean;
  data?: StockMovement[] | { movements?: StockMovement[] };
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const API_BASE = API_URL.endsWith("/api") ? API_URL : `${API_URL}/api`;
const MOVEMENTS_URL = `${API_BASE}/stock/movements`;

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const formatTime = (date: string) =>
  new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

const getProduct = (movement: StockMovement) => {
  if (typeof movement.productId === "object" && movement.productId) {
    return {
      name: movement.productId.name || "Unknown product",
      sku: movement.productId.sku || "N/A",
    };
  }

  return {
    name: "Product",
    sku:
      typeof movement.productId === "string"
        ? movement.productId.slice(-8)
        : "N/A",
  };
};

const getTypeLabel = (type: StockMovement["type"]) => {
  switch (type) {
    case "IN":
      return "Stock In";
    case "OUT":
      return "Stock Out";
    case "ADJUSTMENT":
      return "Adjustment";
  }
};

const StockHistoryPage = () => {
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("ALL");

  const fetchMovements = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(MOVEMENTS_URL, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result: ApiResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to load stock history.");
      }

      const data = Array.isArray(result.data)
        ? result.data
        : result.data?.movements || [];

      setMovements(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading stock history.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchMovements();
  }, [fetchMovements]);

  const filteredMovements = useMemo(() => {
    const now = new Date();

    return movements.filter((movement) => {
      const product = getProduct(movement);
      const query = search.trim().toLowerCase();

      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        (movement.reason || "").toLowerCase().includes(query) ||
        (movement.notes || "").toLowerCase().includes(query);

      const matchesType =
        typeFilter === "ALL" || movement.type === typeFilter;

      const movementDate = new Date(movement.createdAt);
      let matchesDate = true;

      if (dateFilter === "TODAY") {
        matchesDate =
          movementDate.toDateString() === now.toDateString();
      } else if (dateFilter === "7DAYS") {
        const start = new Date(now);
        start.setDate(now.getDate() - 7);
        matchesDate = movementDate >= start && movementDate <= now;
      } else if (dateFilter === "30DAYS") {
        const start = new Date(now);
        start.setDate(now.getDate() - 30);
        matchesDate = movementDate >= start && movementDate <= now;
      }

      return matchesSearch && matchesType && matchesDate;
    });
  }, [movements, search, typeFilter, dateFilter]);

  const summary = useMemo(
    () => ({
      total: filteredMovements.length,
      stockIn: filteredMovements.filter((m) => m.type === "IN").length,
      stockOut: filteredMovements.filter((m) => m.type === "OUT").length,
      adjustments: filteredMovements.filter(
        (m) => m.type === "ADJUSTMENT",
      ).length,
    }),
    [filteredMovements],
  );

  const exportCsv = () => {
    const rows = [
      [
        "Date",
        "Time",
        "Product",
        "SKU",
        "Movement Type",
        "Quantity",
        "Reason",
        "Notes",
      ],
      ...filteredMovements.map((movement) => {
        const product = getProduct(movement);

        return [
          formatDate(movement.createdAt),
          formatTime(movement.createdAt),
          product.name,
          product.sku,
          getTypeLabel(movement.type),
          movement.quantity,
          movement.reason || "",
          movement.notes || "",
        ];
      }),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(","),
      )
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "stock-movement-history.csv";
    anchor.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/dashboard/stock"
            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Back to Stock
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
              <FileClock size={25} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Stock History
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Track and review your inventory movements.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => void fetchMovements()}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>

          <button
            onClick={exportCsv}
            disabled={filteredMovements.length === 0}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Movements"
          value={summary.total}
          description="Matching records"
          icon={<Boxes size={21} />}
          iconClass="bg-indigo-50 text-indigo-600"
        />

        <SummaryCard
          title="Stock In"
          value={summary.stockIn}
          description="Incoming movements"
          icon={<ArrowDownLeft size={21} />}
          iconClass="bg-emerald-50 text-emerald-600"
        />

        <SummaryCard
          title="Stock Out"
          value={summary.stockOut}
          description="Outgoing movements"
          icon={<ArrowUpRight size={21} />}
          iconClass="bg-rose-50 text-rose-600"
        />

        <SummaryCard
          title="Adjustments"
          value={summary.adjustments}
          description="Stock corrections"
          icon={<TrendingUp size={21} />}
          iconClass="bg-amber-50 text-amber-600"
        />
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-slate-500" />
          <h2 className="font-semibold text-slate-900">
            Filter Movements
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search product, SKU, reason..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
          >
            <option value="ALL">All movement types</option>
            <option value="IN">Stock In</option>
            <option value="OUT">Stock Out</option>
            <option value="ADJUSTMENT">Adjustment</option>
          </select>

          <select
            value={dateFilter}
            onChange={(event) => setDateFilter(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
          >
            <option value="ALL">All dates</option>
            <option value="TODAY">Today</option>
            <option value="7DAYS">Last 7 days</option>
            <option value="30DAYS">Last 30 days</option>
          </select>
        </div>
      </div>

      {/* History table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-bold text-slate-900">
              Movement Records
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Inventory activity and transaction details
            </p>
          </div>

          <span className="w-fit rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
            {filteredMovements.length} records
          </span>
        </div>

        {loading ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-slate-500">
            <Loader2 size={30} className="animate-spin text-indigo-600" />
            <p className="text-sm">Loading stock history...</p>
          </div>
        ) : error ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600">
              <Clock size={22} />
            </div>
            <p className="font-semibold text-slate-900">
              Could not load stock history
            </p>
            <p className="mt-2 max-w-lg text-sm text-slate-500">
              {error}
            </p>
            <button
              onClick={() => void fetchMovements()}
              className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Try again
            </button>
          </div>
        ) : filteredMovements.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Package size={30} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              No movements found
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              There are no stock movements matching your filters. Record a
              stock movement or adjust your search.
            </p>
            <Link
              href="/dashboard/stock/new"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Record Movement
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                    <th className="px-5 py-4 font-semibold">Product</th>
                    <th className="px-5 py-4 font-semibold">Movement</th>
                    <th className="px-5 py-4 font-semibold">Quantity</th>
                    <th className="px-5 py-4 font-semibold">Reason</th>
                    <th className="px-5 py-4 font-semibold">Date & Time</th>
                    <th className="px-5 py-4 font-semibold">Notes</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredMovements.map((movement) => {
                    const product = getProduct(movement);

                    const isIn = movement.type === "IN";
                    const isOut = movement.type === "OUT";

                    return (
                      <tr
                        key={movement._id}
                        className="transition hover:bg-slate-50/80"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                              <Package size={19} />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">
                                {product.name}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                SKU: {product.sku}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold ${
                              isIn
                                ? "bg-emerald-50 text-emerald-700"
                                : isOut
                                  ? "bg-rose-50 text-rose-700"
                                  : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {isIn ? (
                              <ArrowDownLeft size={14} />
                            ) : isOut ? (
                              <ArrowUpRight size={14} />
                            ) : (
                              <RefreshCw size={13} />
                            )}
                            {getTypeLabel(movement.type)}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`font-bold tabular-nums ${
                              isIn
                                ? "text-emerald-700"
                                : isOut
                                  ? "text-rose-700"
                                  : "text-amber-700"
                            }`}
                          >
                            {isIn ? "+" : isOut ? "−" : ""}
                            {movement.quantity}
                          </span>
                          <span className="ml-1 text-xs text-slate-400">
                            units
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-slate-700">
                            {movement.reason || "—"}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-start gap-2">
                            <CalendarDays
                              size={15}
                              className="mt-0.5 shrink-0 text-slate-400"
                            />
                            <div>
                              <p className="text-sm font-medium text-slate-700">
                                {formatDate(movement.createdAt)}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                {formatTime(movement.createdAt)}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="max-w-56 px-5 py-4">
                          <p
                            className="truncate text-sm text-slate-500"
                            title={movement.notes || ""}
                          >
                            {movement.notes || "—"}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-700">
                  {filteredMovements.length}
                </span>{" "}
                matching movements
              </p>

              <Link
                href="/dashboard/stock/new"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Record New Movement
                <ArrowRight size={16} />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

function SummaryCard({
  title,
  value,
  description,
  icon,
  iconClass,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {value.toLocaleString()}
          </p>
          <p className="mt-2 text-xs text-slate-500">{description}</p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StockHistoryPage;