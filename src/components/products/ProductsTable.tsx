
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  MoreHorizontal,
  Package,
  Pencil,
  Search,
  Trash2,
} from "lucide-react";

import type {
  Product,
  ProductView,
} from "@/lib/products/product-types";

import {
  formatPrice,
  getProductStatus,
  statusStyles,
} from "@/lib/products/product-utils";

type Props = {
  products: Product[];
  view: ProductView;
  totalProducts: number;
  onDelete: (product: Product) => void;
  onResetFilters: () => void;
};

export default function ProductsTable({
  products,
  view,
  totalProducts,
  onDelete,
  onResetFilters,
}: Props) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center px-6 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
          <Search size={25} />
        </div>

        <h3 className="mt-4 font-bold text-slate-900">
          {totalProducts === 0 ? "No products yet" : "No products found"}
        </h3>

        <p className="mt-2 max-w-sm text-sm text-slate-500">
          {totalProducts === 0
            ? "Add your first product to start managing your inventory."
            : "Try changing your search or filters to find the product you need."}
        </p>

        {totalProducts === 0 ? (
          <Link
            href="/dashboard/products/new"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            <Package size={16} />
            Add Product
          </Link>
        ) : (
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-5 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Clear filters
          </button>
        )}
      </div>
    );
  }

  if (view === "grid") {
    return (
      <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => {
          const productStatus = getProductStatus(product);

          return (
            <article
              key={product.id}
              className="rounded-xl border border-slate-200 p-5 transition hover:border-emerald-200 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
                  <Package size={22} />
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[productStatus]}`}
                >
                  {productStatus}
                </span>
              </div>

              <h3 className="mt-4 font-bold text-slate-900">
                {product.name}
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                SKU: {product.sku}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                {product.category}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                <div>
                  <p className="text-xs text-slate-500">Unit price</p>
                  <p className="mt-1 font-bold text-slate-800">
                    {formatPrice(product.price)}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-500">Available</p>
                  <p className="mt-1 font-bold text-slate-800">
                    {product.quantity} units
                  </p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Link
                  href={`/dashboard/products/${product.id}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Eye size={15} />
                  View
                </Link>

                <Link
                  href={`/dashboard/products/${product.id}/edit`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-100"
                >
                  <Pencil size={15} />
                  Edit
                </Link>

                <button
                  type="button"
                  onClick={() => onDelete(product)}
                  aria-label={`Delete ${product.name}`}
                  className="rounded-lg border border-red-100 px-3 py-2 text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[850px] text-left">
        <thead>
          <tr className="bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
            <th className="px-6 py-4 font-semibold">Product</th>
            <th className="px-4 py-4 font-semibold">Category</th>
            <th className="px-4 py-4 font-semibold">Unit Price</th>
            <th className="px-4 py-4 font-semibold">Stock Level</th>
            <th className="px-4 py-4 font-semibold">Status</th>
            <th className="px-5 py-4 text-right font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {products.map((product) => {
            const productStatus = getProductStatus(product);

            const stockPercent =
              product.minStock > 0
                ? Math.min(
                    (product.quantity / (product.minStock * 2)) * 100,
                    100,
                  )
                : 100;

            return (
              <tr
                key={product.id}
                className="transition hover:bg-slate-50/70"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-slate-600">
                      <Package size={20} />
                    </div>

                    <div>
                      <Link
                        href={`/dashboard/products/${product.id}`}
                        className="text-sm font-semibold text-slate-800 hover:text-emerald-700"
                      >
                        {product.name}
                      </Link>

                      <p className="mt-1 text-xs text-slate-400">
                        SKU: {product.sku}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4 text-sm text-slate-600">
                  {product.category}
                </td>

                <td className="px-4 py-4 text-sm font-semibold text-slate-800">
                  {formatPrice(product.price)}
                </td>

                <td className="px-4 py-4">
                  <div className="w-28">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-semibold text-slate-700">
                        {product.quantity}
                      </span>
                      <span className="text-slate-400">
                        Min. {product.minStock}
                      </span>
                    </div>

                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${
                          productStatus === "In Stock"
                            ? "bg-emerald-500"
                            : productStatus === "Low Stock"
                              ? "bg-amber-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${stockPercent}%` }}
                      />
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4">
                  <span
                    className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[productStatus]}`}
                  >
                    {productStatus}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="relative flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveMenu(
                          activeMenu === product.id ? null : product.id,
                        )
                      }
                      aria-label={`Actions for ${product.name}`}
                      aria-expanded={activeMenu === product.id}
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                    >
                      <MoreHorizontal size={19} />
                    </button>

                    {activeMenu === product.id && (
                      <div className="absolute right-0 top-10 z-20 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                        <Link
                          href={`/dashboard/products/${product.id}`}
                          onClick={() => setActiveMenu(null)}
                          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <Eye size={16} />
                          View details
                        </Link>

                        <Link
                          href={`/dashboard/products/${product.id}/edit`}
                          onClick={() => setActiveMenu(null)}
                          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <Pencil size={16} />
                          Edit product
                        </Link>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenu(null);
                            onDelete(product);
                          }}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                          Delete product
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}