import Link from "next/link";
import { currentMonthIST, formatScoreInline } from "@itp/shared";

const MONTH_SHORT = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface MonthScore {
  month: number;
  score: number;
}

interface DestData {
  id: string;
  name: string;
  tagline: string;
  difficulty: string;
  elevation_m: number | null;
  budget_tier: string | null;
  best_months: string | null;
  daily_cost: unknown;
  family_stress: string | null;
  state: string | null;
  months: MonthScore[];
  kids: { suitable: boolean; rating: number } | null;
  confidence: { safety_rating: number | string | null; network: unknown } | null;
}

interface Props {
  dest1: DestData;
  dest2: DestData;
  locale: string;
}

function getMonthScore(months: MonthScore[], month: number): number | null {
  return months.find((m) => m.month === month)?.score ?? null;
}

function winner(val1: number | null, val2: number | null): "left" | "right" | "tie" {
  if (val1 === null && val2 === null) return "tie";
  if (val1 === null) return "right";
  if (val2 === null) return "left";
  if (val1 > val2) return "left";
  if (val2 > val1) return "right";
  return "tie";
}

function formatSafety(v: number | string | null | undefined): string {
  if (v == null) return "—";
  if (typeof v === "number") return formatScoreInline(v);
  return String(v);
}

function formatNetwork(net: unknown): string {
  if (net == null) return "—";
  if (typeof net === "string") return net;
  if (typeof net === "object") {
    const n = net as Record<string, unknown>;
    const ops = ["airtel", "jio", "vi", "bsnl"].filter((k) => n[k] === true);
    if (ops.length > 0) {
      return ops.map((o) => o[0].toUpperCase() + o.slice(1)).join(" / ");
    }
    if (typeof n.note === "string") return n.note;
  }
  return "—";
}

// Scope-local cinema style helpers — these only render inside .nakshiq-cinema
// (set by the parent page wrapper) so they pick up var(--paper)/var(--bone)/etc.
const tableHeadCell: React.CSSProperties = {
  padding: "12px 16px",
  background: "var(--paper)",
  fontFamily: "var(--cinema-mono)",
  fontSize: 10,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "var(--bone-faint)",
};

const tableNameCell: React.CSSProperties = {
  padding: "12px 16px",
  background: "var(--paper)",
  fontFamily: "var(--cinema-display)",
  fontStyle: "italic",
  fontWeight: 500,
  fontSize: 16,
  color: "var(--bone)",
  textAlign: "center" as const,
};

const tableLabelCell: React.CSSProperties = {
  padding: "12px 16px",
  background: "var(--paper)",
  fontFamily: "var(--cinema-ui)",
  fontSize: 13,
  color: "var(--bone-dim)",
  display: "flex",
  alignItems: "center",
  gap: 8,
};

const tableValueCell = (isWinner: boolean): React.CSSProperties => ({
  padding: "12px 16px",
  background: isWinner ? "rgba(229, 86, 66, 0.06)" : "var(--paper)",
  fontFamily: "var(--cinema-ui)",
  fontSize: 14,
  fontWeight: 500,
  color: isWinner ? "var(--vermillion)" : "var(--bone)",
  textAlign: "center" as const,
  fontVariantNumeric: "tabular-nums",
  borderLeft: "1px solid var(--hair)",
});

