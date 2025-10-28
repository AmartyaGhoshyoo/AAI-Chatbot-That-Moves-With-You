"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Zap, Layers, Hammer, Sparkles, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: <Zap className="size-5" />,
    title: "Fast by default",
    desc: "Instant dev server, first-class routing, and smart bundling out of the box.",
  },
  {
    icon: <ShieldCheck className="size-5" />,
    title: "Secure foundations",
    desc: "Best practices for headers, auth patterns, and content safety baked in.",
  },
  {
    icon: <Layers className="size-5" />,
    title: "Composable UI",
    desc: "Headless components and primitives that scale with your product.",
  },
  {
    icon: <Hammer className="size-5" />,
    title: "DX you’ll enjoy",
    desc: "Typed APIs, fast refresh, and guardrails to keep you shipping.",
  },
];

export default function HomePage() {
  const [open, setOpen] = React.useState(false);

  return (
    <main className="relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 -z-20 bg-[#0b0c0f]" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.12]" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 radial-mask"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 35%, rgba(255,255,255,0.10), rgba(0,0,0,0))",
        }}
      />

      {/* Transparent, responsive navigation */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-transparent backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="#top" className="font-semibold tracking-tight text-white">Brand</Link>
          <nav className="hidden gap-6 text-sm text-white/80 md:flex">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#showcase" className="hover:text-white">Showcase</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </nav>
          <div className="hidden md:block">
            <Button asChild size="sm">
              <Link href="/docs" className="gap-1">
                Docs <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <button
            aria-label="Open menu"
            className="md:hidden inline-flex items-center justify-center rounded-md border border-white/15 px-2.5 py-2 text-white/80 hover:bg-white/5"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" />
          </button>
        </div>
        {/* Mobile sheet */}
        {open && (
          <div className="md:hidden">
            <div className="fixed inset-0 z-40 bg-black/60" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#0b0c0f] p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="font-semibold tracking-tight text-white">Menu</div>
                <button
                  aria-label="Close menu"
                  className="inline-flex items-center justify-center rounded-md border border-white/15 px-2.5 py-2 text-white/80 hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  <X className="size-5" />
                </button>
              </div>
              <div className="grid gap-2 text-white/80">
                <a href="#features" onClick={() => setOpen(false)} className="rounded-md border border-transparent px-3 py-2 hover:bg-white/5 hover:text-white">Features</a>
                <a href="#showcase" onClick={() => setOpen(false)} className="rounded-md border border-transparent px-3 py-2 hover:bg-white/5 hover:text-white">Showcase</a>
                <a href="#pricing" onClick={() => setOpen(false)} className="rounded-md border border-transparent px-3 py-2 hover:bg-white/5 hover:text-white">Pricing</a>
                <a href="#faq" onClick={() => setOpen(false)} className="rounded-md border border-transparent px-3 py-2 hover:bg-white/5 hover:text-white">FAQ</a>
                <Link href="/docs" onClick={() => setOpen(false)} className="rounded-md border border-white/10 px-3 py-2 text-white hover:bg-white/5">Open Docs</Link>
              </div>
            </motion.div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="mx-auto max-w-6xl px-6 pt-28 pb-20 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
        >
          <Sparkles className="size-4 text-white/60" />
          Build delightful products with modern foundations
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
          className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
        >
          Ship faster with a cohesive UI and clear documentation
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.16 }}
          className="mx-auto mt-4 max-w-2xl text-pretty text-white/70"
        >
          A minimal, modern starter that keeps the focus on clarity, performance, and accessibility.
          Use production-ready primitives and thoughtful defaults.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.24 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <Button asChild size="lg">
            <Link href="/docs" className="gap-2">
              Open Docs <ArrowRight className="size-4" />
            </Link>
          </Button>

          <Button asChild className="text-black" size="lg" variant="outline">
            <Link href="#features" className="gap-2">
              Explore Features
            </Link>
          </Button>
        </motion.div>

        {/* Hero visual card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.32 }}
          className="mx-auto mt-12 w-full max-w-5xl overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 text-left"
        >
          <div className="grid gap-6 md:grid-cols-5">
            <div className="md:col-span-2 space-y-2">
              <div className="text-sm text-white/60">Toolkit</div>
              <ul className="text-sm text-white/80 space-y-1">
                <li>• Next.js App Router</li>
                <li>• Motion (animations)</li>
                <li>• Headless UI primitives</li>
                <li>• Tailwind v4</li>
              </ul>
            </div>
            <div className="md:col-span-3">
              <div className="rounded-lg border border-white/10 bg-[#0c0e12] p-4">
                <pre className="overflow-x-auto text-sm leading-relaxed text-white/80">
{`// Animations with Motion
import { motion } from "motion/react";

export function FadeIn({ children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}>
      {children}
    </motion.div>
  );
}
`}
                </pre>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 pb-16 text-white">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-semibold tracking-tight"
        >
          Everything you need to move quickly
        </motion.h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group rounded-lg border border-white/10 bg-white/5 p-4 hover:bg-white/[0.07]"
            >
              <div className="mb-2 inline-flex size-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/80">
                {f.icon}
              </div>
              <div className="font-medium">{f.title}</div>
              <div className="text-sm text-white/70">{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Showcase */}
      <section id="showcase" className="mx-auto max-w-6xl px-6 pb-16 text-white">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-semibold tracking-tight"
        >
          Showcase
        </motion.h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.03 }}
              className="rounded-lg border border-white/10 bg-white/5 p-4"
            >
              <div className="h-32 rounded-md border border-white/10 bg-[#0c0e12]" />
              <div className="mt-3 font-medium">Elegant component</div>
              <div className="text-sm text-white/70">Clean, accessible, and easy to extend.</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-6 pb-16 text-white">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-semibold tracking-tight"
        >
          Loved by builders
        </motion.h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[1, 2].map((i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-lg border border-white/10 bg-white/5 p-4"
            >
              <blockquote className="text-white/80">
                “The components feel cohesive and the defaults are thoughtful. We shipped our MVP in days.”
              </blockquote>
              <figcaption className="mt-3 text-sm text-white/60">— Senior Engineer</figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 pb-16 text-white">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-semibold tracking-tight"
        >
          Simple pricing
        </motion.h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {["Starter", "Pro", "Scale"].map((tier, i) => (
            <motion.div
              key={tier}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-lg border border-white/10 bg-white/5 p-5"
            >
              <div className="text-lg font-medium">{tier}</div>
              <div className="mt-1 text-sm text-white/60">All the essentials to get going.</div>
              <div className="mt-4 text-3xl font-semibold">{i === 0 ? "$0" : i === 1 ? "$19" : "$99"}</div>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                <li>• Production-ready components</li>
                <li>• Typed APIs and guides</li>
                <li>• Best-practice examples</li>
              </ul>
              <Button className={cn("mt-5 w-full",i !== 1 ? "text-black":"text-white")} variant={i === 1 ? "default" : "outline"}>Choose {tier}</Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-6 pb-20 text-white">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-semibold tracking-tight"
        >
          Frequently asked questions
        </motion.h2>
        <div className="mt-6 space-y-3">
          {[
            { q: "Is this production ready?", a: "Yes. The stack uses stable, battle-tested pieces with sensible defaults." },
            { q: "Can I customize the styles?", a: "Absolutely. Everything is Tailwind-based and easy to override." },
            { q: "What about accessibility?", a: "We follow a11y best practices and encourage semantic, accessible patterns." },
          ].map((f, i) => (
            <motion.details
              key={f.q}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group rounded-lg border border-white/10 bg-white/5 p-4 open:bg-white/[0.06]"
            >
              <summary className="cursor-pointer list-none select-none font-medium text-white">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-white/70">{f.a}</p>
            </motion.details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-16 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-xl border border-white/10 bg-white/5 p-8"
        >
          <h3 className="text-2xl font-semibold tracking-tight">Ready to get started?</h3>
          <p className="mx-auto mt-2 max-w-2xl text-white/70">
            Explore the docs and start building with a clean, composable system.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <Button className="" asChild size="lg">
              <Link href="/docs" className="gap-2">
                Open Docs <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild className="text-black" size="lg" variant="outline">
              <Link href="#features">See Features</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-white/50">
        © {new Date().getFullYear()} – Built with Next.js & Motion
      </footer>
    </main>
  );
}
