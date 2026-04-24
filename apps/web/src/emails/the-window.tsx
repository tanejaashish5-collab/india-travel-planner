import {
  Body,
  Container,
  Head,
  Html,
  Preview,
} from "@react-email/components";

// ── Data shapes ──

export interface PickBlock {
  id: string;
  name: string;
  state: string | null;
  score: number;
  elevation_m: number | null;
  difficulty: string | null;
  why_this_week: string;
  image: string;
  primary_tag?: string | null;
}

export interface BestScoreBlock {
  destinationId: string;
  name: string;
  state: string;
  score: number;
  note: string;
  whyGo?: string;
}

export interface SkipBlock {
  trapName: string;
  trapReason: string;
  alternativeId: string;
  alternativeName: string;
  alternativeReason: string;
}

export interface RoadBlock {
  title: string;
  body: string;
  destinationId?: string;
}

export interface ChangeBlock {
  scoresUpdated: number;
  destinationsAdded: number;
  notesEdited: number;
}

export interface WindowIssueProps {
  issueNumber: number;
  monthName: string;
  year: number;
  opening: string;
  picks: PickBlock[];
  bestScore: BestScoreBlock;
  skip: SkipBlock | null;
  road: RoadBlock | null;
  changes: ChangeBlock;
  closing: string;
  unsubscribeUrl: string;
  webViewUrl: string;
}

// ── Helpers ──

const IMAGE_BASE = "https://pub-d8970c901de34c218926ebf4be1ed09a.r2.dev";

function imageUrlFor(id: string): string {
  return `${IMAGE_BASE}/destinations/${id}.jpg`;
}

function utm(slug: string, slot: string, year: number, month: string, week: number): string {
  const campaign = `weekly-${year}-${String(new Date(Date.parse(`${month} 1, ${year}`)).getMonth() + 1).padStart(2, "0")}-w${week}`;
  return `?utm_source=newsletter&utm_medium=email&utm_campaign=${campaign}&utm_content=${slot}`;
}

function difficultyLabel(d: string | null): string {
  if (!d) return "—";
  return d.charAt(0).toUpperCase() + d.slice(1);
}

function categoryTag(tag: string | null | undefined): string {
  if (!tag) return "Destination";
  const words = tag.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1));
  return words.join(" ");
}

// ── Render ──

