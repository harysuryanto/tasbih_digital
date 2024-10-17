import { useRouter, useSegments } from "expo-router";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

export default function useAuthRedirection() {
  const router = useRouter();
  const segments = useSegments();

  const { isLoading: isLoadingAuth, authState } = useAuth();

  useEffect(() => {
    const isInPrivateArea =
      segments[0] === "(tabs)" || segments[0] === "counter";
    const isSignedIn = !!authState;

    if (isLoadingAuth) return;

    if (isSignedIn && !isInPrivateArea) {
      router.replace("/home");
    } else if (!isSignedIn && isInPrivateArea) {
      router.replace("/sign-in");
    }
  }, [isLoadingAuth, authState, segments]);
}
