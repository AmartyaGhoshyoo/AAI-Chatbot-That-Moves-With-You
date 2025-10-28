/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Button
} from "@/components/ui/button";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Hammer,
  Sparkles,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const features = [
    {
      icon: <ShieldCheck className="size-5" />,
      title: "Reliable Infrastructure",
      desc: "Deployed on enterprise-grade infrastructure with maximum uptime.",
    },
    {
      icon: <Zap className="size-5" />,
      title: "Lightning Fast",
      desc: "Experience instant responses powered by optimized AI pipelines.",
    },
    {
      icon: <Layers className="size-5" />,
      title: "Modular Architecture",
      desc: "Easily extend, replace, or enhance components without breaking flow.",
    },
    {
      icon: <Hammer className="size-5" />,
      title: "DX you'll enjoy",
      desc: "Typed APIs, fast refresh, and guardrails to keep you shipping.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100">
      {/* Navbar */}
      <header className="fixed top-0 z-50 w-full border-b border-gray-800 bg-gray-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="size-6 text-blue-400" />
            <span className="text-lg font-semibold">Agentic AI</span>
          </div>

          <nav className="hidden items-center space-x-8 md:flex">
            <Link href="#features" className="hover:text-blue-400">
              Features
            </Link>
            <Link href="#docs" className="hover:text-blue-400">
              Docs
            </Link>
            <Link href="#about" className="hover:text-blue-400">
              About
            </Link>
          </nav>

          <div className="hidden md:block">
            <Link href="/reader">
              <Button variant="default" className="group bg-blue-600 hover:bg-blue-500">
                Get Started
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="md:hidden">
            {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-gray-800 bg-gray-900 md:hidden"
          >
            <div className="flex flex-col items-center space-y-4 py-4">
              <Link href="#features" className="hover:text-blue-400" onClick={toggleMenu}>
                Features
              </Link>
              <Link href="#docs" className="hover:text-blue-400" onClick={toggleMenu}>
                Docs
              </Link>
              <Link href="#about" className="hover:text-blue-400" onClick={toggleMenu}>
                About
              </Link>
              <Link href="/reader" onClick={toggleMenu}>
                <Button variant="default" className="group bg-blue-600 hover:bg-blue-500">
                  Get Started
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 pt-32 text-center md:pt-40">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl"
        >
          Build Smarter, <span className="text-blue-500">Deploy Faster</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8 max-w-2xl text-lg text-gray-400"
        >
          Agentic AI enables you to integrate, manage, and deploy AI agents with
          modern simplicity and blazing speed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        >
          <Link href="/reader">
            <Button
              variant="default"
              className="group bg-blue-600 px-6 py-3 text-lg hover:bg-blue-500"
            >
              Get Started
              <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Button
            variant="outline"
            className="border-gray-700 px-6 py-3 text-lg text-gray-300 hover:border-gray-500 hover:text-white"
          >
            Learn More
          </Button>
        </motion.div>
      </main>

      {/* Features Section */}
      <section id="features" className="border-t border-gray-800 bg-gray-950 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-white sm:text-4xl">
            What makes us different
          </h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "flex flex-col items-center rounded-2xl border border-gray-800 bg-gray-900/40 p-6 text-center shadow-md hover:border-blue-500 hover:bg-gray-900/60"
                )}
              >
                <div className="mb-4 text-blue-400">{feature.icon}</div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-950 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Agentic AI — All rights reserved.
      </footer>
    </div>
  );
}