export default function TheWindow(props: WindowIssueProps) {
  const {
    issueNumber,
    monthName,
    year,
    opening,
    picks,
    bestScore,
    skip,
    road,
    changes,
    unsubscribeUrl,
    webViewUrl,
  } = props;

  // Slug components for UTMs
  const monthNum = new Date(Date.parse(`${monthName} 1, ${year}`)).getMonth() + 1;
  // issueNumber is ISO week of year; derive week-of-month from current date
  const nowForWeek = new Date();
  const weekOfMonth = Math.ceil((nowForWeek.getDate() + (new Date(nowForWeek.getFullYear(), nowForWeek.getMonth(), 1).getDay() || 7) - 1) / 7);
  const campaign = `weekly-${year}-${String(monthNum).padStart(2, "0")}-w${weekOfMonth}`;
  const utmFor = (slot: string) => `?utm_source=newsletter&utm_medium=email&utm_campaign=${campaign}&utm_content=${slot}`;

  const monthSlug = monthName.toLowerCase();
  const issueSlug = `${year}-${String(monthNum).padStart(2, "0")}-w${weekOfMonth}`;

  const hero = picks[0];
  const rest = picks.slice(1, 5);

  const previewText = `${bestScore.name} scores ${bestScore.score}/5 this week. And one place to skip.`;

  return (
    <Html lang="en">
      <Head>
        <meta name="color-scheme" content="dark" />
        <meta name="supported-color-schemes" content="dark" />
      </Head>
      <Preview>{previewText}</Preview>
      <Body style={body}>
        {/* Outer bulletproof dark wrapper */}
        <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" bgcolor="#060606" style={{ width: "100%", background: "#060606", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td align="center" style={{ padding: "40px 16px", background: "#060606" }}>
                <Container style={container}>

                  {/* Open on web escape hatch */}
                  <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={innerTable}>
                    <tbody><tr><td style={{ padding: "18px 28px 0", textAlign: "right" }}>
                      <a href={`${webViewUrl}${utmFor("open-on-web")}`} style={ghostLink}>↗ Open on web</a>
                    </td></tr></tbody>
                  </table>

                  {/* Masthead */}
                  <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={innerTable}>
                    <tbody>
                      <tr><td style={{ padding: "32px 28px 0", textAlign: "center" }}>
                        <a href={`https://www.nakshiq.com/en${utmFor("masthead")}`} style={mastheadWordmark}>NakshIQ</a>
                      </td></tr>
                      <tr><td style={{ padding: "12px 28px 0" }}>
                        <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={innerTable}>
                          <tbody><tr><td style={hairline}>&nbsp;</td></tr></tbody>
                        </table>
                      </td></tr>
                      <tr><td style={{ ...mastheadMeta, padding: "10px 28px 0" }}>
                        № {issueNumber} · {monthName} {year} · The Window
                      </td></tr>
                    </tbody>
                  </table>

                  {/* Hero — pick 01 */}
                  {hero && (
                    <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={innerTable}>
                      <tbody><tr><td style={{ padding: "32px 0 0" }}>
                        <a href={`https://www.nakshiq.com/en/destination/${hero.id}/${monthSlug}${utmFor("hero")}`} style={heroBlockLink}>
                          <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={{ ...innerTable, background: "#0B0B0C" }}>
                            <tbody><tr><td style={{ padding: "0 24px", background: "#0B0B0C" }}>
                              <div style={{ position: "relative", lineHeight: 0 }}>
                                <img src={imageUrlFor(hero.id)} width="552" height="368" alt={`${hero.name} — ${hero.state ?? ""}`} style={heroImage} />
                                <div style={heroScrim}>
                                  <div style={heroKicker}>№ 01 · {hero.state ?? ""}</div>
                                  <div style={heroName}>{hero.name}</div>
                                  <div style={heroHook}>{hero.why_this_week}</div>
                                </div>
                                <div style={heroPillWrap}>
                                  <div style={heroPill}>
                                    <span style={pillDot} />{hero.score}/5 · Peak
                                  </div>
                                </div>
                              </div>
                            </td></tr></tbody>
                          </table>
                        </a>
                      </td></tr></tbody>
                    </table>
                  )}

                  {/* Photo credit */}
                  {hero && (
                    <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={innerTable}>
                      <tbody><tr><td style={photoCredit}>
                        Photograph · {hero.name}{hero.state ? `, ${hero.state}` : ""} · {monthName} {year}
                      </td></tr></tbody>
                    </table>
                  )}

                  {/* Signed lede */}
                  <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={innerTable}>
                    <tbody>
                      <tr><td style={dateline}>Canberra, {monthName}</td></tr>
                      <tr><td style={ledeText}>
                        {opening}<br /><br />
                        <span style={signOff}>— Ashish</span>
                      </td></tr>
                    </tbody>
                  </table>

                  {/* Pull quote from hero why_this_week */}
                  {hero && (
                    <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={innerTable}>
                      <tbody><tr><td style={{ padding: "32px 28px 0" }}>
                        <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={innerTable}>
                          <tbody><tr>
                            <td width={4} style={pullQuoteRule} />
                            <td style={pullQuoteText}>{hero.why_this_week}</td>
                          </tr></tbody>
                        </table>
                      </td></tr></tbody>
                    </table>
                  )}

                  {/* Divider → ranked spine */}
                  <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={innerTable}>
                    <tbody>
                      <tr><td style={{ padding: "56px 28px 0" }}>
                        <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={innerTable}>
                          <tbody>
                            <tr><td style={hairline}>&nbsp;</td></tr>
                            <tr><td style={{ height: 4, lineHeight: "4px", fontSize: 0 }}>&nbsp;</td></tr>
                            <tr><td style={hairline}>&nbsp;</td></tr>
                          </tbody>
                        </table>
                      </td></tr>
                      <tr><td style={sectionLabel}>The Rest of This Week's Five</td></tr>
                    </tbody>
                  </table>

                  {/* Picks 02-05 */}
                  {rest.map((p, i) => {
                    const position = i + 2;
                    const isFirst = i === 0;
                    return (
                      <table key={p.id} role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={innerTable}>
                        <tbody>
                          <tr><td style={{ padding: isFirst ? "32px 28px 0" : "56px 28px 0" }}>
                            {!isFirst && (
                              <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={innerTable}>
                                <tbody><tr><td style={dashedRule}>&nbsp;</td></tr></tbody>
                              </table>
                            )}
                          </td></tr>
                          <tr><td style={{ padding: isFirst ? "0 28px 0" : "20px 28px 0" }}>
                            <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={innerTable}>
                              <tbody><tr>
                                <td valign="top"><div style={cardNumeral}>{String(position).padStart(2, "0")}</div></td>
                                <td valign="bottom" style={cardKickerTag}>{categoryTag(p.primary_tag)}</td>
                                <td align="right" valign="bottom" style={cardScoreTag}>● {p.score}/5 · Peak</td>
                              </tr></tbody>
                            </table>
                          </td></tr>
                          <tr><td style={{ padding: "12px 28px 0" }}>
                            <a href={`https://www.nakshiq.com/en/destination/${p.id}/${monthSlug}${utmFor(`pick-0${position}-image`)}`} style={{ display: "block", textDecoration: "none" }}>
                              <img src={imageUrlFor(p.id)} width="544" height="306" alt={`${p.name} — ${p.state ?? ""}`} style={cardImage} />
                            </a>
                          </td></tr>
                          <tr><td style={{ padding: "14px 28px 0" }}>
                            <a href={`https://www.nakshiq.com/en/destination/${p.id}/${monthSlug}${utmFor(`pick-0${position}-name`)}`} style={cardName}>{p.name}</a>
                          </td></tr>
                          <tr><td style={cardMeta}>
                            {p.state ?? ""}{p.elevation_m ? ` · ${p.elevation_m.toLocaleString()}m` : ""}{p.difficulty ? ` · ${difficultyLabel(p.difficulty)}` : ""}
                          </td></tr>
                          <tr><td style={cardHook}>{p.why_this_week}</td></tr>
                          <tr><td style={{ padding: "14px 28px 0" }}>
                            <a href={`https://www.nakshiq.com/en/destination/${p.id}/${monthSlug}${utmFor(`pick-0${position}-cta`)}`} style={cardCta}>
                              Read the {p.name} {monthName} guide →
                            </a>
                          </td></tr>
                        </tbody>
                      </table>
                    );
                  })}

                  {/* From the Notebook */}
                  <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={innerTable}>
                    <tbody>
                      <tr><td style={{ padding: "72px 28px 0" }}>
                        <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={innerTable}>
                          <tbody>
                            <tr><td style={hairline}>&nbsp;</td></tr>
                            <tr><td style={{ height: 4, lineHeight: "4px", fontSize: 0 }}>&nbsp;</td></tr>
                            <tr><td style={hairline}>&nbsp;</td></tr>
                          </tbody>
                        </table>
                      </td></tr>
                      <tr><td style={notebookHeading}>From the Notebook</td></tr>
                    </tbody>
                  </table>

                  {/* Honest Skip */}
                  {skip && (
                    <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={innerTable}>
                      <tbody>
                        <tr><td style={notebookLabel}>The Honest Skip</td></tr>
                        <tr><td style={{ padding: "10px 28px 0" }}>
                          <span style={{ ...notebookTitle, textDecoration: "line-through", textDecorationColor: "#E55642", textDecorationThickness: 2 }}>{skip.trapName}</span>
                          {"  "}<span style={{ color: "#6A6A65" }}>→</span>{"  "}
                          <a href={`https://www.nakshiq.com/en/destination/${skip.alternativeId}${utmFor("skip-alt")}`} style={{ ...notebookTitle, color: "#34D399", textDecoration: "none" }}>{skip.alternativeName}</a>
                        </td></tr>
                        <tr><td style={notebookBody}>{skip.alternativeReason || skip.trapReason}</td></tr>
                      </tbody>
                    </table>
                  )}

                  {/* Road This Week */}
                  {road && (
                    <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={innerTable}>
                      <tbody>
                        <tr><td style={notebookLabel}>Road This Week</td></tr>
                        <tr><td style={{ padding: "10px 28px 0" }}>
                          <div style={notebookTitle}>{road.title}</div>
                          <div style={notebookBody}>{road.body}</div>
                        </td></tr>
                      </tbody>
                    </table>
                  )}

                  {/* What Changed */}
                  <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={innerTable}>
                    <tbody>
                      <tr><td style={notebookLabel}>What Changed</td></tr>
                      <tr><td style={{ ...notebookBody, fontStyle: "italic", fontSize: 17 }}>
                        {changes.destinationsAdded} destinations added this week. {changes.scoresUpdated} monthly scores updated.
                      </td></tr>
                    </tbody>
                  </table>

                  {/* Big CTA */}
                  <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={innerTable}>
                    <tbody><tr><td style={{ padding: "48px 28px 0", textAlign: "center" }}>
                      <a href={`https://www.nakshiq.com/en/where-to-go/${monthSlug}${utmFor("cta-hero")}`} style={primaryButton}>
                        See the full {monthName} hero →
                      </a>
                    </td></tr></tbody>
                  </table>

                  {/* Colophon */}
                  <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={innerTable}>
                    <tbody><tr><td style={{ padding: "60px 28px 40px" }}>
                      <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={innerTable}>
                        <tbody><tr><td style={hairline}>&nbsp;</td></tr></tbody>
                      </table>
                      <div style={colophon}>
                        The Window is published weekly by NakshIQ.<br />
                        Edited in Canberra. Written from the road.<br />
                        № {issueNumber} · {monthName} {year}
                        <div style={{ paddingTop: 12 }}>
                          <a href={`https://www.nakshiq.com/en/the-window/${issueSlug}`} style={colophonLink}>Archive</a>
                          {"  ·  "}
                          <a href="https://www.nakshiq.com/en" style={colophonLink}>Visit</a>
                          {"  ·  "}
                          <a href={unsubscribeUrl} style={colophonLink}>Unsubscribe</a>
                        </div>
                      </div>
                    </td></tr></tbody>
                  </table>

                </Container>
              </td>
            </tr>
          </tbody>
        </table>
      </Body>
    </Html>
  );
}

