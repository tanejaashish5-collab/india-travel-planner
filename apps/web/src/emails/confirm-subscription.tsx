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
  confirmUrl: string;
}

export default function ConfirmSubscription({ confirmUrl }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Confirm your subscription to The Window</Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={h1}>One more click.</Heading>
          <Text style={text}>
            Tap below to confirm your subscription to <strong>The Window</strong> —
            NakshIQ&apos;s weekly travel intelligence, every Sunday morning.
          </Text>
          <Section style={{ textAlign: "center", margin: "32px 0" }}>
            <Link href={confirmUrl} style={button}>
              Confirm my subscription
            </Link>
          </Section>
          <Text style={textMuted}>
            If you didn&apos;t sign up, ignore this email — you won&apos;t hear from us again.
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
  margin: "0 0 16px",
};

const textMuted: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: 1.5,
  color: "#888",
  margin: "24px 0 0",
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

const footer: React.CSSProperties = {
  fontSize: "12px",
  color: "#666",
  marginTop: "40px",
  textAlign: "center",
};

const footerLink: React.CSSProperties = {
  color: "#888",
  textDecoration: "none",
};
