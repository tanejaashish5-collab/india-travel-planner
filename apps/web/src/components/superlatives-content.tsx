"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem, HoverCard } from "./animated-hero";

export function SuperlativesContent({ superlatives }: { superlatives: any[] }) {
  const locale = useLocale();

  return (
    <StaggerContainer className="grid gap-4 sm:grid-cols-2" staggerDelay={0.06}>
      {superlatives.map((s: any, idx: number) => {
        const dest = s.destinations;
        return (
          <StaggerItem key={s.id}>
            <HoverCard>
              <Link
                href={s.destination_id ? `/${locale}/destination/${s.destination_id}` : "#"}
                className="group block rounded-xl border border-border overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex gap-4 p-5">
                  {/* Rank number */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: idx * 0.05 }}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg"
                  >
                    🏆
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-primary group-hover:underline">{s.title}</h3>
                    <div className="text-sm font-medium mt-0.5">{s.name}</div>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{s.detail}</p>

                    {/* Destination link */}
                    {dest && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        📍 {dest.name}
                        {dest.elevation_m && <span className="font-mono"> · {dest.elevation_m}m</span>}
                      </div>
                    )}

                    {/* Tags */}
                    {s.tags?.length > 0 && (
                      <div className="mt-2 flex gap-1">
                        {s.tags.slice(0, 4).map((tag: string) => (
                          <span key={tag} className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Destination image */}
                  {s.destination_id && (
                    <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-muted/30">
                      <img
                        src={`/images/destinations/${s.destination_id}.jpg`}
                        alt={s.name ?? ""}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                  )}
                </div>
              </Link>
            </HoverCard>
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
}
