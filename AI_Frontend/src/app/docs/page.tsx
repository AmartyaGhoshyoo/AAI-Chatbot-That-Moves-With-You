import Link from "next/link";
import { topics } from "./_data";

export default function DocsIndexPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Product Documentation</h1>
        <p className="mt-2 text-white/70">Pragmatic, real-world guidance to build, ship, and operate your product reliably.</p>
      </header>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.slice(0,6).map((t) => (
          <Link key={t.slug} href={`/docs/${t.slug}`} className="block rounded-lg border border-white/10 hover:border-white/20 bg-white/5 p-4">
            <div className="font-medium">{t.title}</div>
            <div className="text-sm text-white/60">{t.description}</div>
          </Link>
        ))}
      </section>

      <p className="text-white/60 text-sm">Use the sidebar to explore all topics.</p>
    </div>
  )
}
