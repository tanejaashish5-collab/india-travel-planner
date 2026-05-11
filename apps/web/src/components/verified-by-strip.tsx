// Verified by strip — institutional anchors per destination.
// Renders compact links to government / institutional references: ASI inscription
// numbers, UNESCO listings, state-tourism portals, district admin pages.
// Reads destinations.institutional_anchors (jsonb, nullable).
//
// Null/empty array → component returns null. Honest-scarcity rule:
// no anchors yet means no strip.

import Link from "next/link";

export type InstitutionalAnchor = {
  kind: "asi" | "unesco" | "state-tourism" | "district-admin" | "press" | "other";
  reference: string;       // e.g. "ASI #N-MP-69" or "UNESCO 1985"
  year?: number;           // e.g. 1985 for the UNESCO listing year
  url: string;             // primary source link
};

const KIND_LABEL: Record<InstitutionalAnchor["kind"], string> = {
  asi: "ASI",
  unesco: "UNESCO",
  "state-tourism": "State tourism",
  "district-admin": "District admin",
  press: "Press",
  other: "Source",
};

const KIND_RING: Record<InstitutionalAnchor["kind"], string> = {
  asi: "border-amber-500/30 text-amber-300/90 hover:bg-amber-500/10",
  unesco: "border-sky-500/40 text-sky-300/90 hover:bg-sky-500/10",
  "state-tourism": "border-emerald-500/30 text-emerald-300/90 hover:bg-emerald-500/10",
  "district-admin": "border-violet-500/30 text-violet-300/90 hover:bg-violet-500/10",
  press: "border-rose-500/30 text-rose-300/90 hover:bg-rose-500/10",
  other: "border-zinc-500/40 text-zinc-300/90 hover:bg-zinc-500/10",
};

export function VerifiedByStrip({ anchors }: { anchors: InstitutionalAnchor[] | null | undefined }) {
  if (!anchors || anchors.length === 0) return null;

  return (
    <section
      aria-label="Verified by"
      className="rounded-2xl border border-border/50 bg-card/30 p-4 my-6"
    >
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground/80">
          Verified by
        </h3>
        <Link
          href="/methodology"
          className="text-[11px] text-muted-foreground/60 hover:text-foreground underline underline-offset-2"
        >
          What this means →
        </Link>
      </div>
      <div className="flex flex-wrap gap-2">
        {anchors.map((a, i) => (
          <a
            key={`${a.kind}-${a.reference}-${i}`}
            href={a.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors ${KIND_RING[a.kind] ?? KIND_RING.other}`}
            title={`${KIND_LABEL[a.kind] ?? KIND_LABEL.other} — ${a.reference}${a.year ? ` (${a.year})` : ""}`}
          >
            <span className="font-medium uppercase tracking-[0.06em] text-[10px] opacity-80">
              {KIND_LABEL[a.kind] ?? KIND_LABEL.other}
            </span>
            <span className="opacity-90">{a.reference}</span>
            {a.year ? <span className="opacity-70 font-mono">·&nbsp;{a.year}</span> : null}
            <span aria-hidden="true" className="opacity-60">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}
