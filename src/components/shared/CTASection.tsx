import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import SectionContainer from "./SectionContainer";

export default function CTASection() {
  return (
    <section className="bg-white pb-20 sm:pb-24">
      <SectionContainer>
        <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-teal-700 to-teal-900 px-6 py-12 text-center sm:px-12 sm:py-16">
          {/* Decorative background */}
          <div className="pointer-events-none absolute -right-20 -top-28 -z-10 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-16 -z-10 h-64 w-64 rounded-full bg-teal-300/20 blur-3xl" />

          <div className="mx-auto max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-emerald-50">
              <Sparkles size={14} />
              Take control of your inventory
            </div>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
              Ready to organize your inventory?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-emerald-50/85 sm:text-base">
              Explore StockWise and bring your product management,
              stock tracking, and inventory insights together.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-emerald-800 transition hover:-translate-y-0.5 hover:bg-emerald-50"
              >
                Get Started
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/login"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/15"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}