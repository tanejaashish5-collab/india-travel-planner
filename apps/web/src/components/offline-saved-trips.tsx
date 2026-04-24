"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Reads saved destinations from BOTH legacy keys ("savedDestinations" + "nakshiq_saved")
// so every user's local history — web or mobile install — is surfaced.
// When the saved page can't load on network-fail, this is the fallback surface.
export function OfflineSavedTrips({ locale }: { locale: string }) {
  const [ids, setIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const isHindi = locale === "hi";

  useEffect(() => {
    try {
      const legacyA = JSON.parse(localStorage.getItem("savedDestinations") || "[]");
      const legacyB = JSON.parse(localStorage.getItem("nakshiq_saved") || "[]");
      const merged = Array.from(new Set([...(Array.isArray(legacyA) ? legacyA : []), ...(Array.isArray(legacyB) ? legacyB : [])]));
      setIds(merged.filter((x) => typeof x === "string"));
    } catch {
      setIds([]);
    } finally {
      setReady(true);
    }
  }, []);

  if (!ready) {
    return (
      <section className="rounded-2xl border border-border bg-card/40 p-5">
        <div className="h-4 bg-muted/40 rounded w-48 mb-3 animate-pulse" />
        <div className="h-3 bg-muted/40 rounded w-64 animate-pulse" />
      </section>
    );
  }

  if (ids.length === 0) {
    return (
      <section className="rounded-2xl border border-dashed border-border p-5">
        <p className="text-sm text-muted-foreground">
          {isHindi
            ? "अभी तक कोई सहेजी गई यात्रा नहीं। जब आप फिर ऑनलाइन होंगे, कोई भी गंतव्य सहेज लें ताकि वह ऑफ़लाइन भी काम करे।"
            : "No saved trips yet. When you're back online, save any destination so it's available here offline."}
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
      <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-3">
        {isHindi ? `आपकी सहेजी गई यात्राएँ (${ids.length})` : `Your saved trips (${ids.length})`}
      </h2>
      <div className="grid gap-2">
        {ids.map((id) => (
          <Link
            key={id}
            href={`/${locale}/destination/${id}`}
            className="group flex items-center justify-between rounded-lg border border-border bg-background/40 px-4 py-3 transition-all hover:border-primary/40 hover:bg-primary/5"
          >
            <div>
              <div className="text-sm font-medium group-hover:text-primary transition-colors capitalize">
                {id.replace(/-/g, " ")}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {isHindi ? "गंतव्य पृष्ठ पहले कैश किया गया" : "Destination page cached on prior visit"}
              </div>
            </div>
            <span className="text-primary/60 group-hover:text-primary group-hover:translate-x-1 transition-all">→</span>
          </Link>
        ))}
      </div>
      <p className="text-[11px] text-muted-foreground mt-3">
        {isHindi
          ? "लिंक केवल उन पृष्ठों के लिए काम करते हैं जिन्हें आपने पहले देखा है।"
          : "Links work only for pages you've visited before (cached automatically)."}
      </p>
    </section>
  );
}
