import Link from "next/link";

type MonthRow = { month: number; verdict?: string | null };

type Props = {
  locale: string;
  budgetTier?: string | null;
  priceRange?: string | null;
  months: MonthRow[];
  reach?: { from_nearest_city?: string | null } | null;
  emergency?: { ambulance?: string | null; helpline?: string | null; nearest_hospital?: string | null } | null;
  stateId?: string | null;
};

const MONTH_SHORT = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const PERMIT_STATES: Record<string, string> = {
  "ladakh": "ILP / PAP",
  "sikkim": "ILP (North Sikkim)",
  "arunachal-pradesh": "ILP / PAP",
  "nagaland": "ILP",
  "mizoram": "ILP",
  "manipur": "PAP for foreigners",
};

function bestMonthWindow(months: MonthRow[]): string | null {
  const goMonths = months.filter((m) => m.verdict === "go").map((m) => m.month).sort((a, b) => a - b);
  if (goMonths.length === 0) return null;
  if (goMonths.length === 12) return "All year";
  const isContiguous = goMonths.every((m, i) => i === 0 || m === goMonths[i - 1] + 1);
  if (isContiguous) return `${MONTH_SHORT[goMonths[0]]} – ${MONTH_SHORT[goMonths[goMonths.length - 1]]}`;
  const wrapCheck = goMonths[0] === 1 && goMonths[goMonths.length - 1] === 12;
  if (wrapCheck) {
    const breakIdx = goMonths.findIndex((m, i) => i > 0 && m !== goMonths[i - 1] + 1);
    if (breakIdx > 0) {
      const start = goMonths[breakIdx];
      const end = goMonths[breakIdx - 1];
      return `${MONTH_SHORT[start]} – ${MONTH_SHORT[end]}`;
    }
  }
  return goMonths.map((m) => MONTH_SHORT[m]).join(", ");
}

function formatPrice(tier?: string | null, range?: string | null): string | null {
  if (range) return `₹${range}/night`;
  if (!tier) return null;
  const map: Record<string, string> = {
    budget: "Budget · ₹500–2,000/night",
    mixed: "Mixed · ₹1,000–5,000/night",
    luxury: "Luxury · ₹5,000+/night",
  };
  return map[tier] ?? tier;
}

function emergencyLine(em?: Props["emergency"]): string | null {
  if (!em) return null;
  if (em.ambulance && em.nearest_hospital) return `${em.ambulance} · ${em.nearest_hospital}`;
  return em.ambulance ?? em.nearest_hospital ?? em.helpline ?? null;
}

export default function KnowBeforeYouGo({ locale, budgetTier, priceRange, months, reach, emergency, stateId }: Props) {
  const priceStr = formatPrice(budgetTier, priceRange);
  const windowStr = bestMonthWindow(months);
  const accessStr = reach?.from_nearest_city ?? null;
  const emStr = emergencyLine(emergency);
  const permitType = stateId ? PERMIT_STATES[stateId] : undefined;

  const fields = [priceStr, windowStr, accessStr, emStr, permitType].filter(Boolean).length;
  if (fields < 2) return null;

  return (
    <div className="mt-6 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-5 sm:p-6">
      <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
        Know before you go
      </div>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
        {priceStr && (
          <div>
            <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground/80">Price</dt>
            <dd className="mt-0.5 text-foreground">{priceStr}</dd>
          </div>
        )}
        {windowStr && (
          <div>
            <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground/80">Best window</dt>
            <dd className="mt-0.5 text-foreground">{windowStr}</dd>
          </div>
        )}
        {accessStr && (
          <div className="sm:col-span-2">
            <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground/80">Access</dt>
            <dd className="mt-0.5 text-foreground">{accessStr}</dd>
          </div>
        )}
        {emStr && (
          <div className="sm:col-span-2">
            <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground/80">Emergency</dt>
            <dd className="mt-0.5 text-foreground">{emStr}</dd>
          </div>
        )}
        {permitType && (
          <div className="sm:col-span-2">
            <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#E55642]">Permit required</dt>
            <dd className="mt-0.5">
              <Link href={`/${locale}/guide/permits`} className="text-[#E55642] hover:underline">
                {permitType} — see process →
              </Link>
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
