import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Share,
  Linking,
  Dimensions,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { createClient } from "@supabase/supabase-js";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../../lib/theme";
import { useDestination } from "../../hooks/useDestinations";
import { useSavedItems } from "../../hooks/useSavedItems";
import { useArticlesForDestination } from "../../hooks/useArticles";
import { useVisited } from "../../hooks/useVisited";

const supabaseMobile = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL || "",
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || ""
);

const REPORT_FIELD_OPTIONS = [
  "Police phone", "Police address", "Hospital name", "Hospital distance",
  "Pharmacy", "Fuel station", "Mechanic", "ATM", "Other",
];

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
  const { articles: guideArticles } = useArticlesForDestination(id);
  const { isVisited, toggleVisited } = useVisited();
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
      message: `${dest.name} — ${dest.tagline}\n\nTravel guide: https://nakshiq.com/en/destination/${dest.id}`,
      title: dest.name,
    });
  }

  function handleWhatsAppShare() {
    const msg = encodeURIComponent(`${dest.name} — ${dest.tagline}\n\nTravel guide: https://nakshiq.com/en/destination/${dest.id}`);
    Linking.openURL(`https://wa.me/?text=${msg}`);
  }

  return (
    <View style={{ flex: 1 }}>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen options={{ title: dest.name, headerBackTitle: "Back" }} />

      {/* Hero image */}
      <View style={styles.heroContainer}>
        <Image
          source={{ uri: `https://nakshiq.com/images/destinations/${dest.id}.jpg` }}
          style={styles.heroImage}
          onError={() => {}}
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

      {/* Month pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.monthPillRow}>
        {Array.from({ length: 12 }, (_, i) => {
          const m = i + 1;
          const md = dest.destination_months?.find((dm: any) => dm.month === m);
          const s = md?.score ?? 0;
          const monthSlug = MONTH_SHORT[m].toLowerCase();
          return (
            <TouchableOpacity
              key={m}
              style={[styles.monthPill, { backgroundColor: (SCORE_COLORS[s] || colors.muted) + "22", borderColor: (SCORE_COLORS[s] || colors.muted) + "55" }, m === currentMonth && styles.monthPillCurrent]}
              onPress={() => router.push(`/destination-month?id=${id}&month=${monthSlug}` as any)}
              activeOpacity={0.8}
            >
              <Text style={[styles.monthPillLabel, { color: SCORE_COLORS[s] || colors.mutedForeground }]}>{MONTH_SHORT[m]}</Text>
              <Text style={[styles.monthPillScore, { color: SCORE_COLORS[s] || colors.mutedForeground }]}>{s}/5</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <TouchableOpacity onPress={() => router.push(`/where-to-go?month=${currentMonth}` as any)}>
        <Text style={{ color: colors.primary, fontSize: fontSize.sm, marginTop: spacing.sm, marginLeft: spacing.md }}>
          See all destinations in {MONTH_SHORT[currentMonth]} →
        </Text>
      </TouchableOpacity>

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
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: "#25D366" }]} onPress={handleWhatsAppShare}>
            <Text style={[styles.actionBtnText, { color: "#fff" }]}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, isSaved(id) ? styles.actionBtnSaved : styles.actionBtnPrimary]} onPress={() => toggleSaved(id)}>
            <Text style={[styles.actionBtnText, styles.actionBtnTextPrimary]}>{isSaved(id) ? "♥ Saved" : "♡ Save"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, isVisited(id) && styles.actionBtnVisited]} onPress={() => toggleVisited(id)}>
            <Text style={[styles.actionBtnText, isVisited(id) && styles.actionBtnTextPrimary]}>{isVisited(id) ? "✓ Visited" : "📍 Visited?"}</Text>
          </TouchableOpacity>
        </View>
        {kf?.suitable && (
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.saffron + "20", borderColor: colors.saffron + "40", marginTop: spacing.sm }]} onPress={() => router.push(`/with-kids?id=${id}` as any)}>
            <Text style={[styles.actionBtnText, { color: colors.saffron }]}>Family Guide</Text>
          </TouchableOpacity>
        )}

        {/* Related Guide Articles */}
        {guideArticles.length > 0 && (
          <View style={styles.guideLinks}>
            {guideArticles.map((article: any) => (
              <TouchableOpacity key={article.slug} style={styles.guideLink} onPress={() => router.push(`/blog/${article.slug}`)}>
                <Text style={styles.guideLinkIcon}>📖</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.guideLinkTitle} numberOfLines={1}>{article.title}</Text>
                  <Text style={styles.guideLinkMeta}>{article.depth === "deep-dive" ? "Deep Dive" : "Brief"} · {article.reading_time} min</Text>
                </View>
                <Text style={styles.guideLinkArrow}>→</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
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

      {/* Emergency SOS */}
      {dest.emergencySos && (
        <EmergencySOSMobileSection sos={dest.emergencySos} destinationName={dest.name} />
      )}

      {/* International Info */}
      {dest.international_info && (
        <InternationalInfoSection info={dest.international_info} />
      )}

      <View style={{ height: spacing.xxl * 2 }} />
    </ScrollView>

    {/* Floating SOS Button */}
    {dest.emergencySos && (
      <Pressable
        style={sosStyles.floatingBtn}
        onPress={() => Linking.openURL("tel:112")}
        accessibilityLabel="Emergency SOS - Call 112"
      >
        <Text style={sosStyles.floatingBtnText}>SOS</Text>
      </Pressable>
    )}
    </View>
  );
}

/* ── Emergency SOS Section ── */
function EmergencySOSMobileSection({ sos, destinationName }: { sos: any; destinationName: string }) {
  const [expanded, setExpanded] = useState(true);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportFieldIdx, setReportFieldIdx] = useState(0);
  const [reportValue, setReportValue] = useState("");
  const [reportNote, setReportNote] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reportSubmitting, setReportSubmitting] = useState(false);

  const hasWeatherProtocols = sos.extreme_heat_protocol || sos.extreme_cold_protocol || sos.flood_protocol || sos.snowstorm_protocol;
  const hasVehicleHelp = sos.mechanic_contact || sos.tow_service || sos.fuel_station_name;
  const hasShelter = sos.nearest_guesthouse_emergency || sos.rescue_contact || sos.mountain_rescue;

  function callNumber(num: string) {
    Linking.openURL(`tel:${num.replace(/\s/g, "")}`);
  }

  function PhoneButton({ number, label }: { number: string; label: string }) {
    return (
      <TouchableOpacity
        style={sosStyles.phoneBtn}
        onPress={() => callNumber(number)}
        activeOpacity={0.7}
      >
        <Text style={sosStyles.phoneLabel}>{label}</Text>
        <Text style={sosStyles.phoneNumber}>{number}</Text>
      </TouchableOpacity>
    );
  }

  function ResponseBadge({ minutes }: { minutes: number }) {
    const bgColor = minutes <= 15 ? "rgba(34,197,94,0.1)" : minutes <= 30 ? "rgba(234,179,8,0.1)" : "rgba(239,68,68,0.1)";
    const textColor = minutes <= 15 ? colors.score5 : minutes <= 30 ? "#eab308" : "#ef4444";
    return (
      <View style={[sosStyles.responseBadge, { backgroundColor: bgColor }]}>
        <Text style={[sosStyles.responseBadgeText, { color: textColor }]}>~{minutes}min</Text>
      </View>
    );
  }

  return (
    <View style={sosStyles.wrapper}>
      <TouchableOpacity
        style={sosStyles.header}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <View style={sosStyles.headerDot} />
        <View style={{ flex: 1 }}>
          <Text style={sosStyles.headerTitle}>Emergency SOS</Text>
          <Text style={sosStyles.headerSub}>{destinationName} emergency contacts</Text>
        </View>
        <Text style={sosStyles.chevron}>{expanded ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={sosStyles.body}>
          {/* Emergency Numbers */}
          <Text style={sosStyles.sectionLabel}>EMERGENCY NUMBERS</Text>
          <View style={sosStyles.phoneGrid}>
            {sos.police && <PhoneButton number={sos.police} label="Police" />}
            {sos.ambulance && <PhoneButton number={sos.ambulance} label="Ambulance" />}
            {sos.fire && <PhoneButton number={sos.fire} label="Fire" />}
            {sos.women_helpline && <PhoneButton number={sos.women_helpline} label="Women" />}
            {sos.tourist_helpline && <PhoneButton number={sos.tourist_helpline} label="Tourist" />}
            {sos.road_accident && <PhoneButton number={sos.road_accident} label="Road Accident" />}
          </View>

          {/* Response times */}
          {(sos.avg_police_response_min != null || sos.avg_ambulance_response_min != null) && (
            <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.sm }}>
              {sos.avg_police_response_min != null && (
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground }}>Police:</Text>
                  <ResponseBadge minutes={sos.avg_police_response_min} />
                </View>
              )}
              {sos.avg_ambulance_response_min != null && (
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground }}>Ambulance:</Text>
                  <ResponseBadge minutes={sos.avg_ambulance_response_min} />
                </View>
              )}
            </View>
          )}

          {/* Hospital */}
          {sos.nearest_hospital && (
            <View style={sosStyles.infoCard}>
              <Text style={sosStyles.sectionLabel}>HOSPITAL & MEDICAL</Text>
              <View style={{ flexDirection: "row", gap: spacing.sm, alignItems: "flex-start" }}>
                <Text style={{ fontSize: 18 }}>🏥</Text>
                <View style={{ flex: 1 }}>
                  <Text style={sosStyles.infoTitle}>{sos.nearest_hospital}</Text>
                  <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: 2 }}>
                    {sos.nearest_hospital_km != null && (
                      <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground }}>{sos.nearest_hospital_km}km away</Text>
                    )}
                    {sos.hospital_has_er && (
                      <View style={{ backgroundColor: "rgba(34,197,94,0.1)", borderRadius: borderRadius.full, paddingHorizontal: 6, paddingVertical: 2 }}>
                        <Text style={{ fontSize: 10, fontWeight: "700", color: colors.score5 }}>Has ER</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
              {sos.nearest_pharmacy && (
                <View style={{ flexDirection: "row", gap: spacing.sm, alignItems: "flex-start", marginTop: spacing.sm }}>
                  <Text style={{ fontSize: 18 }}>💊</Text>
                  <Text style={sosStyles.infoValue}>{sos.nearest_pharmacy}</Text>
                </View>
              )}
            </View>
          )}

          {/* Local Police */}
          {sos.local_police_station && (
            <View style={{ flexDirection: "row", gap: spacing.sm, alignItems: "flex-start", marginTop: spacing.sm }}>
              <Text style={{ fontSize: 18 }}>👮</Text>
              <View>
                <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground, fontWeight: "700" }}>LOCAL POLICE</Text>
                <Text style={sosStyles.infoValue}>{sos.local_police_station}</Text>
              </View>
            </View>
          )}

          {/* Vehicle Help */}
          {hasVehicleHelp && (
            <View style={sosStyles.infoCard}>
              <Text style={sosStyles.sectionLabel}>VEHICLE & ROAD HELP</Text>
              {sos.mechanic_contact && (
                <TouchableOpacity style={sosStyles.helpRow} onPress={() => callNumber(sos.mechanic_contact)}>
                  <Text>🔧</Text>
                  <Text style={sosStyles.infoValue}>Mechanic: </Text>
                  <Text style={sosStyles.phoneInline}>{sos.mechanic_contact}</Text>
                </TouchableOpacity>
              )}
              {sos.tow_service && (
                <TouchableOpacity style={sosStyles.helpRow} onPress={() => callNumber(sos.tow_service)}>
                  <Text>🚛</Text>
                  <Text style={sosStyles.infoValue}>Tow: </Text>
                  <Text style={sosStyles.phoneInline}>{sos.tow_service}</Text>
                </TouchableOpacity>
              )}
              {sos.fuel_station_name && (
                <View style={sosStyles.helpRow}>
                  <Text>⛽</Text>
                  <Text style={sosStyles.infoValue}>{sos.fuel_station_name}</Text>
                  {sos.nearest_fuel_km != null && (
                    <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground }}>({sos.nearest_fuel_km}km)</Text>
                  )}
                </View>
              )}
            </View>
          )}

          {/* Shelter & Rescue */}
          {hasShelter && (
            <View style={sosStyles.infoCard}>
              <Text style={sosStyles.sectionLabel}>SHELTER & RESCUE</Text>
              {sos.nearest_guesthouse_emergency && (
                <View style={sosStyles.helpRow}>
                  <Text>🏠</Text>
                  <Text style={sosStyles.infoValue}>{sos.nearest_guesthouse_emergency}</Text>
                </View>
              )}
              {sos.rescue_contact && (
                <TouchableOpacity style={sosStyles.helpRow} onPress={() => callNumber(sos.rescue_contact)}>
                  <Text>🆘</Text>
                  <Text style={sosStyles.infoValue}>Rescue: </Text>
                  <Text style={sosStyles.phoneInline}>{sos.rescue_contact}</Text>
                </TouchableOpacity>
              )}
              {sos.mountain_rescue && (
                <TouchableOpacity style={sosStyles.helpRow} onPress={() => callNumber(sos.mountain_rescue)}>
                  <Text>🏔️</Text>
                  <Text style={sosStyles.infoValue}>Mountain Rescue: </Text>
                  <Text style={sosStyles.phoneInline}>{sos.mountain_rescue}</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Weather Protocols */}
          {hasWeatherProtocols && (
            <View style={{ marginTop: spacing.sm }}>
              <Text style={sosStyles.sectionLabel}>WEATHER PROTOCOLS</Text>
              {sos.extreme_heat_protocol && (
                <View style={[sosStyles.protocolCard, { borderColor: "rgba(249,115,22,0.2)", backgroundColor: "rgba(249,115,22,0.05)" }]}>
                  <Text style={{ fontSize: 16 }}>🔥</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={[sosStyles.protocolLabel, { color: "#f97316" }]}>Extreme Heat</Text>
                    <Text style={sosStyles.protocolText}>{sos.extreme_heat_protocol}</Text>
                  </View>
                </View>
              )}
              {sos.extreme_cold_protocol && (
                <View style={[sosStyles.protocolCard, { borderColor: "rgba(59,130,246,0.2)", backgroundColor: "rgba(59,130,246,0.05)" }]}>
                  <Text style={{ fontSize: 16 }}>🥶</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={[sosStyles.protocolLabel, { color: "#3b82f6" }]}>Extreme Cold</Text>
                    <Text style={sosStyles.protocolText}>{sos.extreme_cold_protocol}</Text>
                  </View>
                </View>
              )}
              {sos.flood_protocol && (
                <View style={[sosStyles.protocolCard, { borderColor: "rgba(6,182,212,0.2)", backgroundColor: "rgba(6,182,212,0.05)" }]}>
                  <Text style={{ fontSize: 16 }}>🌊</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={[sosStyles.protocolLabel, { color: "#06b6d4" }]}>Flood</Text>
                    <Text style={sosStyles.protocolText}>{sos.flood_protocol}</Text>
                  </View>
                </View>
              )}
              {sos.snowstorm_protocol && (
                <View style={[sosStyles.protocolCard, { borderColor: "rgba(148,163,184,0.2)", backgroundColor: "rgba(148,163,184,0.05)" }]}>
                  <Text style={{ fontSize: 16 }}>❄️</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={[sosStyles.protocolLabel, { color: "#94a3b8" }]}>Snowstorm</Text>
                    <Text style={sosStyles.protocolText}>{sos.snowstorm_protocol}</Text>
                  </View>
                </View>
              )}
            </View>
          )}

          {/* Local Helpers */}
          {sos.local_helpers?.length > 0 && (
            <View style={{ marginTop: spacing.sm }}>
              <Text style={sosStyles.sectionLabel}>LOCAL HELPERS</Text>
              {sos.local_helpers.map((helper: any, i: number) => (
                <View key={i} style={sosStyles.helperCard}>
                  <View style={sosStyles.helperAvatar}>
                    <Text style={sosStyles.helperAvatarText}>{helper.name.charAt(0)}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={sosStyles.helperName}>{helper.name}</Text>
                    <Text style={sosStyles.helperRole}>{helper.role}</Text>
                    {helper.availability && (
                      <Text style={{ fontSize: 10, color: colors.mutedForeground, opacity: 0.7 }}>{helper.availability}</Text>
                    )}
                  </View>
                  <TouchableOpacity
                    style={sosStyles.helperCallBtn}
                    onPress={() => callNumber(helper.phone)}
                    activeOpacity={0.7}
                  >
                    <Text style={sosStyles.helperCallIcon}>📞</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Verification badge */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: spacing.md }}>
            {sos.verified === true ? (
              <Text style={{ fontSize: 10, color: colors.score5 }}>
                ✓ Verified{sos.verified_date ? ` ${new Date(sos.verified_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}` : ""}
              </Text>
            ) : sos.verified === false ? (
              <Text style={{ fontSize: 10, color: colors.mutedForeground, fontStyle: "italic", opacity: 0.5 }}>
                Unverified — help us verify
              </Text>
            ) : <View />}
            {sos.updated_at && (
              <Text style={{ fontSize: 10, color: colors.mutedForeground, opacity: 0.4 }}>
                Updated: {new Date(sos.updated_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </Text>
            )}
          </View>

          {/* Enriched fields: police address + english */}
          {sos.police_address && (
            <View style={{ marginTop: spacing.xs }}>
              <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground }}>📍 {sos.police_address}</Text>
            </View>
          )}
          {sos.police_english_available && (
            <View style={{ marginTop: 2 }}>
              <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground }}>
                🗣️ English: {sos.police_english_available === "no" ? "No — carry a translation app" : sos.police_english_available.charAt(0).toUpperCase() + sos.police_english_available.slice(1)}
              </Text>
            </View>
          )}

          {/* Enriched: trauma level, pediatric, pharmacy 24hr, fuel hours, ATM banks, mechanic specialty */}
          {sos.hospital_trauma_level && (
            <View style={{ marginTop: spacing.xs, flexDirection: "row", gap: 6, flexWrap: "wrap" }}>
              <View style={{
                backgroundColor: sos.hospital_trauma_level === "basic" ? "rgba(234,179,8,0.1)" : sos.hospital_trauma_level === "intermediate" ? "rgba(59,130,246,0.1)" : "rgba(34,197,94,0.1)",
                borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2
              }}>
                <Text style={{
                  fontSize: 10, fontWeight: "700",
                  color: sos.hospital_trauma_level === "basic" ? "#eab308" : sos.hospital_trauma_level === "intermediate" ? "#3b82f6" : colors.score5,
                  textTransform: "capitalize",
                }}>{sos.hospital_trauma_level}</Text>
              </View>
              {sos.hospital_pediatric != null && (
                <Text style={{ fontSize: 11, color: colors.mutedForeground }}>
                  👶 Pediatric: {sos.hospital_pediatric ? "Yes" : "No"}
                </Text>
              )}
            </View>
          )}
          {sos.pharmacy_24hr && (
            <View style={{ marginTop: spacing.xs }}>
              <View style={{ backgroundColor: "rgba(34,197,94,0.1)", borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2, alignSelf: "flex-start" }}>
                <Text style={{ fontSize: 10, fontWeight: "700", color: colors.score5 }}>🕐 Pharmacy 24hr</Text>
              </View>
            </View>
          )}
          {sos.fuel_hours && (
            <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 2 }}>🕐 Fuel hours: {sos.fuel_hours}</Text>
          )}
          {sos.atm_banks && (
            <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 2 }}>🏧 ATM: {sos.atm_banks}</Text>
          )}
          {sos.mechanic_specialty && (
            <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground, fontStyle: "italic", marginTop: 2 }}>🔧 Specialty: {sos.mechanic_specialty}</Text>
          )}

          {/* Report incorrect info button */}
          <TouchableOpacity
            onPress={() => { setReportOpen(true); setReportSubmitted(false); }}
            style={{ marginTop: spacing.md, borderTopWidth: 1, borderTopColor: "rgba(220,38,38,0.1)", paddingTop: spacing.sm }}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground, opacity: 0.6, textDecorationLine: "underline" }}>
              See incorrect info? Report it — we verify within 48 hours
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Report Modal */}
      <Modal visible={reportOpen} transparent animationType="slide" onRequestClose={() => setReportOpen(false)}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <Pressable style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "flex-end" }} onPress={() => setReportOpen(false)}>
            <Pressable style={{ backgroundColor: colors.card, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: spacing.lg }} onPress={() => {}}>
              {reportSubmitted ? (
                <View style={{ alignItems: "center", paddingVertical: spacing.xl }}>
                  <Text style={{ fontSize: 32, marginBottom: spacing.sm }}>✅</Text>
                  <Text style={{ fontSize: fontSize.lg, fontWeight: "800", color: colors.foreground }}>Thank you!</Text>
                  <Text style={{ fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: 4 }}>We'll verify this within 48 hours.</Text>
                  <TouchableOpacity
                    onPress={() => { setReportOpen(false); setReportValue(""); setReportNote(""); setReportFieldIdx(0); }}
                    style={{ marginTop: spacing.lg, backgroundColor: "#dc2626", borderRadius: borderRadius.md, paddingHorizontal: spacing.xl, paddingVertical: spacing.sm }}
                    activeOpacity={0.7}
                  >
                    <Text style={{ color: "#fff", fontWeight: "700", fontSize: fontSize.sm }}>Close</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.md }}>
                    <Text style={{ fontSize: fontSize.lg, fontWeight: "800", color: colors.foreground }}>Report Incorrect Info</Text>
                    <TouchableOpacity onPress={() => setReportOpen(false)} activeOpacity={0.7}>
                      <Text style={{ fontSize: 18, color: colors.mutedForeground }}>✕</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={{ fontSize: 10, fontWeight: "800", color: colors.mutedForeground, letterSpacing: 1, marginBottom: 6 }}>WHICH INFO IS INCORRECT?</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.md }}>
                    {REPORT_FIELD_OPTIONS.map((f, i) => (
                      <TouchableOpacity
                        key={f}
                        onPress={() => setReportFieldIdx(i)}
                        style={{
                          paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, marginRight: 6,
                          backgroundColor: reportFieldIdx === i ? "#dc2626" : "rgba(220,38,38,0.1)",
                        }}
                        activeOpacity={0.7}
                      >
                        <Text style={{ fontSize: fontSize.xs, fontWeight: "700", color: reportFieldIdx === i ? "#fff" : "#f87171" }}>{f}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>

                  <Text style={{ fontSize: 10, fontWeight: "800", color: colors.mutedForeground, letterSpacing: 1, marginBottom: 6 }}>CORRECT INFORMATION</Text>
                  <TextInput
                    value={reportValue}
                    onChangeText={setReportValue}
                    placeholder="e.g. correct phone number or address"
                    placeholderTextColor={colors.mutedForeground}
                    style={{
                      borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md,
                      padding: spacing.sm, fontSize: fontSize.sm, color: colors.foreground, marginBottom: spacing.sm,
                    }}
                  />

                  <Text style={{ fontSize: 10, fontWeight: "800", color: colors.mutedForeground, letterSpacing: 1, marginBottom: 6 }}>ADDITIONAL NOTES (OPTIONAL)</Text>
                  <TextInput
                    value={reportNote}
                    onChangeText={setReportNote}
                    placeholder="e.g. I visited last week and..."
                    placeholderTextColor={colors.mutedForeground}
                    multiline
                    numberOfLines={2}
                    style={{
                      borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md,
                      padding: spacing.sm, fontSize: fontSize.sm, color: colors.foreground, marginBottom: spacing.md,
                      textAlignVertical: "top", minHeight: 60,
                    }}
                  />

                  <TouchableOpacity
                    disabled={!reportValue || reportSubmitting}
                    onPress={async () => {
                      setReportSubmitting(true);
                      try {
                        await supabaseMobile.from("safety_reports").insert({
                          destination_id: sos.destination_id,
                          field: REPORT_FIELD_OPTIONS[reportFieldIdx],
                          correct_value: reportValue,
                          note: reportNote || null,
                          created_at: new Date().toISOString(),
                        });
                      } catch {}
                      setReportSubmitted(true);
                      setReportSubmitting(false);
                    }}
                    style={{
                      backgroundColor: (!reportValue || reportSubmitting) ? "rgba(220,38,38,0.3)" : "#dc2626",
                      borderRadius: borderRadius.md, paddingVertical: spacing.sm, alignItems: "center",
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={{ color: "#fff", fontWeight: "800", fontSize: fontSize.sm }}>
                      {reportSubmitting ? "Submitting..." : "Submit Report"}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </Pressable>
          </Pressable>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const sosStyles = StyleSheet.create({
  wrapper: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: "rgba(127,29,29,0.15)",
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: "rgba(220,38,38,0.3)",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.lg,
    gap: spacing.sm,
  },
  headerDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#dc2626",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: "800",
    color: "#f87171",
  },
  headerSub: {
    fontSize: fontSize.xs,
    color: "rgba(248,113,113,0.5)",
  },
  chevron: {
    fontSize: fontSize.sm,
    color: "rgba(248,113,113,0.5)",
  },
  body: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "rgba(248,113,113,0.6)",
    letterSpacing: 1,
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  phoneGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  phoneBtn: {
    borderWidth: 1,
    borderColor: "rgba(220,38,38,0.2)",
    backgroundColor: "rgba(220,38,38,0.05)",
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: "center",
    minWidth: 90,
  },
  phoneLabel: {
    fontSize: 10,
    color: "rgba(248,113,113,0.6)",
    fontWeight: "600",
  },
  phoneNumber: {
    fontSize: fontSize.sm,
    fontWeight: "800",
    color: "#f87171",
    fontVariant: ["tabular-nums"],
    marginTop: 2,
  },
  phoneInline: {
    fontSize: fontSize.sm,
    fontWeight: "800",
    color: "#f87171",
    fontVariant: ["tabular-nums"],
  },
  responseBadge: {
    borderRadius: borderRadius.full,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  responseBadgeText: {
    fontSize: 10,
    fontWeight: "700",
  },
  infoCard: {
    marginTop: spacing.sm,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: "rgba(220,38,38,0.1)",
    backgroundColor: "rgba(220,38,38,0.03)",
  },
  infoTitle: {
    fontSize: fontSize.sm,
    fontWeight: "700",
    color: colors.foreground,
  },
  infoValue: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
  },
  helpRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  protocolCard: {
    flexDirection: "row",
    gap: spacing.sm,
    alignItems: "flex-start",
    borderWidth: 1,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginTop: spacing.xs,
  },
  protocolLabel: {
    fontSize: fontSize.xs,
    fontWeight: "700",
  },
  protocolText: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    marginTop: 2,
    lineHeight: 20,
  },
  helperCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginTop: spacing.xs,
  },
  helperAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(220,38,38,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  helperAvatarText: {
    fontSize: fontSize.sm,
    fontWeight: "800",
    color: "#f87171",
  },
  helperName: {
    fontSize: fontSize.sm,
    fontWeight: "700",
    color: colors.foreground,
  },
  helperRole: {
    fontSize: 11,
    color: colors.mutedForeground,
  },
  helperCallBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#dc2626",
    alignItems: "center",
    justifyContent: "center",
  },
  helperCallIcon: {
    fontSize: 16,
  },
  floatingBtn: {
    position: "absolute",
    bottom: 80,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#dc2626",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#dc2626",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  floatingBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1,
  },
});

/* ── International Info collapsible ── */
function InternationalInfoSection({ info }: { info: any }) {
  const [expanded, setExpanded] = useState(false);

  const fields: { key: string; label: string; icon: string }[] = [
    { key: "cultural_context", label: "Cultural Context", icon: "🕌" },
    { key: "dress_code", label: "Dress Code", icon: "👔" },
    { key: "food_safety", label: "Food Safety", icon: "🍽️" },
    { key: "cards_accepted", label: "Cards & Payments", icon: "💳" },
    { key: "english_level", label: "English Level", icon: "🗣️" },
    { key: "nearest_embassy", label: "Nearest Embassy", icon: "🏛️" },
    { key: "sim_info", label: "SIM & Connectivity", icon: "📱" },
    { key: "visa_notes", label: "Visa Notes", icon: "📋" },
  ];

  return (
    <View style={intlStyles.wrapper}>
      <TouchableOpacity
        style={intlStyles.header}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <Text style={intlStyles.headerIcon}>🌐</Text>
        <Text style={intlStyles.headerText}>For International Travelers</Text>
        <Text style={intlStyles.chevron}>{expanded ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={intlStyles.body}>
          {fields.map(({ key, label, icon }) => {
            const value = info[key];
            if (!value) return null;
            return (
              <View key={key} style={intlStyles.field}>
                <Text style={intlStyles.fieldIcon}>{icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={intlStyles.fieldLabel}>{label}</Text>
                  <Text style={intlStyles.fieldValue}>{value}</Text>
                </View>
              </View>
            );
          })}

          {/* Scams as bulleted list */}
          {info.scams?.length > 0 && (
            <View style={intlStyles.field}>
              <Text style={intlStyles.fieldIcon}>⚠️</Text>
              <View style={{ flex: 1 }}>
                <Text style={intlStyles.fieldLabel}>Common Scams</Text>
                {info.scams.map((scam: string, i: number) => (
                  <Text key={i} style={intlStyles.scamItem}>• {scam}</Text>
                ))}
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const intlStyles = StyleSheet.create({
  wrapper: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: "rgba(0,0,0,0.03)",
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.primary + "33",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.lg,
    gap: spacing.sm,
  },
  headerIcon: { fontSize: 20 },
  headerText: {
    flex: 1,
    fontSize: fontSize.base,
    fontWeight: "700",
    color: colors.foreground,
  },
  chevron: { fontSize: fontSize.sm, color: colors.mutedForeground },
  body: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, gap: spacing.md },
  field: { flexDirection: "row", gap: spacing.sm, alignItems: "flex-start" },
  fieldIcon: { fontSize: 16, marginTop: 2 },
  fieldLabel: {
    fontSize: fontSize.xs,
    fontWeight: "700",
    color: colors.foreground,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  fieldValue: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    lineHeight: 20,
    marginTop: 2,
  },
  scamItem: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    lineHeight: 20,
    marginTop: 2,
  },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { justifyContent: "center", alignItems: "center" },
  heroContainer: { height: 250, position: "relative", backgroundColor: colors.muted },
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
  actionBtnVisited: { backgroundColor: colors.saffron, borderColor: colors.saffron },
  guideLinks: { marginTop: spacing.md, gap: spacing.sm },
  guideLink: { flexDirection: "row", alignItems: "center", gap: spacing.sm, backgroundColor: "rgba(245,241,232,0.05)", borderWidth: 1, borderColor: "rgba(245,241,232,0.15)", borderRadius: borderRadius.md, padding: spacing.sm },
  guideLinkIcon: { fontSize: 18 },
  guideLinkTitle: { fontSize: fontSize.sm, fontWeight: "600", color: colors.foreground },
  guideLinkMeta: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 1 },
  guideLinkArrow: { fontSize: fontSize.sm, color: colors.mutedForeground },
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

  // Month pills
  monthPillRow: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, gap: spacing.xs },
  monthPill: { borderRadius: borderRadius.full, paddingHorizontal: 12, paddingVertical: 8, alignItems: "center", borderWidth: 1, minWidth: 52 },
  monthPillCurrent: { borderWidth: 2 },
  monthPillLabel: { fontSize: 10, fontWeight: "700", letterSpacing: 0.5 },
  monthPillScore: { fontSize: fontSize.xs, fontWeight: "800", marginTop: 2 },
});
