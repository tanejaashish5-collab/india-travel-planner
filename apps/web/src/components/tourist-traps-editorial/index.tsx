"use client";
// Tourist Traps editorial — long-scroll magazine page.
// Composition ported from nakshiq-design-system/project/tourist-traps/page.jsx
// (drops the React-CDN/Babel scaffolding, adds TS, drops the theme toggle —
// this site is dark-only).

import * as React from "react";
import Link from "next/link";
import { Struck, StampBox } from "./ink";
import "./tourist-traps-editorial.css";

export interface TrapEntry {
  /** Display number, "01" .. "10". */
  n: string;
  /** Trap destination slug (used for #anchor + detail-page link). */
  slug: string;
  /** Trap destination name (e.g. "Pangong Tso"). */
  skip: string;
  /** State or region label. */
  region: string;
  /** Italic strike-through marketing tagline. */
  brochureLine: string | null;
  /** 1-3 sharp editorial sentences. Falls back to the alternative comparison. */
  verdict: string | null;
  /** Optional override blockquote for the pullquote format. */
  pullquote: string | null;
  /** Layout variant. */
  format: "standard" | "pullquote" | "ledger";
  /** Ledger rows for editorial_format=ledger. */
  ledger: Array<{ brochure: string; real: string }>;
  /** Optional 1-2 short tags. */
  tags: string[];
  /** "Go here instead" alternative. */
  instead: {
    slug: string;
    name: string;
    why: string;
  };
}

interface Props {
  entries: TrapEntry[];
  locale: string;
  issueLabel: string;
  editedDateLabel: string;
}

// ─── Masthead ────────────────────────────────────────────────────────────
function Masthead({ entryCount, issueLabel, editedDateLabel }: { entryCount: number; issueLabel: string; editedDateLabel: string }) {
  return (
    <header className="tt-masthead">
      <div className="tt-masthead-meta">
        <span>Vol. 04 — {issueLabel}</span>
        <span>An honest editorial · Updated {editedDateLabel}</span>
        <span>{entryCount} entries</span>
      </div>
      <h1 className="tt-masthead-title">
        Tourist <em>Traps</em>
      </h1>
      <p className="tt-masthead-deck">
        The places India&apos;s tourism boards still photograph for the brochure, and the places you should actually go instead. We don&apos;t take payment from anyone we write about.
      </p>
      <div className="tt-masthead-byline">
        <div>
          By <strong>The NakshIQ Editors</strong>
        </div>
        <div>
          Edited <strong>{editedDateLabel}</strong>
        </div>
        <div>
          Reading time <strong>14 min</strong>
        </div>
      </div>
    </header>
  );
}

// ─── Manifesto ───────────────────────────────────────────────────────────
function Manifesto() {
  return (
    <section className="tt-manifesto">
      <div className="tt-manifesto-label">Editor&apos;s Note</div>
      <div className="tt-manifesto-body">
        <p>
          A travel guide that tells you to skip something is rarer than it should be. The economics of travel writing reward enthusiasm: the more places you say are <em>magical</em>, the more pages you sell, the more boards invite you back.
        </p>
        <p>
          We write the opposite list. The places that no longer deserve their reputation, the seasons that ruin them, and the alternative within forty kilometres that nobody bothered to tell you about.
        </p>
        <p>
          Mark up the page. Argue with us. <a href="#submit">Send us a trap we missed →</a>
        </p>
      </div>
    </section>
  );
}

