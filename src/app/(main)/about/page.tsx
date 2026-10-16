"use client";

import {
  Boxes,
  ChartNoAxesCombined,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

const values = [
  {
    icon: Boxes,
    title: "Simplicity",
    description:
      "Inventory management should be easy to understand and simple to use, regardless of business size.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Data-Driven Decisions",
    description:
      "Clear inventory insights help businesses understand their stock and make more informed decisions.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    description:
      "Organized inventory records and stock movement tracking help teams maintain better control.",
  },
];

const features = [
  "Product and inventory management",
  "Stock movement tracking",
  "Low-stock monitoring",
  "AI-powered inventory insights",
  "Inventory analytics and reporting",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      {/* Hero */}
      <section className="bg-[#f8fafc]">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-2 lg:gap-16 lg:px-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
              <Sparkles size={16} />
              About StockWise
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Smarter inventory.
              <span className="mt-2 block text-emerald-600">
                Better decisions.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              StockWise is an inventory management platform designed to help
              businesses organize products, monitor stock movements, and
              understand their inventory with greater clarity.
            </p>

            <p className="mt-4 max-w-xl leading-7 text-slate-500">
              Our goal is to make inventory management more accessible,
              organized, and data-driven through practical tools and
              AI-powered insights.
            </p>
          </div>

          {/* Visual */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-5 rounded-[2rem] bg-emerald-100/60 blur-2xl" />

            <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <Boxes size={25} />
                </div>
                <div>
                  <h2 className="font-semibold">Inventory Overview</h2>
                  <p className="text-sm text-slate-500">
                    Everything in one place
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <Boxes className="text-emerald-600" size={22} />
                  <p className="mt-4 text-sm text-slate-500">Products</p>
                  <p className="mt-1 text-2xl font-bold">Organized</p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <TrendingUp className="text-blue-600" size={22} />
                  <p className="mt-4 text-sm text-slate-500">Stock tracking</p>
                  <p className="mt-1 text-2xl font-bold">Clear</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">
                <div className="flex items-center gap-3">
                  <Sparkles className="shrink-0 text-emerald-700" size={21} />
                  <div>
                    <p className="font-semibold text-slate-800">
                      Smarter insights
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Turn inventory data into useful information for
                      better planning.
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-center text-xs text-slate-400">
                Illustrative preview · Not live inventory data
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Target size={28} />
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Our Mission
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              We aim to simplify inventory management by bringing product
              organization, stock visibility, and actionable insights
              together in one convenient platform. StockWise is built to
              help businesses spend less time struggling with inventory
              records and more time making thoughtful decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#f8fafc] py-20 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
              What matters to us
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              The values behind StockWise
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              We focus on practical tools that make everyday inventory
              workflows more manageable.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-900/5"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold">
                    {value.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform capabilities */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
              What you can do
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to manage inventory more clearly
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              StockWise brings essential inventory workflows together
              to help users keep track of products, monitor changes, and
              identify potential stock issues.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <ul className="space-y-5">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <span className="text-sm font-bold">✓</span>
                  </span>
                  <span className="leading-6 text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 px-6 py-14 text-center sm:px-12 sm:py-16">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white/15 text-white">
            <Sparkles size={27} />
          </div>

          <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Make inventory management work for you
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-emerald-50">
            Explore a more organized way to manage products, track stock,
            and gain useful inventory insights.
          </p>

          <a
            href="/register"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
          >
            Get Started
          </a>
        </div>
      </section>
    </main>
  );
}