"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Zap, Layers, Hammer, Sparkles, Menu, X, Globe, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: <Bot className="size-5" />,
    title: "AI-Powered Navigation",
    desc: "Intelligent chatbot that understands context and guides you anywhere on the web.",
  },
  {
    icon: <Globe className="size-5" />,
    title: "Universal Access",
    desc: "Browse any website with AI assistance. Your digital companion goes everywhere.",
  },
  {
    icon: <Zap className="size-5" />,
    title: "Lightning Fast",
    desc: "Instant responses, seamless navigation, and real-time web interaction.",
  },
  {
    icon: <ShieldCheck className="size-5" />,
    title: "Secure & Private",
    desc: "Your browsing data stays protected with enterprise-grade security.",
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
            "radial-gradient(60% 40% at 50% 35%, rgba(99,102,241,0.15), rgba(0,0,0,0))",
        }}
      />

      {/* Transparent, responsive navigation */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-transparent backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="font-semibold tracking-tight text-white flex items-center gap-2">
            <Bot className="size-5 text-indigo-400" />
            Agentic-Webpilot
          </Link>
          <nav className="hidden gap-6 text-sm text-white/80 md:flex">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#showcase" className="hover:text-white">How It Works</a>
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
                <a href="#showcase" onClick={() => setOpen(false)} className="rounded-md border border-transparent px-3 py-2 hover:bg-white/5 hover:text-white">How It Works</a>
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
          className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300"
        >
          <Sparkles className="size-4 text-indigo-400" />
          Your AI companion for intelligent web browsing
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
          className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
        >
          A chatbot that can go
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            anywhere with you
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.16 }}
          className="mx-auto mt-4 max-w-2xl text-pretty text-white/70"
        >
          Experience the future of web navigation with Agentic-Webpilot. An intelligent AI assistant that understands your needs, browses any website, and provides contextual help wherever you go online.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.24 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
            <Link href="/docs" className="gap-2">
              Get Started <ArrowRight className="size-4" />
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
              <div className="text-sm text-white/60">Powered By</div>
              <ul className="text-sm text-white/80 space-y-1">
                <li>• Advanced AI Models</li>
                <li>• Real-time Web Access</li>
                <li>• Context-Aware Intelligence</li>
                <li>• Seamless Integration</li>
              </ul>
            </div>
            <div className="md:col-span-3">
              <div className="rounded-lg border border-white/10 bg-[#0c0e12] p-4">
                <pre className="overflow-x-auto text-sm leading-relaxed text-white/80">
{`// Chat with any website
const pilot = new AgenticWebpilot({
  mode: "intelligent",
  context: true
});

// Your AI companion understands context
await pilot.navigate("https://example.com");
await pilot.chat("Find pricing information");
// → AI analyzes page and responds

await pilot.chat("Compare with competitors");
// → AI browses and compares automatically
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
          Everything you need for intelligent browsing
        </motion.h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group rounded-lg border border-white/10 bg-white/5 p-4 hover:bg-white/[0.07] hover:border-indigo-500/30"
            >
              <div className="mb-2 inline-flex size-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-indigo-400">
                {f.icon}
              </div>
              <div className="font-medium">{f.title}</div>
              <div className="text-sm text-white/70">{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="showcase" className="mx-auto max-w-6xl px-6 pb-16 text-white">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-semibold tracking-tight"
        >
          How It Works
        </motion.h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Open Any Site", desc: "Navigate to any website or let the AI find it for you." },
            { title: "Ask Questions", desc: "Chat naturally about content, features, or information you need." },
            { title: "Get Smart Answers", desc: "AI analyzes the page and provides contextual, accurate responses." },
            { title: "Browse Intelligently", desc: "Let AI navigate between pages following your intent." },
            { title: "Extract Information", desc: "Automatically gather data, compare options, or summarize content." },
            { title: "Take Action", desc: "AI can interact with forms, buttons, and page elements for you." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.03 }}
              className="rounded-lg border border-white/10 bg-white/5 p-4"
            >
              <div className="mb-2 text-indigo-400 font-mono text-xs">Step {i + 1}</div>
              <div className="font-medium">{item.title}</div>
              <div className="text-sm text-white/70">{item.desc}</div>
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
          Loved by power users
        </motion.h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            { quote: "Finally, a chatbot that actually understands what I'm looking for on any website. Game-changer for research.", role: "Data Analyst" },
            { quote: "I use it daily for competitive analysis. It browses multiple sites and compares information instantly.", role: "Product Manager" },
          ].map((item, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-lg border border-white/10 bg-white/5 p-4"
            >
              <blockquote className="text-white/80">
                "{item.quote}"
              </blockquote>
              <figcaption className="mt-3 text-sm text-white/60">— {item.role}</figcaption>
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
          {["Free", "Pro", "Enterprise"].map((tier, i) => (
            <motion.div
              key={tier}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={cn(
                "rounded-lg border p-5",
                i === 1 
                  ? "border-indigo-500/50 bg-indigo-500/10" 
                  : "border-white/10 bg-white/5"
              )}
            >
              <div className="text-lg font-medium">{tier}</div>
              <div className="mt-1 text-sm text-white/60">
                {i === 0 && "Get started with basic features."}
                {i === 1 && "Unlock full AI capabilities."}
                {i === 2 && "For teams and organizations."}
              </div>
              <div className="mt-4 text-3xl font-semibold">{i === 0 ? "$0" : i === 1 ? "$29" : "Custom"}</div>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                <li>• {i === 0 ? "100" : i === 1 ? "Unlimited" : "Unlimited"} AI interactions/month</li>
                <li>• {i === 0 ? "Basic" : "Advanced"} web navigation</li>
                <li>• {i === 2 && "Priority support & "} Context-aware responses</li>
                {i === 2 && <li>• Custom integrations</li>}
              </ul>
              <Button className={cn("mt-5 w-full", i === 1 ? "bg-indigo-600 hover:bg-indigo-700" : i !== 1 && "text-black")} variant={i === 1 ? "default" : "outline"}>Choose {tier}</Button>
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
            { q: "What websites does Agentic-Webpilot work with?", a: "Agentic-Webpilot works with virtually any public website. Our AI can navigate, read, and interact with most web pages to assist you." },
            { q: "How does the AI understand website content?", a: "Our advanced AI analyzes page structure, content, and context in real-time to provide accurate, relevant responses to your queries." },
            { q: "Is my browsing data private?", a: "Absolutely. We prioritize your privacy. Your browsing sessions are encrypted and we don't store your personal browsing history." },
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
          className="rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-8"
        >
          <h3 className="text-2xl font-semibold tracking-tight">Ready to browse smarter?</h3>
          <p className="mx-auto mt-2 max-w-2xl text-white/70">
            Start using your AI companion today. Navigate any website with intelligent assistance.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <Button className="bg-indigo-600 hover:bg-indigo-700" asChild size="lg">
              <Link href="/docs" className="gap-2">
                Get Started <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild className="text-black" size="lg" variant="outline">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-white/50">
        <div className="mb-2">© {new Date().getFullYear()} Agentic-Webpilot</div>
        <div className="text-xs text-white/40">Developed by Amartya Ghosh</div>
      </footer>
    </main>
  );
}