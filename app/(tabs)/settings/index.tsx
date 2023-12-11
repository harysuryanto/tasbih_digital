import React from "react";
import ScreenWrapper from "../../../src/components/ScreenWrapper";
import { Appbar, List, Switch } from "react-native-paper";
import useSettingsStore from "../../../src/zustand-stores/useSettingsStore";

export default function index() {
  const {
    vibrationEvery33,
    vibrationEvery100,
    setVibrationEvery33,
    setVibrationEvery100,
  } = useSettingsStore();

  return (
    <ScreenWrapper withScrollView={false}>
      <Appbar.Header>
        <Appbar.Content title="Pengaturan" />
      </Appbar.Header>
      <List.Section>
        <List.Subheader>Getaran</List.Subheader>
        <List.Item
          title="Getar panjang di kelipatan 33"
          right={() => (
            <Switch
              value={vibrationEvery33}
              onValueChange={() => setVibrationEvery33(!vibrationEvery33)}
            />
          )}
        />
        <List.Item
          title="Getar panjang di kelipatan 100"
          right={() => (
            <Switch
              value={vibrationEvery100}
              onValueChange={() => setVibrationEvery100(!vibrationEvery100)}
            />
          )}
        />
      </List.Section>
    </ScreenWrapper>
  );
}
