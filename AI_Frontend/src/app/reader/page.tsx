"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";

function ReaderContent() {
  const params = useSearchParams();
  const raw = params.get("url") || "";
  const url = useMemo(() => {
    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  }, [raw]);

  const [failed, setFailed] = useState(false);

  const hostname = useMemo(() => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  }, [url]);

  return (
    <main className="h-screen w-screen bg-black text-white flex flex-col">
      <div className="shrink-0 px-4 py-2 border-b border-white/10 flex items-center justify-between text-sm">
        <div className="opacity-70">Viewing: {hostname || "(no URL)"}</div>
        {url && (
          <div className="flex gap-2">
            <button
              className="px-3 py-1 rounded bg-white text-black"
              onClick={() => (window.location.href = url)}
            >
              Open here
            </button>
            <a
              className="px-3 py-1 rounded bg-white text-black"
              href={url}
              target="_blank"
              rel="noreferrer noopener"
            >
              Open new tab
            </a>
          </div>
        )}
      </div>
      <div className="flex-1">
        {url ? (
          failed ? (
            <div className="h-full w-full flex items-center justify-center text-center px-6">
              <div>
                <div className="mb-3 text-lg">We couldn't embed this site.</div>
                <div className="opacity-70">Use the buttons above to open it directly.</div>
              </div>
            </div>
          ) : (
            <iframe
              src={url}
              className="w-full h-full bg-white"
              onError={() => setFailed(true)}
            />
          )
        ) : (
          <div className="flex h-full items-center justify-center">No URL provided.</div>
        )}
      </div>
    </main>
  );
}

export default function ReaderPage() {
  return (
    <Suspense fallback={
      <main className="h-screen w-screen bg-black text-white flex items-center justify-center">
        <div className="opacity-70">Loading...</div>
      </main>
    }>
      <ReaderContent />
    </Suspense>
  );
}