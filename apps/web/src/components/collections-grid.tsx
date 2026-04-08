"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { StaggerContainer, StaggerItem, HoverCard } from "./animated-hero";

export function CollectionsGrid({ collections }: { collections: any[] }) {
  const locale = useLocale();

  return (
    <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
      {collections.map((c: any) => {
        const items = c.items ?? [];
        const coverUrl = `/images/collections/COLLECTION_${c.id}.jpg`;

        return (
          <StaggerItem key={c.id}>
            <HoverCard>
              <Link
                href={`/${locale}/collections/${c.id}`}
                className="group block rounded-2xl border border-border/50 bg-card overflow-hidden h-full transition-all duration-200 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 cursor-pointer"
              >
                {/* Cover image */}
                <div className="relative h-40 bg-muted/30 overflow-hidden">
                  <img
                    src={coverUrl}
                    alt={c.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-lg font-semibold text-white drop-shadow-lg">{c.name}</h3>
                  </div>
                </div>

                <div className="p-5 pt-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {c.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-mono font-bold text-primary">{items.length} places</span>
                    <div className="flex gap-1">
                      {(c.tags ?? []).slice(0, 3).map((tag: string) => (
                        <span key={tag} className="rounded-full border border-border px-2 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </HoverCard>
          </StaggerItem>
        );
      })}

      {collections.length === 0 && (
        <div className="col-span-full py-20 text-center text-muted-foreground">
          No collections found.
        </div>
      )}
    </StaggerContainer>
  );
}
