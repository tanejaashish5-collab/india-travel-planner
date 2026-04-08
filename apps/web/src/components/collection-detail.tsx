"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from "./animated-hero";

export function CollectionDetail({ collection }: { collection: any }) {
  const locale = useLocale();
  const items = collection.items ?? [];
  const destMap = Object.fromEntries(
    (collection.destinations ?? []).map((d: any) => [d.id, d]),
  );
  // Group eats and stays by destination
  const eatsByDest: Record<string, any[]> = {};
  (collection.viral_eats ?? []).forEach((e: any) => {
    if (!eatsByDest[e.destination_id]) eatsByDest[e.destination_id] = [];
    eatsByDest[e.destination_id].push(e);
  });
  const staysByDest: Record<string, any[]> = {};
  (collection.local_stays ?? []).forEach((s: any) => {
    if (!staysByDest[s.destination_id]) staysByDest[s.destination_id] = [];
    staysByDest[s.destination_id].push(s);
  });
  const hasLocalData = Object.keys(eatsByDest).length > 0 || Object.keys(staysByDest).length > 0;

  return (
    <>
      <FadeIn>
        <div className="mb-4 text-sm text-muted-foreground">
          <Link href={`/${locale}/collections`} className="hover:text-foreground transition-colors">
            Collections
          </Link>
          {" → "}
          <span className="text-foreground">{collection.name}</span>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h1 className="text-3xl font-bold">{collection.name}</h1>
        <p className="mt-2 text-muted-foreground leading-relaxed">{collection.description}</p>
      </FadeIn>

      <StaggerContainer className="mt-8 space-y-4" staggerDelay={0.1}>
        {items.map((item: any, idx: number) => {
          const dest = destMap[item.destination_id];
          const stateName = dest?.state
            ? Array.isArray(dest.state) ? dest.state[0]?.name : dest.state.name
            : "";

          return (
            <StaggerItem key={item.destination_id}>
              <HoverCard>
                <Link
                  href={`/${locale}/destination/${item.destination_id}`}
                  className="flex items-start gap-4 rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-primary/50"
                >
                  {/* Image */}
                  <div className="relative w-24 h-24 sm:w-32 sm:h-24 shrink-0 bg-muted/30">
                    <img
                      src={`/images/destinations/${item.destination_id}.jpg`}
                      alt={dest?.name ?? ""}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    <div className="absolute top-1 left-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {idx + 1}
                    </div>
                  </div>
                  <div className="flex-1 p-4 pl-0 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-lg">{dest?.name ?? item.destination_id}</h3>
                      {dest?.elevation_m && (
                        <span className="shrink-0 text-xs font-mono text-muted-foreground pr-3">{dest.elevation_m.toLocaleString()}m</span>
                      )}
                    </div>
                    {stateName && <p className="text-xs text-muted-foreground">{stateName}</p>}
                    <p className="mt-1 text-sm text-muted-foreground">{item.note}</p>
                  </div>
                </Link>

                {/* Local details — food spots + stays for this destination */}
                {(eatsByDest[item.destination_id]?.length > 0 || staysByDest[item.destination_id]?.length > 0) && (
                  <div className="mt-2 ml-0 sm:ml-36 space-y-2">
                    {eatsByDest[item.destination_id]?.map((eat: any) => (
                      <div key={eat.id} className="rounded-lg border border-border/50 bg-muted/10 p-3 flex items-start gap-3">
                        <span className="text-lg mt-0.5">🍽️</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-semibold text-sm">{eat.name}</h4>
                            {eat.price_range && <span className="text-xs font-mono text-muted-foreground shrink-0">{eat.price_range}</span>}
                          </div>
                          {eat.location && <p className="text-xs text-muted-foreground/60">📍 {eat.location}</p>}
                          <p className="text-xs text-primary mt-0.5">{eat.famous_for}</p>
                          {eat.honest_review && <p className="text-sm text-muted-foreground mt-1">{eat.honest_review}</p>}
                        </div>
                      </div>
                    ))}
                    {staysByDest[item.destination_id]?.map((stay: any) => (
                      <div key={stay.id} className="rounded-lg border border-border/50 bg-muted/10 p-3 flex items-start gap-3">
                        <span className="text-lg mt-0.5">{stay.type === "homestay" ? "🏠" : stay.type === "cafe" ? "☕" : "📌"}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-semibold text-sm">{stay.name}</h4>
                            {stay.price_range && <span className="text-xs font-mono text-muted-foreground shrink-0">{stay.price_range}</span>}
                          </div>
                          <span className="text-xs text-primary capitalize">{stay.type}</span>
                          {stay.why_special && <p className="text-sm text-muted-foreground mt-1">{stay.why_special}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </HoverCard>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </>
  );
}
