import { useRouter, useSegments } from "expo-router";
import { useAuth } from "@/src/contexts/AuthContext";
import { useEffect } from "react";

export default function useAuthRedirection() {
  const router = useRouter();
  const segments = useSegments();

  const { isLoadingAuth, authState } = useAuth();

  useEffect(() => {
    const isInSplashScreen = segments[0] === "splash-screen";
    const isInPrivateArea = segments[0] === "(private)";
    const isSignedIn = !!authState;

    if (isLoadingAuth) {
      return;
    }

    if (isInSplashScreen) {
      router.replace(isSignedIn ? "/home" : "/sign-in");
      return;
    }

    if (isSignedIn && !isInPrivateArea) {
      router.replace("/home");
    } else if (!isSignedIn && isInPrivateArea) {
      router.replace("/sign-in");
    }
  }, [isLoadingAuth, authState, segments]);
}
