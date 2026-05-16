import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  currentMonthIST,
  currentMonthLongIST,
  formatScore,
  verdictFor,
  verdictTier,
  VERDICT_COLOR,
} from "@itp/shared";
import { destinationImage } from "@/lib/image-url";
import { isCinematicDestination } from "@/lib/cinematic-destinations";

export const runtime = "edge";

// Cinematic OG card — hero photo + giant italic dest name + score badge +
// Issue Nº kicker. Mirrors the on-page hero composition so the share preview
// reads the same as the page itself.
//
// Route: /api/og/destination/[id]?locale=en|hi
// Returns: 1200×630 PNG via next/og ImageResponse

const LAUNCH_DATE = new Date("2022-07-01T00:00:00Z");
function getIssueNumber(now: Date = new Date()): number {
  const months =
    (now.getUTCFullYear() - LAUNCH_DATE.getUTCFullYear()) * 12 +
    (now.getUTCMonth() - LAUNCH_DATE.getUTCMonth());
  return Math.max(1, months + 1);
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const { searchParams } = req.nextUrl;
  const locale = searchParams.get("locale") || "en";

  // Hard gate: only cinematic destinations get this card. Other slugs just
  // 404 — production destinations keep their existing raw-photo OG via
  // generateMetadata's fallback.
  if (!isCinematicDestination(id)) {
    return new Response("Not a cinematic destination", { status: 404 });
  }

  const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supaKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let name = id;
  let stateName: string | null = null;
  let region: string | null = null;
  let rawScore: number | null = null;

  if (supaUrl && supaKey) {
    const supabase = createClient(supaUrl, supaKey);
    const month = currentMonthIST();
    const { data } = await supabase
      .from("destinations")
      .select(
        "name, region, translations, state:states(name), destination_months(month, score)",
      )
      .eq("id", id)
      .single();
    if (data) {
      const translatedName =
        locale !== "en" && (data.translations as any)?.[locale]?.name;
      name = translatedName || (data as any).name || id;
      const s = (data as any).state;
      stateName = Array.isArray(s) ? s[0]?.name : s?.name;
      region = (data as any).region ?? null;
      const months: Array<{ month: number; score: number }> =
        (data as any).destination_months ?? [];
      rawScore = months.find((m) => m.month === month)?.score ?? null;
    }
  }

  const displayScore = rawScore != null ? rawScore * 2 : null;
  const tier = displayScore != null ? verdictTier(displayScore) : null;
  const verdict = displayScore != null ? verdictFor(displayScore) : null;
  const tint = tier ? VERDICT_COLOR[tier] : "#F5F1E8";
  const issueNum = getIssueNumber();
  const monthName = currentMonthLongIST().toUpperCase();

  const heroPhoto = destinationImage(id, 1600);
  const stateBlurb =
    [stateName, region].filter(Boolean).join(" · ").toUpperCase() || "INDIA";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          backgroundColor: "#0A0A08",
          fontFamily:
            'Georgia, "Times New Roman", serif',
        }}
      >
        {/* Hero photo behind everything */}
        <img
          src={heroPhoto}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            inset: 0,
            width: "1200px",
            height: "630px",
            objectFit: "cover",
          }}
        />
        {/* Cinematic gradient — top + bottom darken so text reads */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,10,8,0.55) 0%, rgba(10,10,8,0.18) 35%, rgba(10,10,8,0.55) 75%, rgba(10,10,8,0.94) 100%)",
            display: "flex",
          }}
        />

        {/* Top row — kicker left, score right */}
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: "56px 64px 0",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                fontSize: 18,
                color: "#E55642",
                letterSpacing: "0.30em",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              DISPATCH · ISSUE Nº {issueNum}
            </div>
            <div
              style={{
                fontSize: 16,
                color: "#F5F1E8",
                letterSpacing: "0.22em",
                fontWeight: 500,
                textTransform: "uppercase",
              }}
            >
              {stateBlurb}
            </div>
          </div>
          {displayScore != null && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 6,
              }}
            >
              <div
                style={{
                  fontSize: 132,
                  fontWeight: 800,
                  color: tint,
                  letterSpacing: "-0.05em",
                  lineHeight: 0.85,
                  fontFamily:
                    'ui-monospace, "SF Mono", Menlo, monospace',
                }}
              >
                {formatScore(rawScore)}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "#F5F1E8",
                  letterSpacing: "0.30em",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  fontFamily:
                    'ui-monospace, "SF Mono", Menlo, monospace',
                }}
              >
                {verdict} · {monthName}
              </div>
            </div>
          )}
        </div>

        {/* Bottom — giant italic name with coral period */}
        <div
          style={{
            position: "relative",
            marginTop: "auto",
            padding: "0 64px 64px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 0,
              fontSize: 188,
              fontStyle: "italic",
              fontWeight: 400,
              color: "#F5F1E8",
              lineHeight: 0.94,
              letterSpacing: "-0.028em",
              fontFamily: 'Georgia, "Times New Roman", serif',
            }}
          >
            <span>{name}</span>
            <span style={{ color: "#E55642" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              borderTop: "1px solid rgba(245,241,232,0.20)",
              paddingTop: 18,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 4,
                  backgroundColor: "#E55642",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#0A0A08",
                  fontFamily:
                    'ui-monospace, "SF Mono", Menlo, monospace',
                }}
              >
                N
              </div>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#F5F1E8",
                  letterSpacing: "0.06em",
                  fontFamily:
                    'ui-monospace, "SF Mono", Menlo, monospace',
                }}
              >
                NAKSHIQ
              </span>
            </div>
            <span
              style={{
                fontSize: 14,
                color: "rgba(245,241,232,0.55)",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                fontFamily:
                  'ui-monospace, "SF Mono", Menlo, monospace',
              }}
            >
              nakshiq.com
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control":
          "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
