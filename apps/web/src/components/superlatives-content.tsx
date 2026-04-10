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
                className="group block rounded-xl border border-border overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 bg-card"
              >
                {/* Hero image area */}
                <div className="h-36 relative overflow-hidden bg-muted/30">
                  {s.destination_id && (
                    <img
                      src={`/images/destinations/${s.destination_id}.jpg`}
                      alt={s.name ?? ""}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

                  {/* Rank badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: idx * 0.05 }}
                    className="absolute top-3 left-3 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground shadow-lg"
                  >
                    {idx + 1}
                  </motion.div>

                  {/* Title and name overlaid at bottom */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-semibold text-white drop-shadow-md group-hover:underline">{s.title}</h3>
                    <div className="text-sm font-medium text-white/90 drop-shadow-md">{s.name}</div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{s.detail}</p>

                  {/* Destination link */}
                  {dest && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      📍 {dest.name}
                      {dest.elevation_m && <span className="font-mono"> · {dest.elevation_m}m</span>}
                    </div>
                  )}

                  {/* Tags */}
                  {s.tags?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {s.tags.slice(0, 4).map((tag: string) => (
                        <span key={tag} className="rounded-full border border-border px-2 py-1 text-xs text-muted-foreground">
                          {tag}
                        </span>
                      ))}
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
