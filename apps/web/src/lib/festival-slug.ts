// Collision-aware slug generation for /festivals/[festivalSlug] routes.
// 11 festival names appear at multiple destinations (Pongal, Maha Shivaratri,
// Saga Dawa, Magh Mela, ...) — those get a `-{destination_id}` suffix.

export type FestivalSlugRow = {
  id: string;
  name: string;
  destination_id: string | null;
};

function baseSlug(name: string): string {
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

export function festivalSlugFor(row: FestivalSlugRow, allRows: FestivalSlugRow[]): string {
  const map = buildFestivalSlugMap(allRows);
  return map.get(row.id) ?? baseSlug(row.name);
}
