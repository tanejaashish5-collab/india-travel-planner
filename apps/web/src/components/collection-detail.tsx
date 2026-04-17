"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from "./animated-hero";
import { ShareButton } from "./share-button";

export function CollectionDetail({ collection }: { collection: any }) {
  const locale = useLocale();
  const items = collection.items ?? [];
  const contentType = collection.content_type || "destinations";
  const destMap = Object.fromEntries(
    (collection.destinations ?? []).map((d: any) => [d.id, d]),
  );

  // Group eats and stays by destination — only if relevant
  const eatsByDest: Record<string, any[]> = {};
  if (["food", "mixed"].includes(contentType)) {
    (collection.viral_eats ?? []).forEach((e: any) => {
      if (!eatsByDest[e.destination_id]) eatsByDest[e.destination_id] = [];
      eatsByDest[e.destination_id].push(e);
    });
  }
  const staysByDest: Record<string, any[]> = {};
  if (["stays", "mixed"].includes(contentType)) {
    (collection.local_stays ?? []).forEach((s: any) => {
      if (!staysByDest[s.destination_id]) staysByDest[s.destination_id] = [];
      staysByDest[s.destination_id].push(s);
    });
  }

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
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{collection.name}</h1>
            <p className="mt-2 text-muted-foreground leading-relaxed">{collection.description}</p>
          </div>
          <div className="shrink-0 flex items-center gap-2 mt-1">
            <ShareButton
              title={collection.name}
              text={`${collection.description} — ${items.length} scored destinations`}
            />
          </div>
        </div>
        <div className="mt-3 text-sm text-muted-foreground">{items.length} destinations in this collection</div>
      </FadeIn>

      <StaggerContainer className="mt-8 space-y-4" staggerDelay={0.1}>
        {items.map((item: any, idx: number) => {
          const dest = destMap[item.destination_id];
          const stateName = dest?.state
            ? Array.isArray(dest.state) ? dest.state[0]?.name : dest.state.name
            : "";
          const destEats = eatsByDest[item.destination_id] ?? [];
          const destStays = staysByDest[item.destination_id] ?? [];
          const hasExtras = destEats.length > 0 || destStays.length > 0;

          return (
            <StaggerItem key={item.destination_id}>
              <div className="space-y-0">
                {/* Destination card */}
                <HoverCard>
                  <Link
                    href={`/${locale}/destination/${item.destination_id}`}
                    className="flex items-start gap-3 sm:gap-4 rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-primary/50"
                  >
                    <div className="relative w-20 h-20 sm:w-32 sm:h-24 shrink-0 bg-muted/30">
                      <Image
                        src={`/images/destinations/${item.destination_id}.jpg`}
                        alt={dest?.name ?? ""}
                        fill
                        sizes="(max-width: 640px) 80px, 128px"
                        className="object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                      <div className="absolute top-1 left-1 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-primary text-[10px] sm:text-xs font-bold text-primary-foreground">
                        {idx + 1}
                      </div>
                    </div>
                    <div className="flex-1 py-2.5 pr-3 sm:p-4 sm:pl-0 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-base sm:text-lg leading-tight break-words">{dest?.name ?? item.destination_id}</h3>
                        {dest?.elevation_m && (
                          <span className="shrink-0 text-[10px] sm:text-xs font-mono text-muted-foreground">{dest.elevation_m.toLocaleString()}m</span>
                        )}
                      </div>
                      {stateName && <p className="text-[11px] sm:text-xs text-muted-foreground">{stateName}</p>}
                      <p className="mt-1 text-xs sm:text-sm text-muted-foreground line-clamp-2">{item.note}</p>
                    </div>
                  </Link>
                </HoverCard>

                {/* Expandable local details — only for relevant collection types */}
                {hasExtras && (
                  <CollapsibleDetails
                    eats={destEats}
                    stays={destStays}
                    contentType={contentType}
                    destName={dest?.name ?? ""}
                  />
                )}
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </>
  );
}

function CollapsibleDetails({
  eats,
  stays,
  contentType,
  destName,
}: {
  eats: any[];
  stays: any[];
  contentType: string;
  destName: string;
}) {
  const [expanded, setExpanded] = useState(false);

  const label = contentType === "food"
    ? `${eats.length} food spot${eats.length !== 1 ? "s" : ""}`
    : contentType === "stays"
    ? `${stays.length} stay${stays.length !== 1 ? "s" : ""}`
    : `${eats.length + stays.length} local pick${eats.length + stays.length !== 1 ? "s" : ""}`;

  return (
    <div className="ml-0 sm:ml-36 -mt-1">
      {/* Toggle button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-4 py-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
      >
        <span>{expanded ? "▼" : "▶"}</span>
        <span>{expanded ? "Hide" : "Show"} {label} in {destName}</span>
      </button>

      {/* Expandable content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-2 px-4 pb-3">
              {eats.map((eat: any) => (
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
              {stays.map((stay: any) => (
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
