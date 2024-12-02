import "expo-dev-client";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { checkOtaUpdate } from "@/src/utils/ota-update";
import Providers from "@/src/components/Providers";
import useAuthRedirection from "@/src/hooks/useAuthRedirection";

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
      <Stack.Screen name="(private)" />
    </Stack>
  );
}

export default function Root() {
  return (
    <Providers>
      <Layout />
    </Providers>
  );
}
