import { Text } from "react-native";
import React from "react";
import ScreenWrapper from "@/src/components/ScreenWrapper";

const appVersion: string = require("@/package.json").version;

export default function SplashScreen() {
  return (
    <ScreenWrapper withScrollView={false} style={{ justifyContent: "center" }}>
      <Text
        style={{
          fontFamily: "SpaceMono",
          fontSize: 32,
          lineHeight: 32 * 1.5,
          textAlign: "center",
        }}
      >
        Tasbih Digital
      </Text>
      <Text style={{ fontSize: 12, textAlign: "center" }}>v{appVersion}</Text>
    </ScreenWrapper>
  );
}
