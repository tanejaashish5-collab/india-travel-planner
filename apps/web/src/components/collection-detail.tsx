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
                  <div className="flex-1 p-4 pl-0">
                    <h3 className="font-semibold text-lg">{dest?.name ?? item.destination_id}</h3>
                    {stateName && <p className="text-xs text-muted-foreground">{stateName}</p>}
                    <p className="mt-1 text-sm text-muted-foreground">{item.note}</p>
                  </div>
                  {dest?.elevation_m && (
                    <span className="text-xs font-mono text-muted-foreground">{dest.elevation_m}m</span>
                  )}
                </Link>
              </HoverCard>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </>
  );
}
