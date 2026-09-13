import Link from "next/link";
import { ROAD_REGIONS, STATUS_LABEL, fmtDate, type RoadUpdate } from "@/lib/road-updates";

const STATUS_COLOR: Record<string, string> = {
  open: "#4ade80",
  slow: "#facc15",
  risky: "#fb923c",
  restricted: "#fb923c",
  blocked: "#f87171",
  closed: "#f87171",
};

/**
 * Dated road-status log, grouped by day. Server component: the feed is the
 * citable artefact, so it renders as plain HTML with the date, the corridor,
 * the status and the source on every row — nothing hidden behind a click.
 */
export function RoadUpdatesFeed({
  updates,
  locale,
  showRegion = true,
}: {
  updates: RoadUpdate[];
  locale: string;
  showRegion?: boolean;
}) {
  const hi = locale === "hi";
  if (!updates.length) {
    return (
      <p style={{ fontFamily: "var(--cinema-ui)", fontSize: 14, color: "var(--bone-dim)", border: "1px solid var(--hair)", padding: 20 }}>
        {hi
          ? "इस अवधि में कोई दर्ज अपडेट नहीं। कोई प्रविष्टि न होना = कोई सत्यापित बदलाव नहीं मिला, न कि सड़क ठीक है।"
          : "No logged updates in this window. No entry means no verified change was found, not that the road is fine."}
      </p>
    );
  }
  const byDay = new Map<string, RoadUpdate[]>();
  for (const u of updates) {
    const arr = byDay.get(u.update_date) ?? [];
    arr.push(u);
    byDay.set(u.update_date, arr);
  }
  const regionName = (id: string) => ROAD_REGIONS.find((r) => r.id === id)?.[hi ? "hi" : "en"] ?? id;

  return (
    <div>
      {[...byDay.entries()].map(([day, rows]) => (
        <section key={day} id={`d-${day}`} style={{ borderTop: "1px solid var(--hair)", padding: "20px 0 8px" }}>
          <h3
            className="nq-kicker"
            style={{ color: "var(--vermillion)", margin: "0 0 12px", letterSpacing: "0.2em", fontSize: 11 }}
          >
            <time dateTime={day}>{fmtDate(day, locale)}</time>
          </h3>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {rows.map((u) => (
              <li
                key={u.id}
                style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, padding: "10px 0 14px", alignItems: "start" }}
              >
                <span
                  aria-label={STATUS_LABEL[u.status][hi ? "hi" : "en"]}
                  style={{
                    marginTop: 5,
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    background: STATUS_COLOR[u.status] ?? "#a1a1aa",
                    boxShadow: `0 0 0 3px ${STATUS_COLOR[u.status] ?? "#a1a1aa"}22`,
                  }}
                />
                <div>
                  <p style={{ fontFamily: "var(--cinema-ui)", fontSize: 15, lineHeight: 1.45, color: "var(--bone)", margin: 0 }}>
                    <strong style={{ fontWeight: 600 }}>{u.segment}</strong>
                    <span style={{ color: STATUS_COLOR[u.status], marginLeft: 8, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--cinema-mono)" }}>
                      {STATUS_LABEL[u.status][hi ? "hi" : "en"]}
                    </span>
                  </p>
                  <p style={{ fontFamily: "var(--cinema-ui)", fontSize: 14, lineHeight: 1.55, color: "var(--bone-dim)", margin: "4px 0 6px" }}>
                    {u.headline}
                    {u.body ? <span style={{ display: "block", marginTop: 4 }}>{u.body}</span> : null}
                  </p>
                  <p style={{ fontFamily: "var(--cinema-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--bone-faint)", margin: 0 }}>
                    {showRegion && (
                      <>
                        <Link href={`/${locale}/road-conditions/${u.region_id}`} style={{ color: "inherit" }}>
                          {regionName(u.region_id)}
                        </Link>
                        {" · "}
                      </>
                    )}
                    <a href={u.source_url} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: 3 }}>
                      {hi ? "स्रोत" : "source"}: {u.source_label}
                      {u.source_published_at ? ` (${u.source_published_at})` : ""}
                    </a>
                    {" · "}
                    {hi ? "सत्यापित" : "verified"} {new Date(u.verified_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: "Asia/Kolkata" })}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

/** "Cite this" block: the sentence a writer can paste, plus the CSV/RSS links. */
export function CiteBlock({ locale, latest, total, closures, region }: { locale: string; latest: string | null; total: number; closures: number; region?: { id: string; en: string } }) {
  const hi = locale === "hi";
  const path = region ? `/road-conditions/${region.id}` : "/road-conditions";
  const asOf = latest ? fmtDate(latest, "en") : "—";
  const name = region ? `${region.en} road conditions` : "India road conditions tracker";
  return (
    <aside
      aria-label={hi ? "इस डेटा का हवाला दें" : "Cite this data"}
      style={{ border: "1px solid var(--hair)", padding: "18px 20px", marginTop: 32, fontFamily: "var(--cinema-ui)", fontSize: 13, lineHeight: 1.6, color: "var(--bone-dim)" }}
    >
      <p className="nq-kicker" style={{ color: "var(--vermillion)", margin: "0 0 8px", letterSpacing: "0.2em", fontSize: 10 }}>
        {hi ? "हवाला दें" : "CITE THIS"}
      </p>
      <p style={{ margin: 0, color: "var(--bone)" }}>
        NakshIQ, <em>{name}</em>, as of {asOf}: {total} dated entries in the last 30 days, {closures} closures or blockages. https://www.nakshiq.com/en{path}
      </p>
      <p style={{ margin: "10px 0 0" }}>
        <a href={`/api/road-updates?format=csv${region ? `&region=${region.id}` : ""}`} style={{ color: "var(--bone)", textDecoration: "underline", textUnderlineOffset: 3 }}>CSV</a>
        {" · "}
        <a href={`/api/road-updates${region ? `?region=${region.id}` : ""}`} style={{ color: "var(--bone)", textDecoration: "underline", textUnderlineOffset: 3 }}>JSON</a>
        {" · "}
        <a href={`/road-conditions/feed.xml${region ? `?region=${region.id}` : ""}`} style={{ color: "var(--bone)", textDecoration: "underline", textUnderlineOffset: 3 }}>RSS</a>
        {" · "}
        {hi ? "हर प्रविष्टि का स्रोत और तारीख दर्ज है; बिना स्रोत कुछ नहीं छपता।" : "Every entry carries its source and the source's own date. Nothing unsourced is published."}
      </p>
    </aside>
  );
}
