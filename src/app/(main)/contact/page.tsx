"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Sparkles,
} from "lucide-react";

const contactOptions = [
  {
    icon: Mail,
    title: "Email us",
    description: "For questions and support inquiries.",
    value: "support@smartstock.com",
    href: "mailto:support@smartstock.com",
  },
  {
    icon: MessageCircle,
    title: "Help center",
    description: "Find answers to common questions.",
    value: "Browse FAQs",
    href: "/help",
  },
  {
    icon: Clock3,
    title: "Response time",
    description: "We aim to respond as soon as possible.",
    value: "Business hours may apply",
    href: "/help",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General inquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = encodeURIComponent(
      `[StockWise] ${form.subject}`
    );

    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );

    setSubmitted(true);

    window.location.href = `mailto:support@smartstock.com?subject=${subject}&body=${body}`;
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-slate-50/70">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.13),transparent_50%)]" />

        <div className="relative mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-emerald-700 shadow-sm">
            <MessageCircle size={26} />
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
            Contact StockWise
          </p>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Let&apos;s talk about your inventory.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Have a question, found an issue, or want to share feedback? Send
            us a message and we&apos;ll help you find the right direction.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-12 lg:py-20">
        {/* Left information */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
            Get in touch
          </p>

          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            We&apos;re here to help.
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600">
            Whether you need help understanding a feature or want to report a
            problem, choose a contact option below.
          </p>

          <div className="mt-8 space-y-4">
            {contactOptions.map(
              ({ icon: Icon, title, description, value, href }) => (
                <a
                  key={title}
                  href={href}
                  className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 transition hover:border-emerald-200 hover:shadow-lg hover:shadow-slate-900/[0.03] sm:p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                    <Icon size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-slate-900">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {description}
                    </p>
                    <p className="mt-2 break-words text-sm font-semibold text-emerald-700">
                      {value}
                    </p>
                  </div>

                  <ArrowRight
                    size={17}
                    className="mt-1 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-600"
                  />
                </a>
              )
            )}
          </div>

          <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">
            <div className="flex items-start gap-3">
              <Sparkles
                size={20}
                className="mt-0.5 shrink-0 text-emerald-700"
              />
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Need a quick answer?
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Check our help center for guidance on products, stock
                  movements, and AI-assisted inventory insights.
                </p>
                <Link
                  href="/help"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  Visit help center
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-slate-900/[0.035] sm:p-8 lg:p-9">
          <div className="mb-7">
            <h2 className="text-xl font-bold tracking-tight">
              Send us a message
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Fill out the form below with your inquiry.
            </p>
          </div>

          {submitted && (
            <div
              role="status"
              className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4"
            >
              <CheckCircle2
                size={20}
                className="mt-0.5 shrink-0 text-emerald-700"
              />
              <div>
                <p className="text-sm font-semibold text-emerald-900">
                  Your email app should open shortly.
                </p>
                <p className="mt-1 text-xs leading-5 text-emerald-800">
                  Review the message and send it from your email application.
                  This form does not send messages directly from StockWise.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Full name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  placeholder="Your name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email address <span className="text-rose-500">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  value={form.email}
                  onChange={(event) =>
                    setForm({ ...form, email: event.target.value })
                  }
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Subject <span className="text-rose-500">*</span>
              </label>
              <select
                id="contact-subject"
                name="subject"
                required
                value={form.subject}
                onChange={(event) =>
                  setForm({ ...form, subject: event.target.value })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
              >
                <option>General inquiry</option>
                <option>Technical support</option>
                <option>Report a bug</option>
                <option>Product feedback</option>
                <option>Account and privacy</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Message <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                minLength={10}
                maxLength={3000}
                rows={6}
                value={form.message}
                onChange={(event) =>
                  setForm({ ...form, message: event.target.value })
                }
                placeholder="Tell us how we can help..."
                className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
              />
              <p className="mt-2 text-right text-xs text-slate-400">
                {form.message.length}/3000 characters
              </p>
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/15 transition hover:-translate-y-0.5 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
            >
              <Send size={17} />
              Prepare email
            </button>

            <p className="text-center text-xs leading-5 text-slate-500">
              Please do not include passwords or sensitive account information.
            </p>
          </form>
        </div>
      </section>

      {/* Bottom banner */}
      <section className="border-t border-slate-100 bg-slate-50/70 px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-bold text-slate-900">
              Explore StockWise
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Get back to your workspace and keep your inventory organized.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:text-emerald-700"
          >
            Go to dashboard
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}