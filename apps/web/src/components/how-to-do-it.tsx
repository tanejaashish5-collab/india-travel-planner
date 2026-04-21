import Link from "next/link";

type MonthRow = { month: number; score: number };

type Props = {
  locale: string;
  destinationId: string;
  destinationName: string;
  months: MonthRow[];
  reach?: { road_condition?: string | null; from_nearest_city?: string | null } | null;
  emergency?: { ambulance?: string | null; nearest_hospital?: string | null } | null;
  sleep?: { price_range_inr?: string | null; options_count?: number | null } | null;
  stateId?: string | null;
  currentMonth?: number;
};

const MONTH_SHORT = ["","J","F","M","A","M","J","J","A","S","O","N","D"];
const MONTH_FULL = ["","January","February","March","April","May","June","July","August","September","October","November","December"];

const PERMIT_STATES = new Set([
  "ladakh","sikkim","arunachal-pradesh","nagaland","mizoram","manipur",
]);

function scoreColor(s: number): string {
  if (s >= 4) return "bg-emerald-500/80 border-emerald-400/60 text-emerald-50";
  if (s === 3) return "bg-amber-500/70 border-amber-400/60 text-amber-50";
  if (s >= 1) return "bg-[#E55642]/70 border-[#E55642]/60 text-[#fff0ec]";
  return "bg-muted border-border text-muted-foreground";
}

export default function HowToDoIt({
  locale,
  destinationId,
  destinationName,
  months,
  reach,
  emergency,
  sleep,
  stateId,
  currentMonth,
}: Props) {
  const accessLine = reach?.road_condition ?? reach?.from_nearest_city ?? null;
  const emergencyLine = emergency?.ambulance && emergency?.nearest_hospital
    ? `${emergency.ambulance} · ${emergency.nearest_hospital}`
    : emergency?.ambulance ?? emergency?.nearest_hospital ?? null;
  const sleepLine = sleep?.price_range_inr
    ? `₹${sleep.price_range_inr}/night${sleep.options_count ? ` · ${sleep.options_count} options` : ""}`
    : null;
  const permitRequired = stateId ? PERMIT_STATES.has(stateId) : false;

  const fieldCount = [accessLine, emergencyLine, sleepLine].filter(Boolean).length + (months?.length ? 1 : 0);
  if (fieldCount < 2) return null;

  const cmIndex = currentMonth ?? new Date().getMonth() + 1;

  return (
    <div className="mt-10 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 sm:p-7">
      <div className="flex items-baseline justify-between gap-4 mb-5">
        <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
          How to do it · {destinationName}
        </div>
        <Link
          href={`/${locale}/destination/${destinationId}`}
          className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#E55642] hover:underline"
        >
          Full guide →
        </Link>
      </div>

      {months?.length > 0 && (
        <div className="mb-5">
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground/80 mb-2">
            12-month score
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            {Array.from({ length: 12 }, (_, i) => {
              const m = i + 1;
              const row = months.find((r) => r.month === m);
              const score = row?.score ?? 0;
              const isCurrent = m === cmIndex;
              return (
                <Link
                  key={m}
                  href={`/${locale}/destination/${destinationId}/${MONTH_FULL[m].toLowerCase()}`}
                  className={`group flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-md border text-[10px] font-bold transition-transform hover:scale-110 ${scoreColor(score)} ${isCurrent ? "ring-2 ring-foreground/60 ring-offset-1 ring-offset-background" : ""}`}
                  title={`${MONTH_FULL[m]} — ${score}/5`}
                >
                  {MONTH_SHORT[m]}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
        {accessLine && (
          <div className="sm:col-span-2">
            <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground/80">Access</dt>
            <dd className="mt-0.5 text-foreground">{accessLine}</dd>
          </div>
        )}
        {emergencyLine && (
          <div className="sm:col-span-2">
            <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground/80">Emergency</dt>
            <dd className="mt-0.5 text-foreground">{emergencyLine}</dd>
          </div>
        )}
        {sleepLine && (
          <div>
            <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground/80">Stay</dt>
            <dd className="mt-0.5 text-foreground">{sleepLine}</dd>
          </div>
        )}
        {permitRequired && (
          <div>
            <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#E55642]">Permit required</dt>
            <dd className="mt-0.5">
              <Link href={`/${locale}/guide/permits`} className="text-[#E55642] hover:underline">
                See the process →
              </Link>
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
