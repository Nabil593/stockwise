import type { Product } from "@/lib/products/product-details-types";
import {
  formatDate,
  formatPrice,
} from "@/lib/products/product-details-utils";
import { DetailItem } from "./ProductDetailItems";

export default function ProductInformation({
  product,
}: {
  product: Product;
}) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
        <h2 className="font-bold text-slate-900">Product Information</h2>
        <p className="mt-1 text-sm text-slate-500">
          General details and inventory configuration
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-6 p-5 sm:grid-cols-2 sm:p-6">
        <DetailItem label="Product Name" value={product.name} />
        <DetailItem label="SKU" value={product.sku} />
        <DetailItem label="Category" value={product.category} />
        <DetailItem label="Unit Price" value={formatPrice(product.price)} />

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Description
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            {product.description || "No description provided."}
          </p>
        </div>

        <DetailItem
          label="Minimum Stock Level"
          value={`${product.minStock} units`}
        />
        <DetailItem
          label="Created At"
          value={formatDate(product.createdAt)}
        />
        <DetailItem
          label="Last Updated"
          value={formatDate(product.updatedAt)}
        />
      </div>
    </section>
  );
}