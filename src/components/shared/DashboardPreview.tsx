import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  ChartNoAxesCombined,
  Package,
  TriangleAlert,
  Wallet,
} from "lucide-react";
import SectionContainer from "./SectionContainer";

const stats = [
  {
    label: "Total products",
    value: "1,284",
    icon: Package,
    color: "text-emerald-700 bg-emerald-50",
  },
  {
    label: "Stock alerts",
    value: "08",
    icon: TriangleAlert,
    color: "text-amber-700 bg-amber-50",
  },
  {
    label: "Inventory value",
    value: "৳2.4M",
    icon: Wallet,
    color: "text-blue-700 bg-blue-50",
  },
];

const stockLevels = [
  { name: "Electronics", percent: 82, color: "bg-emerald-500" },
  { name: "Accessories", percent: 64, color: "bg-teal-500" },
  { name: "Wearables", percent: 34, color: "bg-amber-500" },
  { name: "Others", percent: 52, color: "bg-violet-500" },
];

export default function DashboardPreview() {
  return (
    <section className="overflow-hidden bg-[#f8fafc] py-20 sm:py-24">
      <SectionContainer>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
              Your dashboard
            </span>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl">
              Your entire inventory.
              <span className="text-emerald-600">
                {" "}One clear view.
              </span>
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Get a quick overview of your products, inventory value,
              stock alerts, and category performance from a single
              dashboard.
            </p>

            <ul className="mt-7 space-y-3">
              {[
                "Monitor inventory at a glance",
                "Identify stock that needs attention",
                "Review category-level inventory data",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-slate-700"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <ArrowRight size={13} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/dashboard"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-700"
            >
              Explore dashboard
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Dashboard mockup */}
          <div className="min-w-0 rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
              <div>
                <h3 className="font-bold text-slate-900">
                  Inventory overview
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Dashboard preview
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Boxes size={21} />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="min-w-0 rounded-xl border border-slate-100 p-3"
                  >
                    <div
                      className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${stat.color}`}
                    >
                      <Icon size={18} />
                    </div>

                    <p className="text-xs leading-5 text-slate-500">
                      {stat.label}
                    </p>

                    <p className="mt-1 break-words text-xl font-extrabold text-slate-900">
                      {stat.value}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 rounded-2xl border border-slate-100 p-4 sm:p-5">
              <div className="flex items-center gap-2">
                <ChartNoAxesCombined
                  size={19}
                  className="text-emerald-600"
                />
                <h4 className="text-sm font-bold text-slate-800">
                  Stock by category
                </h4>
              </div>

              <div className="mt-5 space-y-5">
                {stockLevels.map((item) => (
                  <div key={item.name}>
                    <div className="mb-2 flex justify-between gap-3 text-xs">
                      <span className="font-medium text-slate-600">
                        {item.name}
                      </span>
                      <span className="font-bold text-slate-800">
                        {item.percent}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-slate-400">
              Illustrative preview · Values are examples, not live data
            </p>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}