export function VsComparison({ dest1, dest2, locale }: Props) {
  const currentMonth = currentMonthIST();
  const score1 = getMonthScore(dest1.months, currentMonth);
  const score2 = getMonthScore(dest2.months, currentMonth);

  // Comparison rows
  const rows = [
    {
      label: `${MONTH_SHORT[currentMonth]} score`,
      v1: score1 !== null ? formatScoreInline(score1) : "—",
      v2: score2 !== null ? formatScoreInline(score2) : "—",
      win: winner(score1, score2),
    },
    {
      label: "Difficulty",
      v1: dest1.difficulty || "—",
      v2: dest2.difficulty || "—",
      win: "tie" as const,
    },
    {
      label: "Elevation",
      v1: dest1.elevation_m ? `${dest1.elevation_m.toLocaleString()} m` : "Plains",
      v2: dest2.elevation_m ? `${dest2.elevation_m.toLocaleString()} m` : "Plains",
      win: "tie" as const,
    },
    {
      label: "Budget tier",
      v1: dest1.budget_tier || "—",
      v2: dest2.budget_tier || "—",
      win: "tie" as const,
    },
    {
      label: "Kids rating",
      v1: dest1.kids?.rating != null ? formatScoreInline(dest1.kids.rating) : "—",
      v2: dest2.kids?.rating != null ? formatScoreInline(dest2.kids.rating) : "—",
      win: winner(dest1.kids?.rating ?? null, dest2.kids?.rating ?? null),
    },
    {
      label: "Safety",
      v1: formatSafety(dest1.confidence?.safety_rating),
      v2: formatSafety(dest2.confidence?.safety_rating),
      win: "tie" as const,
    },
    {
      label: "Network",
      v1: formatNetwork(dest1.confidence?.network),
      v2: formatNetwork(dest2.confidence?.network),
      win: "tie" as const,
    },
  ];

  // Quick verdict
  const totalScore1 = dest1.months.reduce((s, m) => s + m.score, 0);
  const totalScore2 = dest2.months.reduce((s, m) => s + m.score, 0);
  const currentWin = winner(score1, score2);

  // Choose-if reasons
  const choose1: string[] = [];
  const choose2: string[] = [];

  if (dest1.difficulty === "easy") choose1.push("You prefer an easier, more relaxed trip");
  if (dest2.difficulty === "easy") choose2.push("You prefer an easier, more relaxed trip");
  if (dest1.difficulty === "hard" || dest1.difficulty === "extreme") choose1.push("You want a challenging adventure");
  if (dest2.difficulty === "hard" || dest2.difficulty === "extreme") choose2.push("You want a challenging adventure");
  if ((dest1.kids?.rating ?? 0) > (dest2.kids?.rating ?? 0)) choose1.push("You're travelling with kids");
  if ((dest2.kids?.rating ?? 0) > (dest1.kids?.rating ?? 0)) choose2.push("You're travelling with kids");
  if ((score1 ?? 0) > (score2 ?? 0)) choose1.push(`Better conditions right now (${MONTH_SHORT[currentMonth]})`);
  if ((score2 ?? 0) > (score1 ?? 0)) choose2.push(`Better conditions right now (${MONTH_SHORT[currentMonth]})`);
  if (dest1.elevation_m && (!dest2.elevation_m || dest1.elevation_m > dest2.elevation_m)) choose1.push("You love high-altitude destinations");
  if (dest2.elevation_m && (!dest1.elevation_m || dest2.elevation_m > dest1.elevation_m)) choose2.push("You love high-altitude destinations");
  if (totalScore1 > totalScore2) choose1.push("You want more months with great conditions");
  if (totalScore2 > totalScore1) choose2.push("You want more months with great conditions");

  // Fallbacks
  if (choose1.length === 0) choose1.push(`${dest1.name} is a solid choice for its unique character`);
  if (choose2.length === 0) choose2.push(`${dest2.name} is a solid choice for its unique character`);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 64px" }}>
      {/* Quick verdict */}
      <section
        style={{
          padding: 24,
          border: "1px solid var(--vermillion)",
          background: "rgba(229, 86, 66, 0.04)",
          marginBottom: 48,
        }}
      >
        <p
          style={{
            fontFamily: "var(--cinema-mono)",
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--vermillion)",
            margin: "0 0 12px",
          }}
        >
          Quick verdict
        </p>
        <p
          style={{
            fontFamily: "var(--cinema-display)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(18px, 2vw, 22px)",
            lineHeight: 1.4,
            color: "var(--bone)",
            margin: 0,
          }}
        >
          {currentWin === "left"
            ? `${dest1.name} edges ahead this month with a score of ${formatScoreInline(score1!)} vs ${score2 != null ? formatScoreInline(score2) : "—"}.`
            : currentWin === "right"
              ? `${dest2.name} edges ahead this month with a score of ${formatScoreInline(score2!)} vs ${score1 != null ? formatScoreInline(score1) : "—"}.`
              : `Both destinations score equally right now (${score1 != null ? formatScoreInline(score1) : "—"}).`}{" "}
          {totalScore1 > totalScore2
            ? `Overall, ${dest1.name} has more favourable months across the year.`
            : totalScore2 > totalScore1
              ? `Overall, ${dest2.name} has more favourable months across the year.`
              : "Year-round, they're remarkably similar in overall score."}
        </p>
      </section>

      {/* Side-by-side comparison table */}
      <section style={{ marginBottom: 48 }}>
        <p
          className="nq-kicker"
          style={{
            color: "var(--vermillion)",
            marginBottom: 16,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Side-by-side · {rows.length} factors
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 1,
            background: "var(--hair)",
            border: "1px solid var(--hair)",
          }}
        >
          {/* Header row */}
          <div style={tableHeadCell}>&nbsp;</div>
          <div style={{ ...tableNameCell, borderLeft: "1px solid var(--hair)" }}>{dest1.name}</div>
          <div style={{ ...tableNameCell, borderLeft: "1px solid var(--hair)" }}>{dest2.name}</div>

          {/* Data rows */}
          {rows.map((row) => (
            <div key={row.label} style={{ display: "contents" }}>
              <div style={tableLabelCell}>{row.label}</div>
              <div style={tableValueCell(row.win === "left")}>
                {row.v1}
                {row.win === "left" && (
                  <span style={{ marginLeft: 4, color: "var(--vermillion)", fontSize: 11 }}>★</span>
                )}
              </div>
              <div style={tableValueCell(row.win === "right")}>
                {row.v2}
                {row.win === "right" && (
                  <span style={{ marginLeft: 4, color: "var(--vermillion)", fontSize: 11 }}>★</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Month-by-month */}
      <section style={{ marginBottom: 48 }}>
        <p
          className="nq-kicker"
          style={{
            color: "var(--vermillion)",
            marginBottom: 16,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Month-by-month score
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 1,
            background: "var(--hair)",
            border: "1px solid var(--hair)",
          }}
        >
          {/* Header */}
          <div style={tableHeadCell}>Month</div>
          <div style={{ ...tableNameCell, borderLeft: "1px solid var(--hair)" }}>{dest1.name}</div>
          <div style={{ ...tableNameCell, borderLeft: "1px solid var(--hair)" }}>{dest2.name}</div>

          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => {
            const s1 = getMonthScore(dest1.months, month);
            const s2 = getMonthScore(dest2.months, month);
            const mWin = winner(s1, s2);
            const isCurrent = month === currentMonth;
            return (
              <div key={month} style={{ display: "contents" }}>
                <div
                  style={{
                    ...tableLabelCell,
                    background: isCurrent ? "rgba(229, 86, 66, 0.04)" : "var(--paper)",
                  }}
                >
                  <span style={{ color: isCurrent ? "var(--bone)" : "var(--bone-dim)" }}>{MONTH_SHORT[month]}</span>
                  {isCurrent && (
                    <span
                      style={{
                        fontFamily: "var(--cinema-mono)",
                        fontSize: 9,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--vermillion)",
                        padding: "2px 6px",
                        border: "1px solid var(--vermillion)",
                      }}
                    >
                      Now
                    </span>
                  )}
                </div>
                <div
                  style={{
                    ...tableValueCell(mWin === "left"),
                    background: isCurrent && mWin !== "left" ? "rgba(229, 86, 66, 0.02)" : tableValueCell(mWin === "left").background,
                  }}
                >
                  {s1 !== null ? formatScoreInline(s1) : "—"}
                </div>
                <div
                  style={{
                    ...tableValueCell(mWin === "right"),
                    background: isCurrent && mWin !== "right" ? "rgba(229, 86, 66, 0.02)" : tableValueCell(mWin === "right").background,
                  }}
                >
                  {s2 !== null ? formatScoreInline(s2) : "—"}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Choose X if / Choose Y if */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 1,
          background: "var(--hair)",
          border: "1px solid var(--hair)",
        }}
      >
        {[
          { dest: dest1, reasons: choose1 },
          { dest: dest2, reasons: choose2 },
        ].map(({ dest, reasons }) => (
          <div key={dest.id} style={{ padding: 24, background: "var(--paper)" }}>
            <p
              style={{
                fontFamily: "var(--cinema-mono)",
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--vermillion)",
                margin: "0 0 10px",
              }}
            >
              Choose {dest.name} if
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px", display: "flex", flexDirection: "column", gap: 10 }}>
              {reasons.map((r, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "baseline",
                    fontFamily: "var(--cinema-ui)",
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "var(--bone-dim)",
                  }}
                >
                  <span style={{ flexShrink: 0, color: "var(--vermillion)" }}>—</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            <Link
              href={`/${locale}/destination/${dest.id}`}
              style={{
                fontFamily: "var(--cinema-mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--vermillion)",
                textDecoration: "none",
                borderBottom: "1px solid var(--vermillion)",
                paddingBottom: 2,
              }}
            >
              Explore {dest.name} →
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
