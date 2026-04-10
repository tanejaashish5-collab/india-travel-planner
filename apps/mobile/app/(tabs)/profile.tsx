import { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Linking,
} from "react-native";
import { router } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../../lib/theme";
import { useAuth } from "../../hooks/useAuth";
import { useVisited } from "../../hooks/useVisited";
import { useDestinations } from "../../hooks/useDestinations";
import { usePreferences } from "../../hooks/usePreferences";

export default function ProfileScreen() {
  const { user, loading, signInWithEmail, signUpWithEmail, signOut } = useAuth();
  const { visitedCount, calculateScore } = useVisited();
  const { destinations } = useDestinations();
  const { resetOnboarding } = usePreferences();
  const explorerScore = useMemo(() => calculateScore(destinations), [destinations, calculateScore]);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!email || !password) { setError("Email and password required"); return; }
    if (password.length < 6) { setError("Password must be 6+ characters"); return; }
    setAuthLoading(true);
    setError("");
    try {
      if (mode === "signin") {
        const { error } = await signInWithEmail(email, password);
        if (error) { setError(error.message); return; }
      } else {
        if (!name) { setError("Name is required"); return; }
        const { error } = await signUpWithEmail(email, password, name);
        if (error) { setError(error.message); return; }
        Alert.alert("Check your email", "We sent a confirmation link to verify your account.");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setAuthLoading(false);
    }
  }

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color={colors.primary} /></View>;
  }

  // Signed in view
  if (user) {
    const displayName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Traveler";
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{displayName[0]?.toUpperCase()}</Text>
          </View>
          <Text style={styles.profileName}>{displayName}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>

          {/* Explorer Stats */}
          <View style={styles.explorerStats}>
            <View style={styles.explorerStat}>
              <Text style={styles.explorerNum}>{visitedCount}</Text>
              <Text style={styles.explorerLabel}>Visited</Text>
            </View>
            <View style={[styles.explorerStat, styles.explorerStatMain]}>
              <Text style={styles.explorerScore}>{explorerScore}</Text>
              <Text style={styles.explorerLabel}>Explorer Score</Text>
            </View>
            <View style={styles.explorerStat}>
              <Text style={styles.explorerNum}>{destinations.length}</Text>
              <Text style={styles.explorerLabel}>Total</Text>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <TouchableOpacity style={styles.settingsRow}>
            <Text style={styles.settingsLabel}>Notifications</Text>
            <Text style={styles.settingsValue}>Off</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsRow}>
            <Text style={styles.settingsLabel}>Language</Text>
            <Text style={styles.settingsValue}>English</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsRow}>
            <Text style={styles.settingsLabel}>Offline Maps</Text>
            <Text style={styles.settingsValue}>Coming soon</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsRow} onPress={() => { resetOnboarding(); router.push("/onboarding"); }}>
            <Text style={styles.settingsLabel}>Redo Onboarding</Text>
            <Text style={styles.settingsChevron}>→</Text>
          </TouchableOpacity>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>

          <TouchableOpacity style={styles.settingsRow} onPress={() => Linking.openURL("https://nakshiq.com")}>
            <Text style={styles.settingsLabel}>Website</Text>
            <Text style={styles.settingsChevron}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsRow} onPress={() => Linking.openURL("https://nakshiq.com/en/privacy")}>
            <Text style={styles.settingsLabel}>Privacy Policy</Text>
            <Text style={styles.settingsChevron}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsRow} onPress={() => Linking.openURL("https://nakshiq.com/en/terms")}>
            <Text style={styles.settingsLabel}>Terms of Service</Text>
            <Text style={styles.settingsChevron}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsRow} onPress={() => Linking.openURL("https://nakshiq.com/en/editorial-policy")}>
            <Text style={styles.settingsLabel}>Editorial Policy</Text>
            <Text style={styles.settingsChevron}>→</Text>
          </TouchableOpacity>

          <View style={styles.settingsRow}>
            <Text style={styles.settingsLabel}>Version</Text>
            <Text style={styles.settingsValue}>1.0.0</Text>
          </View>
        </View>

        {/* Sign Out */}
        <TouchableOpacity
          style={styles.signOutBtn}
          onPress={() => Alert.alert("Sign Out", "Are you sure?", [
            { text: "Cancel", style: "cancel" },
            { text: "Sign Out", style: "destructive", onPress: signOut },
          ])}
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    );
  }

  // Signed out — auth form
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.authContent}>
      <Text style={styles.authTitle}>
        {mode === "signin" ? "Welcome back" : "Join the journey"}
      </Text>
      <Text style={styles.authSubtitle}>
        {mode === "signin"
          ? "Sign in to sync trips across devices"
          : "Create an account to save trips and get alerts"}
      </Text>

      {/* Form */}
      <View style={styles.form}>
        {mode === "signup" && (
          <TextInput
            style={styles.input}
            placeholder="Your name"
            placeholderTextColor={colors.mutedForeground}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={colors.mutedForeground}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.mutedForeground}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.submitBtn, authLoading && { opacity: 0.6 }]}
          onPress={handleSubmit}
          disabled={authLoading}
        >
          {authLoading ? (
            <ActivityIndicator color={colors.primaryForeground} />
          ) : (
            <Text style={styles.submitBtnText}>
              {mode === "signin" ? "Sign In" : "Create Account"}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Toggle mode */}
      <View style={styles.toggleRow}>
        <Text style={styles.toggleText}>
          {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
        </Text>
        <TouchableOpacity onPress={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(""); }}>
          <Text style={styles.toggleLink}>
            {mode === "signin" ? "Sign up" : "Sign in"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Info */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Why sign in?</Text>
        <Text style={styles.infoItem}>💾 Save destinations across devices</Text>
        <Text style={styles.infoItem}>📋 Build and share trip boards</Text>
        <Text style={styles.infoItem}>🔔 Get festival and weather alerts</Text>
        <Text style={styles.infoItem}>🤖 Personalized AI recommendations</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  authContent: { padding: spacing.lg, paddingTop: spacing.xxl },
  center: { flex: 1, backgroundColor: colors.background, justifyContent: "center", alignItems: "center" },

  // Auth form
  authTitle: { fontSize: fontSize["2xl"], fontWeight: "700", color: colors.foreground },
  authSubtitle: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.xs, marginBottom: spacing.xl },
  form: { gap: spacing.sm },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    fontSize: fontSize.base,
    color: colors.foreground,
  },
  error: { fontSize: fontSize.sm, color: colors.destructive },
  submitBtn: { backgroundColor: colors.primary, paddingVertical: 16, borderRadius: borderRadius.md, alignItems: "center", marginTop: spacing.sm },
  submitBtnText: { fontSize: fontSize.base, fontWeight: "700", color: colors.primaryForeground },
  toggleRow: { flexDirection: "row", justifyContent: "center", marginTop: spacing.lg },
  toggleText: { fontSize: fontSize.sm, color: colors.mutedForeground },
  toggleLink: { fontSize: fontSize.sm, color: colors.primary, fontWeight: "600" },
  infoSection: { marginTop: spacing.xxl, backgroundColor: colors.card, borderRadius: borderRadius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
  infoTitle: { fontSize: fontSize.base, fontWeight: "700", color: colors.foreground, marginBottom: spacing.md },
  infoItem: { fontSize: fontSize.sm, color: colors.mutedForeground, marginBottom: spacing.sm, lineHeight: 22 },

  // Profile (signed in)
  profileHeader: { alignItems: "center", paddingVertical: spacing.xl },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primary, justifyContent: "center", alignItems: "center", marginBottom: spacing.md },
  avatarText: { fontSize: fontSize["3xl"], fontWeight: "700", color: colors.primaryForeground },
  profileName: { fontSize: fontSize.xl, fontWeight: "700", color: colors.foreground },
  profileEmail: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: 4 },
  explorerStats: { flexDirection: "row", marginTop: spacing.lg, gap: spacing.sm },
  explorerStat: { flex: 1, alignItems: "center", backgroundColor: colors.card, borderRadius: borderRadius.md, paddingVertical: spacing.md, borderWidth: 1, borderColor: colors.border },
  explorerStatMain: { borderColor: colors.vermillion + "40", backgroundColor: colors.vermillion + "08" },
  explorerNum: { fontSize: fontSize.xl, fontWeight: "800", color: colors.foreground },
  explorerScore: { fontSize: fontSize["2xl"], fontWeight: "800", color: colors.vermillion },
  explorerLabel: { fontSize: 10, color: colors.mutedForeground, marginTop: 2, textTransform: "uppercase", letterSpacing: 0.5 },
  section: { marginTop: spacing.lg },
  sectionTitle: { fontSize: fontSize.xs, fontWeight: "700", color: colors.mutedForeground, textTransform: "uppercase", letterSpacing: 1, marginBottom: spacing.sm },
  settingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingsLabel: { fontSize: fontSize.base, color: colors.foreground },
  settingsValue: { fontSize: fontSize.sm, color: colors.mutedForeground },
  settingsChevron: { fontSize: fontSize.base, color: colors.mutedForeground },
  signOutBtn: { marginTop: spacing.xl, paddingVertical: 16, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.destructive, alignItems: "center" },
  signOutText: { fontSize: fontSize.base, fontWeight: "600", color: colors.destructive },
});
