import Link from "next/link";
import {
  ArrowLeft,
  Package,
  Pencil,
  Plus,
} from "lucide-react";

import type {
  Product,
  ProductStatus,
} from "@/lib/products/product-details-types";
import { statusClasses } from "@/lib/products/product-details-utils";

type Props = {
  product: Product;
  status: ProductStatus;
};

export default function ProductHeader({ product, status }: Props) {
  return (
    <div>
      <Link
        href="/dashboard/products"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-700"
      >
        <ArrowLeft size={16} />
        Back to Products
      </Link>

      <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700 sm:h-16 sm:w-16">
            <Package size={30} />
          </div>

          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <Link href="/dashboard" className="hover:text-emerald-700">
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
              <span className="font-medium text-slate-700">Details</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <h1 className="break-words text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {product.name}
              </h1>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusClasses[status]}`}
              >
                {status}
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              SKU: {product.sku}
              <span className="mx-2">·</span>
              {product.category}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href={`/dashboard/products/${encodeURIComponent(product.id)}/edit`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <Pencil size={16} />
            Edit Product
          </Link>

          <Link
            href={`/dashboard/stock/new?productId=${encodeURIComponent(product.id)}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            <Plus size={17} />
            Record Movement
          </Link>
        </div>
      </div>
    </div>
  );
}