// ─── Index / TOC ─────────────────────────────────────────────────────────
function TOCIndex({ entries }: { entries: TrapEntry[] }) {
  return (
    <section className="tt-index">
      <div className="tt-index-label">In this issue</div>
      <div className="tt-index-list">
        {entries.map((e) => (
          <a key={e.n} href={`#trap-${e.n}`} className="tt-index-row">
            <span className="tt-index-num">{e.n}</span>
            <span className="tt-index-name">{e.skip}</span>
            <span className="tt-index-region">{e.region}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

// ─── Entry chrome (number / region) ─────────────────────────────────────
function EntryChrome({ e }: { e: TrapEntry }) {
  return (
    <>
      <div className="tt-entry-num">№ {e.n}</div>
      <div className="tt-entry-region">{e.region}</div>
    </>
  );
}

// ─── Instead-card (shared by all formats) ───────────────────────────────
function InsteadCard({
  e,
  seedBase,
  tilt,
  maxWhyWidth,
  locale,
  showLink = true,
}: {
  e: TrapEntry;
  seedBase: number;
  tilt: number;
  maxWhyWidth?: number;
  locale: string;
  showLink?: boolean;
}) {
  return (
    <StampBox seed={seedBase + 5} tilt={tilt} padding="22px 22px 24px">
      <span className="tt-instead-eyebrow">→ Go here instead</span>
      <h3 className="tt-instead-name">{e.instead.name}</h3>
      <p className="tt-instead-why" style={maxWhyWidth ? { maxWidth: maxWhyWidth } : undefined}>
        {e.instead.why}
      </p>
      {showLink && (
        <Link href={`/${locale}/destination/${e.instead.slug}`} className="tt-instead-link">
          View {e.instead.name} →
        </Link>
      )}
    </StampBox>
  );
}

// ─── Entry — Standard format ────────────────────────────────────────────
function EntryStandard({ e, seedBase, locale }: { e: TrapEntry; seedBase: number; locale: string }) {
  return (
    <article className="tt-entry" id={`trap-${e.n}`}>
      <EntryChrome e={e} />
      <div className="tt-std-grid">
        <div>
          <h2 className="tt-skip-name">{e.skip}</h2>
          {e.brochureLine && (
            <p className="tt-brochure-line">
              <Struck seed={seedBase + 1}>{e.brochureLine}</Struck>
            </p>
          )}
          {e.verdict && <p className="tt-verdict">{e.verdict}</p>}
          <Link href={`/${locale}/skip-list/${e.slug}`} className="tt-detail-link">
            Read the full case →
          </Link>
        </div>
        <aside style={{ position: "relative", paddingTop: 24 }}>
          <InsteadCard e={e} seedBase={seedBase} tilt={(seedBase % 5) - 2} locale={locale} />
        </aside>
      </div>
    </article>
  );
}

// ─── Entry — Pullquote format ───────────────────────────────────────────
function EntryPullquote({ e, seedBase, locale }: { e: TrapEntry; seedBase: number; locale: string }) {
  return (
    <article className="tt-entry" id={`trap-${e.n}`}>
      <EntryChrome e={e} />
      <div className="tt-pq">
        <h2 className="tt-pq-name">{e.skip}</h2>
        {e.brochureLine && (
          <p className="tt-pq-brochure">
            <Struck seed={seedBase + 1}>{e.brochureLine}</Struck>
          </p>
        )}
        <blockquote className="tt-pq-quote">{e.pullquote ?? e.verdict ?? ""}</blockquote>
        <div className="tt-pq-instead">
          <InsteadCard e={e} seedBase={seedBase} tilt={-1.5} maxWhyWidth={320} locale={locale} />
        </div>
        <div style={{ marginTop: 28 }}>
          <Link href={`/${locale}/skip-list/${e.slug}`} className="tt-detail-link">
            Read the full case →
          </Link>
        </div>
      </div>
    </article>
  );
}

// ─── Entry — Ledger format ──────────────────────────────────────────────
function EntryLedger({ e, seedBase, locale }: { e: TrapEntry; seedBase: number; locale: string }) {
  return (
    <article className="tt-entry" id={`trap-${e.n}`}>
      <EntryChrome e={e} />
      <div className="tt-ledger">
        <h2 className="tt-ledger-name">{e.skip}</h2>
        {e.brochureLine && (
          <p className="tt-ledger-brochure">
            <Struck seed={seedBase + 1}>{e.brochureLine}</Struck>
          </p>
        )}
        <div className="tt-ledger-table">
          <div className="tt-ledger-header">
            <div>What the brochure says</div>
            <div></div>
            <div>What you actually get</div>
          </div>
          {e.ledger.map((row, i) => (
            <div className="tt-ledger-row" key={i}>
              <div className="tt-ledger-brochure-cell">
                <Struck seed={seedBase + 10 + i}>{row.brochure}</Struck>
              </div>
              <div className="tt-ledger-arrow">→</div>
              <div className="tt-ledger-real">{row.real}</div>
            </div>
          ))}
        </div>
        <div className="tt-ledger-instead">
          <InsteadCard e={e} seedBase={seedBase} tilt={2} maxWhyWidth={360} locale={locale} />
        </div>
        <div style={{ marginTop: 24 }}>
          <Link href={`/${locale}/skip-list/${e.slug}`} className="tt-detail-link">
            Read the full case →
          </Link>
        </div>
      </div>
    </article>
  );
}

// ─── Editorial colophon footer (in-page, separate from site Footer) ────
function TTColophon({ entryCount, editedDateLabel }: { entryCount: number; editedDateLabel: string }) {
  return (
    <footer className="tt-footer" id="submit">
      <div>
        <div className="tt-footer-cta-label">→ Suggest a trap</div>
        <h2 className="tt-footer-cta-title">Know a place that no longer earns its reputation?</h2>
        <p className="tt-footer-cta-body">
          We read every submission. The strongest cases — with a clear alternative — get added to the next issue, with credit if you want it.
        </p>
        <a href="mailto:editors@nakshiq.com?subject=Tourist%20Trap%20Submission" className="tt-footer-btn">
          Submit a trap →
        </a>
      </div>
      <div className="tt-footer-meta">
        <div>
          <strong>Edited by</strong> The NakshIQ Editors
        </div>
        <div>
          <strong>This issue</strong> {editedDateLabel}
        </div>
        <div>
          <strong>Entries</strong> {entryCount}
        </div>
        <div>
          <strong>Disclosures</strong> none
        </div>
      </div>
    </footer>
  );
}

// ─── Main export ────────────────────────────────────────────────────────
export function TouristTrapsEditorial({ entries, locale, issueLabel, editedDateLabel }: Props) {
  const formats = {
    standard: EntryStandard,
    pullquote: EntryPullquote,
    ledger: EntryLedger,
  } as const;
  return (
    <div className="nakshiq-tt">
      <Masthead entryCount={entries.length} issueLabel={issueLabel} editedDateLabel={editedDateLabel} />
      <Manifesto />
      <TOCIndex entries={entries} />
      <main>
        {entries.map((e, i) => {
          const Comp = formats[e.format] ?? EntryStandard;
          return <Comp key={e.n} e={e} seedBase={(i + 1) * 13} locale={locale} />;
        })}
      </main>
      <TTColophon entryCount={entries.length} editedDateLabel={editedDateLabel} />
    </div>
  );
}
