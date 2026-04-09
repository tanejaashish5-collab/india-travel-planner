import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { colors } from "../lib/theme";

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

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ThemeProvider value={AppDarkTheme}>
      <Stack>
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
      </Stack>
    </ThemeProvider>
  );
}
