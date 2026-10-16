"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Clock,
  Loader2,
  Package,
  Plus,
  RefreshCw,
  TrendingUp,
  Wallet,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface Product {
  _id: string;
  name: string;
  sku: string;
  category?: string;
  price: number;
  quantity: number;
  minStock: number;
}

interface Movement {
  _id: string;
  type: "IN" | "OUT" | "ADJUSTMENT";
  quantity: number;
  reason?: string;
  createdAt: string;
  productId?: {
    _id: string;
    name: string;
    sku: string;
  } | null;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  pagination?: {
    total?: number;
  };
}

interface CategoryChartItem {
  name: string;
  value: number;
}

interface MovementChartItem {
  day: string;
  date: string;
  stockIn: number;
  stockOut: number;
}

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const API_BASE = API_URL.endsWith("/api") ? API_URL : `${API_URL}/api`;

const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#f43f5e",
  "#64748b",
  "#ec4899",
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(value || 0);

async function readApiResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    const body = await response.text();

    console.error("Expected JSON but received:", {
      url: response.url,
      status: response.status,
      contentType,
      body: body.slice(0, 300),
    });

    throw new Error(
      `API returned non-JSON response (${response.status}). Check the API URL and backend deployment.`,
    );
  }

  return response.json() as Promise<ApiResponse<T>>;
}

