"use client"
import Link from "next/link";
import { PackageSearch, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-lg text-center">
        {/* Icon */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600">
          <PackageSearch size={40} strokeWidth={1.7} />
        </div>

        {/* Error Code */}
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-600">
          Error 404
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Page not found
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-500">
          Sorry, we couldn&apos;t find the page you&apos;re
          looking for. It may have been moved, deleted,
          or the URL might be incorrect.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        {/* Branding */}
        <div className="mt-12 border-t border-slate-200 pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-sm text-white">
              S
            </span>
            Stock<span className="text-emerald-600">Wise</span>
          </Link>

          <p className="mt-2 text-xs text-slate-400">
            Smart inventory management, made simple.
          </p>
        </div>
      </div>
    </main>
  );
}
