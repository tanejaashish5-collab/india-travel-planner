// Itinerary scaffold generator — Phase 4.
//
// Deterministic, side-effect-free skeleton built from the user's stops +
// the RPC logistics rows. Two roles:
//   1. Instant local preview the moment AiModal submits — shown while the
//      Anthropic call runs, so the user never stares at a spinner.
//   2. Fallback when /api/itinerary errors or returns non-JSON.
//
// What's deterministic from data we already have:
//   - Day count = sum(stop.days), date = stop.startDay + offset
//   - Permit prep day inserted BEFORE any stop with permit_type !== 'none'
//     and permit_lead_days > 0
//   - AM/PM/EVE block defaults pulled from row.monthly_note / score / kids /
//     solo-female score
//
// What we deliberately don't generate (yet):
//   - Drive-day insertion. LogisticsRow doesn't carry lat/lng, so we'd have
//     to round-trip a second query. Phase 5 (Map view) will load coords
//     anyway — fold drive-day inference into that pass.

import type { TripStop } from "./trip-storage";
import type { LogisticsRow } from "./cost-aggregator";
import { doyLabel } from "@/components/trip-board/atoms";

export type ItineraryDayKind = "stay" | "permit-prep";

export type ItineraryDay = {
  day: number;
  date: string;
  destinationId: string;
  destinationName: string;
  kind: ItineraryDayKind;
  morning: string;
  afternoon: string;
  evening: string;
  rationale?: string;
};

export type Scaffold = {
  days: ItineraryDay[];
  generatedAt: string;
  /** Set when the scaffold is the local fallback (LLM unreachable / errored). */
  source: "local" | "ai";
};

export type ScaffoldOpts = {
  ages?: number[];
  mobility?: "fit" | "normal" | "limited" | "wheelchair";
  vehicle?: "rental" | "self-drive" | "driver" | "bus" | "motorcycle";
  pax?: number;
  /** Used to flag solo-female scoring relevance. */
  hasFemaleAdult?: boolean;
};

const VEHICLE_HINT: Record<NonNullable<ScaffoldOpts["vehicle"]>, string> = {
  rental: "Rental car — confirm fuel and ATM stops night before each drive.",
  "self-drive": "Self-drive — pre-load offline maps; cell often drops past town limits.",
  driver: "Driver-led — share daily distance with them at breakfast so pace holds.",
  bus: "Bus leg — buy tickets a day ahead in season; book aisle if motion-sick.",
  motorcycle: "Motorcycle — ride with the light, never at dusk on hill roads.",
};

function pickKidsLine(row: LogisticsRow | undefined, ages: number[] | undefined): string | null {
  if (!ages || ages.length === 0) return null;
  const minAge = Math.min(...ages);
  const minRec = row?.kids_min_age;
  if (minRec != null && minAge < minRec) {
    return `Kids floor for ${row?.name ?? "this stop"} is age ${minRec}+. Youngest in your group is ${minAge}.`;
  }
  if (row?.kids_rating != null) {
    return `Kids rating ${row.kids_rating}/5 — pace this day around the youngest.`;
  }
  return null;
}

function pickSoloFemaleLine(row: LogisticsRow | undefined, opts: ScaffoldOpts): string | null {
  if (!opts.hasFemaleAdult || (opts.pax ?? 0) > 1) return null;
  const sf = row?.monthly_solo_female_score ?? row?.annual_solo_female_score;
  if (sf == null) return null;
  if (sf <= 2) return `Solo-female score ${sf}/5 — local guide or paired travel recommended after dark.`;
  if (sf >= 4) return `Solo-female score ${sf}/5 — comfortable solo, last bus times still apply.`;
  return `Solo-female score ${sf}/5 — fine in daylight, plan returns before sunset.`;
}

export function buildScaffold(
  stops: TripStop[],
  rowsByDest: Record<string, LogisticsRow>,
  opts: ScaffoldOpts = {},
): Scaffold {
  const out: ItineraryDay[] = [];
  let counter = 1;

  for (let i = 0; i < stops.length; i++) {
    const stop = stops[i];
    const row = rowsByDest[stop.destinationId];
    const name = row?.name ?? stop.destinationId;
    const stayDays = Math.max(1, stop.days || 1);

    // Permit prep day before this stop, if applicable.
    const lead = row?.permit_lead_days ?? 0;
    const needsPermit = row?.permit_type && row.permit_type !== "none";
    if (needsPermit && lead > 0) {
      const prepDoy = Math.max(1, stop.startDay - lead);
      out.push({
        day: counter++,
        date: doyLabel(prepDoy),
        destinationId: stop.destinationId,
        destinationName: `Permit prep — ${name}`,
        kind: "permit-prep",
        morning: `Apply for ${row?.permit_type?.toUpperCase() ?? "permit"} for ${name}. Lead time ~${lead} days.`,
        afternoon: "Scan passport / ID, print 2 photo copies, save digital backups.",
        evening: "Confirm submission. Save reference number — checkpoints ask for it.",
        rationale: `Why: ${row?.permit_type?.toUpperCase()} required for ${name} (${lead}-day lead).`,
      });
    }

    for (let d = 0; d < stayDays; d++) {
      const doy = stop.startDay + d;
      const isArrival = d === 0;
      const isLast = d === stayDays - 1;
      const hasNext = i < stops.length - 1;

      const noteFragment = row?.monthly_note ? ` ${row.monthly_note}` : "";

      const morning = isArrival
        ? `Arrive ${name}. Settle in, walk the main bazaar, get oriented.${noteFragment}`
        : `Half-day exploration — pace by altitude and weather.${noteFragment}`;

      const afternoon = isLast && hasNext
        ? `Pack out, transfer to ${rowsByDest[stops[i + 1].destinationId]?.name ?? "the next stop"}. Eat before you leave.`
        : `Open block — local food, photo walks, or a longer hike if the day is dry.`;

      const eveningParts: string[] = ["Dinner local."];
      if (opts.vehicle && hasNext && isLast) eveningParts.push(VEHICLE_HINT[opts.vehicle]);
      else eveningParts.push("Sleep early if tomorrow is a drive day.");
      const evening = eveningParts.join(" ");

      const ratParts: string[] = [];
      if (row?.monthly_score) ratParts.push(`scores ${row.monthly_score}/5 this month`);
      const kidsLine = pickKidsLine(row, opts.ages);
      if (kidsLine) ratParts.push(kidsLine);
      const sfLine = pickSoloFemaleLine(row, opts);
      if (sfLine) ratParts.push(sfLine);

      out.push({
        day: counter++,
        date: doyLabel(doy),
        destinationId: stop.destinationId,
        destinationName: name,
        kind: "stay",
        morning,
        afternoon,
        evening,
        rationale: ratParts.length ? `Why this day: ${ratParts.join(" · ")}.` : undefined,
      });
    }
  }

  return {
    days: out,
    generatedAt: new Date().toISOString(),
    source: "local",
  };
}
