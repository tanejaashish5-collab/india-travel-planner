import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { formatScore, SCORE_MAX } from "@itp/shared";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const dest = searchParams.get("dest") || "Destination";
  const month = searchParams.get("month") || "Month";
  const scoreRaw = searchParams.get("score") || "0";
  const note = searchParams.get("note") || "";
  // Caller passes the raw 0–5 DB score; we multiply internally so the OG image
  // shows the same 0–10 display scale used everywhere else.
  const rawScore = Math.min(5, Math.max(0, parseInt(scoreRaw, 10) || 0));
  const scoreDisplay = formatScore(rawScore);

  // Score badge color (color thresholds operate on the raw 0–5 score; this is
  // the same banding logic the rest of the site uses internally).
  const badgeColor =
    rawScore >= 4 ? "#22c55e" : rawScore === 3 ? "#eab308" : "#ef4444";
  const badgeBg =
    rawScore >= 4
      ? "rgba(34,197,94,0.15)"
      : rawScore === 3
        ? "rgba(234,179,8,0.15)"
        : "rgba(239,68,68,0.15)";

  const scoreLabel =
    rawScore === 5
      ? "Peak Season"
      : rawScore === 4
        ? "Good Time"
        : rawScore === 3
          ? "Fair"
          : rawScore === 2
            ? "Caution"
            : rawScore === 1
              ? "Avoid"
              : "No Data";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#161614",
          padding: "60px 70px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Month label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "24px",
              color: "#a1a1aa",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            {month}
          </div>

          {/* Destination name */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.1,
              maxWidth: "900px",
            }}
          >
            {dest}
          </div>

          {/* Score badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "8px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                backgroundColor: badgeBg,
                border: `2px solid ${badgeColor}`,
                borderRadius: "16px",
                padding: "12px 24px",
              }}
            >
              <span
                style={{
                  fontSize: "48px",
                  fontWeight: 900,
                  color: badgeColor,
                }}
              >
                {scoreDisplay}
              </span>
              <span
                style={{
                  fontSize: "24px",
                  color: "#71717a",
                  fontWeight: 300,
                }}
              >
                /{SCORE_MAX}
              </span>
              <span
                style={{
                  fontSize: "22px",
                  color: badgeColor,
                  fontWeight: 600,
                  marginLeft: "8px",
                }}
              >
                {scoreLabel}
              </span>
            </div>
          </div>

          {/* Note / verdict */}
          {note && (
            <div
              style={{
                fontSize: "24px",
                color: "#a1a1aa",
                lineHeight: 1.5,
                maxWidth: "900px",
                marginTop: "8px",
              }}
            >
              {note}
            </div>
          )}
        </div>

        {/* Bottom branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                backgroundColor: "#E55642",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: 900,
                color: "#ffffff",
              }}
            >
              N
            </div>
            <span
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              NakshIQ
            </span>
          </div>
          <span
            style={{
              fontSize: "18px",
              color: "#52525b",
            }}
          >
            nakshiq.com
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
