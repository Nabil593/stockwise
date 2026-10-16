import {
  Activity,
  AlertTriangle,
  BrainCircuit,
  Package,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import SectionContainer from "./SectionContainer";

const features = [
  {
    icon: Package,
    title: "Product Management",
    description:
      "Organize products, SKUs, prices, categories, and stock quantities in one place.",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: Activity,
    title: "Stock Movement Tracking",
    description:
      "Track stock additions, removals, and adjustments with a clear movement history.",
    color: "bg-blue-50 text-blue-700",
  },
  {
    icon: AlertTriangle,
    title: "Low Stock Alerts",
    description:
      "Identify products running low and know which items may need restocking.",
    color: "bg-amber-50 text-amber-700",
  },
  {
    icon: BrainCircuit,
    title: "AI Inventory Insights",
    description:
      "Review inventory recommendations and identify potential stock issues.",
    color: "bg-violet-50 text-violet-700",
  },
  {
    icon: TrendingUp,
    title: "Inventory Analytics",
    description:
      "Understand stock levels and inventory value through visual summaries.",
    color: "bg-teal-50 text-teal-700",
  },
  {
    icon: ShieldCheck,
    title: "Clear Stock Overview",
    description:
      "Keep important inventory information accessible through one dashboard.",
    color: "bg-rose-50 text-rose-700",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="bg-white py-20 sm:py-24"
    >
      <SectionContainer>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
            Features
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Everything your inventory needs
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Manage products, monitor stock, and understand your inventory
            without jumping between multiple tools.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-950/5"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${feature.color}`}
                >
                  <Icon size={23} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}