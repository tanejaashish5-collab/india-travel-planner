"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

export function CollectionsGrid({ collections }: { collections: any[] }) {
  const locale = useLocale();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {collections.map((c: any) => {
        const items = c.items ?? [];
        const coverUrl = `/images/collections/COLLECTION_${c.id}.jpg`;

        return (
          <a
            key={c.id}
            href={`/${locale}/collections/${c.id}`}
            className="group block rounded-2xl border border-border/50 bg-card overflow-hidden h-full transition-all duration-200 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 active:scale-[0.98]"
          >
            {/* Cover image */}
            <div
              className="relative h-40 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, oklch(0.22 0.03 260), oklch(0.16 0.02 280))`,
                backgroundImage: `url(${coverUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
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
          </a>
        );
      })}

      {collections.length === 0 && (
        <div className="col-span-full py-20 text-center text-muted-foreground">
          No collections found.
        </div>
      )}
    </div>
  );
}
