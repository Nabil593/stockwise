"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  CircleDollarSign,
  Package,
  PackageCheck,
  Plus,
  TrendingUp,
  TriangleAlert,
  Warehouse,
} from "lucide-react";

const HeroPage = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#f8fafc]">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-200/40 blur-[100px]" />
        <div className="absolute -bottom-48 -left-32 h-[450px] w-[450px] rounded-full bg-teal-100/60 blur-[100px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(#0f766e 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="mx-auto grid min-h-[680px] w-full max-w-7xl grid-cols-1 items-center gap-16 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-12 lg:py-24">
        {/* Left: Hero content */}
        <div className="relative z-10 mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left">
          {/* Announcement */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold tracking-wide text-emerald-800 sm:text-sm">
              Smarter inventory starts here
            </span>
            <ArrowUpRight className="h-4 w-4 text-emerald-700" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl md:text-6xl lg:text-[64px]">
            Your inventory.
            <br />
            <span className="relative inline-block text-emerald-600">
              Under control.
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8C70 2 210 2 297 7"
                  stroke="#34d399"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg lg:mx-0">
            Manage products, track every stock movement, and spot low-stock
            items before they become a problem. All your inventory, one
            intelligent dashboard.
          </p>

          {/* CTA buttons */}
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link
              href="/register"
              className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition duration-300 hover:-translate-y-1 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/25"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/login"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-7 py-4 text-sm font-bold text-slate-700 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:text-emerald-700"
            >
              Sign In
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-slate-500 lg:justify-start">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Easy product management
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              AI-assisted insights
            </span>
          </div>
        </div>

        {/* Right: Interactive-looking dashboard preview */}
        <div className="relative mx-auto w-full max-w-[540px] lg:ml-auto">
          {/* Decorative rings */}
          <div className="absolute -inset-5 rounded-[2.5rem] border border-emerald-200/60" />
          <div className="absolute -inset-10 rounded-[3rem] border border-emerald-100/70" />

          {/* Main dashboard */}
          <div className="relative rounded-[2rem] border border-white/80 bg-white/90 p-4 shadow-[0_30px_100px_-30px_rgba(15,118,110,0.3)] backdrop-blur-xl sm:p-6">
            {/* Dashboard header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
                  <Warehouse className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Inventory Overview
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Your business at a glance
                  </p>
                </div>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
                <Boxes className="h-5 w-5" />
              </div>
            </div>

            {/* Stats cards */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">
                    Total Products
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <Package className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">
                  1,284
                </p>
                <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>Inventory overview</span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition hover:border-amber-200 hover:bg-amber-50/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">
                    Low Stock
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <TriangleAlert className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">
                  08
                </p>
                <div className="mt-2 text-xs font-semibold text-amber-600">
                  Needs attention
                </div>
              </div>
            </div>

            {/* Product list */}
            <div className="mt-5 rounded-2xl border border-slate-100 bg-white p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800">
                  Recent Products
                </h3>
                <span className="text-xs font-medium text-emerald-600">
                  Stock status
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <PackageCheck className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      Wireless Headphones
                    </p>
                    <p className="mt-1 text-xs text-slate-500">SKU-1024</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-800">124</p>
                    <span className="inline-flex rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">
                      In stock
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <Package className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      USB-C Hub
                    </p>
                    <p className="mt-1 text-xs text-slate-500">SKU-1025</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-800">42</p>
                    <span className="inline-flex rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">
                      In stock
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                    <TriangleAlert className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      Smart Watch
                    </p>
                    <p className="mt-1 text-xs text-slate-500">SKU-1026</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-800">04</p>
                    <span className="inline-flex rounded-full bg-rose-50 px-2 py-1 text-[10px] font-bold text-rose-700">
                      Low stock
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom insight */}
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                <CircleDollarSign className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-emerald-950">
                  Inventory insights
                </p>
                <p className="mt-1 text-xs leading-5 text-emerald-800/80">
                  Keep track of stock levels and make smarter decisions.
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-emerald-700" />
            </div>
          </div>

          {/* Floating notification */}
          <div className="absolute -left-5 top-24 hidden animate-[bounce_4s_ease-in-out_infinite] items-center gap-3 rounded-2xl border border-white bg-white p-3.5 shadow-xl shadow-slate-900/10 sm:flex">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <TriangleAlert className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">
                Low stock alert
              </p>
              <p className="mt-1 text-[11px] text-slate-500">
                Restock recommended
              </p>
            </div>
          </div>

          {/* Floating success card */}
          <div className="absolute -right-3 bottom-28 hidden animate-[bounce_5s_ease-in-out_infinite] items-center gap-3 rounded-2xl border border-white bg-white p-3.5 shadow-xl shadow-slate-900/10 sm:flex">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">
                Stock updated
              </p>
              <p className="mt-1 text-[11px] text-slate-500">
                Movement tracked
              </p>
            </div>
          </div>

          {/* Decorative plus */}
          <div className="absolute -right-4 -top-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-emerald-600 shadow-lg">
            <Plus className="h-6 w-6" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPage;