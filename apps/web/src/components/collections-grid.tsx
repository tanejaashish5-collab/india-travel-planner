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
        return (
          <StaggerItem key={c.id}>
            <HoverCard>
              <Link
                href={`/${locale}/collections/${c.id}`}
                className="block rounded-xl border border-border bg-card p-6 h-full transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <h3 className="text-lg font-semibold">{c.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                  {c.description}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-mono font-bold text-primary">{items.length} places</span>
                  <div className="flex gap-1">
                    {(c.tags ?? []).slice(0, 3).map((tag: string) => (
                      <span key={tag} className="rounded-full border border-border px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
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
