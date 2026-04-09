import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Share,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../../lib/theme";
import { useDestination } from "../../hooks/useDestinations";
import { useSavedItems } from "../../hooks/useSavedItems";

const { width } = Dimensions.get("window");
const MONTH_SHORT = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const SCORE_COLORS: Record<number, string> = {
  5: colors.score5, 4: colors.score4, 3: colors.score3, 2: colors.score2, 1: colors.score1,
};
const DIFF_COLORS: Record<string, string> = {
  easy: colors.easy, moderate: colors.moderate, hard: colors.hard, extreme: colors.extreme,
};

export default function DestinationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { destination: dest, loading } = useDestination(id);
  const { isSaved, toggleSaved } = useSavedItems();
  const [activeTab, setActiveTab] = useState("overview");
  const currentMonth = new Date().getMonth() + 1;

  if (loading || !dest) {
    return (
      <View style={[styles.container, styles.center]}>
        <Stack.Screen options={{ title: "Loading..." }} />
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const stateName = Array.isArray(dest.state) ? dest.state[0]?.name : dest.state?.name;
  const kf = Array.isArray(dest.kids_friendly) ? dest.kids_friendly?.[0] : dest.kids_friendly;
  const cc = Array.isArray(dest.confidence_cards) ? dest.confidence_cards?.[0] : dest.confidence_cards;
  const currentMonthData = dest.destination_months?.find((m: any) => m.month === currentMonth);
  const currentScore = currentMonthData?.score ?? null;

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "monthly", label: "Monthly" },
    ...(kf ? [{ id: "kids", label: "Kids" }] : []),
    ...(cc ? [{ id: "safety", label: "Safety" }] : []),
  ];

  async function handleShare() {
    await Share.share({
      message: `${dest.name} — ${dest.tagline}\n\nCheck it out on NakshIQ`,
      title: dest.name,
    });
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen options={{ title: dest.name, headerBackTitle: "Back" }} />

      {/* Hero image */}
      <View style={styles.heroContainer}>
        <Image
          source={{ uri: `https://web-blond-zeta.vercel.app/images/destinations/${dest.id}.jpg` }}
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay} />

        {/* Difficulty badge */}
        <View style={[styles.diffBadge, { backgroundColor: DIFF_COLORS[dest.difficulty] + "33" }]}>
          <Text style={[styles.diffBadgeText, { color: DIFF_COLORS[dest.difficulty] }]}>{dest.difficulty}</Text>
        </View>

        {/* Score */}
        {currentScore !== null && (
          <View style={[styles.scoreCard, { backgroundColor: SCORE_COLORS[currentScore] || colors.muted }]}>
            <Text style={styles.scoreNum}>{currentScore}/5</Text>
            <Text style={styles.scoreMonth}>{MONTH_SHORT[currentMonth]}</Text>
          </View>
        )}
      </View>

      {/* Info card */}
      <View style={styles.infoCard}>
        <Text style={styles.destName}>{dest.name}</Text>
        <Text style={styles.destMeta}>
          {stateName} · {dest.region}
          {dest.elevation_m ? ` · ${dest.elevation_m.toLocaleString()}m` : ""}
        </Text>

        {/* Vehicle + Family */}
        {dest.vehicle_fit && (
          <View style={styles.badgeRow}>
            <Text style={styles.badge}>🚗 {dest.vehicle_fit}</Text>
          </View>
        )}
        {dest.family_stress && (
          <Text style={styles.familyStress}>👨‍👩‍👧 {dest.family_stress}</Text>
        )}

        {/* Score explanation */}
        {currentMonthData?.note && (
          <View style={styles.scoreExplain}>
            <Text style={styles.scoreExplainLabel}>Why {currentScore}/5?</Text>
            <Text style={styles.scoreExplainText}>{currentMonthData.note}</Text>
          </View>
        )}

        <Text style={styles.tagline}>{dest.tagline}</Text>

        {/* Quick stats */}
        <View style={styles.quickStats}>
          <View style={styles.quickStat}>
            <Text style={styles.quickStatLabel}>DIFFICULTY</Text>
            <Text style={[styles.quickStatValue, { color: DIFF_COLORS[dest.difficulty] }]}>{dest.difficulty}</Text>
          </View>
          <View style={styles.quickStat}>
            <Text style={styles.quickStatLabel}>BUDGET</Text>
            <Text style={styles.quickStatValue}>{dest.budget_tier}</Text>
          </View>
          {kf && (
            <View style={styles.quickStat}>
              <Text style={styles.quickStatLabel}>KIDS</Text>
              <Text style={[styles.quickStatValue, { color: kf.suitable ? colors.score5 : colors.score1 }]}>
                {kf.suitable ? `${kf.rating}/5 ✓` : "Not suitable"}
              </Text>
            </View>
          )}
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn} onPress={handleShare}>
            <Text style={styles.actionBtnText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, isSaved(id) ? styles.actionBtnSaved : styles.actionBtnPrimary]} onPress={() => toggleSaved(id)}>
            <Text style={[styles.actionBtnText, styles.actionBtnTextPrimary]}>{isSaved(id) ? "♥ Saved" : "♡ Save"}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab navigation */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.tabActive]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Tab content */}
      {activeTab === "overview" && (
        <View style={styles.tabContent}>
          {/* Why Special */}
          {dest.why_special && (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Why Special</Text>
              <Text style={styles.sectionBody}>{dest.why_special}</Text>
            </View>
          )}

          {/* Infrastructure */}
          {cc && (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Infrastructure Reality</Text>
              {cc.network && (
                <View style={styles.infraRow}>
                  <Text style={styles.infraIcon}>📶</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.infraLabel}>Network</Text>
                    <Text style={styles.infraValue}>
                      {[cc.network.jio && "Jio", cc.network.airtel && "Airtel", cc.network.bsnl && "BSNL"].filter(Boolean).join(", ") || "Limited"}
                    </Text>
                    {cc.network.note && <Text style={styles.infraNote}>{cc.network.note}</Text>}
                  </View>
                </View>
              )}
              {cc.emergency?.nearest_hospital && (
                <View style={styles.infraRow}>
                  <Text style={styles.infraIcon}>🏥</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.infraLabel}>Medical</Text>
                    <Text style={styles.infraValue}>{cc.emergency.nearest_hospital}</Text>
                  </View>
                </View>
              )}
              {cc.reach?.road_condition && (
                <View style={styles.infraRow}>
                  <Text style={styles.infraIcon}>🚗</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.infraLabel}>Road</Text>
                    <Text style={styles.infraValue}>{cc.reach.road_condition}</Text>
                  </View>
                </View>
              )}
            </View>
          )}

          {/* Daily Cost */}
          {dest.daily_cost && (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Daily Budget Reality</Text>
              <View style={styles.costRow}>
                {["budget", "midrange", "luxury"].map((tier) => {
                  const data = dest.daily_cost[tier];
                  if (!data) return null;
                  const tierColors: Record<string, string> = { budget: colors.score5, midrange: colors.score4, luxury: "#a855f7" };
                  return (
                    <View key={tier} style={[styles.costTier, { borderColor: tierColors[tier] + "44" }]}>
                      <Text style={[styles.costTotal, { color: tierColors[tier] }]}>₹{data.total?.toLocaleString()}</Text>
                      <Text style={styles.costLabel}>{tier === "midrange" ? "Mid" : tier}</Text>
                    </View>
                  );
                })}
              </View>
              {dest.daily_cost.note && <Text style={styles.costNote}>{dest.daily_cost.note}</Text>}
            </View>
          )}

          {/* Festivals */}
          {dest.festivals?.length > 0 && (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Festivals</Text>
              {dest.festivals.slice(0, 3).map((f: any) => (
                <View key={f.id} style={styles.festivalItem}>
                  <Text style={styles.festivalName}>{f.name}</Text>
                  <Text style={styles.festivalDate}>{MONTH_SHORT[f.month]} · {f.approximate_date}</Text>
                  {f.significance && <Text style={styles.festivalSig}>{f.significance}</Text>}
                </View>
              ))}
            </View>
          )}
        </View>
      )}

      {/* Monthly tab */}
      {activeTab === "monthly" && (
        <View style={styles.tabContent}>
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Monthly Scores</Text>
            {Array.from({ length: 12 }, (_, i) => {
              const m = i + 1;
              const md = dest.destination_months?.find((dm: any) => dm.month === m);
              const s = md?.score ?? 0;
              return (
                <View key={m} style={styles.monthRow}>
                  <Text style={[styles.monthName, m === currentMonth && { color: colors.primary, fontWeight: "700" }]}>
                    {MONTH_SHORT[m]}
                  </Text>
                  <View style={styles.monthBarBg}>
                    <View style={[styles.monthBar, { width: `${(s / 5) * 100}%`, backgroundColor: SCORE_COLORS[s] || colors.muted }]} />
                  </View>
                  <Text style={[styles.monthScore, { color: SCORE_COLORS[s] || colors.mutedForeground }]}>{s}/5</Text>
                </View>
              );
            })}
          </View>
        </View>
      )}

      {/* Kids tab */}
      {activeTab === "kids" && kf && (
        <View style={styles.tabContent}>
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Kids & Family</Text>
            <View style={styles.kidsHeader}>
              <Text style={[styles.kidsSuitable, { color: kf.suitable ? colors.score5 : colors.score1 }]}>
                {kf.suitable ? `Suitable — ${kf.rating}/5` : "Not Suitable"}
              </Text>
            </View>
            {kf.reasons?.length > 0 && (
              <View style={{ marginTop: spacing.sm }}>
                {kf.reasons.map((r: string, i: number) => (
                  <Text key={i} style={styles.kidReason}>• {r}</Text>
                ))}
              </View>
            )}
          </View>
        </View>
      )}

      {/* Safety tab */}
      {activeTab === "safety" && cc && (
        <View style={styles.tabContent}>
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Safety & Infrastructure</Text>
            <Text style={[styles.safetyRating, {
              color: cc.safety_rating >= 4 ? colors.score5 : cc.safety_rating >= 3 ? colors.score3 : colors.score1
            }]}>
              Safety: {cc.safety_rating}/5
            </Text>
            {cc.safety_notes && <Text style={styles.sectionBody}>{cc.safety_notes}</Text>}

            {cc.reach?.from_nearest_city && (
              <View style={{ marginTop: spacing.md }}>
                <Text style={styles.infraLabel}>Getting There</Text>
                <Text style={styles.sectionBody}>{cc.reach.from_nearest_city}</Text>
              </View>
            )}
            {cc.reach?.public_transport && (
              <View style={{ marginTop: spacing.sm }}>
                <Text style={styles.infraLabel}>Public Transport</Text>
                <Text style={styles.sectionBody}>{cc.reach.public_transport}</Text>
              </View>
            )}
            {cc.emergency?.helpline && (
              <View style={{ marginTop: spacing.md, padding: spacing.md, backgroundColor: "rgba(229,229,229,0.05)", borderRadius: borderRadius.md }}>
                <Text style={styles.infraLabel}>Helpline</Text>
                <Text style={styles.sectionBody}>{cc.emergency.helpline}</Text>
              </View>
            )}
          </View>
        </View>
      )}

      <View style={{ height: spacing.xxl * 2 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { justifyContent: "center", alignItems: "center" },
  heroContainer: { height: 250, position: "relative" },
  heroImage: { width: "100%", height: "100%" },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.3)" },
  diffBadge: { position: "absolute", top: spacing.md, left: spacing.md, borderRadius: borderRadius.sm, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  diffBadgeText: { fontSize: fontSize.xs, fontWeight: "600", textTransform: "capitalize" },
  scoreCard: { position: "absolute", top: spacing.md, right: spacing.md, borderRadius: borderRadius.lg, padding: spacing.md, alignItems: "center" },
  scoreNum: { fontSize: fontSize["2xl"], fontWeight: "800", color: "#fff" },
  scoreMonth: { fontSize: 10, fontWeight: "600", color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: 1 },
  infoCard: { marginTop: -spacing.xl, marginHorizontal: spacing.md, backgroundColor: colors.card, borderRadius: borderRadius.xl, padding: spacing.lg, borderWidth: 0.5, borderColor: colors.border },
  destName: { fontSize: fontSize["2xl"], fontWeight: "800", color: colors.foreground },
  destMeta: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.xs },
  badgeRow: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.sm },
  badge: { fontSize: fontSize.xs, color: colors.mutedForeground, backgroundColor: "rgba(229,229,229,0.05)", paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.sm, overflow: "hidden" },
  familyStress: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: spacing.xs },
  scoreExplain: { marginTop: spacing.md },
  scoreExplainLabel: { fontSize: fontSize.sm, fontWeight: "600", color: colors.foreground },
  scoreExplainText: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: 2, lineHeight: 20 },
  tagline: { fontSize: fontSize.base, color: colors.mutedForeground, marginTop: spacing.md, lineHeight: 24 },
  quickStats: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.lg },
  quickStat: { flex: 1, backgroundColor: "rgba(229,229,229,0.03)", borderRadius: borderRadius.md, padding: spacing.md },
  quickStatLabel: { fontSize: 10, color: colors.mutedForeground, letterSpacing: 1 },
  quickStatValue: { fontSize: fontSize.sm, fontWeight: "600", color: colors.foreground, marginTop: 4, textTransform: "capitalize" },
  actions: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.lg },
  actionBtn: { flex: 1, borderRadius: borderRadius.full, borderWidth: 1, borderColor: colors.border, paddingVertical: spacing.md, alignItems: "center" },
  actionBtnText: { fontSize: fontSize.sm, fontWeight: "600", color: colors.mutedForeground },
  actionBtnPrimary: { backgroundColor: colors.primary, borderColor: colors.primary },
  actionBtnSaved: { backgroundColor: colors.score5, borderColor: colors.score5 },
  actionBtnTextPrimary: { color: colors.primaryForeground },
  tabBar: { paddingHorizontal: spacing.md, paddingVertical: spacing.md },
  tab: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, marginRight: spacing.xs, borderRadius: borderRadius.md },
  tabActive: { backgroundColor: "rgba(229,229,229,0.1)" },
  tabText: { fontSize: fontSize.sm, color: colors.mutedForeground, fontWeight: "500" },
  tabTextActive: { color: colors.primary, fontWeight: "600" },
  tabContent: { paddingHorizontal: spacing.md },
  sectionCard: { backgroundColor: colors.card, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.md, borderWidth: 0.5, borderColor: colors.border },
  sectionTitle: { fontSize: fontSize.lg, fontWeight: "700", color: colors.foreground, marginBottom: spacing.sm },
  sectionBody: { fontSize: fontSize.sm, color: colors.mutedForeground, lineHeight: 22 },
  infraRow: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.sm, alignItems: "flex-start" },
  infraIcon: { fontSize: 18, marginTop: 2 },
  infraLabel: { fontSize: fontSize.xs, color: colors.mutedForeground, fontWeight: "500" },
  infraValue: { fontSize: fontSize.sm, color: colors.foreground, marginTop: 2 },
  infraNote: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 2, opacity: 0.7 },
  costRow: { flexDirection: "row", gap: spacing.sm },
  costTier: { flex: 1, borderRadius: borderRadius.md, borderWidth: 1, padding: spacing.md, alignItems: "center" },
  costTotal: { fontSize: fontSize.lg, fontWeight: "800", fontVariant: ["tabular-nums"] },
  costLabel: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 2, textTransform: "capitalize" },
  costNote: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: spacing.sm, fontStyle: "italic" },
  festivalItem: { marginTop: spacing.sm, paddingTop: spacing.sm, borderTopWidth: 0.5, borderTopColor: colors.border },
  festivalName: { fontSize: fontSize.sm, fontWeight: "600", color: colors.foreground },
  festivalDate: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 2 },
  festivalSig: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 4, fontStyle: "italic", opacity: 0.7 },
  monthRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.sm },
  monthName: { width: 30, fontSize: fontSize.xs, color: colors.mutedForeground },
  monthBarBg: { flex: 1, height: 8, backgroundColor: colors.muted, borderRadius: 4, overflow: "hidden" },
  monthBar: { height: "100%", borderRadius: 4 },
  monthScore: { width: 30, fontSize: fontSize.xs, fontWeight: "600", textAlign: "right" },
  kidsHeader: { marginBottom: spacing.sm },
  kidsSuitable: { fontSize: fontSize.lg, fontWeight: "700" },
  kidReason: { fontSize: fontSize.sm, color: colors.mutedForeground, lineHeight: 22, marginTop: 4 },
  safetyRating: { fontSize: fontSize.lg, fontWeight: "700", marginBottom: spacing.sm },
});
