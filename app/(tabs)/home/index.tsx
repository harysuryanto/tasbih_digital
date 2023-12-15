import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import useTasbeehsStore from "../../../src/zustand-stores/useTasbeehsStore";
import moment from "moment";
import {
  Appbar,
  Button,
  Dialog,
  List,
  Portal,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";
import ScreenWrapper from "../../../src/components/ScreenWrapper";
import { vibrate } from "../../../src/utils/vibrate";
import Toast from "react-native-simple-toast";
import appJson from "../../../app.json";
import {
  TestIds,
  BannerAd,
  BannerAdSize,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : "ca-app-pub-9675217052405779/2293939504";

export default function index() {
  const router = useRouter();

  const { tasbeehs, add, edit, remove } = useTasbeehsStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTasbeeh, setSelectedTasbeeh] = useState<Tasbeeh | undefined>();
  const [removedTasbeeh, setRemovedTasbeeh] = useState<
    { tasbeeh: Tasbeeh; atIndex: number } | undefined
  >();
  const [tasbeehName, setTasbeehName] = useState("");

  useEffect(() => {
    if (!modalVisible) {
      handleResetForm();
    }
  }, [modalVisible]);

  const tasbeehExists = (name: string) => {
    return (
      tasbeehs.find(
        (tasbeeh) => tasbeeh.name.toLowerCase() === name.toLowerCase()
      ) !== undefined
    );
  };

  const handleSubmitForm = () => {
    if (tasbeehExists(tasbeehName)) {
      Toast.show(
        "Sudah ada tasbih dengan nama yang sama, gunakan nama lain.",
        Toast.LONG
      );
      return;
    }

    if (selectedTasbeeh === undefined) {
      add(tasbeehName.trim());
    } else {
      edit({
        ...selectedTasbeeh!,
        name: tasbeehName.trim(),
      });
    }

    setModalVisible(false);
  };

  const handleResetForm = () => {
    setTasbeehName("");
    setSelectedTasbeeh(undefined);
  };

  const handleRemoveTasbeeh = () => {
    vibrate("light");
    setRemovedTasbeeh(remove(selectedTasbeeh!.id));
    setModalVisible(false);
  };

  const handleUndoRemoveTasbeeh = () => {
    vibrate("light");
    add(removedTasbeeh!.tasbeeh, removedTasbeeh?.atIndex);
  };

  return (
    <ScreenWrapper withScrollView={false}>
      <Appbar.Header>
        <Appbar.Content title="Pilih tasbihmu" />
        <Appbar.Action icon="plus" onPress={() => setModalVisible(true)} />
      </Appbar.Header>
      {tasbeehs.length === 0 ? (
        <Text variant="bodyMedium" style={styles.noDataText}>
          Tidak ada tasbih. Tekan tombol + untuk menambah tasbih.
        </Text>
      ) : (
        <FlashList
          data={tasbeehs}
          renderItem={({ item }) => (
            <List.Item
              title={item.name}
              description={
                item.usedAt
                  ? "Digunakan pada " + moment(item.usedAt).format("D MMM YYYY")
                  : "Belum pernah digunakan"
              }
              right={({ color, style }) => (
                <Text style={{ ...style, color }}>{item.count}</Text>
              )}
              onPress={() => router.push(`/counter/${item.id}`)}
              onLongPress={() => {
                setModalVisible(true);
                setSelectedTasbeeh(item);
                setTasbeehName(item.name);
              }}
            />
          )}
          estimatedItemSize={200}
        />
      )}
      <Text variant="bodySmall" style={{ padding: 8, textAlign: "center" }}>
        Versi {appJson.expo.version}
      </Text>
      <BannerAd
        unitId={adUnitId!}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
      <Portal>
        <Dialog visible={modalVisible} onDismiss={() => setModalVisible(false)}>
          <Dialog.Title>
            {selectedTasbeeh === undefined ? "Tambah" : "Ubah nama"} tasbih
          </Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Tulis nama tasbih..."
              value={tasbeehName}
              keyboardType="name-phone-pad"
              autoFocus
              onChangeText={setTasbeehName}
            />
          </Dialog.Content>
          <Dialog.Actions>
            {selectedTasbeeh !== undefined && (
              <Button onPress={handleRemoveTasbeeh}>Hapus</Button>
            )}
            <Button disabled={tasbeehName === ""} onPress={handleSubmitForm}>
              Simpan
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Snackbar
        visible={removedTasbeeh !== undefined}
        onDismiss={() => setRemovedTasbeeh(undefined)}
        action={{ label: "Urungkan", onPress: handleUndoRemoveTasbeeh }}
      >
        {`${removedTasbeeh?.tasbeeh.name} dihapus`}
      </Snackbar>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  noDataText: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
