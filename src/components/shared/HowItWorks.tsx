import {
  ArrowRight,
  ClipboardList,
  PackagePlus,
  TrendingUp,
} from "lucide-react";
import SectionContainer from "./SectionContainer";

const steps = [
  {
    number: "01",
    title: "Add your products",
    description:
      "Create product records with names, SKUs, categories, prices, and starting stock quantities.",
    icon: PackagePlus,
  },
  {
    number: "02",
    title: "Track stock movements",
    description:
      "Record stock coming in, going out, and inventory adjustments as they happen.",
    icon: ClipboardList,
  },
  {
    number: "03",
    title: "Make informed decisions",
    description:
      "Review inventory summaries, low-stock alerts, and available AI recommendations.",
    icon: TrendingUp,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-20 sm:py-24">
      <SectionContainer>
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
            How it works
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Inventory management made simple
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Get started with a simple workflow designed to keep your
            inventory organized.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="relative rounded-2xl border border-slate-200 bg-slate-50/70 p-6 transition hover:border-emerald-200 hover:bg-white hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <Icon size={23} />
                  </div>

                  <span className="text-3xl font-extrabold tracking-tight text-slate-200">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>

                {index < steps.length - 1 && (
                  <ArrowRight
                    aria-hidden="true"
                    className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 text-emerald-500 md:block"
                    size={22}
                  />
                )}
              </article>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}