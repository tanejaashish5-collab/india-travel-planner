// Village page (/destination/<parent>/<slug>), 2026-10-06. Server component.
// Renders a verified sub_destinations.page payload. Every section is skipped when
// its data is empty: an honest gap beats an invented fill (CLAUDE.md data rules).
import Link from "next/link";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { AuthorByline } from "@/components/author-byline";
import type { Village } from "@/lib/villages";
import type { getPrimaryEditor } from "@/lib/editor";
import { imageUrl } from "@/lib/image-url";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const BASE = "https://www.nakshiq.com";

const kicker: CSSProperties = { color: "var(--vermillion)", marginBottom: 16, letterSpacing: "0.22em" };
const body: CSSProperties = { color: "var(--bone-dim)", fontSize: 16, lineHeight: 1.7, margin: 0 };
const card: CSSProperties = { border: "1px solid var(--hair)", padding: 20 };
const mono: CSSProperties = { fontFamily: "var(--cinema-mono)", fontSize: 11, letterSpacing: "0.14em", color: "var(--bone-faint)", textTransform: "uppercase" };
const h3: CSSProperties = { fontFamily: "var(--cinema-display)", fontStyle: "italic", fontWeight: 500, fontSize: 20, color: "var(--bone)", margin: "0 0 6px", lineHeight: 1.25 };

function Section({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <section id={id} style={{ maxWidth: 1100, margin: "0 auto 56px" }}>
      <h2 className="nq-kicker" style={{ ...kicker, fontSize: 12, fontWeight: 500 }}>{label}</h2>
      {children}
    </section>
  );
}

function Grid({ children }: { children: ReactNode }) {
  return <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>{children}</div>;
}

function SourceLink({ url }: { url?: string | null }) {
  if (!url) return null;
  let host = url;
  try { host = new URL(url).hostname.replace(/^www\./, ""); } catch { /* keep raw */ }
  return (
    <a href={url} target="_blank" rel="nofollow noopener noreferrer" style={{ ...mono, color: "var(--bone-faint)", textDecoration: "underline", textTransform: "none", letterSpacing: "0.04em" }}>
      source: {host}
    </a>
  );
}

type Photo = NonNullable<Village["page"]["photos"]>[number];

function Credit({ ph }: { ph: Photo }) {
  return (
    <p style={{ ...mono, textTransform: "none", letterSpacing: "0.02em", margin: "8px 0 0", lineHeight: 1.5 }}>
      <span style={{ color: "var(--bone-dim)" }}>{ph.caption}</span>
      {" · "}
      <a href={ph.source_url} target="_blank" rel="nofollow noopener noreferrer" style={{ color: "var(--bone-faint)", textDecoration: "underline" }}>
        Photo: {ph.author}, {ph.licence}, via Wikimedia Commons
      </a>
    </p>
  );
}

function monthLabel(ms?: number[]) {
  return (ms ?? []).filter((m) => m >= 1 && m <= 12).map((m) => MONTHS[m - 1]).join(", ");
}

export function villageJsonLd(v: Village, locale: string) {
  const url = `${BASE}/${locale}/destination/${v.parentId}/${v.slug}`;
  const p = v.page;
  const place: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["Place", "TouristDestination"],
    name: v.name,
    url,
    description: p.one_line ?? undefined,
    containedInPlace: { "@type": "Place", name: v.parentName, url: `${BASE}/${locale}/destination/${v.parentId}` },
  };
  const heroLd = (p.photos ?? []).find((ph) => ph.hero);
  if (heroLd) place.image = imageUrl(heroLd.src);
  if (p.coords?.lat != null && p.coords?.lng != null) {
    place.geo = { "@type": "GeoCoordinates", latitude: p.coords.lat, longitude: p.coords.lng, ...(p.elevation_m?.value ? { elevation: p.elevation_m.value } : {}) };
  }
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Destinations", item: `${BASE}/${locale}/explore` },
      { "@type": "ListItem", position: 2, name: v.parentName, item: `${BASE}/${locale}/destination/${v.parentId}` },
      { "@type": "ListItem", position: 3, name: v.name, item: url },
    ],
  };
  const faqs = (p.faqs ?? []).filter((f) => f.q && f.a);
  const faq = faqs.length
    ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }
    : null;
  return [place, crumbs, faq].filter(Boolean);
}

