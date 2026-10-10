import { Body, Container, Head, Html, Preview } from "@react-email/components";
import { formatScoreInline } from "@itp/shared";
import { windowStyles as s, WINDOW_IMAGE_BASE } from "./the-window";

// The month top 10: the email someone gets the moment they sign up.
//
// Every capture surface used to pitch "subscribe to The Window, every Sunday":
// a commitment, with a vague benefit, asked of someone mid-decision. Measured
// 2026-08-06 it converted to zero — 918 human sessions/wk, 0 emails captured.
// This is the replacement: one concrete thing, delivered now, that a reader
// cannot assemble themselves without opening 533 pages.
//
// Data comes from apps/web/src/data/month-shortlist.json (all 12 months, built
// by scripts/build-month-shortlist.mjs; the route picks the current IST month).
//
// TOP 10 since 2026-10-10 (founder). It used to list every in-season place:
// 62 in August but 449 in October, a 247 KB email that Gmail clips at ~102 KB.
// Now the ten best, ranked like The Window's weekly picks, plus a link to the
// full month on the site. Built on The Window's own styles (windowStyles) so
// the first email a subscriber gets looks like every Sunday one after it:
// ranked № 01-10 cards, one CTA, colophon. № 01 is a card like the rest, NOT
// The Window's photo-overlay hero: that hero relies on position:absolute,
// which Gmail strips, so its text fell below the photo onto a grey fade
// (founder's iPhone Gmail, 2026-10-10).

export interface MonthShortlistPick {
  id: string;
  name: string;
  state: string;
  tagline: string | null;
  score: number;
  elevation_m: number | null;
  difficulty: string | null;
}

interface Props {
  monthLong: string;
  monthSlug: string;
  year: number;
  totals: {
    destinations: number;
    atTheirBest: number;
    inAMonthToAvoid: number;
    listed: number;
  };
  top: MonthShortlistPick[];
  unsubscribeUrl?: string;
}

const SITE = "https://www.nakshiq.com";

const imageUrlFor = (id: string) => `${WINDOW_IMAGE_BASE}/destinations/${id}.jpg`;

function difficultyLabel(d: string | null): string {
  return d ? d.charAt(0).toUpperCase() + d.slice(1) : "";
}

const T = { role: "presentation", cellPadding: 0, cellSpacing: 0, border: 0, width: "100%", style: s.innerTable } as const;

function DoubleRule() {
  return (
    <table {...T}>
      <tbody>
        <tr><td style={s.hairline}>&nbsp;</td></tr>
        <tr><td style={{ height: 4, lineHeight: "4px", fontSize: 0 }}>&nbsp;</td></tr>
        <tr><td style={s.hairline}>&nbsp;</td></tr>
      </tbody>
    </table>
  );
}

