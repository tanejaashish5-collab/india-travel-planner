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
  bestScore: BestScoreBlock;
  skip: SkipBlock | null;
  road: RoadBlock | null;
  changes: ChangeBlock;
  closing: string;
  unsubscribeUrl: string;
  webViewUrl: string;
}

export default function TheWindow(props: WindowIssueProps) {
  const {
    issueNumber,
    monthName,
    year,
    opening,
    bestScore,
    skip,
    road,
    changes,
    closing,
    unsubscribeUrl,
    webViewUrl,
  } = props;

  return (
    <Html>
      <Head />
      <Preview>
        {`${bestScore.name} scores ${bestScore.score}/5 this week. And one place to skip.`}
      </Preview>
      <Body style={body}>
        <Container style={container}>
          {/* Masthead */}
          <Section style={masthead}>
            <Text style={mastheadKicker}>THE WINDOW · ISSUE {String(issueNumber).padStart(3, "0")}</Text>
            <Heading style={mastheadTitle}>NakshIQ</Heading>
            <Text style={mastheadDate}>{monthName} {year} · Sunday</Text>
          </Section>

          <Hr style={hr} />

          {/* Opening */}
          <Text style={openingText}>{opening}</Text>

          {/* Section 1: Best Score */}
          <Section style={blockPrimary}>
            <Text style={blockKicker}>THIS WEEK&apos;S BEST SCORE</Text>
            <Heading style={blockHeading}>
              {bestScore.name}, {bestScore.state}
            </Heading>
            <Text style={scorePill}>
              <span style={scoreNum}>{bestScore.score}/5</span>
            </Text>
            <Text style={blockBody}>{bestScore.note}</Text>
            {bestScore.whyGo && <Text style={blockBody}>{bestScore.whyGo}</Text>}
            <Link href={`https://www.nakshiq.com/en/destination/${bestScore.destinationId}`} style={inlineLink}>
              See full guide →
            </Link>
          </Section>

          {/* Section 2: The Honest Skip */}
          {skip && (
            <Section style={blockSkip}>
              <Text style={blockKicker}>THE HONEST SKIP</Text>
              <Heading style={blockHeading}>Skip {skip.trapName}.</Heading>
              <Text style={blockBody}>{skip.trapReason}</Text>
              <Text style={blockBody}>
                <strong>Go here instead:</strong> {skip.alternativeName}. {skip.alternativeReason}
              </Text>
              <Link href={`https://www.nakshiq.com/en/destination/${skip.alternativeId}`} style={inlineLink}>
                See why →
              </Link>
            </Section>
          )}

          {/* Section 3: Road Intelligence */}
          {road && (
            <Section style={blockRoad}>
              <Text style={blockKicker}>ROAD INTELLIGENCE</Text>
              <Heading style={blockHeading}>{road.title}</Heading>
              <Text style={blockBody}>{road.body}</Text>
              {road.destinationId && (
                <Link href={`https://www.nakshiq.com/en/destination/${road.destinationId}`} style={inlineLink}>
                  Destination details →
                </Link>
              )}
            </Section>
          )}

          {/* Section 4: What Changed */}
          <Section style={blockChanges}>
            <Text style={blockKicker}>WHAT CHANGED</Text>
            <Text style={blockBody}>
              This week we updated <strong>{changes.scoresUpdated}</strong> monthly scores,
              edited <strong>{changes.notesEdited}</strong> destination notes, and added{" "}
              <strong>{changes.destinationsAdded}</strong> new destinations to the database.
            </Text>
            <Link href="https://www.nakshiq.com/en/explore" style={inlineLink}>
              Browse the latest →
            </Link>
          </Section>

          <Hr style={hr} />

          {/* Closing */}
          <Text style={closingText}>{closing}</Text>

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footerText}>
              You&apos;re getting this because you asked for it at{" "}
              <Link href="https://www.nakshiq.com/en/newsletter" style={footerLink}>
                nakshiq.com/newsletter
              </Link>
              . The Window is written by the family that builds NakshIQ. No affiliates.
              No sponsored picks. Just the week&apos;s intelligence.
            </Text>
            <Text style={footerText}>
              <Link href={webViewUrl} style={footerLink}>View in browser</Link>
              {" · "}
              <Link href={unsubscribeUrl} style={footerLink}>Unsubscribe</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// ── Styles ──

const body: React.CSSProperties = {
  backgroundColor: "#161614",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  margin: 0,
  padding: "24px 12px",
};

const container: React.CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "32px 24px",
  backgroundColor: "#1e1e1c",
  borderRadius: "16px",
  color: "#e5e5e5",
};

const masthead: React.CSSProperties = {
  textAlign: "center",
  paddingBottom: "8px",
};

const mastheadKicker: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  color: "#E55642",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  margin: "0 0 4px",
};

const mastheadTitle: React.CSSProperties = {
  fontSize: "32px",
  fontWeight: 800,
  color: "#ffffff",
  margin: "0 0 4px",
  letterSpacing: "-0.5px",
};

const mastheadDate: React.CSSProperties = {
  fontSize: "13px",
  color: "#888",
  margin: "0 0 16px",
};

const hr: React.CSSProperties = {
  borderColor: "#333",
  margin: "24px 0",
};

const openingText: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.7,
  color: "#d4d4d4",
  margin: "0 0 32px",
  fontStyle: "italic",
};

const blockPrimary: React.CSSProperties = {
  padding: "20px",
  backgroundColor: "#252523",
  borderRadius: "12px",
  borderLeft: "3px solid #E55642",
  marginBottom: "20px",
};

const blockSkip: React.CSSProperties = {
  padding: "20px",
  backgroundColor: "#252523",
  borderRadius: "12px",
  borderLeft: "3px solid #eab308",
  marginBottom: "20px",
};

const blockRoad: React.CSSProperties = {
  padding: "20px",
  backgroundColor: "#252523",
  borderRadius: "12px",
  borderLeft: "3px solid #3b82f6",
  marginBottom: "20px",
};

const blockChanges: React.CSSProperties = {
  padding: "20px",
  backgroundColor: "#252523",
  borderRadius: "12px",
  borderLeft: "3px solid #10b981",
  marginBottom: "20px",
};

const blockKicker: React.CSSProperties = {
  fontSize: "10px",
  fontWeight: 700,
  color: "#888",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  margin: "0 0 8px",
};

const blockHeading: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: 700,
  color: "#ffffff",
  margin: "0 0 8px",
  lineHeight: 1.3,
};

const blockBody: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: 1.6,
  color: "#d4d4d4",
  margin: "0 0 12px",
};

const scorePill: React.CSSProperties = {
  display: "inline-block",
  padding: "4px 12px",
  backgroundColor: "#E55642",
  borderRadius: "999px",
  margin: "0 0 12px",
};

const scoreNum: React.CSSProperties = {
  color: "#ffffff",
  fontWeight: 700,
  fontSize: "14px",
};

const inlineLink: React.CSSProperties = {
  color: "#E55642",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "14px",
};

const closingText: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.7,
  color: "#d4d4d4",
  margin: "24px 0 32px",
  fontStyle: "italic",
};

const footerSection: React.CSSProperties = {
  borderTop: "1px solid #333",
  paddingTop: "20px",
  marginTop: "20px",
};

const footerText: React.CSSProperties = {
  fontSize: "12px",
  lineHeight: 1.6,
  color: "#666",
  margin: "0 0 8px",
  textAlign: "center",
};

const footerLink: React.CSSProperties = {
  color: "#888",
  textDecoration: "underline",
};