// ── Styles ──

const body: React.CSSProperties = {
  margin: 0,
  padding: 0,
  background: "#060606",
  color: "#E7E4DE",
  fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
};

const container: React.CSSProperties = {
  width: 600,
  maxWidth: 600,
  margin: "0 auto",
  background: "#0B0B0C",
  borderCollapse: "collapse",
};

const innerTable: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
};

const ghostLink: React.CSSProperties = {
  color: "#9A9A95",
  textDecoration: "none",
  fontFamily: "'Geist Mono', monospace",
  fontSize: 10,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
};

const mastheadWordmark: React.CSSProperties = {
  fontFamily: "'Fraunces', 'Didot', 'Bodoni 72', 'Hoefler Text', Georgia, 'Times New Roman', serif",
  fontStyle: "italic",
  fontWeight: 500,
  fontSize: 30,
  letterSpacing: "0.04em",
  color: "#F5F1E8",
  textDecoration: "none",
};

const mastheadMeta: React.CSSProperties = {
  textAlign: "center",
  fontFamily: "'Geist Mono', monospace",
  fontSize: 10,
  letterSpacing: "0.30em",
  textTransform: "uppercase",
  color: "#9A9A95",
};

const hairline: React.CSSProperties = {
  height: 1,
  background: "#2A2A28",
  lineHeight: "1px",
  fontSize: 0,
};

