import { CheckCircle2 } from "lucide-react";

export default function ProductSaveSidebar() {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
        <h2 className="font-bold text-slate-900">Before Saving</h2>
      </div>

      <ul className="mt-4 space-y-3 text-sm text-slate-600">
        <li className="flex gap-2">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          Verify the product name and SKU.
        </li>
        <li className="flex gap-2">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          Double-check the unit price.
        </li>
        <li className="flex gap-2">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          Set a suitable low-stock threshold.
        </li>
      </ul>
    </section>
  );
}