"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { StaggerContainer, StaggerItem, HoverCard } from "./animated-hero";

export function TreksContent({ trekDests }: { trekDests: any[] }) {
  const locale = useLocale();

  return (
    <>
      <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10" staggerDelay={0.06}>
        {trekDests.map((d: any) => {
          const stateName = Array.isArray(d.state) ? d.state[0]?.name : d.state?.name;
          return (
            <StaggerItem key={d.id}>
              <HoverCard>
                <Link
                  href={`/${locale}/destination/${d.id}`}
                  className="block rounded-xl border border-border bg-card p-5 h-full transition-all hover:border-primary/50"
                >
                  <h3 className="font-semibold">{d.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{d.tagline}</p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    {stateName && <span>{stateName}</span>}
                    <span>·</span>
                    <span className="capitalize">{d.difficulty}</span>
                    {d.elevation_m && <><span>·</span><span className="font-mono">{d.elevation_m}m</span></>}
                  </div>
                </Link>
              </HoverCard>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      <div className="rounded-xl border border-dashed border-border p-8 text-center">
        <h3 className="text-lg font-semibold">Full Trek Database Coming Soon</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          Comprehensive trek database with difficulty ratings, altitude profiles,
          duration, permits, and gear checklists for every trek in North India.
        </p>
      </div>
    </>
  );
}