const dashedRule: React.CSSProperties = {
  borderTop: "1px dashed #3A3A3C",
  height: 1,
  lineHeight: "1px",
  fontSize: 0,
};

const heroBlockLink: React.CSSProperties = {
  display: "block",
  textDecoration: "none",
  color: "#E7E4DE",
};

const heroImage: React.CSSProperties = {
  display: "block",
  width: "100%",
  maxWidth: 552,
  height: "auto",
  border: 0,
  outline: "none",
  textDecoration: "none",
  filter: "brightness(0.82) saturate(0.88)",
};

const heroScrim: React.CSSProperties = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  padding: "120px 28px 24px 28px",
  background: "linear-gradient(to top, rgba(11,11,12,0.92) 0%, rgba(11,11,12,0.40) 65%, rgba(11,11,12,0) 100%)",
};

const heroKicker: React.CSSProperties = {
  fontFamily: "'Geist Mono', monospace",
  fontSize: 10,
  letterSpacing: "0.30em",
  textTransform: "uppercase",
  color: "#E55642",
  marginBottom: 12,
};

const heroName: React.CSSProperties = {
  fontFamily: "'Fraunces', 'Didot', 'Bodoni 72', 'Hoefler Text', Georgia, 'Times New Roman', serif",
  fontStyle: "italic",
  fontWeight: 500,
  fontSize: 40,
  lineHeight: 1.05,
  letterSpacing: "-0.01em",
  color: "#F5F1E8",
  marginBottom: 8,
};

