import Link from "next/link";
import { ArrowRight, Lightbulb, Package } from "lucide-react";

export default function InsightsHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-violet-700 to-purple-800 p-6 text-white sm:p-8">
      <div className="relative z-10 max-w-2xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium">
          <Lightbulb size={14} /> Inventory intelligence
        </div>

        <h2 className="text-2xl font-bold sm:text-3xl">
          Make smarter inventory decisions
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
          Review stock levels, identify potential issues, and explore
          recommendations based on your inventory data.
        </p>

        <Link
          href="/dashboard/stock"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
        >
          <Package size={17} />
          View inventory
          <ArrowRight size={16} />
        </Link>
      </div>

      <Lightbulb
        aria-hidden="true"
        className="absolute -right-8 -top-8 h-48 w-48 rotate-12 text-white/10 sm:h-64 sm:w-64"
      />
    </section>
  );
}