export default function MonthShortlist({ monthLong, monthSlug, year, totals, top, unsubscribeUrl }: Props) {
  const utm = (slot: string) =>
    `?utm_source=newsletter&utm_medium=email&utm_campaign=top10-${year}-${monthSlug}&utm_content=${slot}`;
  const pageFor = (id: string) => `${SITE}/en/destination/${id}/${monthSlug}`;
  const others = Math.max(totals.listed - top.length, 0);

  return (
    <Html lang="en">
      <Head>
        <meta name="color-scheme" content="dark" />
        <meta name="supported-color-schemes" content="dark" />
      </Head>
      <Preview>{`The ${monthLong} top ${top.length}: the best places in India this month`}</Preview>
      <Body style={s.body}>
        <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" bgcolor="#060606" style={{ width: "100%", background: "#060606", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td align="center" style={{ padding: "40px 16px", background: "#060606" }}>
                <Container style={s.container}>

                  {/* Masthead */}
                  <table {...T}>
                    <tbody>
                      <tr><td style={{ padding: "32px 28px 0", textAlign: "center" }}>
                        <a href={`${SITE}/en${utm("masthead")}`} style={s.mastheadWordmark}>NakshIQ</a>
                      </td></tr>
                      <tr><td style={{ padding: "12px 28px 0" }}>
                        <table {...T}><tbody><tr><td style={s.hairline}>&nbsp;</td></tr></tbody></table>
                      </td></tr>
                      <tr><td style={{ ...s.mastheadMeta, padding: "10px 28px 0" }}>
                        The {monthLong} Top {top.length} · {monthLong} {year}
                      </td></tr>
                    </tbody>
                  </table>

                  {/* Lede */}
                  <table {...T}>
                    <tbody>
                      <tr><td style={s.dateline}>{monthLong} {year}</td></tr>
                      <tr><td style={s.ledeText}>
                        We check {totals.destinations} destinations against the month you&apos;d actually
                        travel. In {monthLong}, {totals.listed} of them are in their best window and{" "}
                        {totals.inAMonthToAvoid} are in a month we&apos;d tell you to skip. These are the{" "}
                        {top.length} we rate highest, no more than two from any one state.
                      </td></tr>
                    </tbody>
                  </table>

                  {/* Ranked spine: № 02-10 */}
                  <table {...T}>
                    <tbody>
                      <tr><td style={{ padding: "56px 28px 0" }}><DoubleRule /></td></tr>
                      <tr><td style={s.sectionLabel}>The {monthLong} Top {top.length}</td></tr>
                    </tbody>
                  </table>

                  {top.map((p, i) => {
                    const position = String(i + 1).padStart(2, "0");
                    const isFirst = i === 0;
                    return (
                      <table key={p.id} {...T}>
                        <tbody>
                          <tr><td style={{ padding: isFirst ? "32px 28px 0" : "56px 28px 0" }}>
                            {!isFirst && (
                              <table {...T}><tbody><tr><td style={s.dashedRule}>&nbsp;</td></tr></tbody></table>
                            )}
                          </td></tr>
                          <tr><td style={{ padding: isFirst ? "0 28px 0" : "20px 28px 0" }}>
                            <table {...T}>
                              <tbody><tr>
                                <td valign="top"><div style={s.cardNumeral}>{position}</div></td>
                                <td valign="bottom" style={s.cardKickerTag}>{p.state}</td>
                                <td align="right" valign="bottom" style={s.cardScoreTag}>● {formatScoreInline(p.score)} · Peak</td>
                              </tr></tbody>
                            </table>
                          </td></tr>
                          <tr><td style={{ padding: "12px 28px 0" }}>
                            <a href={`${pageFor(p.id)}${utm(`pick-${position}-image`)}`} style={{ display: "block", textDecoration: "none" }}>
                              <img src={imageUrlFor(p.id)} width="544" height="306" alt={`${p.name}, ${p.state}`} style={s.cardImage} />
                            </a>
                          </td></tr>
                          <tr><td style={{ padding: "14px 28px 0" }}>
                            <a href={`${pageFor(p.id)}${utm(`pick-${position}-name`)}`} style={s.cardName}>{p.name}</a>
                          </td></tr>
                          <tr><td style={s.cardMeta}>
                            {p.state}{p.elevation_m ? ` · ${p.elevation_m.toLocaleString("en-IN")}m` : ""}{p.difficulty ? ` · ${difficultyLabel(p.difficulty)}` : ""}
                          </td></tr>
                          {p.tagline ? <tr><td style={s.cardHook}>{p.tagline}</td></tr> : null}
                          <tr><td style={{ padding: "14px 28px 0" }}>
                            <a href={`${pageFor(p.id)}${utm(`pick-${position}-cta`)}`} style={s.cardCta}>
                              Read the {p.name} {monthLong} guide →
                            </a>
                          </td></tr>
                        </tbody>
                      </table>
                    );
                  })}

                  {/* The rest of the month */}
                  <table {...T}>
                    <tbody>
                      <tr><td style={{ padding: "72px 28px 0" }}><DoubleRule /></td></tr>
                      <tr><td style={s.notebookHeading}>The Rest of {monthLong}</td></tr>
                      <tr><td style={s.notebookLabel}>Also In Season</td></tr>
                      <tr><td style={s.notebookBody}>
                        {others} more places are in their best month. Every one is on the {monthLong} page.
                      </td></tr>
                      <tr><td style={s.notebookLabel}>Next Month</td></tr>
                      <tr><td style={s.notebookBody}>
                        The list changes: most of these close and others open. The Window, our Sunday
                        email, keeps you up to date.
                      </td></tr>
                    </tbody>
                  </table>

                  {/* CTA */}
                  <table {...T}>
                    <tbody><tr><td style={{ padding: "48px 28px 0", textAlign: "center" }}>
                      <a href={`${SITE}/en/where-to-go/${monthSlug}${utm("cta-month")}`} style={s.primaryButton}>
                        See every place for {monthLong} →
                      </a>
                    </td></tr></tbody>
                  </table>

                  {/* Colophon */}
                  <table {...T}>
                    <tbody><tr><td style={{ padding: "60px 28px 40px" }}>
                      <table {...T}><tbody><tr><td style={s.hairline}>&nbsp;</td></tr></tbody></table>
                      <div style={s.colophon}>
                        Sent by NakshIQ because you asked for it.<br />
                        Nothing above is sponsored. We don&apos;t take payment for placement.<br />
                        {monthLong} {year}
                        <div style={{ paddingTop: 12 }}>
                          <a href={`${SITE}/en${utm("colophon")}`} style={s.colophonLink}>Visit</a>
                          {unsubscribeUrl ? (
                            <>
                              {"  ·  "}
                              <a href={unsubscribeUrl} style={s.colophonLink}>Unsubscribe</a>
                            </>
                          ) : null}
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
