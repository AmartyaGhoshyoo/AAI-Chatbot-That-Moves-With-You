import { notFound } from "next/navigation";
import { content, topics } from "../_data";
import type { Metadata } from "next";
import Link from "next/link";

export function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const topic = topics.find((t) => t.slug === params.slug);
  if (!topic) return { title: "Not found" };
  return {
    title: `${topic.title} – Docs`,
    description: topic.description,
  };
}

export default function DocTopicPage({ params }: { params: { slug: string } }) {
  const node = content[params.slug];

  if (!node) return notFound();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          {topics.find((t) => t.slug === params.slug)?.title}
        </h1>
        <p className="mt-2 text-white/70">
          {topics.find((t) => t.slug === params.slug)?.description}
        </p>
      </header>

      <div className="rounded-lg border border-white/10 bg-white/5 p-4">
        {node}
      </div>

      <div className="flex flex-wrap gap-3 pt-2 text-sm">
        <Link href="/docs" className="px-3 py-1.5 rounded-md border border-white/15 hover:bg-white/5">All topics</Link>
        <a href="#top" className="px-3 py-1.5 rounded-md border border-white/15 hover:bg-white/5">Back to top</a>
      </div>
    </div>
  );
}