const heroHook: React.CSSProperties = {
  fontFamily: "'Fraunces', 'Didot', 'Bodoni 72', 'Hoefler Text', Georgia, 'Times New Roman', serif",
  fontStyle: "italic",
  fontSize: 15,
  lineHeight: 1.4,
  color: "#E55642",
  maxWidth: 420,
};

const heroPillWrap: React.CSSProperties = {
  position: "absolute",
  top: 20,
  right: 20,
};

const heroPill: React.CSSProperties = {
  fontFamily: "'Geist Mono', monospace",
  fontSize: 10,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#34D399",
  background: "rgba(0,0,0,0.50)",
  border: "1px solid rgba(255,255,255,0.12)",
  padding: "8px 12px",
};

const pillDot: React.CSSProperties = {
  display: "inline-block",
  width: 6,
  height: 6,
  background: "#34D399",
  marginRight: 6,
  verticalAlign: "middle",
};

const photoCredit: React.CSSProperties = {
  padding: "14px 28px 0",
  fontFamily: "'Geist Mono', monospace",
  fontSize: 9,
  letterSpacing: "0.24em",
  textTransform: "uppercase",
  color: "#6A6A65",
  textAlign: "left",
};

const dateline: React.CSSProperties = {
  padding: "28px 28px 0",
  fontFamily: "'Geist Mono', monospace",
  fontSize: 10,
  letterSpacing: "0.30em",
  textTransform: "uppercase",
  color: "#E55642",
};

const ledeText: React.CSSProperties = {
  padding: "14px 28px 0",
  fontFamily: "'Fraunces', 'Didot', 'Bodoni 72', 'Hoefler Text', Georgia, 'Times New Roman', serif",
  fontStyle: "italic",
  fontSize: 17,
  lineHeight: 1.55,
  color: "#E7E4DE",
  // `pre-line` preserves \n as real line breaks so override opening letters
  // with blank-line paragraph breaks render correctly without needing <br> tags.
  whiteSpace: "pre-line",
};

const signOff: React.CSSProperties = {
  color: "#9A9A95",
  fontSize: 14,
};

const pullQuoteRule: React.CSSProperties = {
  width: 4,
  background: "#E55642",
};

const pullQuoteText: React.CSSProperties = {
  padding: "6px 0 6px 20px",
  fontFamily: "'Fraunces', 'Didot', 'Bodoni 72', 'Hoefler Text', Georgia, 'Times New Roman', serif",
  fontStyle: "italic",
  fontWeight: 500,
  fontSize: 26,
  lineHeight: 1.25,
  color: "#F5F1E8",
};

const sectionLabel: React.CSSProperties = {
  padding: "24px 28px 0",
  fontFamily: "'Geist Mono', monospace",
  fontSize: 10,
  letterSpacing: "0.30em",
  textTransform: "uppercase",
  color: "#9A9A95",
};

