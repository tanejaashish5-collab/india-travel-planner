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
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../../lib/theme";
import { useTrek } from "../../hooks/useTreks";

const MONTH_SHORT = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DIFF_COLORS: Record<string, string> = {
  easy: colors.easy, moderate: colors.moderate, hard: colors.hard, extreme: colors.extreme,
};

export default function TrekDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { trek, loading } = useTrek(id);
  const [activeSection, setActiveSection] = useState("overview");

  if (loading || !trek) {
    return (
      <View style={[styles.container, styles.center]}>
        <Stack.Screen options={{ title: "Loading..." }} />
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const destName = Array.isArray(trek.destinations) ? trek.destinations[0]?.name : trek.destinations?.name;
  const days = trek.day_by_day ?? [];
  const campsites = trek.campsites ?? [];
  const gear = trek.gear_essentials ?? [];
  const trailPoints = trek.trail_points ?? [];

  const sections = [
    { id: "overview", label: "Overview" },
    ...(days.length > 0 ? [{ id: "itinerary", label: "Day by Day" }] : []),
    ...(gear.length > 0 ? [{ id: "gear", label: "Gear" }] : []),
    { id: "practical", label: "Practical" },
  ];

  async function handleShare() {
    await Share.share({
      message: `${trek.name} — ${trek.duration_days}-day ${trek.difficulty} trek, max ${trek.max_altitude_m}m\n\nCheck it out on India Travel Planner`,
      title: trek.name,
    });
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen options={{ title: trek.name, headerBackTitle: "Back" }} />

      {/* Hero */}
      <View style={styles.heroContainer}>
        <Image
          source={{ uri: `https://web-blond-zeta.vercel.app/images/destinations/${trek.destination_id}.jpg` }}
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay} />
        <View style={[styles.diffBadge, { backgroundColor: (DIFF_COLORS[trek.difficulty] || colors.muted) + "33" }]}>
          <Text style={[styles.diffText, { color: DIFF_COLORS[trek.difficulty] }]}>{trek.difficulty}</Text>
        </View>
      </View>

      {/* Info card */}
      <View style={styles.infoCard}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.trekName}>{trek.name}</Text>
            {destName && <Text style={styles.destName}>{destName}</Text>}
          </View>
          <TouchableOpacity onPress={handleShare} style={styles.shareBtn}>
            <Text style={styles.shareBtnText}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* Key stats */}
        <View style={styles.statsRow}>
          {[
            { val: `${trek.duration_days}d`, label: "Days" },
            { val: `${trek.distance_km}km`, label: "Distance" },
            { val: `${trek.max_altitude_m?.toLocaleString()}m`, label: "Max Alt" },
            { val: trek.fitness_level, label: "Fitness" },
            { val: trek.kids_suitable ? `${trek.min_age}+` : "Adults", label: "Age" },
          ].map((s) => (
            <View key={s.label} style={styles.statItem}>
              <Text style={styles.statVal}>{s.val}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Best months */}
        {trek.best_months?.length > 0 && (
          <View style={{ flexDirection: "row", gap: spacing.xs, marginTop: spacing.md, flexWrap: "wrap" }}>
            <Text style={styles.metaLabel}>Best:</Text>
            {trek.best_months.map((m: number) => (
              <View key={m} style={styles.monthChip}>
                <Text style={styles.monthChipText}>{MONTH_SHORT[m]}</Text>
              </View>
            ))}
          </View>
        )}

        <Text style={styles.description}>{trek.description}</Text>

        {/* Highlights */}
        {trek.highlights?.length > 0 && (
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.xs, marginTop: spacing.md }}>
            {trek.highlights.map((h: string, i: number) => (
              <View key={i} style={styles.highlightChip}>
                <Text style={styles.highlightText}>{h}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Warnings */}
        {trek.warnings?.length > 0 && (
          <View style={styles.warningBox}>
            <Text style={styles.warningTitle}>Warnings</Text>
            {trek.warnings.map((w: string, i: number) => (
              <Text key={i} style={styles.warningText}>⚠ {w}</Text>
            ))}
          </View>
        )}
      </View>

      {/* Section tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar}>
        {sections.map((s) => (
          <TouchableOpacity
            key={s.id}
            style={[styles.tab, activeSection === s.id && styles.tabActive]}
            onPress={() => setActiveSection(s.id)}
          >
            <Text style={[styles.tabText, activeSection === s.id && styles.tabTextActive]}>{s.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Overview */}
      {activeSection === "overview" && (
        <View style={styles.content}>
          {/* Campsites */}
          {campsites.length > 0 && (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Campsites</Text>
              {campsites.map((camp: any, i: number) => (
                <View key={i} style={styles.campItem}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.campName}>{camp.name}</Text>
                    {camp.altitude_m && <Text style={styles.campAlt}>{camp.altitude_m.toLocaleString()}m</Text>}
                  </View>
                  {camp.facilities && <Text style={styles.campFacilities}>{camp.facilities}</Text>}
                  <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.xs }}>
                    {camp.water && <Text style={styles.campBadge}>💧 Water</Text>}
                    {camp.flat_ground && <Text style={styles.campBadge}>⛺ Flat</Text>}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Cost */}
          {trek.cost_estimate && (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Cost Estimate</Text>
              <View style={styles.costRow}>
                {trek.cost_estimate.budget && (
                  <View style={[styles.costTier, { borderColor: colors.score5 + "44" }]}>
                    <Text style={[styles.costAmount, { color: colors.score5 }]}>₹{trek.cost_estimate.budget.toLocaleString()}</Text>
                    <Text style={styles.costLabel}>Self</Text>
                  </View>
                )}
                {trek.cost_estimate.with_guide && (
                  <View style={[styles.costTier, { borderColor: colors.score4 + "44" }]}>
                    <Text style={[styles.costAmount, { color: colors.score4 }]}>₹{trek.cost_estimate.with_guide.toLocaleString()}</Text>
                    <Text style={styles.costLabel}>Guide</Text>
                  </View>
                )}
                {trek.cost_estimate.with_operator && (
                  <View style={[styles.costTier, { borderColor: "#a855f744" }]}>
                    <Text style={[styles.costAmount, { color: "#a855f7" }]}>₹{trek.cost_estimate.with_operator.toLocaleString()}</Text>
                    <Text style={styles.costLabel}>Operator</Text>
                  </View>
                )}
              </View>
              {trek.cost_estimate.note && <Text style={styles.costNote}>{trek.cost_estimate.note}</Text>}
            </View>
          )}
        </View>
      )}

      {/* Day by Day */}
      {activeSection === "itinerary" && (
        <View style={styles.content}>
          {days.map((day: any, idx: number) => (
            <View key={day.day} style={styles.dayCard}>
              <View style={styles.dayHeader}>
                <View style={styles.dayBadge}>
                  <Text style={styles.dayBadgeText}>D{day.day}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.dayTitle}>{day.title}</Text>
                  <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: 2 }}>
                    {day.distance_km && <Text style={styles.dayMeta}>{day.distance_km}km</Text>}
                    {day.altitude_m && <Text style={styles.dayMeta}>↑{day.altitude_m.toLocaleString()}m</Text>}
                    {day.hours && <Text style={styles.dayMeta}>~{day.hours}h</Text>}
                  </View>
                </View>
              </View>
              <Text style={styles.dayDesc}>{day.description}</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginTop: spacing.sm }}>
                {day.campsite && <Text style={styles.dayDetail}>⛺ {day.campsite}</Text>}
                {day.meals && <Text style={styles.dayDetail}>🍽️ {day.meals}</Text>}
                {day.water && <Text style={styles.dayDetail}>💧 {day.water}</Text>}
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Gear */}
      {activeSection === "gear" && (
        <View style={styles.content}>
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Essential Gear</Text>
            {gear.map((item: string, i: number) => (
              <View key={i} style={styles.gearItem}>
                <Text style={styles.gearDot}>●</Text>
                <Text style={styles.gearText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Practical */}
      {activeSection === "practical" && (
        <View style={styles.content}>
          {trek.how_to_reach && (
            <View style={styles.sectionCard}>
              <Text style={styles.practicalLabel}>🚗 How to Reach</Text>
              <Text style={styles.practicalText}>{trek.how_to_reach}</Text>
            </View>
          )}
          {trek.permit_details && (
            <View style={styles.sectionCard}>
              <Text style={styles.practicalLabel}>📋 Permits</Text>
              <Text style={styles.practicalText}>{trek.permit_details}</Text>
            </View>
          )}
          {trek.water_sources && (
            <View style={styles.sectionCard}>
              <Text style={styles.practicalLabel}>💧 Water Sources</Text>
              <Text style={styles.practicalText}>{trek.water_sources}</Text>
            </View>
          )}
          {trek.network_coverage && (
            <View style={styles.sectionCard}>
              <Text style={styles.practicalLabel}>📶 Network</Text>
              <Text style={styles.practicalText}>{trek.network_coverage}</Text>
            </View>
          )}
          {trek.nearest_hospital && (
            <View style={styles.sectionCard}>
              <Text style={styles.practicalLabel}>🏥 Medical</Text>
              <Text style={styles.practicalText}>{trek.nearest_hospital}</Text>
            </View>
          )}
          {trek.emergency_contacts && (
            <View style={[styles.sectionCard, { borderColor: colors.score2 + "44" }]}>
              <Text style={[styles.practicalLabel, { color: colors.score2 }]}>🆘 Emergency</Text>
              <Text style={styles.practicalText}>{trek.emergency_contacts}</Text>
            </View>
          )}
        </View>
      )}

      <View style={{ height: spacing.xxl * 2 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { justifyContent: "center", alignItems: "center" },
  heroContainer: { height: 220, position: "relative" },
  heroImage: { width: "100%", height: "100%" },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.3)" },
  diffBadge: { position: "absolute", top: spacing.md, left: spacing.md, borderRadius: borderRadius.sm, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  diffText: { fontSize: fontSize.xs, fontWeight: "600", textTransform: "capitalize" },
  infoCard: { marginTop: -spacing.lg, marginHorizontal: spacing.md, backgroundColor: colors.card, borderRadius: borderRadius.xl, padding: spacing.lg, borderWidth: 0.5, borderColor: colors.border },
  trekName: { fontSize: fontSize["2xl"], fontWeight: "800", color: colors.foreground },
  destName: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: 2 },
  shareBtn: { borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.full, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  shareBtnText: { fontSize: fontSize.xs, color: colors.mutedForeground, fontWeight: "600" },
  statsRow: { flexDirection: "row", gap: spacing.xs, marginTop: spacing.lg },
  statItem: { flex: 1, backgroundColor: "rgba(229,229,229,0.03)", borderRadius: borderRadius.md, padding: spacing.sm, alignItems: "center" },
  statVal: { fontSize: fontSize.sm, fontWeight: "700", color: colors.primary, fontVariant: ["tabular-nums"] },
  statLabel: { fontSize: 10, color: colors.mutedForeground, marginTop: 2 },
  metaLabel: { fontSize: fontSize.xs, color: colors.mutedForeground, alignSelf: "center" },
  monthChip: { backgroundColor: "rgba(229,229,229,0.1)", borderRadius: borderRadius.sm, paddingHorizontal: spacing.sm, paddingVertical: 2 },
  monthChipText: { fontSize: fontSize.xs, color: colors.primary, fontWeight: "500" },
  description: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.md, lineHeight: 22 },
  highlightChip: { backgroundColor: "rgba(229,229,229,0.05)", borderRadius: borderRadius.full, borderWidth: 0.5, borderColor: colors.border, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  highlightText: { fontSize: fontSize.xs, color: colors.primary },
  warningBox: { marginTop: spacing.md, backgroundColor: colors.score2 + "11", borderWidth: 0.5, borderColor: colors.score2 + "44", borderRadius: borderRadius.md, padding: spacing.md },
  warningTitle: { fontSize: fontSize.sm, fontWeight: "600", color: colors.score2, marginBottom: spacing.xs },
  warningText: { fontSize: fontSize.sm, color: colors.score2 + "cc", marginTop: 4 },
  tabBar: { paddingHorizontal: spacing.md, paddingVertical: spacing.md },
  tab: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, marginRight: spacing.xs, borderRadius: borderRadius.md },
  tabActive: { backgroundColor: "rgba(229,229,229,0.1)" },
  tabText: { fontSize: fontSize.sm, color: colors.mutedForeground, fontWeight: "500" },
  tabTextActive: { color: colors.primary, fontWeight: "600" },
  content: { paddingHorizontal: spacing.md },
  sectionCard: { backgroundColor: colors.card, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.md, borderWidth: 0.5, borderColor: colors.border },
  sectionTitle: { fontSize: fontSize.lg, fontWeight: "700", color: colors.foreground, marginBottom: spacing.sm },
  campItem: { paddingTop: spacing.sm, borderTopWidth: 0.5, borderTopColor: colors.border, marginTop: spacing.sm },
  campName: { fontSize: fontSize.sm, fontWeight: "600", color: colors.foreground },
  campAlt: { fontSize: fontSize.xs, color: colors.mutedForeground, fontVariant: ["tabular-nums"] },
  campFacilities: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 2 },
  campBadge: { fontSize: fontSize.xs, color: colors.score4, backgroundColor: colors.score4 + "11", paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm, overflow: "hidden" },
  costRow: { flexDirection: "row", gap: spacing.sm },
  costTier: { flex: 1, borderWidth: 1, borderRadius: borderRadius.md, padding: spacing.md, alignItems: "center" },
  costAmount: { fontSize: fontSize.lg, fontWeight: "800", fontVariant: ["tabular-nums"] },
  costLabel: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 2 },
  costNote: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: spacing.sm, fontStyle: "italic" },
  dayCard: { backgroundColor: colors.card, borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 0.5, borderColor: colors.border },
  dayHeader: { flexDirection: "row", alignItems: "flex-start", gap: spacing.sm },
  dayBadge: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(229,229,229,0.1)", justifyContent: "center", alignItems: "center" },
  dayBadgeText: { fontSize: fontSize.xs, fontWeight: "700", color: colors.primary },
  dayTitle: { fontSize: fontSize.sm, fontWeight: "600", color: colors.foreground },
  dayMeta: { fontSize: 10, color: colors.mutedForeground },
  dayDesc: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.sm, lineHeight: 20 },
  dayDetail: { fontSize: fontSize.xs, color: colors.mutedForeground },
  gearItem: { flexDirection: "row", gap: spacing.sm, alignItems: "flex-start", marginBottom: spacing.sm },
  gearDot: { color: colors.primary, fontSize: fontSize.xs, marginTop: 2 },
  gearText: { fontSize: fontSize.sm, color: colors.foreground, flex: 1 },
  practicalLabel: { fontSize: fontSize.sm, fontWeight: "600", color: colors.foreground, marginBottom: spacing.xs },
  practicalText: { fontSize: fontSize.sm, color: colors.mutedForeground, lineHeight: 22 },
});
