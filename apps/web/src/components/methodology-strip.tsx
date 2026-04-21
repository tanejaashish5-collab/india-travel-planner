import Link from "next/link";

type Props = {
  locale: string;
  sourceCount?: number;
  updatedAt?: string | null;
};

export default function MethodologyStrip({ locale, sourceCount, updatedAt }: Props) {
  const parts: string[] = ["6 dimensions"];
  if (typeof sourceCount === "number" && sourceCount > 0) {
    parts.push(`${sourceCount} ${sourceCount === 1 ? "source" : "sources"}`);
  }
  if (updatedAt) {
    const d = new Date(updatedAt);
    if (!isNaN(d.getTime())) {
      const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      parts.push(`updated ${ym}`);
    }
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-border/40 bg-card/30 px-3 py-2">
      <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
        Method
      </span>
      {parts.map((p, i) => (
        <span
          key={i}
          className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground/80"
        >
          · {p}
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
