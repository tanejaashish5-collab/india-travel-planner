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
      <Preview>
        You&apos;re not subscribed yet — one tap confirms it. The Window
        won&apos;t arrive until you do.
      </Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={h1}>One tap to finish.</Heading>
          <Text style={text}>
            You&apos;re <strong>not subscribed to The Window yet</strong> — one
            tap confirms it. Then, every Sunday morning: the one place in India
            worth your trip that week, the tourist trap to skip, and what
            changed on the ground.
          </Text>
          <Section style={{ textAlign: "center", margin: "36px 0 24px" }}>
            <Link href={confirmUrl} style={button}>
              Confirm my subscription
            </Link>
          </Section>
          <Text style={textFallback}>
            Button not working? Paste this link into your browser:
            <br />
            <Link href={confirmUrl} style={fallbackLink}>
              {confirmUrl}
            </Link>
          </Text>
          <Text style={textMuted}>
            If you didn&apos;t sign up, ignore this email — you won&apos;t hear
            from us again.
          </Text>
          <Text style={footer}>
            NakshIQ · Honest travel guidance for India ·{" "}
            <Link href="https://www.nakshiq.com" style={footerLink}>
              nakshiq.com
            </Link>
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

const textFallback: React.CSSProperties = {
  fontSize: "13px",
  lineHeight: 1.6,
  color: "#9a9a9a",
  margin: "0 0 8px",
  textAlign: "center",
  wordBreak: "break-all",
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
  padding: "18px 44px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: 700,
  fontSize: "16px",
  display: "inline-block",
};

const fallbackLink: React.CSSProperties = {
  color: "#E5765a",
  textDecoration: "underline",
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
