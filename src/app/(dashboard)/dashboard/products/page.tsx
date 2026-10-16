"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CirclePlus,
  Package,
  RefreshCw,
} from "lucide-react";

import type {
  Product,
  ProductView,
} from "@/lib/products/product-types";

import {
  formatPrice,
  getProductStatus,
} from "@/lib/products/product-utils";

import {
  fetchProducts as getProducts,
  deleteProduct as removeProduct,
} from "@/lib/products/product-api";

import ProductsSummary from "@/components/products/ProductsSummary";
import ProductFilters from "@/components/products/ProductFilters";
import ProductsTable from "@/components/products/ProductsTable";
import DeleteProductDialog from "@/components/products/DeleteProductDialog";

export default function DashboardProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");
  const [sortBy, setSortBy] = useState("name");
  const [view, setView] = useState<ProductView>("table");

  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    try {
      const result = await getProducts();
      setProducts(result);
    } catch (error) {
      setLoadError(
        error instanceof Error
          ? error.message
          : "Could not load products. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  const categories = useMemo(
    () => [
      "All Categories",
      ...Array.from(
        new Set(products.map((product) => product.category)),
      ).sort(),
    ],
    [products],
  );

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products
      .filter((product) => {
        const matchesSearch =
          !query ||
          product.name.toLowerCase().includes(query) ||
          product.sku.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query);

        const matchesCategory =
          category === "All Categories" ||
          product.category === category;

        const matchesStatus =
          status === "All Status" ||
          getProductStatus(product) === status;

        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "quantity") {
          return a.quantity - b.quantity;
        }

        if (sortBy === "price") {
          return b.price - a.price;
        }

        return a.name.localeCompare(b.name);
      });
  }, [products, search, category, status, sortBy]);

  const totalUnits = products.reduce(
    (total, product) => total + product.quantity,
    0,
  );

  const outOfStockCount = products.filter(
    (product) => getProductStatus(product) === "Out of Stock",
  ).length;

  const resetFilters = () => {
    setSearch("");
    setCategory("All Categories");
    setStatus("All Status");
    setSortBy("name");
  };

  const handleDelete = async () => {
    if (!deleteTarget || deleting) return;

    setDeleting(true);
    setDeleteError("");

    try {
      await removeProduct(deleteTarget.id);

      setProducts((current) =>
        current.filter(
          (product) => product.id !== deleteTarget.id,
        ),
      );

      setDeleteTarget(null);
    } catch (error) {
      setDeleteError(
        error instanceof Error
          ? error.message
          : "Could not delete this product.",
      );
    } finally {
      setDeleting(false);
    }
  };

  const closeDeleteDialog = () => {
    if (deleting) return;

    setDeleteTarget(null);
    setDeleteError("");
  };

  return (
    <div className="min-h-screen space-y-7 bg-slate-50/70 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
            <Link
              href="/dashboard"
              className="transition hover:text-emerald-700"
            >
              Dashboard
            </Link>

            <span>/</span>

            <span className="font-medium text-slate-700">
              Products
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Products
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
            Manage your inventory, monitor stock levels, and keep
            your products organized.
          </p>
        </div>

        <Link
          href="/dashboard/products/new"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          <CirclePlus size={18} />
          Add Product
        </Link>
      </div>

      {/* API error */}
      {loadError && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>{loadError}</p>

          <button
            type="button"
            onClick={() => void fetchProducts()}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-red-200 bg-white px-3 py-2 font-semibold hover:bg-red-100 disabled:opacity-50"
          >
            <RefreshCw
              size={15}
              className={loading ? "animate-spin" : ""}
            />
            Try again
          </button>
        </div>
      )}

      {/* Summary cards */}
      <ProductsSummary
        products={products}
        loading={loading}
      />

      {/* Products section */}
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:p-6">
          <ProductFilters
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            categories={categories}
            status={status}
            setStatus={setStatus}
            sortBy={sortBy}
            setSortBy={setSortBy}
            view={view}
            setView={setView}
            resetFilters={resetFilters}
          />

          <p className="text-sm text-slate-500">
            {loading
              ? "Loading products..."
              : `${filteredProducts.length} of ${products.length} products shown`}
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <RefreshCw
              size={25}
              className="animate-spin text-emerald-600"
            />

            <p className="mt-4 font-semibold text-slate-800">
              Loading products
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Fetching your inventory...
            </p>
          </div>
        ) : (
          <ProductsTable
            products={filteredProducts}
            view={view}
            totalProducts={products.length}
            onDelete={(product) => {
              setDeleteTarget(product);
              setDeleteError("");
            }}
            onResetFilters={resetFilters}
          />
        )}

        {/* Footer */}
        <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>
            Showing{" "}
            {loading ? "—" : filteredProducts.length} of{" "}
            {loading ? "—" : products.length} products
          </span>

          <span>
            Out of stock:{" "}
            {loading ? "—" : outOfStockCount} products
          </span>

          <span>
            Total units:{" "}
            {loading ? "—" : totalUnits.toLocaleString("en-BD")}
          </span>

          <span>
            Inventory value:{" "}
            {loading
              ? "—"
              : formatPrice(
                  products.reduce(
                    (total, product) =>
                      total + product.quantity * product.price,
                    0,
                  ),
                )}
          </span>
        </div>
      </section>

      {/* Delete confirmation */}
      <DeleteProductDialog
        product={deleteTarget}
        deleting={deleting}
        error={deleteError}
        onClose={closeDeleteDialog}
        onConfirm={() => void handleDelete()}
      />
    </div>
  );
}
