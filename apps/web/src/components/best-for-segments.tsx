import { SectionLabel } from "@/components/ui/section-label";

type Segment = { segment: string; reason: string };

export function BestForSegments({ data }: { data: Segment[] | null | undefined }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="section-bestfor" className="scroll-mt-24">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h2 className="text-xl font-semibold">Best For</h2>
        <span className="text-sm text-muted-foreground">Who we'd send here — and why.</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {data.map((s, i) => (
          <div key={i} className="rounded-xl border border-border bg-background/40 p-4">
            <SectionLabel className="mb-1.5">Best for</SectionLabel>
            <div className="text-sm font-semibold text-foreground mb-1.5 capitalize">
              {s.segment}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{s.reason}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
