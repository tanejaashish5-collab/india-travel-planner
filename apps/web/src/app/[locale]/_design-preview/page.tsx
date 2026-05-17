/* ============================================================
   /_design-preview — Phase 2 visual QA scaffold.

   Renders every cinematic-* design system primitive in every
   variant on one page so the human reviewer can eyeball token
   compliance + voice + bilingual parity in one scroll.

   The leading underscore in the route segment means Next.js
   STILL ROUTES it (unlike _private folders) — it just signals
   "scaffold, delete before Phase 3 ends". The file is server-
   rendered to keep Lighthouse honest.

   Visit `/en/_design-preview` and `/hi/_design-preview`.

   To delete: rm -rf apps/web/src/app/[locale]/_design-preview
   ============================================================ */

import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import {
  Prose,
  PullQuote,
  Title,
} from "@/components/landing-cinema/editorial";
import { CinematicButton } from "@/components/cinematic-button";
import { CinematicCard } from "@/components/cinematic-card";
import { CinematicLedger } from "@/components/cinematic-ledger";
import { CinematicPagination } from "@/components/cinematic-pagination";

export const metadata: Metadata = {
  title: "Design preview — internal",
  robots: { index: false, follow: false },
};

export default async function DesignPreview({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <Nav />

      <main
        className="nq-grain"
        style={{
          padding: "140px 24px 96px",
        }}
      >
        <header style={{ maxWidth: 1100, margin: "0 auto 80px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 24,
              letterSpacing: "0.22em",
            }}
          >
            INTERNAL · DESIGN PREVIEW · {locale.toUpperCase()}
          </p>
          <Title
            as="h1"
            className="nq-display"
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(40px, 7vw, 88px)",
              lineHeight: 0.98,
              letterSpacing: "-0.025em",
              margin: 0,
            }}
          >
            Seven primitives.
          </Title>
          <p
            className="nq-meta"
            style={{
              color: "var(--bone-dim)",
              marginTop: 28,
              maxWidth: 720,
              fontSize: 15,
              lineHeight: 1.6,
              letterSpacing: "0.04em",
            }}
          >
            Phase 2 design system. Delete this route before Phase 3 ends.
          </p>
        </header>

        {/* ─── CinematicButton ──────────────────────────────────── */}
        <Section title="01 — CinematicButton" id="button">
          <Row label="Primary">
            <CinematicButton variant="primary" size="sm" href="#">Plan with AI</CinematicButton>
            <CinematicButton variant="primary" size="md" href="#">Plan with AI</CinematicButton>
            <CinematicButton variant="primary" size="lg" href="#">Plan with AI</CinematicButton>
          </Row>
          <Row label="Secondary">
            <CinematicButton variant="secondary" size="sm" href="#">View all</CinematicButton>
            <CinematicButton variant="secondary" size="md" href="#">View all</CinematicButton>
            <CinematicButton variant="secondary" size="lg" href="#">View all</CinematicButton>
          </Row>
          <Row label="Ghost">
            <CinematicButton variant="ghost" size="sm" href="#">Read more</CinematicButton>
            <CinematicButton variant="ghost" size="md" href="#" trailing="→">Read more</CinematicButton>
            <CinematicButton variant="ghost" size="lg" href="#">Read more</CinematicButton>
          </Row>
        </Section>

        {/* ─── CinematicCard ────────────────────────────────────── */}
        <Section title="02 — CinematicCard" id="card">
          <p className="nq-meta" style={{ color: "var(--bone-faint)", marginBottom: 24 }}>
            Three variants: text-only, numeric, image. Image variant requires a real asset
            (skipped here to avoid 404s).
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 48,
              marginBottom: 48,
            }}
          >
            <CinematicCard
              variant="text-only"
              href="#"
              kicker="Field notes · May 2026"
              title="Why monsoon is the best time for half of India."
              dek="The cliché that monsoon is low season is wrong for half the country. Here's the case."
              meta="6 min read"
            />
            <CinematicCard
              variant="text-only"
              href="#"
              kicker="Guides"
              title="Visa, plain English."
              dek="What you need, what it costs, what tripped 12 people up."
              meta="Updated weekly"
            />
            <CinematicCard
              variant="text-only"
              href="#"
              kicker="Skip list"
              title="What we'd skip — and do instead."
              dek="Overhyped places with honest alternatives."
              meta="Living list"
            />
          </div>
          <div style={{ maxWidth: 720 }}>
            <CinematicCard variant="numeric" number={1} href="#" title="Spiti Valley in October." dek="Highest score we've ever given a Himalayan destination." meta="98 / 100" />
            <CinematicCard variant="numeric" number={2} href="#" title="Hampi in November." dek="Boulders + bananas + 30°C days, 18°C nights. Unbeatable." meta="96 / 100" />
            <CinematicCard variant="numeric" number={3} href="#" title="Sundarbans in January." dek="Tigers, mangroves, zero crowds, perfect temperatures." meta="95 / 100" />
          </div>
        </Section>

        {/* ─── CinematicPagination ──────────────────────────────── */}
        <Section title="03 — CinematicPagination" id="pagination">
          <div style={{ maxWidth: 720 }}>
            <CinematicPagination current={3} total={24} basePath="#" />
          </div>
          <div style={{ maxWidth: 720, marginTop: 32 }}>
            <CinematicPagination current={1} total={3} basePath="#" />
          </div>
          <div style={{ maxWidth: 720, marginTop: 32 }}>
            <CinematicPagination current={3} total={3} basePath="#" />
          </div>
        </Section>

        {/* ─── CinematicLedger ──────────────────────────────────── */}
        <Section title="04 — CinematicLedger" id="ledger">
          <div style={{ maxWidth: 820 }}>
            <CinematicLedger
              caption="Standard variant"
              rows={[
                { label: "Inner Line Permit", value: "Required for Spiti Valley + Kinnaur" },
                { label: "Protected Area Permit", value: "Required for Nubra + Pangong" },
                { label: "Restricted Area Permit", value: "Required for Andaman tribal reserves" },
                { label: "Validity", value: "Typically 7–14 days, extendable on the ground" },
              ]}
            />

            <CinematicLedger
              caption="Comparison variant"
              variant="comparison"
              columns={["Brochure says", "Reality"]}
              rows={[
                { label: "Crowd", values: ["Serene mountain retreat", "200+ tour buses daily, queue 90 min for the temple"] },
                { label: "Best time", values: ["October to March", "October only — December crowds are worse than July"] },
                { label: "Stay", values: ["Charming heritage homestay", "Three properties, all >₹8000/night, book 60 days out"] },
              ]}
            />
          </div>
        </Section>

        {/* ─── Editorial prose helpers (already in landing-cinema) ── */}
        <Section title="05 — Editorial helpers (existing)" id="editorial">
          <div style={{ maxWidth: 820 }}>
            <Prose>
              <p>
                Body copy uses Geist Sans at 17px with 1.75 line-height, bone-dim
                color. This sample reads naturally at the editorial register —
                FT Weekend, not influencer-blog. Numerals inline:{" "}
                <span className="nq-mono">505 destinations · 5,856 monthly verdicts</span>.
              </p>
              <p>
                Paragraphs space themselves at 18px via the flex gap. No need
                for bottom margins on individual <code>{`<p>`}</code> elements.
              </p>
            </Prose>

            <PullQuote>
              The cliché that monsoon is the low season is wrong for half the country.
            </PullQuote>

            <Prose>
              <p>
                Pull-quote above is Fraunces italic, vermillion left border,
                28px / 1.35 line. Use sparingly — one per ~1500 words.
              </p>
            </Prose>
          </div>
        </Section>

        {/* ─── Template scaffolds (links, not embeds — they include Nav/Footer) ── */}
        <Section title="06 — Page templates" id="templates">
          <p className="nq-meta" style={{ color: "var(--bone-faint)", marginBottom: 16 }}>
            Templates render their own Nav + Footer; can&apos;t embed them here.
            Stub demos coming when Tier 1 redesign ships:
          </p>
          <ul style={{ color: "var(--bone-dim)", fontFamily: "var(--cinema-ui)", fontSize: 14, lineHeight: 1.7, listStyle: "none", padding: 0 }}>
            <li>· <code>{`<CinematicListPage>`}</code> — blog/routes/treks/festivals hub</li>
            <li>· <code>{`<CinematicArticle>`}</code> — blog/[slug], india-travel, nakshiq-100</li>
            <li>· <code>{`<CinematicGuide>`}</code> — guide/[sub]</li>
          </ul>
        </Section>
      </main>

      <Footer />
    </div>
  );
}

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <section
      id={id}
      style={{
        maxWidth: 1200,
        margin: "0 auto 100px",
        paddingTop: 32,
        borderTop: "1px solid var(--hair)",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--cinema-display)",
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: 32,
          letterSpacing: "-0.018em",
          color: "var(--bone)",
          margin: "0 0 40px",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        flexWrap: "wrap",
        marginBottom: 24,
      }}
    >
      <span
        className="nq-mono"
        style={{
          fontFamily: "var(--cinema-mono)",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--bone-faint)",
          minWidth: 100,
        }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}
