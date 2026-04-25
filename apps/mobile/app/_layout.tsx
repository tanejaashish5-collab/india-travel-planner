import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { colors } from "../lib/theme";
import { usePreferences } from "../hooks/usePreferences";
import { OfflineIndicator } from "../components/OfflineIndicator";
import { useNetworkState } from "../hooks/useNetworkState";
import { prefetchCoreContent, drainOfflineQueue } from "../lib/prefetch";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

// NakshIQ brand theme — Ink Deep + Bone + Vermillion
const AppDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.foreground,        // Bone
    background: colors.background,     // Ink Deep #161614
    card: colors.card,                 // Lifted Ink
    text: colors.foreground,           // Bone
    border: colors.border,
    notification: colors.vermillion,   // Vermillion Bright
  },
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const { onboarded, loading: prefsLoading } = usePreferences();
  const { isConnected } = useNetworkState();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && !prefsLoading) SplashScreen.hideAsync();
  }, [loaded, prefsLoading]);

  // Redirect to onboarding if first-time user
  useEffect(() => {
    if (loaded && !prefsLoading && onboarded === false) {
      router.replace("/onboarding");
    }
  }, [loaded, prefsLoading, onboarded]);

  // Prefetch core content on first launch — warms cache so flaky-network
  // sessions in Ladakh/Spiti can browse without spinning.
  useEffect(() => {
    if (loaded && !prefsLoading && isConnected) {
      prefetchCoreContent().catch(() => {});
    }
  }, [loaded, prefsLoading, isConnected]);

  // Drain queued mutations whenever the device reconnects.
  useEffect(() => {
    if (isConnected) {
      drainOfflineQueue().catch(() => {});
    }
  }, [isConnected]);

  if (!loaded || prefsLoading) return null;

  return (
    <ThemeProvider value={AppDarkTheme}>
      <Stack>
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="destination/[id]"
          options={{
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.foreground,
            headerBackTitle: "Back",
          }}
        />
        <Stack.Screen
          name="trek/[id]"
          options={{
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.foreground,
            headerBackTitle: "Back",
          }}
        />
        <Stack.Screen name="treks" options={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground, headerBackTitle: "Back" }} />
        <Stack.Screen name="routes" options={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground, headerBackTitle: "Back" }} />
        <Stack.Screen name="route/[id]" options={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground, headerBackTitle: "Back" }} />
        <Stack.Screen name="collections" options={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground, headerBackTitle: "Back" }} />
        <Stack.Screen name="collection/[id]" options={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground, headerBackTitle: "Back" }} />
        <Stack.Screen name="festivals" options={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground, headerBackTitle: "Back" }} />
        <Stack.Screen name="camping" options={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground, headerBackTitle: "Back" }} />
        <Stack.Screen name="stays" options={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground, headerBackTitle: "Back" }} />
        <Stack.Screen name="permits" options={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground, headerBackTitle: "Back" }} />
        <Stack.Screen name="road-conditions" options={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground, headerBackTitle: "Back" }} />
        <Stack.Screen name="superlatives" options={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground, headerBackTitle: "Back" }} />
        <Stack.Screen name="region/[id]" options={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground, headerBackTitle: "Back" }} />
        <Stack.Screen name="about" options={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground, headerBackTitle: "Back" }} />
        <Stack.Screen name="sos" options={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground, headerBackTitle: "Back" }} />
        <Stack.Screen name="blog" options={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground, headerBackTitle: "Back" }} />
        <Stack.Screen name="blog/[slug]" options={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground, headerBackTitle: "Back" }} />
        <Stack.Screen name="where-to-go" options={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground, headerBackTitle: "Back" }} />
        <Stack.Screen name="tourist-traps" options={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground, headerBackTitle: "Back" }} />
        <Stack.Screen name="destination-month" options={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground, headerBackTitle: "Back" }} />
        <Stack.Screen name="vs" options={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground, headerBackTitle: "Back" }} />
        <Stack.Screen name="with-kids" options={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground, headerBackTitle: "Back" }} />
      </Stack>
      <OfflineIndicator />
    </ThemeProvider>
  );
}
