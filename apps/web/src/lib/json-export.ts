// JSON board export/import — Phase 5.
//
// Round-trips the v2 trip-board state through a JSON file the user
// downloads + can re-import on another device.
//
// Format is the same shape as `trip_boards.payload` in migration 042 — so
// a JSON exported from a logged-in user's cloud-synced board can be re-
// imported by an anonymous user (and vice versa).
//
// Validation is conservative: we accept v1 (`items[]`) AND v2 (`stops[]`)
// shapes on import, migrating v1 to v2 if needed (mirrors the migration
// already in lib/trip-storage.ts).

import type { TripStateV2 } from "./trip-storage";

const FILE_VERSION = "nakshiq-trip-board/v2";

export type ExportEnvelope = {
  format: typeof FILE_VERSION;
  exportedAt: string;
  state: TripStateV2;
};

/** Build a download blob + suggested filename for the current board. */
export function exportBoard(state: TripStateV2): { blob: Blob; filename: string } {
  const env: ExportEnvelope = {
    format: FILE_VERSION,
    exportedAt: new Date().toISOString(),
    state,
  };
  const json = JSON.stringify(env, null, 2);
  const safeName = (state.name || "trip-board")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
  return {
    blob: new Blob([json], { type: "application/json" }),
    filename: `${safeName || "trip-board"}-${new Date().toISOString().slice(0, 10)}.json`,
  };
}

/** Trigger a browser download of the current board. */
export function downloadBoard(state: TripStateV2): void {
  const { blob, filename } = exportBoard(state);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Defer revoke so Safari can complete the download.
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/**
 * Parse a user-supplied File and return a v2 TripState — or throw with a
 * caller-displayable message. Accepts:
 *   - A bare TripStateV2 ({version: 2, stops: [...], ...})
 *   - An ExportEnvelope ({format, state: ...})
 *   - A v1 payload ({items: [...], ...}) — migrated to v2 in-place
 */
export async function importBoard(file: File): Promise<TripStateV2> {
  if (file.size > 256 * 1024) {
    throw new Error("File too large — trip boards are tiny JSON, expected <256KB.");
  }
  const text = await file.text();
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    throw new Error("Not valid JSON. Did you pick the file the trip board exported?");
  }
  if (!raw || typeof raw !== "object") {
    throw new Error("File is empty or not a trip board.");
  }

  // Unwrap envelope if present.
  const candidate = isEnvelope(raw) ? raw.state : (raw as Record<string, unknown>);

  return normalizeToV2(candidate);
}

function isEnvelope(raw: unknown): raw is ExportEnvelope {
  return (
    typeof raw === "object" &&
    raw !== null &&
    "format" in raw &&
    typeof (raw as { format: unknown }).format === "string" &&
    (raw as { format: string }).format.startsWith("nakshiq-trip-board/")
  );
}

function normalizeToV2(input: Record<string, unknown> | unknown): TripStateV2 {
  if (!input || typeof input !== "object") {
    throw new Error("Trip board payload missing.");
  }
  const obj = input as Record<string, unknown>;

  const stops = Array.isArray(obj.stops) ? obj.stops : null;
  const items = Array.isArray(obj.items) ? obj.items : null;
  if (!stops && !items) {
    throw new Error("No stops/items found — file isn't a trip board export.");
  }

  // Prefer v2 stops if present.
  const sourceList = stops ?? items ?? [];
  const normalizedStops = (sourceList as Record<string, unknown>[])
    .map((s, idx) => {
      const destId = typeof s.destinationId === "string" ? s.destinationId : null;
      if (!destId) return null;
      const days = typeof s.days === "number" && s.days > 0 ? Math.floor(s.days) : 3;
      const startDay =
        typeof s.startDay === "number" && s.startDay >= 1 && s.startDay <= 365
          ? Math.floor(s.startDay)
          : 1 + idx * Math.max(1, days);
      const notes = typeof s.notes === "string" ? s.notes.slice(0, 1000) : "";
      const order = typeof s.order === "number" ? s.order : idx;
      return { destinationId: destId, days, startDay, notes, order };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const month =
    typeof obj.month === "number" && obj.month >= 1 && obj.month <= 12
      ? Math.floor(obj.month)
      : 1;

  const out: TripStateV2 = {
    version: 2,
    name: typeof obj.name === "string" ? obj.name.slice(0, 120) : "Imported trip",
    month,
    travelers:
      typeof obj.travelers === "number" && obj.travelers > 0
        ? Math.min(20, Math.floor(obj.travelers))
        : 2,
    budget: typeof obj.budget === "string" ? obj.budget : "mid-range",
    stops: normalizedStops,
    items: normalizedStops.map((s) => ({
      destinationId: s.destinationId,
      days: s.days,
      notes: s.notes,
      order: s.order,
    })),
    createdAt: typeof obj.createdAt === "string" ? obj.createdAt : new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return out;
}
