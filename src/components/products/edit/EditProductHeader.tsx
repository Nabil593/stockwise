import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";

export default function EditProductHeader({
  productId,
}: {
  productId: string;
}) {
  const detailsUrl = `/dashboard/products/${encodeURIComponent(productId)}`;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Link
          href={detailsUrl}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Product Details
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <Package className="h-6 w-6" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Edit Product
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Update product information and inventory settings.
            </p>
          </div>
        </div>
      </div>

      <Link
        href={detailsUrl}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
      >
        Cancel
      </Link>
    </div>
  );
}