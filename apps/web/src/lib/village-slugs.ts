// Village page allowlist (client-safe: JSON only, no DB client). Snapshot of
// published sub_destinations written by scripts/gen-known-village-slugs.mjs.
import knownVillagesData from "../../data/known-village-slugs.json";

const KNOWN_VILLAGES = knownVillagesData.villages as Record<string, string[]>;

export function isKnownVillage(parentId: string, slug: string): boolean {
  return KNOWN_VILLAGES[parentId]?.includes(slug) ?? false;
}

export function allVillagePaths(): { parentId: string; slug: string }[] {
  return Object.entries(KNOWN_VILLAGES).flatMap(([parentId, slugs]) =>
    slugs.map((slug) => ({ parentId, slug })),
  );
}
