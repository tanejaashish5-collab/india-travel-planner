import Link from "next/link";

type Props = {
  locale: string;
  sourceCount?: number;
  contentReviewedAt?: string | null;
};

function ageDays(iso: string): number | null {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  return Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
}

function reviewLabel(contentReviewedAt: string | null | undefined): {
  text: string;
  tone: "fresh" | "ok" | "stale" | "pending";
} {
  if (!contentReviewedAt) return { text: "review pending", tone: "pending" };
  const age = ageDays(contentReviewedAt);
  if (age == null) return { text: "review pending", tone: "pending" };
  const d = new Date(contentReviewedAt);
  const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  if (age < 90) return { text: `reviewed ${ym}`, tone: "fresh" };
  if (age < 180) return { text: `reviewed ${ym}`, tone: "ok" };
  return { text: `reviewed ${ym} · stale`, tone: "stale" };
}

const TONE_CLASS: Record<"fresh" | "ok" | "stale" | "pending", string> = {
  fresh: "text-muted-foreground/80",
  ok: "text-muted-foreground/80",
  stale: "text-amber-500/90",
  pending: "text-amber-500/80",
};

export default function MethodologyStrip({ locale, sourceCount, contentReviewedAt }: Props) {
  const parts: { text: string; tone?: "fresh" | "ok" | "stale" | "pending" }[] = [{ text: "6 dimensions" }];
  if (typeof sourceCount === "number" && sourceCount > 0) {
    parts.push({ text: `${sourceCount} ${sourceCount === 1 ? "source" : "sources"}` });
  }
  const review = reviewLabel(contentReviewedAt);
  parts.push({ text: review.text, tone: review.tone });

  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-border/40 bg-card/30 px-3 py-2">
      <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
        Method
      </span>
      {parts.map((p, i) => (
        <span
          key={i}
          className={`font-mono text-[10px] tracking-[0.2em] uppercase ${p.tone ? TONE_CLASS[p.tone] : "text-muted-foreground/80"}`}
        >
          · {p.text}
        </span>
      ))}
      <Link
        href={`/${locale}/methodology`}
        className="ml-auto font-mono text-[10px] tracking-[0.22em] uppercase text-[#E55642] hover:underline"
      >
        how we score →
      </Link>
    </div>
  );
}
