import "expo-dev-client";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { checkOtaUpdate } from "../src/utils/ota-update";
import Providers from "../src/components/Providers";
import useAuthRedirection from "../src/hooks/useAuthRedirection";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function Layout() {
  // Load all stuff here that needs to run only once at the beginning.
  useEffect(() => {
    checkOtaUpdate();
  }, []);

  useAuthRedirection();

  return (
    <Stack screenOptions={{ headerShown: false, animation: "ios" }}>
      <Stack.Screen name="splash-screen" />
      <Stack.Screen name="(public)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="counter/[tasbeehId]" options={{ title: "Tasbih" }} />
    </Stack>
  );
}

export default function RootLayout() {
  // Load fonts at root before navigation.
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <Providers>
      <Layout />
    </Providers>
  );
}
