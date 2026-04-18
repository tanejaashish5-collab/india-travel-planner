import Link from "next/link";
import { BookingHandoff } from "@/components/booking-handoff";

export type EditorSlot = "experience" | "value" | "location" | "xfactor";

export interface EditorSource {
  url: string;
  title: string;
  source_type?: string;
}

export interface EditorStayPick {
  slot: EditorSlot;
  name: string;
  property_type: string | null;
  price_band: string | null;
  why_nakshiq: string;
  signature_experience?: string | null;
  warn?: string | null;
  contact_only?: boolean;
  contact_info?: string | null;
  sources?: EditorSource[];
  published?: boolean;
}

export interface StayIntelligence {
  upgrade_reasoning?: string | null;
  destination_note?: string | null;
  as_of_date?: string | null;
}

interface Props {
  destinationName: string;
  stateName?: string;
  picks: EditorStayPick[];
  intelligence?: StayIntelligence | null;
}

const SLOT_LABEL: Record<EditorSlot, string> = {
  experience: "Experience",
  value: "Value",
  location: "Location",
  xfactor: "X-Factor",
};

const SLOT_SUB: Record<EditorSlot, string> = {
  experience: "the signature one",
  value: "best experience per rupee",
  location: "the location wins",
  xfactor: "memorable and specific",
};

const SLOT_COLOR: Record<EditorSlot, string> = {
  experience: "bg-amber-500/15 text-amber-400 border-amber-500/40",
  value: "bg-emerald-500/15 text-emerald-400 border-emerald-500/40",
  location: "bg-sky-500/15 text-sky-400 border-sky-500/40",
  xfactor: "bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/40",
};

const SLOT_ORDER: EditorSlot[] = ["experience", "value", "location", "xfactor"];

function titleCasePropertyType(raw: string | null | undefined): string | null {
  if (!raw) return null;
  return raw.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function sourceBadge(src: EditorSource, index: number) {
  let host = "";
  try {
    host = new URL(src.url).hostname.replace(/^www\./, "");
  } catch {
    host = `src-${index + 1}`;
  }
  return (
    <a
      key={`${src.url}-${index}`}
      href={src.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded-full border border-border/40 bg-background px-2 py-0.5 text-[10px] text-muted-foreground hover:text-foreground hover:border-border transition-colors"
      title={src.title}
    >
      <span className="w-1 h-1 rounded-full bg-emerald-500/60" />
      {host}
    </a>
  );
}

function PickCard({ pick }: { pick: EditorStayPick }) {
  const sources = (pick.sources ?? []).filter((s) => s && typeof s.url === "string" && s.url.length > 0);
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <span className={`inline-block text-[10px] uppercase tracking-[0.18em] font-semibold px-2 py-1 rounded border ${SLOT_COLOR[pick.slot]}`}>
          {SLOT_LABEL[pick.slot]}
        </span>
        {pick.price_band && (
          <span className="text-xs text-muted-foreground font-mono">{pick.price_band}</span>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold leading-tight text-foreground">{pick.name}</h3>
        {titleCasePropertyType(pick.property_type) && (
          <div className="text-xs text-muted-foreground mt-0.5">{titleCasePropertyType(pick.property_type)}</div>
        )}
      </div>

      <p className="text-sm text-foreground/90 leading-relaxed">{pick.why_nakshiq}</p>

      {pick.signature_experience && (
        <div className="text-xs text-muted-foreground border-l-2 border-border/60 pl-3 italic">
          {pick.signature_experience}
        </div>
      )}

      {pick.warn && (
        <div className="text-xs text-amber-400 flex items-start gap-2">
          <span className="flex-shrink-0">⚠</span>
          <span>{pick.warn}</span>
        </div>
      )}

      {pick.contact_only && pick.contact_info && (
        <div className="text-xs text-foreground/80 rounded-md border border-dashed border-border/50 bg-muted/10 p-2">
          Not listed on booking sites. Contact directly: <span className="font-mono text-foreground">{pick.contact_info}</span>
        </div>
      )}

      {sources.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-1">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70 mr-1 self-center">Sources</span>
          {sources.slice(0, 4).map((s, i) => sourceBadge(s, i))}
        </div>
      )}
    </div>
  );
}

function EmptySlot({ slot, destinationNote }: { slot: EditorSlot; destinationNote?: string | null }) {
  return (
    <div className="rounded-xl border border-dashed border-border/40 bg-muted/5 p-5 flex flex-col gap-2">
      <span className={`inline-block w-fit text-[10px] uppercase tracking-[0.18em] font-semibold px-2 py-1 rounded border ${SLOT_COLOR[slot]} opacity-60`}>
        {SLOT_LABEL[slot]}
      </span>
      <p className="text-sm text-muted-foreground">
        {destinationNote || `No ${SLOT_LABEL[slot].toLowerCase()} pick here that's worth the flag. See alternatives below.`}
      </p>
    </div>
  );
}

export function EditorsPicks({ destinationName, stateName, picks, intelligence }: Props) {
  const published = picks.filter((p) => p.published !== false);
  if (published.length === 0) return null;

  const bySlot = new Map<EditorSlot, EditorStayPick>();
  for (const p of published) bySlot.set(p.slot, p);

  const upgrade = intelligence?.upgrade_reasoning?.trim() || null;
  const note = intelligence?.destination_note?.trim() || null;
  const asOf = intelligence?.as_of_date?.trim() || null;

  return (
    <section className="rounded-2xl border border-border/60 bg-card/40 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-foreground/80">
          Editor&rsquo;s Picks
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-border/60 to-transparent" />
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
          Where to stay
        </span>
      </div>

      <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-1">
        The stay decisions worth flagging in {destinationName}.
      </h2>
      {note && <p className="text-sm text-muted-foreground mb-4">{note}</p>}

      {upgrade && (
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 mb-6">
          <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-primary mb-2">
            The Upgrade Question
          </div>
          <p className="text-sm md:text-base text-foreground leading-relaxed">{upgrade}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SLOT_ORDER.map((slot) => {
          const pick = bySlot.get(slot);
          return pick
            ? <PickCard key={slot} pick={pick} />
            : <EmptySlot key={slot} slot={slot} destinationNote={null} />;
        })}
      </div>

      <div className="mt-6">
        <BookingHandoff destinationName={destinationName} stateName={stateName} />
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground/80">
        {asOf && <span>As of {asOf}</span>}
        <span>Sources linked per pick</span>
        <span>Prices change — verify before booking</span>
      </div>
    </section>
  );
}
