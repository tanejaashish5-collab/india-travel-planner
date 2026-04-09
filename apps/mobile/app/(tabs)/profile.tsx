import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, fontSize } from "../../lib/theme";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>👤</Text>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Sign in to sync across devices</Text>
      <Text style={styles.description}>
        Create an account to save destinations, build trip boards, and get personalized recommendations.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: "center", alignItems: "center", padding: spacing.xl },
  emoji: { fontSize: 48, marginBottom: spacing.md },
  title: { fontSize: fontSize["2xl"], fontWeight: "700", color: colors.foreground },
  subtitle: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.xs },
  description: { fontSize: fontSize.sm, color: colors.mutedForeground, textAlign: "center", marginTop: spacing.md, lineHeight: 22 },
});
