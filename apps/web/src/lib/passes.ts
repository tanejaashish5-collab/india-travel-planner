// Static Himalayan pass data for the Trip Board year-band overlay.
//
// Why in code, not a table: 6 entries, low churn (annual seasonal cycle),
// editorial review needed before any change. A migration + admin UI for 6
// rows is overkill. Promote to a `passes` table when we cross 30 entries or
// need non-engineering edits.
//
// season_open_doy / season_close_doy = day-of-year (1-365) the pass is
// typically driveable. These are advisory windows; BRO sometimes opens early
// or closes late. The Trip Board year-band shows them as hatched bands and
// fires an alert when a stop lands outside the window.
//
// affected_destination_ids: which destinations a stop on the pass implies you
// drive through (or stop at). When any affected dest is added to the trip,
// the pass status surfaces in the conflicts panel.
//
// Source: BRO seasonal advisories + state PWD updates. Verified 2026-05-03.
// When updating, also update last_verified date.

export type Pass = {
  slug: string;
  name: string;
  state: string;
  elevation_m: number;
  // Day-of-year window (inclusive). Cross-year passes (e.g. open all year
  // except Jan-Feb) use season_open_doy > season_close_doy convention —
  // none of our six currently do that.
  season_open_doy: number;
  season_close_doy: number;
  // Destinations a traveller will pass through / want to plan against.
  affected_destination_ids: string[];
  note: string;
  source_url: string;
  last_verified: string; // YYYY-MM-DD
};

// Day-of-year helpers (Jan 1 = 1). Trip Board year-band uses these to project
// stop dates onto the band's x-axis.
export function dayOfYear(date: Date): number {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const diff = date.getTime() - start;
  return Math.floor(diff / 86_400_000);
}

export function doyToDate(doy: number, year: number): Date {
  return new Date(Date.UTC(year, 0, doy));
}

export const PASSES: Pass[] = [
  {
    slug: "rohtang-la",
    name: "Rohtang La",
    state: "himachal-pradesh",
    elevation_m: 3978,
    season_open_doy: dayOfYear(new Date("2026-05-15")),
    season_close_doy: dayOfYear(new Date("2026-11-15")),
    affected_destination_ids: ["manali", "kaza", "lahaul"],
    note: "Permit + odd/even date restriction (NGT order). Atal Tunnel below offers winter alternative for Lahaul access.",
    source_url: "https://himachal.nic.in/index.php?lang=1&dpt_id=88",
    last_verified: "2026-05-03",
  },
  {
    slug: "kunzum-la",
    name: "Kunzum La",
    state: "himachal-pradesh",
    elevation_m: 4551,
    season_open_doy: dayOfYear(new Date("2026-06-01")),
    season_close_doy: dayOfYear(new Date("2026-10-15")),
    affected_destination_ids: ["kaza", "spiti", "chandratal", "lahaul"],
    note: "Spiti-Lahaul connector. Closes for first snow Oct-Nov, reopens late May / early June. No alternative — winter access to Spiti is via Hindustan-Tibet Highway from Kinnaur side only.",
    source_url: "https://himachal.nic.in/index.php?lang=1&dpt_id=88",
    last_verified: "2026-05-03",
  },
  {
    slug: "khardung-la",
    name: "Khardung La",
    state: "ladakh",
    elevation_m: 5359,
    season_open_doy: dayOfYear(new Date("2026-04-15")),
    season_close_doy: dayOfYear(new Date("2026-11-30")),
    affected_destination_ids: ["leh", "nubra-valley", "turtuk", "diskit"],
    note: "Leh → Nubra connector. World's-highest-motorable claim is contested but the road is real. Winter closure intermittent — convoys sometimes operate.",
    source_url: "https://leh.nic.in/document-category/road-status/",
    last_verified: "2026-05-03",
  },
  {
    slug: "zoji-la",
    name: "Zoji La",
    state: "ladakh",
    elevation_m: 3528,
    season_open_doy: dayOfYear(new Date("2026-04-01")),
    season_close_doy: dayOfYear(new Date("2026-12-15")),
    affected_destination_ids: ["leh", "kargil", "drass", "sonamarg"],
    note: "Srinagar-Leh highway gatekeeper. BRO clears it earliest April; first snow closes it Dec-Mar. Tunnel under construction (2027 target) will make this year-round.",
    source_url: "https://leh.nic.in/document-category/road-status/",
    last_verified: "2026-05-03",
  },
  {
    slug: "sela-pass",
    name: "Sela Pass",
    state: "arunachal-pradesh",
    elevation_m: 4170,
    season_open_doy: 1,
    season_close_doy: 365,
    affected_destination_ids: ["tawang", "bomdila", "dirang"],
    note: "Tawang gateway. Sela Tunnel (opened Mar 2024) made this effectively year-round — older guides say winter closures, that's outdated. Snow can still cause delays Dec-Feb.",
    source_url: "https://arunachalpradesh.gov.in/",
    last_verified: "2026-05-03",
  },
  {
    slug: "nathu-la",
    name: "Nathu La",
    state: "sikkim",
    elevation_m: 4310,
    season_open_doy: dayOfYear(new Date("2026-05-01")),
    season_close_doy: dayOfYear(new Date("2026-11-15")),
    affected_destination_ids: ["gangtok", "tsomgo-lake"],
    note: "India-China border pass. Indian visitors only, permit required, Wed/Thu/Sat/Sun open days. Permits via Gangtok travel agents 24h ahead.",
    source_url: "https://sikkim.gov.in/departments/tourism-civil-aviation-department",
    last_verified: "2026-05-03",
  },
];

// Index by destination_id for the Trip Board's per-stop scan.
export const PASSES_BY_DEST: Record<string, Pass[]> = (() => {
  const map: Record<string, Pass[]> = {};
  for (const p of PASSES) {
    for (const d of p.affected_destination_ids) {
      (map[d] ??= []).push(p);
    }
  }
  return map;
})();

export function passStatusForDate(pass: Pass, date: Date): "open" | "closed" {
  const doy = dayOfYear(date);
  // Inclusive window. Year-round passes (1..365) always return open.
  return doy >= pass.season_open_doy && doy <= pass.season_close_doy ? "open" : "closed";
}
