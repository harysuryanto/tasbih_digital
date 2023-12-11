import React from "react";
import ScreenWrapper from "../../../src/components/ScreenWrapper";
import { Appbar, Text } from "react-native-paper";

export default function index() {
  return (
    <ScreenWrapper withScrollView={false}>
      <Appbar.Header>
        <Appbar.Content title="Pengaturan" />
      </Appbar.Header>
      <Text variant="bodyMedium">Content here</Text>
    </ScreenWrapper>
  );
}
