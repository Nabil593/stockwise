import { BarChart3 } from "lucide-react";
import type { Category } from "@/types/ai-insights";
import { currency, numberFormat } from "@/lib/ai-insights";

interface Props {
  categories: Category[];
}

export default function CategoryAnalysis({ categories }: Props) {
  const maxValue = Math.max(
    ...categories.map((category) => category.inventoryValue),
    1,
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600">
          <BarChart3 size={21} />
        </div>
        <div>
          <h2 className="font-bold text-slate-900">
            Category analysis
          </h2>
          <p className="text-sm text-slate-500">
            Inventory value by category
          </p>
        </div>
      </div>

      {categories.length === 0 ? (
        <p className="py-10 text-center text-sm text-slate-500">
          No category data available.
        </p>
      ) : (
        <div className="mt-6 space-y-5">
          {categories.map((category) => {
            const width = Math.min(
              100,
              (category.inventoryValue / maxValue) * 100,
            );

            return (
              <div key={category.name}>
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {category.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {numberFormat(category.productCount)} products ·{" "}
                      {numberFormat(category.totalUnits)} units
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    {currency(category.inventoryValue)}
                  </span>
                </div>

                <div
                  className="h-2.5 overflow-hidden rounded-full bg-slate-100"
                  role="progressbar"
                  aria-label={`${category.name} inventory value`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(width)}
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}