const cardNumeral: React.CSSProperties = {
  fontFamily: "'Fraunces', 'Didot', 'Bodoni 72', 'Hoefler Text', Georgia, 'Times New Roman', serif",
  fontStyle: "italic",
  fontWeight: 500,
  fontSize: 72,
  lineHeight: 0.9,
  color: "#E8E2D6",
  letterSpacing: "-0.02em",
};

const cardKickerTag: React.CSSProperties = {
  paddingBottom: 8,
  paddingLeft: 16,
  fontFamily: "'Geist Mono', monospace",
  fontSize: 10,
  letterSpacing: "0.30em",
  textTransform: "uppercase",
  color: "#9A9A95",
};

const cardScoreTag: React.CSSProperties = {
  paddingBottom: 8,
  fontFamily: "'Geist Mono', monospace",
  fontSize: 10,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#34D399",
};

const cardImage: React.CSSProperties = {
  display: "block",
  width: "100%",
  maxWidth: 544,
  height: "auto",
  border: 0,
  outline: "none",
  textDecoration: "none",
  filter: "brightness(0.88) saturate(0.92)",
};

const cardName: React.CSSProperties = {
  fontFamily: "'Fraunces', 'Didot', 'Bodoni 72', 'Hoefler Text', Georgia, 'Times New Roman', serif",
  fontStyle: "italic",
  fontWeight: 500,
  fontSize: 32,
  lineHeight: 1.1,
  color: "#F5F1E8",
  textDecoration: "none",
};

const cardMeta: React.CSSProperties = {
  padding: "6px 28px 0",
  fontFamily: "'Geist Mono', monospace",
  fontSize: 10,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#9A9A95",
};

const cardHook: React.CSSProperties = {
  padding: "14px 28px 0",
  fontFamily: "'Fraunces', 'Didot', 'Bodoni 72', 'Hoefler Text', Georgia, 'Times New Roman', serif",
  fontStyle: "italic",
  fontSize: 16,
  lineHeight: 1.55,
  color: "#E55642",
};

const cardCta: React.CSSProperties = {
  fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  fontSize: 11,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#E7E4DE",
  borderBottom: "1px solid #6A6A65",
  paddingBottom: 2,
  textDecoration: "none",
};

const notebookHeading: React.CSSProperties = {
  padding: "24px 28px 0",
  fontFamily: "'Fraunces', 'Didot', 'Bodoni 72', 'Hoefler Text', Georgia, 'Times New Roman', serif",
  fontStyle: "italic",
  fontWeight: 500,
  fontSize: 26,
  lineHeight: 1.2,
  color: "#F5F1E8",
};

const notebookLabel: React.CSSProperties = {
  padding: "32px 28px 0",
  fontFamily: "'Geist Mono', monospace",
  fontSize: 10,
  letterSpacing: "0.30em",
  textTransform: "uppercase",
  color: "#9A9A95",
};

const notebookTitle: React.CSSProperties = {
  fontFamily: "'Fraunces', 'Didot', 'Bodoni 72', 'Hoefler Text', Georgia, 'Times New Roman', serif",
  fontStyle: "italic",
  fontSize: 21,
  lineHeight: 1.35,
  color: "#F5F1E8",
};

const notebookBody: React.CSSProperties = {
  padding: "10px 28px 0",
  fontFamily: "'Geist', sans-serif",
  fontSize: 14,
  lineHeight: 1.55,
  color: "#B8B5AD",
};

const primaryButton: React.CSSProperties = {
  display: "inline-block",
  fontFamily: "'Geist Mono', monospace",
  fontSize: 12,
  fontWeight: 500,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#F5F1E8",
  border: "1px solid #E7E4DE",
  padding: "14px 22px",
  textDecoration: "none",
};

const colophon: React.CSSProperties = {
  paddingTop: 24,
  textAlign: "center",
  fontFamily: "'Geist Mono', monospace",
  fontSize: 10,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#6A6A65",
  lineHeight: 1.8,
};

const colophonLink: React.CSSProperties = {
  color: "#9A9A95",
  textDecoration: "none",
};
