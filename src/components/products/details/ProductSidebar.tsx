import {
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Pencil,
  Plus,
  ShieldCheck,
} from "lucide-react";

import type { Product } from "@/lib/products/product-details-types";
import {
  formatDate,
  formatPrice,
} from "@/lib/products/product-details-utils";
import {
  QuickAction,
  SummaryLine,
} from "./ProductDetailItems";

export default function ProductSidebar({
  product,
}: {
  product: Product;
}) {
  const stockValue = product.quantity * product.price;

  return (
    <aside className="space-y-5 xl:sticky xl:top-6">
      <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
        <h2 className="font-bold text-slate-900">Quick Actions</h2>
        <p className="mt-1 text-sm text-slate-500">
          Manage this inventory item
        </p>

        <div className="mt-5 space-y-3">
          <QuickAction
            href={`/dashboard/products/${encodeURIComponent(product.id)}/edit`}
            icon={<Pencil size={18} />}
            title="Edit Product"
            description="Update product details"
            iconClass="bg-slate-100 text-slate-700"
          />

          <QuickAction
            href={`/dashboard/stock/new?productId=${encodeURIComponent(product.id)}`}
            icon={<Plus size={19} />}
            title="Record Movement"
            description="Add or remove stock"
            iconClass="bg-emerald-50 text-emerald-700"
          />

          <QuickAction
            href="/dashboard/stock/history"
            icon={<ClipboardList size={18} />}
            title="Stock History"
            description="Review inventory transactions"
            iconClass="bg-blue-50 text-blue-700"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
        <div className="flex items-center gap-2 text-emerald-800">
          <ShieldCheck size={20} />
          <h2 className="text-sm font-bold">Inventory Summary</h2>
        </div>

        <div className="mt-4 space-y-4">
          <SummaryLine
            label="Product category"
            value={product.category}
          />
          <SummaryLine
            label="Total stock value"
            value={formatPrice(stockValue)}
          />
          <SummaryLine
            label="Last updated"
            value={formatDate(product.updatedAt)}
          />
        </div>

        <div className="mt-5 flex items-start gap-2 border-t border-emerald-100 pt-4 text-xs leading-5 text-emerald-800">
          <CalendarDays size={15} className="mt-0.5 shrink-0" />
          <p>
            Keep product information and stock movement records accurate
            for reliable inventory reports.
          </p>
        </div>
      </section>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-2 text-slate-700">
          <CheckCircle2 size={18} className="text-emerald-600" />
          <h3 className="text-sm font-bold">StockWise Tip</h3>
        </div>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Record inventory changes through stock movements rather than
          editing quantities directly. This preserves an audit trail.
        </p>
      </div>
    </aside>
  );
}