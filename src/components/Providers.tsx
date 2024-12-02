import React, { PropsWithChildren, useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
import { AuthProvider } from "@/src/contexts/AuthContext";

export default function Providers({ children }: PropsWithChildren) {
  // Load fonts at root before navigation.
  const [loaded, error] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
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
    <PaperProvider>
      <AuthProvider>{children}</AuthProvider>
    </PaperProvider>
  );
}
