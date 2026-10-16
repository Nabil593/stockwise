import Link from "next/link";
import {
  Boxes,
  Mail,
  ArrowUpRight,
  Package,
  LayoutDashboard,
  History,
  BrainCircuit,
  ShieldCheck,
  Warehouse,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  const currentYear = 2026;

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-white">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-emerald-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-teal-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center text-emerald-600">
                <Boxes size={35} />
              </span>

              <span className="text-xl font-bold tracking-tight text-slate-900">
                Stock
                <span className="text-emerald-600">Wise</span>
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-600 sm:text-base">
              Take control of your inventory with a smarter way to manage
              products, track stock movements, and identify low-stock items.
              Everything your inventory needs, in one place.
            </p>

            {/* Feature highlights */}
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800">
                <Package size={14} />
                Product Management
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800">
                <BrainCircuit size={14} />
                AI Insights
              </span>
            </div>

            <a
              href="mailto:support@smartstock.com"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800"
            >
              <Mail size={17} />
              Contact Support
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold tracking-wide text-slate-900">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-4">
              <li>
                <Link
                  href="/"
                  className="group inline-flex items-center gap-2 text-sm text-slate-600 transition hover:text-emerald-700"
                >
                  <Warehouse
                    size={16}
                    className="text-slate-400 transition group-hover:text-emerald-600"
                  />
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard"
                  className="group inline-flex items-center gap-2 text-sm text-slate-600 transition hover:text-emerald-700"
                >
                  <LayoutDashboard
                    size={16}
                    className="text-slate-400 transition group-hover:text-emerald-600"
                  />
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/products"
                  className="group inline-flex items-center gap-2 text-sm text-slate-600 transition hover:text-emerald-700"
                >
                  <Package
                    size={16}
                    className="text-slate-400 transition group-hover:text-emerald-600"
                  />
                  Products
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/stock-movements"
                  className="group inline-flex items-center gap-2 text-sm text-slate-600 transition hover:text-emerald-700"
                >
                  <History
                    size={16}
                    className="text-slate-400 transition group-hover:text-emerald-600"
                  />
                  Stock History
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/ai-insights"
                  className="group inline-flex items-center gap-2 text-sm text-slate-600 transition hover:text-emerald-700"
                >
                  <BrainCircuit
                    size={16}
                    className="text-slate-400 transition group-hover:text-emerald-600"
                  />
                  AI Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold tracking-wide text-slate-900">
              Support
            </h3>

            <p className="mt-5 text-sm leading-7 text-slate-600">
              Need help managing your inventory? Reach out to us or explore the
              application to get started.
            </p>

            <a
              href="mailto:support@smartstock.com"
              className="group mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
            >
              Get Help
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/70 p-3.5">
              <ShieldCheck
                size={19}
                className="mt-0.5 shrink-0 text-emerald-700"
              />
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Your inventory, your control
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                  Keep your products and stock records organized in one place.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col gap-5 border-t border-slate-200 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">
              © {currentYear}{" "}
              <span className="font-semibold text-slate-700">SmartStock</span>.
              All rights reserved.
            </p>
            <p className="mt-1.5 text-xs text-slate-400">
              Smarter inventory management for your business.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <span className="mr-1 text-xs font-medium text-slate-500">
              Connect with us
            </span>

            <a
              href="https://github.com/Nabil593"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
            >
              <FaGithub size={19} />
            </a>

            <a
              href="https://www.linkedin.com/in/shariea-reza-nabil/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
            >
              <FaLinkedin size={19} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
