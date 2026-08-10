// Collision-aware slug generation for /festivals/[festivalSlug] routes.
// Festival names that appear at multiple destinations (Pongal, Maha Shivaratri,
// Saga Dawa, Magh Mela, ...) get a `-{destination_id}` suffix.
//
// IMPORTANT — the bare slug disappears the moment a name collides. Adding a
// second "Goa Carnival" row silently turns the already-indexed
// /festivals/goa-carnival into a 404, because both rows move to
// goa-carnival-{margao|panaji}. That is exactly what grew the GSC
// "Not found (404)" bucket for weeks (29 colliding bases / 84 rows as of
// 2026-08-10). `collidingBaseSlugs` exists so the route can serve those bare
// URLs as a disambiguation hub instead of dropping them — never let a bare
// colliding slug 404.

export type FestivalSlugRow = {
  id: string;
  name: string;
  destination_id: string | null;
};

export function baseSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]+/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function buildFestivalSlugMap(rows: FestivalSlugRow[]): Map<string, string> {
  const baseToCount = new Map<string, number>();
  for (const r of rows) {
    const b = baseSlug(r.name);
    baseToCount.set(b, (baseToCount.get(b) ?? 0) + 1);
  }
  const idToSlug = new Map<string, string>();
  for (const r of rows) {
    const b = baseSlug(r.name);
    const slug = (baseToCount.get(b) ?? 1) > 1 && r.destination_id
      ? `${b}-${r.destination_id}`
      : b;
    idToSlug.set(r.id, slug);
  }
  return idToSlug;
}

// Base slugs shared by 2+ festivals — i.e. the bare URLs that no longer resolve
// to a single festival. These are served as disambiguation hubs, not 404s.
export function collidingBaseSlugs(rows: FestivalSlugRow[]): Set<string> {
  const counts = new Map<string, number>();
  for (const r of rows) {
    const b = baseSlug(r.name);
    counts.set(b, (counts.get(b) ?? 0) + 1);
  }
  const colliding = new Set<string>();
  for (const [b, n] of counts) if (n > 1) colliding.add(b);
  return colliding;
}

// The festivals behind a bare colliding slug, each with its real (suffixed) slug.
export function festivalsForBaseSlug<T extends FestivalSlugRow>(
  rows: T[],
  base: string,
): Array<{ row: T; slug: string }> {
  const slugMap = buildFestivalSlugMap(rows);
  return rows
    .filter((r) => baseSlug(r.name) === base)
    .map((r) => ({ row: r, slug: slugMap.get(r.id) ?? baseSlug(r.name) }));
}

export function festivalSlugFor(row: FestivalSlugRow, allRows: FestivalSlugRow[]): string {
  const map = buildFestivalSlugMap(allRows);
  return map.get(row.id) ?? baseSlug(row.name);
}
