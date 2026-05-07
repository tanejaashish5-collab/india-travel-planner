// Cinematic-template allowlist. Add a slug here to opt that single
// destination into the cinematic redesign. Everyone else continues
// rendering through DestinationDetail (the production design).
//
// Imported by:
//   - apps/web/src/app/[locale]/destination/[id]/page.tsx (route gate)
//   - apps/web/src/app/api/og/destination/[id]/route.tsx (OG image gate)
export const CINEMATIC_DESTINATIONS: ReadonlySet<string> = new Set(["manali"]);

export function isCinematicDestination(id: string): boolean {
  return CINEMATIC_DESTINATIONS.has(id);
}
