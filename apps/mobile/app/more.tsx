import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router, Stack } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";

const NAKSHIQ_BASE = "https://nakshiq.com";

function openWeb(path: string) {
  return WebBrowser.openBrowserAsync(`${NAKSHIQ_BASE}${path}?utm_source=mobile_more`);
}

type RowKind = "native" | "web";
type Row = {
  label: string;
  desc: string;
  // For native, target is an in-app expo-router path; for web, it's the nakshiq.com path.
  kind: RowKind;
  target: string;
};

type Group = { title: string; rows: Row[] };

// In-app browser for content-heavy pages keeps content single-sourced on web.
const GROUPS: Group[] = [
  {
    title: "Plan your trip",
    rows: [
      { label: "Build a route", desc: "Sequence multiple destinations into one trip.", kind: "native", target: "/build-route" },
      { label: "Compare destinations", desc: "Side-by-side scores, costs, and difficulty.", kind: "native", target: "/compare" },
      { label: "Cost Index", desc: "Real per-destination travel costs by season.", kind: "web", target: "/en/cost-index" },
      { label: "Risk quiz", desc: "Quick self-assessment for trip readiness.", kind: "web", target: "/en/risk-quiz" },
      { label: "Weekend from your city", desc: "Quick getaways from 6 metros.", kind: "web", target: "/en/weekend-from" },
      { label: "Airport arrival guides", desc: "First 4 hours at any major airport.", kind: "web", target: "/en/arrival" },
      { label: "Permits", desc: "Inner-line and protected-area permits.", kind: "native", target: "/permits" },
      { label: "Road status", desc: "Pass closures and seasonal road status.", kind: "native", target: "/road-conditions" },
    ],
  },
  {
    title: "Discover India",
    rows: [
      { label: "NakshIQ 100", desc: "The 100 best destination-months in India.", kind: "web", target: "/en/nakshiq-100" },
      { label: "By persona", desc: "Solo, family, biker, photographer, and more.", kind: "native", target: "/personas" },
      { label: "India vs the world", desc: "Vietnam, Morocco, Peru, Egypt comparisons.", kind: "web", target: "/en/india-vs" },
      { label: "Skip list", desc: "Overhyped places we'd recommend skipping.", kind: "web", target: "/en/skip-list" },
      { label: "Tourist traps", desc: "Common traps with honest alternatives.", kind: "native", target: "/tourist-traps" },
      { label: "The Window", desc: "Our weekly newsletter, archived.", kind: "web", target: "/en/the-window" },
      { label: "Guides", desc: "Visa, food safety, etiquette, packing.", kind: "web", target: "/en/guide" },
    ],
  },
  {
    title: "About NakshIQ",
    rows: [
      { label: "About", desc: "Why this exists and who's building it.", kind: "web", target: "/en/about" },
      { label: "How we score", desc: "How destinations are rated, every month.", kind: "web", target: "/en/methodology" },
      { label: "Editorial policy", desc: "Standards we hold every page to.", kind: "web", target: "/en/editorial-policy" },
      { label: "Press & research", desc: "Citation-ready datasets and coverage.", kind: "web", target: "/en/press" },
      { label: "Newsletter", desc: "One honest spread, every Sunday.", kind: "web", target: "/en/newsletter" },
    ],
  },
  {
    title: "Help & legal",
    rows: [
      { label: "Corrections", desc: "Suggest an edit or report a mistake.", kind: "web", target: "/en/corrections" },
      { label: "Contact", desc: "Reach the editor directly.", kind: "web", target: "/en/contact" },
      { label: "SOS", desc: "Emergency contacts and helplines.", kind: "native", target: "/sos" },
      { label: "Privacy", desc: "Privacy policy.", kind: "web", target: "/en/privacy" },
      { label: "Terms", desc: "Terms of service.", kind: "web", target: "/en/terms" },
      { label: "Cookies", desc: "Cookie policy.", kind: "web", target: "/en/cookies" },
    ],
  },
];

export default function MoreScreen() {
  function handlePress(row: Row) {
    if (row.kind === "native") {
      router.push(row.target as any);
    } else {
      openWeb(row.target);
    }
  }

  return (
    <>
      <Stack.Screen options={{ title: "More", headerBackTitle: "Back" }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.heading}>More</Text>
        <Text style={styles.subhead}>
          Every NakshIQ tool, guide, and policy in one place.
        </Text>

        {GROUPS.map((group) => (
          <View key={group.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{group.title}</Text>
            <View style={styles.rows}>
              {group.rows.map((row) => (
                <TouchableOpacity
                  key={row.label}
                  style={styles.row}
                  onPress={() => handlePress(row)}
                  activeOpacity={0.7}
                >
                  <View style={styles.rowText}>
                    <Text style={styles.rowLabel}>{row.label}</Text>
                    <Text style={styles.rowDesc}>{row.desc}</Text>
                  </View>
                  <Text style={styles.rowChevron}>{row.kind === "web" ? "↗" : "→"}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  heading: { fontSize: fontSize["3xl"], fontWeight: "700", color: colors.foreground },
  subhead: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.xs, marginBottom: spacing.xl },

  section: { marginBottom: spacing.xl },
  sectionTitle: {
    fontSize: fontSize.xs,
    fontWeight: "700",
    color: colors.mutedForeground,
    textTransform: "uppercase",
    letterSpacing: 1.4,
    marginBottom: spacing.sm,
  },
  rows: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowText: { flex: 1 },
  rowLabel: { fontSize: fontSize.base, fontWeight: "600", color: colors.foreground },
  rowDesc: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 2, lineHeight: 16 },
  rowChevron: { fontSize: fontSize.base, color: colors.mutedForeground, marginLeft: spacing.sm },
});
