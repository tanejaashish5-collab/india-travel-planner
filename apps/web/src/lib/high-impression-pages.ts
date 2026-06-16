// Curated list of dest×month pages that get high GSC impressions but rank
// page 2 (positions 4-15). Internal-link funnel target — surfacing these on
// hubs (/explore, /where-to-go) builds keyword-matched anchors back to URLs
// that need a position bump from rank 8 → rank 3.
//
// Source: data/research/data-baseline-2026-05-09.md (GSC almost-page-1 set,
// 28d window). Refresh every 30-60d as the cohort shifts seasonally; the
// month filter below auto-hides stale rows once we cross into the next month.
//
// Anchor text mirrors the GSC query verbatim — that's the keyword we need
// the page to rank for. Don't invent prettier anchors; SEO leverage comes
// from the literal match.

export type HighImpressionPage = {
  destId: string;
  /** Month slug the page ranks for. */
  monthSlug:
    | "january" | "february" | "march" | "april" | "may" | "june"
    | "july" | "august" | "september" | "october" | "november" | "december";
  /** Visible link text. Mirror GSC query, drop the year for evergreen reuse. */
  anchor: string;
  /** Hover-tooltip + screen-reader context. The full search-intent phrase. */
  query: string;
  /** GSC avg position over the last 28d — informational only. */
  position: number;
  /** GSC impressions over the last 28d — informational only. */
  impressions: number;
};

// Sourced from data/research/data-baseline-2026-05-09.md "almost-page-1" set.
// Filtered to ≥75 impressions / position 5-12 (the leverage band where one
// position bump doubles clicks). All entries verified against destinations
// table 2026-05-09 — slugs match the dest×month route param.
export const HIGH_IMPRESSION_PAGES: HighImpressionPage[] = [
  { destId: "tungnath",      monthSlug: "may",  anchor: "Tungnath weather in May",       query: "tungnath weather in may",       position: 8.5,  impressions: 320 },
  { destId: "nainital",      monthSlug: "may",  anchor: "Nainital temperature in May",   query: "temperature in nainital in may", position: 8.9,  impressions: 268 },
  { destId: "alibaug",       monthSlug: "may",  anchor: "Alibaug temperature in May",    query: "alibaug temperature in may",    position: 11.2, impressions: 226 },
  { destId: "chakrata",      monthSlug: "may",  anchor: "Chakrata weather in May",       query: "chakrata weather in may",       position: 5.9,  impressions: 171 },
  { destId: "alleppey",      monthSlug: "may",  anchor: "Alleppey weather in May",       query: "alleppey weather in may",       position: 10.5, impressions: 152 },
  { destId: "dhanaulti",     monthSlug: "may",  anchor: "Dhanaulti weather in May",      query: "dhanaulti weather in may",      position: 7.7,  impressions: 144 },
  { destId: "araku-valley",  monthSlug: "may",  anchor: "Araku Valley weather in May",   query: "araku valley weather in may",   position: 8.5,  impressions: 126 },
  { destId: "puducherry",    monthSlug: "may",  anchor: "Pondicherry weather in May",    query: "weather in pondicherry in may", position: 11.8, impressions: 121 },
  { destId: "kasol",         monthSlug: "may",  anchor: "Kasol temperature in May",      query: "kasol temperature in may",      position: 8.3,  impressions: 108 },
  { destId: "kanatal",       monthSlug: "may",  anchor: "Kanatal in May",                query: "kanatal in may",                position: 6.1,  impressions: 91  },
  { destId: "mangalore",     monthSlug: "may",  anchor: "Mangalore weather in May",      query: "mangalore weather in may",      position: 8.3,  impressions: 77  },
  { destId: "idukki",        monthSlug: "may",  anchor: "Idukki weather in May",         query: "idukki weather in may",         position: 10.8, impressions: 76  },
  { destId: "lambasingi",    monthSlug: "may",  anchor: "Lambasingi in May",             query: "lambasingi in may",             position: 10.6, impressions: 73  },
  { destId: "darjeeling",    monthSlug: "may",  anchor: "Darjeeling temperature in May", query: "temperature in darjeeling in may", position: 8.6, impressions: 65 },
  { destId: "aizawl",        monthSlug: "may",  anchor: "Aizawl weather in May",         query: "aizawl weather in may",         position: 10.8, impressions: 64  },
  { destId: "anini",         monthSlug: "may",  anchor: "Anini weather in May",          query: "anini weather in may",          position: 6.4,  impressions: 54  },
  // June cohort — enters the rail when /trending current-month flips to june.
  { destId: "vrindavan",     monthSlug: "june", anchor: "Vrindavan temperature in June", query: "vrindavan temperature in june", position: 11.2, impressions: 96  },
  { destId: "ranikhet",      monthSlug: "june", anchor: "Ranikhet weather in June",      query: "ranikhet weather in june",      position: 7.7,  impressions: 83  },
  { destId: "munnar",        monthSlug: "june", anchor: "Munnar weather in June",        query: "weather in munnar in june",     position: 6.3,  impressions: 77  },
  // August cohort — early-surfacing demand (added 2026-06-16; August queries
  // opened ~6 weeks ahead this year). Auto-enters the /explore + /where-to-go
  // rail on Aug 1, and renders NOW on /where-to-go/august via the month-hub
  // mount. Source: scripts/_gsc-august-demand-2026-06-16.mjs (28d GSC,
  // 2026-05-17..06-14). All slugs verified live against destinations +
  // destination_months(month=8). August verdicts skew skip/wait (it's
  // monsoon) — the anchor still mirrors the query verbatim and the page
  // honestly answers the search.
  { destId: "darjeeling",    monthSlug: "august", anchor: "Darjeeling weather in August", query: "darjeeling weather in august", position: 9.5,  impressions: 307 },
  { destId: "hampi",         monthSlug: "august", anchor: "Hampi in August",              query: "hampi in august",              position: 9.6,  impressions: 227 },
  { destId: "kolkata",       monthSlug: "august", anchor: "Kolkata weather in August",    query: "weather in kolkata in august", position: 7.0,  impressions: 95  },
  { destId: "tirupati",      monthSlug: "august", anchor: "Tirupati in August",           query: "tirupati in august",           position: 9.7,  impressions: 85  },
  { destId: "vrindavan",     monthSlug: "august", anchor: "Vrindavan in August",          query: "vrindavan in august",          position: 7.5,  impressions: 71  },
  { destId: "chikmagalur",   monthSlug: "august", anchor: "Chikmagalur in August",        query: "chikmagalur in august",        position: 9.3,  impressions: 59  },
  { destId: "nashik",        monthSlug: "august", anchor: "Nashik weather in August",     query: "nashik weather in august",     position: 11.7, impressions: 52  },
  { destId: "kochi",         monthSlug: "august", anchor: "Kochi in August",              query: "kochi in august",              position: 11.0, impressions: 41  },
  { destId: "gulmarg",       monthSlug: "august", anchor: "Gulmarg in August",            query: "gulmarg in august",            position: 7.1,  impressions: 24  },
  { destId: "landour",       monthSlug: "august", anchor: "Landour in August",            query: "landour in august",            position: 7.1,  impressions: 21  },
];

/** Filter to the current-month cohort. Used by the rail component. */
export function pagesForMonth(monthSlug: HighImpressionPage["monthSlug"]): HighImpressionPage[] {
  return HIGH_IMPRESSION_PAGES.filter((p) => p.monthSlug === monthSlug);
}
