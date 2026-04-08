"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

interface NavItem {
  id: string;
  name: string;
}

export function PrevNextNav({
  items,
  currentId,
  basePath,
  backLabel,
  backHref,
}: {
  items: NavItem[];
  currentId: string;
  basePath: string; // e.g. "treks", "destination", "routes", "collections"
  backLabel: string;
  backHref: string;
}) {
  const locale = useLocale();
  const currentIdx = items.findIndex((i) => i.id === currentId);
  const prev = currentIdx > 0 ? items[currentIdx - 1] : null;
  const next = currentIdx < items.length - 1 ? items[currentIdx + 1] : null;

  return (
    <div className="mt-12 mb-16 border-t border-border/30 pt-6">
      <div className="flex items-center justify-between gap-4">
        {/* Previous */}
        {prev ? (
          <Link
            href={`/${locale}/${basePath}/${prev.id}`}
            className="group flex items-center gap-2 rounded-xl border border-border px-4 py-3 hover:border-primary/40 hover:bg-muted/20 transition-all max-w-[45%]"
          >
            <span className="text-muted-foreground group-hover:text-primary transition-colors text-lg">←</span>
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground">Previous</div>
              <div className="text-sm font-medium truncate group-hover:text-primary transition-colors">{prev.name}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {/* Back to list */}
        <Link
          href={`/${locale}/${backHref}`}
          className="shrink-0 rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-muted-foreground transition-all"
        >
          {backLabel}
        </Link>

        {/* Next */}
        {next ? (
          <Link
            href={`/${locale}/${basePath}/${next.id}`}
            className="group flex items-center gap-2 rounded-xl border border-border px-4 py-3 hover:border-primary/40 hover:bg-muted/20 transition-all max-w-[45%] text-right"
          >
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground">Next</div>
              <div className="text-sm font-medium truncate group-hover:text-primary transition-colors">{next.name}</div>
            </div>
            <span className="text-muted-foreground group-hover:text-primary transition-colors text-lg">→</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