const formatDate = (date: string) => {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Date unavailable";
  }

  return parsed.toLocaleString("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const DashboardOverview = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/dashboard`, {
        headers: { Accept: "application/json" },
        credentials: "include",
      });

      const result = await readApiResponse<{
        summary: {
          totalProducts: number;
          totalUnits: number;
          inventoryValue: number;
          lowStockCount: number;
          outOfStockCount: number;
        };
        categories: {
          name: string;
          inventoryValue: number;
        }[];
        movementChart: {
          date: string;
          stockIn: number;
          stockOut: number;
        }[];
        recentMovements: Movement[];
        lowStockProducts: Product[];
        outOfStockProducts: Product[];
      }>(response);

      if (!response.ok || !result.success || !result.data) {
        throw new Error(result.message || "Failed to load dashboard.");
      }

      const data = result.data;

      setProducts([...data.lowStockProducts, ...data.outOfStockProducts]);

      setMovements(data.recentMovements ?? []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load dashboard data.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchDashboardData();
  }, [fetchDashboardData]);

  const totalProducts = products.length;

  const totalUnits = products.reduce(
    (total, product) => total + (Number(product.quantity) || 0),
    0,
  );

  const inventoryValue = products.reduce(
    (total, product) =>
      total + (Number(product.price) || 0) * (Number(product.quantity) || 0),
    0,
  );

  const lowStockProducts = products.filter(
    (product) =>
      Number(product.quantity) > 0 &&
      Number(product.quantity) <= Number(product.minStock ?? 0),
  );

  const outOfStockProducts = products.filter(
    (product) => Number(product.quantity) <= 0,
  );

  const categoryChartData = useMemo<CategoryChartItem[]>(() => {
    const categoryMap = new Map<string, number>();

    for (const product of products) {
      const category = product.category?.trim() || "Other";
      const value =
        (Number(product.price) || 0) * (Number(product.quantity) || 0);

      categoryMap.set(category, (categoryMap.get(category) || 0) + value);
    }

    return Array.from(categoryMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [products]);

  const movementChartData = useMemo<MovementChartItem[]>(() => {
    const today = new Date();
    const days: MovementChartItem[] = [];

    for (let index = 6; index >= 0; index--) {
      const date = new Date(today);
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - index);

      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const dayMovements = movements.filter((movement) => {
        const movementDate = new Date(movement.createdAt);

        return movementDate >= date && movementDate < nextDate;
      });

      days.push({
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        stockIn: dayMovements
          .filter((movement) => movement.type === "IN")
          .reduce((sum, movement) => sum + (Number(movement.quantity) || 0), 0),
        stockOut: dayMovements
          .filter((movement) => movement.type === "OUT")
          .reduce((sum, movement) => sum + (Number(movement.quantity) || 0), 0),
      });
    }

    return days;
  }, [movements]);

  const recentMovements = useMemo(
    () =>
      [...movements]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 5),
    [movements],
  );

  const stats = [
    {
      title: "Total Products",
      value: totalProducts.toLocaleString(),
      description: "Products in your inventory",
      icon: <Package size={22} />,
      iconStyle: "bg-blue-50 text-blue-600",
    },
    {
      title: "Total Stock Units",
      value: totalUnits.toLocaleString(),
      description: "Units currently recorded",
      icon: <Boxes size={22} />,
      iconStyle: "bg-violet-50 text-violet-600",
    },
    {
      title: "Inventory Value",
      value: formatCurrency(inventoryValue),
      description: "Based on current unit prices",
      icon: <Wallet size={22} />,
      iconStyle: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Low Stock Alerts",
      value: (
        lowStockProducts.length + outOfStockProducts.length
      ).toLocaleString(),
      description: `${outOfStockProducts.length} products out of stock`,
      icon: <AlertTriangle size={22} />,
      iconStyle: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <main className="mx-auto max-w-7xl space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-600">
            Inventory management
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Dashboard Overview
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Monitor inventory, stock levels, trends, and recent activity.
          </p>
        </div>

        <button
          onClick={() => void fetchDashboardData()}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Quick Actions */}
      <section className="flex flex-wrap gap-3">
        <Link
          href="/dashboard/stock/new"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <Plus size={17} />
          Record Stock Movement
        </Link>

        <Link
          href="/dashboard/stock"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          <Package size={17} />
          Manage Inventory
        </Link>

        <Link
          href="/dashboard/ai-insights"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          <TrendingUp size={17} />
          View Insights
        </Link>
      </section>

      {/* Error */}
      {error && (
        <div className="flex flex-col gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <AlertTriangle
              size={20}
              className="mt-0.5 shrink-0 text-rose-600"
            />
            <div>
              <p className="font-semibold text-rose-900">
                Could not load dashboard
              </p>
              <p className="mt-1 text-sm text-rose-700">{error}</p>
            </div>
          </div>

          <button
            onClick={() => void fetchDashboardData()}
            className="w-fit rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-700"
          >
            Try again
          </button>
        </div>
      )}

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <p className="mt-3 break-words text-2xl font-bold tracking-tight text-slate-900">
                  {loading ? (
                    <span className="inline-block h-7 w-20 animate-pulse rounded bg-slate-100" />
                  ) : (
                    stat.value
                  )}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  {stat.description}
                </p>
              </div>

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.iconStyle}`}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Stock Movement Chart */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">Stock Movement</h2>
            <p className="mt-1 text-sm text-slate-500">
              Stock In vs Stock Out · Last 7 days
            </p>
          </div>

          <div className="h-72 w-full">
            {loading ? (
              <ChartLoading />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={movementChartData}
                  margin={{ top: 5, right: 8, left: -18, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="stockInGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#10b981"
                        stopOpacity={0.25}
                      />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>

                    <linearGradient
                      id="stockOutGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e2e8f0"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                  />

                  <YAxis
                    allowDecimals={false}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                  />

                  <Tooltip
                    labelFormatter={(_, payload) =>
                      payload?.[0]?.payload?.date || ""
                    }
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid #e2e8f0",
                      fontSize: 12,
                    }}
                  />

                  <Legend />

                  <Area
                    type="monotone"
                    dataKey="stockIn"
                    name="Stock In"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fill="url(#stockInGradient)"
                    activeDot={{ r: 5 }}
                  />

                  <Area
                    type="monotone"
                    dataKey="stockOut"
                    name="Stock Out"
                    stroke="#f43f5e"
                    strokeWidth={2.5}
                    fill="url(#stockOutGradient)"
                    activeDot={{ r: 5 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>

          <p className="mt-3 text-xs leading-5 text-slate-400">
            Counts reflect movement records returned by the API. Make sure the
            API returns sufficient history for a complete 7-day view.
          </p>
        </div>

        {/* Category Chart */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              Inventory by Category
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Distribution by inventory value
            </p>
          </div>

          {loading ? (
            <ChartLoading />
          ) : categoryChartData.length === 0 ? (
            <div className="flex h-72 items-center justify-center text-sm text-slate-500">
              Add products to display category analytics.
            </div>
          ) : (
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {categoryChartData.map((category, index) => (
                      <Cell
                        key={category.name}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value) => [
                      formatCurrency(Number(value)),
                      "Inventory Value",
                    ]}
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid #e2e8f0",
                      fontSize: 12,
                    }}
                  />

                  <Legend verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </section>

      {/* Alerts and Recent Activity */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Stock Alerts */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <AlertTriangle size={21} />
              </div>
              <div>
                <h2 className="font-bold text-slate-900">Stock Alerts</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Products that need attention
                </p>
              </div>
            </div>

            <Link
              href="/dashboard/stock"
              className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
            >
              View all <ArrowRight size={15} />
            </Link>
          </div>

          {loading ? (
            <LoadingState />
          ) : lowStockProducts.length === 0 &&
            outOfStockProducts.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <TrendingUp size={23} />
              </div>
              <p className="mt-3 font-semibold text-slate-900">
                No stock alerts
              </p>
              <p className="mt-1 text-sm text-slate-500">
                No products currently match the stock alert rules.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {[...outOfStockProducts, ...lowStockProducts]
                .slice(0, 5)
                .map((product) => {
                  const outOfStock = product.quantity <= 0;

                  return (
                    <div
                      key={product._id}
                      className="flex items-center justify-between gap-3 p-4 transition hover:bg-slate-50"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                            outOfStock
                              ? "bg-rose-50 text-rose-600"
                              : "bg-amber-50 text-amber-600"
                          }`}
                        >
                          <Package size={19} />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-800">
                            {product.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            SKU: {product.sku}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <p
                          className={`text-sm font-bold ${
                            outOfStock ? "text-rose-600" : "text-amber-600"
                          }`}
                        >
                          {product.quantity} units
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Minimum: {product.minStock}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Activity size={21} />
              </div>
              <div>
                <h2 className="font-bold text-slate-900">
                  Recent Stock Activity
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Latest recorded movements
                </p>
              </div>
            </div>

            <Link
              href="/dashboard/stock/history"
              className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
            >
              History <ArrowRight size={15} />
            </Link>
          </div>

          {loading ? (
            <LoadingState />
          ) : recentMovements.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <Clock size={22} />
              </div>
              <p className="mt-3 font-semibold text-slate-900">
                No activity yet
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Stock movements will appear here.
              </p>
              <Link
                href="/dashboard/stock/new"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Record your first movement <ArrowRight size={15} />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentMovements.map((movement) => {
                const isIn = movement.type === "IN";
                const isOut = movement.type === "OUT";

                return (
                  <div
                    key={movement._id}
                    className="flex items-center justify-between gap-3 p-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          isIn
                            ? "bg-emerald-50 text-emerald-600"
                            : isOut
                              ? "bg-rose-50 text-rose-600"
                              : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {isIn ? (
                          <ArrowDownRight size={20} />
                        ) : isOut ? (
                          <ArrowUpRight size={20} />
                        ) : (
                          <RefreshCw size={19} />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {movement.productId?.name || "Product"}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {movement.type} · {formatDate(movement.createdAt)}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-lg px-2.5 py-1.5 text-sm font-bold ${
                        isIn
                          ? "bg-emerald-50 text-emerald-700"
                          : isOut
                            ? "bg-rose-50 text-rose-700"
                            : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {isIn ? "+" : isOut ? "−" : ""}
                      {movement.quantity}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Quick Access */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5">
          <h2 className="font-bold text-slate-900">Inventory Management</h2>
          <p className="mt-1 text-sm text-slate-500">
            Quick access to your everyday workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <QuickAction
            href="/dashboard/stock"
            title="Manage Products"
            description="Review quantities, prices, and stock levels."
            icon={<Package size={21} />}
          />

          <QuickAction
            href="/dashboard/stock/new"
            title="Record Movement"
            description="Add stock, record stock out, or adjust quantities."
            icon={<Plus size={21} />}
          />

          <QuickAction
            href="/dashboard/stock/history"
            title="Stock History"
            description="Review stock movement records."
            icon={<Activity size={21} />}
          />
        </div>
      </section>
    </main>
  );
};

function LoadingState() {
  return (
    <div className="flex min-h-40 items-center justify-center gap-2 text-sm text-slate-500">
      <Loader2 size={20} className="animate-spin text-indigo-600" />
      Loading data...
    </div>
  );
}

function ChartLoading() {
  return (
    <div className="flex h-full items-center justify-center gap-2 text-sm text-slate-500">
      <Loader2 size={20} className="animate-spin text-indigo-600" />
      Loading chart...
    </div>
  );
}

function QuickAction({
  href,
  title,
  description,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/50"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-indigo-100 group-hover:text-indigo-700">
        {icon}
      </div>

      <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>

      <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>

      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
        Open <ArrowRight size={15} />
      </span>
    </Link>
  );
}

export default DashboardOverview;