export function VillagePage({ village: v, locale, editor }: { village: Village; locale: string; editor: Awaited<ReturnType<typeof getPrimaryEditor>> }) {
  const p = v.page;
  const parentHref = `/${locale}/destination/${v.parentId}`;
  const elev = p.elevation_m?.value;
  const verified = v.reviewedAt ?? v.publishedAt;
  const verifiedLabel = verified ? new Date(verified).toLocaleDateString("en-IN", { month: "short", year: "numeric" }).toUpperCase() : null;
  const reach = p.how_to_reach ?? [];
  const todo = p.things_to_do ?? [];
  const stays = p.stays ?? [];
  const eats = p.eats ?? [];
  const faqs = (p.faqs ?? []).filter((f) => f.q && f.a);
  const downsides = (p.honest_downsides ?? []).filter(Boolean);
  const sources = p.sources ?? [];
  const photos = p.photos ?? [];
  const hero = photos.find((ph) => ph.hero) ?? null;
  const gallery = photos.filter((ph) => ph !== hero);
  const status = p.status_2025_2026?.detail && !/^none found/i.test(p.status_2025_2026.detail) ? p.status_2025_2026 : null;

  const facts: [string, string][] = [];
  if (elev) facts.push(["Altitude", `${elev.toLocaleString("en-IN")} m`]);
  if (p.time_needed) facts.push(["Time needed", p.time_needed]);
  if (p.best_months?.length) facts.push(["Best months", monthLabel(p.best_months)]);
  const fee = p.permits?.fee_inr;
  const feeLabel = fee == null || fee === "" ? null : /^\s*(rs\.?|₹|inr)/i.test(String(fee)) ? String(fee) : `Rs ${fee}`;
  if (p.permits?.needed != null) facts.push(["Permit", p.permits.needed ? (feeLabel ? `Yes, ${feeLabel}` : "Yes") : "Not needed"]);
  if (p.kids_ok != null) facts.push(["With kids", p.kids_ok ? "OK" : "Not ideal"]);

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      {villageJsonLd(v, locale).map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <Nav />
      <main id="main-content" className="nq-grain" style={{ position: "relative", padding: "140px 24px 64px" }}>
        <header style={{ maxWidth: 1100, margin: "0 auto 48px" }}>
          <nav aria-label="Breadcrumb" style={{ ...mono, marginBottom: 20 }}>
            <Link href={parentHref} style={{ color: "var(--bone-faint)", textDecoration: "none" }}>← {v.parentName}</Link>
          </nav>
          <p className="nq-kicker" style={kicker}>
            VILLAGE · NEAR {v.parentName.toUpperCase()}{elev ? ` · ${elev}M` : ""}{verifiedLabel ? ` · VERIFIED ${verifiedLabel}` : ""}
          </p>
          <h1 className="nq-display" style={{ fontFamily: "var(--cinema-display)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(44px, 8vw, 96px)", lineHeight: 0.98, letterSpacing: "-0.025em", margin: 0 }}>
            {v.name}
          </h1>
          {p.one_line && (
            <p style={{ fontFamily: "var(--cinema-display)", fontStyle: "italic", fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.4, color: "var(--bone-dim)", marginTop: 24, maxWidth: 720 }}>
              {p.one_line}
            </p>
          )}
          {facts.length > 0 && (
            <dl style={{ display: "flex", flexWrap: "wrap", gap: "12px 32px", margin: "32px 0 0" }}>
              {facts.map(([k, val]) => (
                <div key={k}>
                  <dt style={mono}>{k}</dt>
                  <dd style={{ margin: "4px 0 0", color: "var(--bone)", fontSize: 15 }}>{val}</dd>
                </div>
              ))}
            </dl>
          )}
          {editor && (
            <div style={{ marginTop: 28 }}>
              <AuthorByline author={editor} locale={locale} variant="compact" reviewedAt={verified} />
            </div>
          )}
        </header>

        {hero && (
          <figure style={{ maxWidth: 1100, margin: "0 auto 56px" }}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", overflow: "hidden", border: "1px solid var(--hair)" }}>
              <Image src={hero.src} alt={hero.caption} fill priority sizes="(max-width: 1100px) 100vw, 1100px" style={{ objectFit: "cover" }} />
            </div>
            <figcaption><Credit ph={hero} /></figcaption>
          </figure>
        )}

        {status && (
          <Section id="status" label="CURRENT STATUS">
            <div style={{ ...card, borderColor: "var(--vermillion)" }}>
              <p style={body}>{status.detail}</p>
              <div style={{ marginTop: 10 }}><SourceLink url={status.source_url} /></div>
            </div>
          </Section>
        )}

        {p.why_go && (
          <Section id="why" label="WHY GO">
            <p style={{ ...body, fontSize: 18, maxWidth: 760, color: "var(--bone)" }}>{p.why_go}</p>
          </Section>
        )}

        {downsides.length > 0 && (
          <Section id="downsides" label="THE HONEST DOWNSIDES">
            <ul style={{ margin: 0, paddingLeft: 20, maxWidth: 760 }}>
              {downsides.map((d, i) => <li key={i} style={{ ...body, marginBottom: 8 }}>{d}</li>)}
            </ul>
          </Section>
        )}

        {reach.length > 0 && (
          <Section id="reach" label="GETTING THERE">
            <Grid>
              {reach.map((r, i) => (
                <div key={i} style={card}>
                  <h3 style={h3}>From {r.from}</h3>
                  <p style={mono}>{[r.mode, r.km != null ? `${r.km} km` : null, r.time].filter(Boolean).join(" · ")}</p>
                  {r.cost_inr && <p style={{ ...body, marginTop: 8 }}>{r.cost_inr}</p>}
                  <div style={{ marginTop: 10 }}><SourceLink url={r.source_url} /></div>
                </div>
              ))}
            </Grid>
          </Section>
        )}

        {(p.permits?.detail || p.road_and_season_access?.detail) && (
          <Section id="access" label="PERMITS & ACCESS">
            <Grid>
              {p.permits?.detail && (
                <div style={card}>
                  <h3 style={h3}>Permit</h3>
                  <p style={body}>{p.permits.detail}</p>
                  {p.permits.where && <p style={{ ...mono, marginTop: 8 }}>{p.permits.where}</p>}
                  <div style={{ marginTop: 10 }}><SourceLink url={p.permits.source_url} /></div>
                </div>
              )}
              {p.road_and_season_access?.detail && (
                <div style={card}>
                  <h3 style={h3}>Road & season</h3>
                  <p style={body}>{p.road_and_season_access.detail}</p>
                  <div style={{ marginTop: 10 }}><SourceLink url={p.road_and_season_access.source_url} /></div>
                </div>
              )}
            </Grid>
          </Section>
        )}

        {(p.best_months?.length || p.avoid_months?.months?.length) ? (
          <Section id="when" label="WHEN TO GO">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(12, minmax(0, 1fr))", gap: 4, maxWidth: 760 }} aria-label="Months">
              {MONTHS.map((m, i) => {
                const good = p.best_months?.includes(i + 1);
                const bad = p.avoid_months?.months?.includes(i + 1);
                return (
                  <div key={m} title={good ? "Good" : bad ? "Avoid" : "Possible"} style={{ textAlign: "center", padding: "10px 0", fontSize: 11, fontFamily: "var(--cinema-mono)", border: "1px solid var(--hair)", background: good ? "var(--vermillion)" : "transparent", color: good ? "var(--bone)" : bad ? "var(--bone-faint)" : "var(--bone-dim)", textDecoration: bad ? "line-through" : "none" }}>
                    {m.slice(0, 1)}<span className="sr-only">{m.slice(1)}</span>
                  </div>
                );
              })}
            </div>
            <p style={{ ...body, marginTop: 12, maxWidth: 760 }}>
              {p.best_months?.length ? `Best: ${monthLabel(p.best_months)}.` : ""}
              {p.avoid_months?.months?.length ? ` Avoid ${monthLabel(p.avoid_months.months)}${p.avoid_months.why ? `: ${p.avoid_months.why}` : "."}` : ""}
            </p>
          </Section>
        ) : null}

        {todo.length > 0 && (
          <Section id="do" label="WHAT TO DO">
            <Grid>
              {todo.map((t, i) => (
                <div key={i} style={card}>
                  <h3 style={h3}>{t.name}</h3>
                  {t.detail && <p style={body}>{t.detail}</p>}
                  <div style={{ marginTop: 10 }}><SourceLink url={t.source_url} /></div>
                </div>
              ))}
            </Grid>
          </Section>
        )}

        {(stays.length > 0 || eats.length > 0) && (
          <Section id="stay-eat" label="STAY & EAT">
            <Grid>
              {stays.map((s, i) => (
                <div key={`s${i}`} style={card}>
                  <p style={mono}>Stay{s.type ? ` · ${s.type}` : ""}</p>
                  <h3 style={{ ...h3, marginTop: 6 }}>{s.name}</h3>
                  <SourceLink url={s.source_url} />
                </div>
              ))}
              {eats.map((e, i) => (
                <div key={`e${i}`} style={card}>
                  <p style={mono}>Eat</p>
                  <h3 style={{ ...h3, marginTop: 6 }}>{e.name}</h3>
                  {e.known_for && <p style={{ ...body, marginBottom: 8 }}>{e.known_for}</p>}
                  <SourceLink url={e.source_url} />
                </div>
              ))}
            </Grid>
          </Section>
        )}

        {gallery.length > 0 && (
          <Section id="photos" label={hero ? "MORE PHOTOS" : "PHOTOS"}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
              {gallery.map((ph) => (
                <figure key={ph.src} style={{ margin: 0 }}>
                  <div style={{ position: "relative", width: "100%", aspectRatio: "3 / 2", overflow: "hidden", border: "1px solid var(--hair)" }}>
                    <Image src={ph.src} alt={ph.caption} fill sizes="(max-width: 640px) 100vw, 360px" style={{ objectFit: "cover" }} />
                  </div>
                  <figcaption><Credit ph={ph} /></figcaption>
                </figure>
              ))}
            </div>
          </Section>
        )}

        {p.kids_note && (
          <Section id="kids" label="WITH KIDS">
            <p style={{ ...body, maxWidth: 760 }}>{p.kids_note}</p>
          </Section>
        )}

        {faqs.length > 0 && (
          <Section id="faq" label="QUESTIONS PEOPLE ASK">
            <div style={{ maxWidth: 760 }}>
              {faqs.map((f, i) => (
                <details key={i} style={{ borderTop: "1px solid var(--hair)", padding: "14px 0" }}>
                  <summary style={{ cursor: "pointer", color: "var(--bone)", fontSize: 16 }}>{f.q}</summary>
                  <p style={{ ...body, marginTop: 10 }}>{f.a}</p>
                </details>
              ))}
            </div>
          </Section>
        )}

        <Section id="around" label={`MORE AROUND ${v.parentName.toUpperCase()}`}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link href={parentHref} style={{ ...card, padding: "12px 16px", color: "var(--bone)", textDecoration: "none" }}>{v.parentName} guide →</Link>
            {v.siblings.map((s) => (
              <Link key={s.slug} href={`${parentHref}/${s.slug}`} style={{ ...card, padding: "12px 16px", color: "var(--bone)", textDecoration: "none" }}>{s.name} →</Link>
            ))}
          </div>
        </Section>

        {sources.length > 0 && (
          <Section id="sources" label="SOURCES">
            <ol style={{ margin: 0, paddingLeft: 20, maxWidth: 760 }}>
              {sources.map((s, i) => (
                <li key={i} style={{ ...body, fontSize: 13, marginBottom: 4, overflowWrap: "anywhere" }}>
                  <a href={s.url} target="_blank" rel="nofollow noopener noreferrer" style={{ color: "var(--bone-dim)" }}>{s.url}</a>
                  {s.used_for ? <span style={{ color: "var(--bone-faint)" }}> · {s.used_for}</span> : null}
                </li>
              ))}
            </ol>
          </Section>
        )}
      </main>
      <Footer />
    </div>
  );
}
