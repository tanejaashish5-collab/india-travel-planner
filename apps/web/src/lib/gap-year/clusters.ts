// Cluster nearby destinations via a simple greedy haversine pass.
// Used by the Gap Year Planner to encourage multi-stop monthly splits
// when several shortlist candidates are within driving distance.

export interface CoordRow {
  id: string;
  lat: number | null;
  lng: number | null;
}

const EARTH_RADIUS_KM = 6371;

export function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

/**
 * Greedy cluster: for each candidate in order, attach to an existing cluster
 * if any anchor is within `radiusKm`; otherwise start a new cluster with this
 * candidate as the anchor. Returns a Map of destinationId → clusterId.
 */
export function computeClusters(rows: CoordRow[], radiusKm = 150): Map<string, string> {
  const clusters: { id: string; anchors: { id: string; lat: number; lng: number }[] }[] = [];
  const assignment = new Map<string, string>();

  for (const r of rows) {
    if (r.lat == null || r.lng == null) continue;
    const point = { lat: r.lat, lng: r.lng };

    let joined: string | null = null;
    for (const c of clusters) {
      if (c.anchors.some((a) => haversineKm(a, point) <= radiusKm)) {
        joined = c.id;
        c.anchors.push({ id: r.id, ...point });
        break;
      }
    }

    if (!joined) {
      const cid = `C${clusters.length + 1}`;
      clusters.push({ id: cid, anchors: [{ id: r.id, ...point }] });
      joined = cid;
    }
    assignment.set(r.id, joined);
  }

  return assignment;
}

export function clusterSizes(assignment: Map<string, string>): Map<string, number> {
  const counts = new Map<string, number>();
  for (const cid of assignment.values()) {
    counts.set(cid, (counts.get(cid) ?? 0) + 1);
  }
  return counts;
}
