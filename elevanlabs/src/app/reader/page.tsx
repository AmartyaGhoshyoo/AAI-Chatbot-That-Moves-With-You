"use client";
import { useSearchParams } from "next/navigation";

export default function ReaderPage() {
  const params = useSearchParams();
  const url = params.get("url") || "";
  return (
    <main className="h-screen w-screen bg-black text-white">
      {url ? (
        <iframe src={url} className="w-full h-full bg-white" />
      ) : (
        <div className="flex h-full items-center justify-center">No URL provided.</div>
      )}
    </main>
  );
}


