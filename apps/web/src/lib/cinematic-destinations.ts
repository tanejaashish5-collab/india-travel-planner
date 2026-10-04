// Cinematic template gate. Since 2026-10-04 EVERY known destination renders
// via DestinationDetailCinematic by default. Until then this was a hand-kept
// allowlist frozen at 505 slugs (2026-05-16); the 28 destinations added later
// silently kept the old DestinationDetail page for months (founder spotted
// betla). Empty sections hide themselves in the cinematic component, so a new
// destination is safe on it; thin content is flagged by
// scripts/cinematic-readiness.mjs instead of by the design.
//
// "Known" = apps/web/data/known-destination-slugs.json, the same list the
// middleware allowlists (regenerate it after any destinations insert). The OG
// route relies on this to refuse made-up slugs.
//
// Imported by:
//   - apps/web/src/app/[locale]/destination/[id]/page.tsx (route gate)
//   - apps/web/src/app/api/og/destination/[id]/route.tsx (OG image gate)
//   - cost / safari / pilgrimage pages (OG image choice)
import knownSlugsData from "../../data/known-destination-slugs.json";

const KNOWN_DESTINATIONS: ReadonlySet<string> = new Set(
  (knownSlugsData as { slugs: string[] }).slugs,
);

// Escape hatch: slugs that must keep the old DestinationDetail page. Keep empty
// unless a destination genuinely breaks the cinematic layout.
export const LEGACY_DESTINATIONS: ReadonlySet<string> = new Set<string>([]);

export function isCinematicDestination(id: string): boolean {
  return KNOWN_DESTINATIONS.has(id) && !LEGACY_DESTINATIONS.has(id);
}
