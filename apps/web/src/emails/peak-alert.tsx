import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface Props {
  destinationName: string;
  destinationSlug: string;
  peakMonthName: string;
  peakMonthSlug: string;
  score: number;
  verdict: string;
  scoreNote?: string;
  unsubscribeUrl: string;
  unsubscribeAllUrl?: string;
}

export default function PeakAlert({
  destinationName,
  destinationSlug,
  peakMonthName,
  peakMonthSlug,
  score,
  verdict,
  scoreNote,
  unsubscribeUrl,
  unsubscribeAllUrl,
}: Props) {
  const monthLink = `https://www.nakshiq.com/en/destination/${destinationSlug}/${peakMonthSlug}`;
  const destLink = `https://www.nakshiq.com/en/destination/${destinationSlug}`;
  const verdictDisplay = verdict.toUpperCase();

  return (
    <Html>
      <Head />
      <Preview>{`${destinationName} hits its peak in ${peakMonthName} — about 3 weeks out`}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Text style={kicker}>PEAK ALERT · {peakMonthName.toUpperCase()}</Text>
          <Heading style={h1}>{destinationName} is about 3 weeks out.</Heading>
          <Text style={text}>
            You asked us to flag <strong>{destinationName}</strong> when its best month came around.
            That month is <strong>{peakMonthName}</strong>, and it&apos;s close.
          </Text>

          <Section style={card}>
            <Text style={cardLabel}>NAKSHIQ VERDICT</Text>
            <Text style={cardVerdict}>{verdictDisplay} · {score}/5</Text>
            {scoreNote && <Text style={cardNote}>{scoreNote}</Text>}
          </Section>

          <Section style={{ textAlign: "center", margin: "28px 0" }}>
            <Link href={monthLink} style={button}>
              Read {destinationName} in {peakMonthName}
            </Link>
          </Section>

          <Text style={textMuted}>
            Why we&apos;re telling you now: booking, train tickets, and lodge availability tighten 2-3 weeks before peak.
            If you can lock dates this week, you&apos;ll have options. Wait another 10 days and you&apos;ll be paying premium rates.
          </Text>

          <Text style={textMuted}>
            Want the full picture?{" "}
            <Link href={destLink} style={inlineLink}>The {destinationName} guide</Link>{" "}
            covers reach, costs, scams, and the 12-month scoreboard.
          </Text>

          <Text style={footer}>
            <Link href={unsubscribeUrl} style={footerLink}>Unsubscribe from {destinationName} alerts only</Link>
            {unsubscribeAllUrl && (
              <>
                {" · "}
                <Link href={unsubscribeAllUrl} style={footerLink}>Unsubscribe from all NakshIQ emails</Link>
              </>
            )}
          </Text>
          <Text style={footer}>
            NakshIQ · Travel intelligence for India · <Link href="https://www.nakshiq.com" style={footerLink}>nakshiq.com</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const body: React.CSSProperties = {
  backgroundColor: "#161614",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  margin: 0,
  padding: "40px 0",
};
const container: React.CSSProperties = {
  maxWidth: "560px",
  margin: "0 auto",
  padding: "40px 24px",
  backgroundColor: "#1e1e1c",
  borderRadius: "16px",
  color: "#e5e5e5",
};
const kicker: React.CSSProperties = {
  fontSize: "11px",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#E55642",
  margin: "0 0 12px",
  fontWeight: 600,
};
const h1: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: 700,
  color: "#ffffff",
  margin: "0 0 16px",
  lineHeight: 1.2,
};
const text: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.6,
  color: "#e5e5e5",
  margin: "0 0 20px",
};
const textMuted: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: 1.6,
  color: "#aaa",
  margin: "16px 0 0",
};
const card: React.CSSProperties = {
  backgroundColor: "#262624",
  borderLeft: "3px solid #E55642",
  padding: "16px 20px",
  margin: "24px 0",
  borderRadius: "4px",
};
const cardLabel: React.CSSProperties = {
  fontSize: "10px",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#888",
  margin: "0 0 6px",
  fontWeight: 600,
};
const cardVerdict: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: 700,
  color: "#fff",
  margin: "0 0 8px",
};
const cardNote: React.CSSProperties = {
  fontSize: "14px",
  color: "#bbb",
  margin: "0",
  lineHeight: 1.5,
};
const button: React.CSSProperties = {
  backgroundColor: "#E55642",
  color: "#ffffff",
  padding: "14px 32px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "15px",
  display: "inline-block",
};
const inlineLink: React.CSSProperties = {
  color: "#E55642",
  textDecoration: "underline",
};
const footer: React.CSSProperties = {
  fontSize: "12px",
  color: "#666",
  marginTop: "32px",
  textAlign: "center",
};
const footerLink: React.CSSProperties = {
  color: "#888",
  textDecoration: "none",
};
