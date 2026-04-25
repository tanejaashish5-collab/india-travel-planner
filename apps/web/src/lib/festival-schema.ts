// Sprint 19 / R4 §12 checklist — Event schema on festival routes.
// Festival dates often follow lunar calendars and shift year-to-year, so
// we only emit precise dates when the source row carries them. When `dates`
// is a free-text label like "Aug full moon" we fall back to YYYY-MM
// granularity (schema.org permits month-only Event.startDate).

export type FestivalRow = {
  id: string | number;
  name: string;
  description?: string | null;
  dates?: string | null;
  month: number;
  destinations?: {
    name?: string | null;
    state?: { name?: string | null } | { name?: string | null }[] | null;
  } | null;
};

const MONTHS_LONG = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function lastDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function tryExtractIsoRange(
  text: string,
  year: number,
  month: number,
): { startDate: string; endDate?: string } | null {
  // Best-effort parse of patterns like "Mar 8-15" or "8-15 March".
  const dayRange = text.match(/\b(\d{1,2})\s*[-–]\s*(\d{1,2})\b/);
  if (dayRange) {
    const d1 = Number(dayRange[1]);
    const d2 = Number(dayRange[2]);
    if (d1 >= 1 && d1 <= 31 && d2 >= d1 && d2 <= 31) {
      return {
        startDate: `${year}-${pad2(month)}-${pad2(d1)}`,
        endDate: `${year}-${pad2(month)}-${pad2(d2)}`,
      };
    }
  }
  const single = text.match(/\b(\d{1,2})\b/);
  if (single) {
    const d = Number(single[1]);
    if (d >= 1 && d <= 31) {
      return { startDate: `${year}-${pad2(month)}-${pad2(d)}` };
    }
  }
  return null;
}

export function festivalsItemListJsonLd(
  festivals: FestivalRow[],
  monthNum: number | null,
  pageUrl: string,
  fallbackStateName?: string,
  yearOverride?: number,
) {
  const year = yearOverride ?? new Date().getFullYear();
  const items = festivals.map((f, i) => {
    const stateName = (() => {
      const st = f.destinations?.state;
      if (Array.isArray(st)) return st[0]?.name ?? fallbackStateName ?? "India";
      return st?.name ?? fallbackStateName ?? "India";
    })();

    const rowMonth = monthNum ?? f.month;
    const dateRange = f.dates ? tryExtractIsoRange(f.dates, year, rowMonth) : null;
    const monthOnly = `${year}-${pad2(rowMonth)}`;
    const endMonth = `${year}-${pad2(rowMonth)}-${pad2(lastDayOfMonth(year, rowMonth))}`;

    const event: Record<string, unknown> = {
      "@type": "Event",
      name: f.name,
      startDate: dateRange?.startDate ?? monthOnly,
      endDate: dateRange?.endDate ?? endMonth,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: f.destinations?.name ?? `${stateName}, India`,
        address: {
          "@type": "PostalAddress",
          addressRegion: stateName,
          addressCountry: "IN",
        },
      },
      ...(f.description && { description: f.description }),
      ...(f.dates && { disambiguatingDescription: `Date label: ${f.dates}` }),
    };

    return {
      "@type": "ListItem",
      position: i + 1,
      item: event,
    };
  });

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#festival-list`,
    name: monthNum ? `Festivals in ${MONTHS_LONG[monthNum] ?? "India"}` : "Festivals in India",
    isPartOf: { "@id": "https://www.nakshiq.com#website" },
    itemListElement: items,
  };
}
