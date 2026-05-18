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
  destinations: { id: string; name: string }[];
}

export default function SavedListWelcome({ destinations }: Props) {
  const count = destinations.length;
  return (
    <Html>
      <Head />
      <Preview>{`Your NakshIQ wishlist — ${count} destination${count === 1 ? "" : "s"}`}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Text style={kicker}>YOUR WISHLIST · {count} DESTINATION{count === 1 ? "" : "S"}</Text>
          <Heading style={h1}>{count === 1 ? "Saved." : `Your ${count}-destination shortlist.`}</Heading>
          <Text style={text}>
            We&apos;ve saved your shortlist. Here it is in one place — easy to share, easy to come back to.
          </Text>
          <Section style={listSection}>
            {destinations.map((d) => (
              <Link
                key={d.id}
                href={`https://www.nakshiq.com/en/destination/${d.id}`}
                style={listItem}
              >
                <strong style={listItemName}>{d.name}</strong>
                <span style={listItemHint}>nakshiq.com/destination/{d.id}</span>
              </Link>
            ))}
          </Section>
          <Text style={text}>
            <strong>What happens next:</strong> we&apos;ll email you about 3 weeks before each destination hits its peak month —
            no spam in between. If a destination doesn&apos;t have a clearly best month, we won&apos;t bother you about it.
          </Text>
          <Text style={textMuted}>
            You&apos;re also subscribed to <strong>The Window</strong> — our weekly Sunday-morning briefing on where to go in India.
            Check your inbox for the confirmation link.
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
const listSection: React.CSSProperties = {
  margin: "24px 0",
};
const listItem: React.CSSProperties = {
  display: "block",
  padding: "12px 16px",
  margin: "0 0 8px",
  backgroundColor: "#262624",
  borderLeft: "2px solid #E55642",
  borderRadius: "4px",
  color: "#e5e5e5",
  textDecoration: "none",
};
const listItemName: React.CSSProperties = {
  display: "block",
  fontSize: "15px",
  color: "#fff",
  marginBottom: "2px",
};
const listItemHint: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  color: "#666",
  fontFamily: "ui-monospace, monospace",
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
