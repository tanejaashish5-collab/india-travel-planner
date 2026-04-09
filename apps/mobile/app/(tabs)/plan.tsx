import { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../../lib/theme";
import { useDestinations } from "../../hooks/useDestinations";

type TravelerType = "solo" | "couple" | "family" | "biker" | "backpacker" | "spiritual";

const TRAVELER_TYPES: { id: TravelerType; label: string; icon: string }[] = [
  { id: "solo", label: "Solo", icon: "🎒" },
  { id: "couple", label: "Couple", icon: "💑" },
  { id: "family", label: "Family", icon: "👨‍👩‍👧" },
  { id: "biker", label: "Biker", icon: "🏍️" },
  { id: "backpacker", label: "Backpacker", icon: "🏕️" },
  { id: "spiritual", label: "Spiritual", icon: "🕉️" },
];

const BUDGET_OPTIONS = [
  { id: "budget", label: "Budget", desc: "₹500-2K/day" },
  { id: "mid-range", label: "Mid-range", desc: "₹2-5K/day" },
  { id: "splurge", label: "Luxury", desc: "₹5K+/day" },
];

const ORIGINS = ["Delhi", "Mumbai", "Bangalore", "Kolkata", "Chandigarh", "Other"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const MONTH_FULL = ["","January","February","March","April","May","June","July","August","September","October","November","December"];

const SCORE_COLOR: Record<number, string> = {
  5: colors.score5, 4: colors.score4, 3: colors.score3, 2: colors.score2, 1: colors.score1,
};
const DIFF_COLOR: Record<string, string> = {
  easy: colors.easy, moderate: colors.moderate, hard: colors.hard, extreme: colors.extreme,
};

export default function PlanScreen() {
  const { destinations, loading: destsLoading } = useDestinations();
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [days, setDays] = useState(7);
  const [traveler, setTraveler] = useState<TravelerType>("couple");
  const [budget, setBudget] = useState("mid-range");
  const [origin, setOrigin] = useState("Delhi");
  const [showResults, setShowResults] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [itinerary, setItinerary] = useState<any>(null);

  const recommendations = useMemo(() => {
    if (!showResults) return [];
    return destinations
      .map((dest) => {
        const kf = Array.isArray(dest.kids_friendly) ? dest.kids_friendly?.[0] : dest.kids_friendly;
        const monthData = dest.destination_months?.find((m) => m.month === month);
        const score = monthData?.score ?? 0;
        const stateName = dest.state && !Array.isArray(dest.state) ? dest.state.name : "";

        let fitScore = score * 20;
        if (traveler === "family" && kf?.suitable) fitScore += kf.rating * 5;
        if (traveler === "family" && !kf?.suitable) fitScore -= 30;
        if (traveler === "biker" && dest.tags?.includes("biker")) fitScore += 20;
        if (traveler === "spiritual" && dest.tags?.includes("spiritual")) fitScore += 20;
        if (traveler === "backpacker" && dest.tags?.includes("offbeat")) fitScore += 10;
        if (days <= 4 && dest.difficulty === "hard") fitScore -= 15;

        const nearDelhi = ["himachal-pradesh", "uttarakhand", "rajasthan", "uttar-pradesh", "punjab", "haryana"];
        if (days <= 5 && origin === "Delhi" && nearDelhi.includes(dest.state_id)) fitScore += 8;

        const reasons: string[] = [];
        if (score >= 4) reasons.push(`Scores ${score}/5 in ${MONTH_FULL[month]}`);
        if (traveler === "family" && kf?.suitable) reasons.push(`Kids: ${kf.rating}/5`);
        if (traveler === "biker" && dest.tags?.includes("biker")) reasons.push("Biker-friendly");

        const warnings: string[] = [];
        if (score <= 2 && score > 0) warnings.push(`Low season (${score}/5)`);
        if (traveler === "family" && !kf?.suitable) warnings.push("Not ideal for kids");
        if (dest.difficulty === "extreme") warnings.push("Extreme conditions");
        if (dest.elevation_m && dest.elevation_m > 4000) warnings.push(`AMS risk (${dest.elevation_m}m)`);

        return { ...dest, fitScore, monthScore: score, stateName, reasons, warnings };
      })
      .filter((d) => d.fitScore > 30)
      .sort((a, b) => b.fitScore - a.fitScore)
      .slice(0, 10);
  }, [destinations, month, days, traveler, budget, origin, showResults]);

  async function generateAI() {
    if (recommendations.length === 0) return;
    const webUrl = process.env.EXPO_PUBLIC_WEB_URL;
    if (!webUrl) {
      Alert.alert("Setup needed", "Set EXPO_PUBLIC_WEB_URL in your .env.local");
      return;
    }
    setAiLoading(true);
    try {
      const res = await fetch(`${webUrl}/api/itinerary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          month, days, travelerType: traveler, budget, origin,
          destinationIds: recommendations.slice(0, 8).map((r) => r.id),
        }),
      });
      const data = await res.json();
      if (data.itinerary) setItinerary(data.itinerary);
      else Alert.alert("Error", data.error || "Could not generate itinerary");
    } catch {
      Alert.alert("Error", "Network error — check your connection");
    } finally {
      setAiLoading(false);
    }
  }

  if (destsLoading) {
    return <View style={styles.center}><ActivityIndicator size="large" color={colors.primary} /></View>;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Plan Your Trip</Text>
      <Text style={styles.subtitle}>Match from {destinations.length} destinations</Text>

      {/* Origin */}
      <Text style={styles.label}>Traveling from</Text>
      <View style={styles.chipRow}>
        {ORIGINS.map((city) => (
          <TouchableOpacity key={city} style={[styles.chip, origin === city && styles.chipActive]} onPress={() => setOrigin(city)}>
            <Text style={[styles.chipText, origin === city && styles.chipTextActive]}>{city}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Month */}
      <Text style={styles.label}>When?</Text>
      <View style={styles.monthRow}>
        {MONTHS.map((m, i) => (
          <TouchableOpacity key={m} style={[styles.monthChip, month === i + 1 && styles.monthChipActive]} onPress={() => setMonth(i + 1)}>
            <Text style={[styles.monthText, month === i + 1 && styles.monthTextActive]}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Days */}
      <Text style={styles.label}>How many days? <Text style={styles.accent}>{days}d</Text></Text>
      <View style={styles.chipRow}>
        {[3, 5, 7, 10, 14, 21, 30].map((d) => (
          <TouchableOpacity key={d} style={[styles.chip, days === d && styles.chipActive]} onPress={() => setDays(d)}>
            <Text style={[styles.chipText, days === d && styles.chipTextActive]}>{d}d</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Traveler Type */}
      <Text style={styles.label}>Who's going?</Text>
      <View style={styles.travelerRow}>
        {TRAVELER_TYPES.map((t) => (
          <TouchableOpacity key={t.id} style={[styles.travelerCard, traveler === t.id && styles.cardActive]} onPress={() => setTraveler(t.id)}>
            <Text style={{ fontSize: 24 }}>{t.icon}</Text>
            <Text style={[styles.cardLabel, traveler === t.id && styles.cardLabelActive]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Budget */}
      <Text style={styles.label}>Budget</Text>
      <View style={styles.budgetRow}>
        {BUDGET_OPTIONS.map((b) => (
          <TouchableOpacity key={b.id} style={[styles.budgetCard, budget === b.id && styles.cardActive]} onPress={() => setBudget(b.id)}>
            <Text style={[styles.cardLabel, budget === b.id && styles.cardLabelActive]}>{b.label}</Text>
            <Text style={styles.budgetDesc}>{b.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Find */}
      <TouchableOpacity style={styles.primaryBtn} onPress={() => setShowResults(true)}>
        <Text style={styles.primaryBtnText}>Find My Destinations →</Text>
      </TouchableOpacity>

      {/* Results */}
      {showResults && (
        <View style={{ marginTop: spacing.xl }}>
          <Text style={styles.resultsTitle}>{recommendations.length} destinations match</Text>
          <Text style={styles.resultsMeta}>
            {origin} · {MONTH_FULL[month]} · {days}d · {TRAVELER_TYPES.find((t) => t.id === traveler)?.label}
          </Text>

          {recommendations.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={{ fontSize: 40 }}>🤔</Text>
              <Text style={styles.emptyText}>No strong matches. Try different preferences.</Text>
            </View>
          ) : (
            <>
              {recommendations.map((dest, idx) => (
                <TouchableOpacity key={dest.id} style={styles.recCard} onPress={() => router.push(`/destination/${dest.id}`)}>
                  <View style={styles.recHeader}>
                    <View style={styles.rankBadge}><Text style={styles.rankText}>#{idx + 1}</Text></View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.recName}>{dest.name}</Text>
                      <Text style={styles.recMeta}>
                        {dest.stateName} · <Text style={{ color: DIFF_COLOR[dest.difficulty] }}>{dest.difficulty}</Text>
                        {dest.elevation_m ? ` · ${dest.elevation_m.toLocaleString()}m` : ""}
                      </Text>
                    </View>
                    <View style={[styles.scorePill, { borderColor: SCORE_COLOR[dest.monthScore] || colors.border }]}>
                      <Text style={{ fontSize: fontSize.xs, fontWeight: "700", color: SCORE_COLOR[dest.monthScore] || colors.mutedForeground }}>{dest.monthScore}/5</Text>
                    </View>
                  </View>
                  <Text style={styles.tagline} numberOfLines={2}>{dest.tagline}</Text>
                  {dest.reasons.map((r, i) => <Text key={i} style={styles.reason}>✓ {r}</Text>)}
                  {dest.warnings.map((w, i) => <Text key={i} style={styles.warn}>⚠ {w}</Text>)}
                </TouchableOpacity>
              ))}

              <TouchableOpacity style={[styles.primaryBtn, aiLoading && { opacity: 0.6 }]} onPress={generateAI} disabled={aiLoading}>
                {aiLoading ? <ActivityIndicator color={colors.primaryForeground} /> : <Text style={styles.primaryBtnText}>✨ Generate AI Itinerary</Text>}
              </TouchableOpacity>
            </>
          )}

          {/* AI Itinerary */}
          {itinerary && (
            <View style={styles.itinCard}>
              <Text style={styles.itinTitle}>{itinerary.title}</Text>
              <Text style={styles.itinSummary}>{itinerary.summary}</Text>

              {itinerary.days?.map((day: any) => (
                <View key={day.day} style={styles.dayCard}>
                  <View style={styles.dayHeader}>
                    <View style={styles.dayBadge}><Text style={styles.dayBadgeText}>Day {day.day}</Text></View>
                    <Text style={styles.dayTitle} numberOfLines={1}>{day.title}</Text>
                  </View>
                  {day.destinationName && <Text style={styles.dayLine}>📍 {day.destinationName}</Text>}
                  {day.activities?.map((a: string, i: number) => <Text key={i} style={styles.dayActivity}>• {a}</Text>)}
                  {day.stayAt && <Text style={styles.dayMuted}>🏨 {day.stayAt}</Text>}
                  {day.travelTime && <Text style={styles.dayMuted}>🚗 {day.travelTime}</Text>}
                  {day.tips && <Text style={[styles.dayMuted, { color: colors.score4 }]}>💡 {day.tips}</Text>}
                  {day.meals && <Text style={styles.dayMuted}>🍽️ {day.meals}</Text>}
                </View>
              ))}

              {itinerary.estimatedBudget && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Estimated Budget (per person)</Text>
                  {Object.entries(itinerary.estimatedBudget).map(([tier, amt]) => (
                    <View key={tier} style={styles.budgetEstRow}>
                      <Text style={styles.budgetTier}>{tier}</Text>
                      <Text style={styles.budgetAmt}>{amt as string}</Text>
                    </View>
                  ))}
                </View>
              )}

              {itinerary.packingTips?.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>🎒 Packing Tips</Text>
                  {itinerary.packingTips.map((t: string, i: number) => <Text key={i} style={styles.bulletItem}>• {t}</Text>)}
                </View>
              )}

              {itinerary.warnings?.length > 0 && (
                <View style={[styles.section, { borderColor: "rgba(245,158,11,0.3)" }]}>
                  <Text style={styles.sectionTitle}>⚠️ Warnings</Text>
                  {itinerary.warnings.map((w: string, i: number) => <Text key={i} style={[styles.bulletItem, { color: "#f59e0b" }]}>• {w}</Text>)}
                </View>
              )}
            </View>
          )}
        </View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  center: { flex: 1, backgroundColor: colors.background, justifyContent: "center", alignItems: "center" },
  title: { fontSize: fontSize["2xl"], fontWeight: "700", color: colors.foreground },
  subtitle: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.xs, marginBottom: spacing.lg },
  label: { fontSize: fontSize.sm, fontWeight: "600", color: colors.foreground, marginTop: spacing.lg, marginBottom: spacing.sm },
  accent: { fontFamily: "monospace", color: colors.primary },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: borderRadius.sm, borderWidth: 1, borderColor: colors.border },
  chipActive: { borderColor: colors.primary, backgroundColor: "rgba(229,229,229,0.1)" },
  chipText: { fontSize: fontSize.sm, color: colors.mutedForeground },
  chipTextActive: { color: colors.foreground },
  monthRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  monthChip: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: borderRadius.sm, backgroundColor: colors.muted },
  monthChipActive: { backgroundColor: colors.primary },
  monthText: { fontSize: fontSize.xs, fontWeight: "600", color: colors.mutedForeground },
  monthTextActive: { color: colors.primaryForeground },
  travelerRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  travelerCard: { width: "30%", borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md, padding: spacing.sm, alignItems: "center" },
  cardActive: { borderColor: colors.primary, backgroundColor: "rgba(229,229,229,0.1)" },
  cardLabel: { fontSize: fontSize.xs, fontWeight: "600", color: colors.mutedForeground, marginTop: 4 },
  cardLabelActive: { color: colors.foreground },
  budgetRow: { flexDirection: "row", gap: spacing.sm },
  budgetCard: { flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md, padding: spacing.sm, alignItems: "center" },
  budgetDesc: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 2 },
  primaryBtn: { marginTop: spacing.lg, backgroundColor: colors.primary, paddingVertical: 16, borderRadius: borderRadius.lg, alignItems: "center" },
  primaryBtnText: { fontSize: fontSize.base, fontWeight: "700", color: colors.primaryForeground },
  resultsTitle: { fontSize: fontSize.xl, fontWeight: "700", color: colors.foreground },
  resultsMeta: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 4, marginBottom: spacing.md },
  emptyCard: { backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.xl, alignItems: "center", borderWidth: 1, borderColor: colors.border },
  emptyText: { fontSize: fontSize.sm, color: colors.mutedForeground, textAlign: "center", marginTop: spacing.sm },
  recCard: { backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  recHeader: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  rankBadge: { width: 28, height: 28, borderRadius: 14, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  rankText: { fontSize: fontSize.xs, fontWeight: "700", color: colors.primary, fontFamily: "monospace" },
  recName: { fontSize: fontSize.base, fontWeight: "700", color: colors.foreground },
  recMeta: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 2 },
  scorePill: { borderWidth: 1, borderRadius: borderRadius.full, paddingHorizontal: 8, paddingVertical: 4 },
  tagline: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.sm },
  reason: { fontSize: fontSize.xs, color: colors.score5, marginTop: 3 },
  warn: { fontSize: fontSize.xs, color: "#f59e0b", marginTop: 3 },
  itinCard: { marginTop: spacing.lg, backgroundColor: colors.card, borderRadius: borderRadius.lg, padding: spacing.md, borderWidth: 1, borderColor: colors.border },
  itinTitle: { fontSize: fontSize.xl, fontWeight: "700", color: colors.foreground },
  itinSummary: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.xs, marginBottom: spacing.md, lineHeight: 20 },
  dayCard: { backgroundColor: colors.muted, borderRadius: borderRadius.sm, padding: spacing.md, marginBottom: spacing.sm },
  dayHeader: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.sm },
  dayBadge: { backgroundColor: colors.primary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: borderRadius.full },
  dayBadgeText: { fontSize: fontSize.xs, fontWeight: "700", color: colors.primaryForeground },
  dayTitle: { fontSize: fontSize.sm, fontWeight: "700", color: colors.foreground, flex: 1 },
  dayLine: { fontSize: fontSize.sm, color: colors.foreground, marginBottom: 4 },
  dayActivity: { fontSize: fontSize.sm, color: colors.mutedForeground, marginLeft: spacing.sm, marginBottom: 2 },
  dayMuted: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 4 },
  section: { marginTop: spacing.md, borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.sm, padding: spacing.md },
  sectionTitle: { fontSize: fontSize.sm, fontWeight: "700", color: colors.foreground, marginBottom: spacing.sm },
  budgetEstRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 },
  budgetTier: { fontSize: fontSize.sm, color: colors.mutedForeground, textTransform: "capitalize" },
  budgetAmt: { fontSize: fontSize.sm, color: colors.foreground, fontFamily: "monospace" },
  bulletItem: { fontSize: fontSize.sm, color: colors.mutedForeground, marginBottom: 3, lineHeight: 20 },
});
