import React, { PropsWithChildren } from "react";
import { PaperProvider } from "react-native-paper";
import { AuthProvider } from "../contexts/AuthContext";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <PaperProvider>
      <AuthProvider>{children}</AuthProvider>
    </PaperProvider>
  );
}