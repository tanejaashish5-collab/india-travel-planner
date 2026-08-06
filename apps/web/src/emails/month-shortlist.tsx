import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

// The month shortlist — the artefact the site's newsletter ask now offers.
//
// Every capture surface used to pitch "subscribe to The Window, every Sunday":
// a commitment, with a vague benefit, asked of someone mid-decision. Measured
// 2026-08-06 it converted to zero — 918 human sessions/wk, 0 emails captured.
// This is the replacement: one concrete thing, delivered now, that a reader
// cannot assemble themselves without opening 533 pages.
//
// Data comes from apps/web/src/data/month-shortlist.json, regenerated monthly
// by scripts/build-month-shortlist.mjs. Nothing here is written by a model and
// nothing is estimated — it is our own verified best_months / avoid_months.

export interface MonthShortlistState {
  state: string;
  destinations: { id: string; name: string; tagline: string | null }[];
}

interface Props {
  monthLong: string;
  totals: {
    destinations: number;
    atTheirBest: number;
    inAMonthToAvoid: number;
    listed: number;
  };
  states: MonthShortlistState[];
  unsubscribeUrl?: string;
}

const SITE = "https://www.nakshiq.com";

export default function MonthShortlist({
  monthLong,
  totals,
  states,
  unsubscribeUrl,
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>{`${monthLong}: ${totals.listed} places in India are at their best right now`}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Text style={kicker}>THE {monthLong.toUpperCase()} SHORTLIST</Text>
          <Heading style={h1}>
            {totals.listed} places are at their best this month.
          </Heading>

          <Text style={lede}>
            We check {totals.destinations} destinations against the month
            you&apos;d actually travel. In {monthLong}, {totals.listed} of them
            are in their best window — and {totals.inAMonthToAvoid} are in a
            month we&apos;d tell you to skip. Here are the ones worth your time.
          </Text>

          <Hr style={rule} />

          {states.map((s) => (
            <Section key={s.state} style={stateSection}>
              <Text style={stateName}>
                {s.state}
                <span style={stateCount}>
                  {" · "}
                  {s.destinations.length}
                </span>
              </Text>
              {s.destinations.map((d) => (
                <Link key={d.id} href={`${SITE}/en/destination/${d.id}`} style={item}>
                  <strong style={itemName}>{d.name}</strong>
                  {d.tagline ? <span style={itemTagline}>{d.tagline}</span> : null}
                </Link>
              ))}
            </Section>
          ))}

          <Hr style={rule} />

          <Text style={text}>
            Next month the list changes — most of these close and others open.
            We&apos;ll send the new one when it does.
          </Text>

          <Text style={footer}>
            Sent by NakshIQ. We don&apos;t take payment for placement, and
            nothing above is sponsored.
            {unsubscribeUrl ? (
              <>
                {" "}
                <Link href={unsubscribeUrl} style={footerLink}>
                  Unsubscribe
                </Link>
                .
              </>
            ) : null}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const body: React.CSSProperties = {
  backgroundColor: "#f6f5f3",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  margin: 0,
  padding: "32px 0",
};

const container: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: 8,
  margin: "0 auto",
  maxWidth: 600,
  padding: "40px 36px",
};

const kicker: React.CSSProperties = {
  color: "#9a3412",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.08em",
  margin: "0 0 12px",
};

const h1: React.CSSProperties = {
  color: "#1c1917",
  fontSize: 27,
  fontWeight: 600,
  lineHeight: 1.25,
  margin: "0 0 16px",
};

const lede: React.CSSProperties = {
  color: "#44403c",
  fontSize: 16,
  lineHeight: 1.6,
  margin: "0 0 8px",
};

const text: React.CSSProperties = {
  color: "#44403c",
  fontSize: 15,
  lineHeight: 1.6,
  margin: "16px 0",
};

const rule: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid #e7e5e4",
  margin: "28px 0",
};

const stateSection: React.CSSProperties = { margin: "0 0 26px" };

const stateName: React.CSSProperties = {
  color: "#1c1917",
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.08em",
  margin: "0 0 10px",
  textTransform: "uppercase",
};

const stateCount: React.CSSProperties = { color: "#a8a29e", fontWeight: 400 };

const item: React.CSSProperties = {
  borderLeft: "2px solid #e7e5e4",
  display: "block",
  margin: "0 0 12px",
  paddingLeft: 12,
  textDecoration: "none",
};

const itemName: React.CSSProperties = {
  color: "#1c1917",
  display: "block",
  fontSize: 15,
  fontWeight: 600,
};

const itemTagline: React.CSSProperties = {
  color: "#57534e",
  display: "block",
  fontSize: 13.5,
  lineHeight: 1.5,
  marginTop: 2,
};

const footer: React.CSSProperties = {
  borderTop: "1px solid #e7e5e4",
  color: "#78716c",
  fontSize: 12.5,
  lineHeight: 1.6,
  margin: "28px 0 0",
  paddingTop: 16,
};

const footerLink: React.CSSProperties = { color: "#78716c" };
