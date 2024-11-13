import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import useTasbeehsStore from "@/src/stores/useTasbeehsStore";
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
import ScreenWrapper from "@/src/components/ScreenWrapper";
import { vibrate } from "@/src/utils/vibrate";
import Toast from "react-native-simple-toast";
import BannerAdsInHome from "@/src/components/BannerAdsInHome";
import { TasbeehDoc } from "@/src/types/tasbeeh";

export default function HomeScreen() {
  const router = useRouter();

  const tasbeehs = useTasbeehsStore(({ tasbeehs }) => tasbeehs);
  const { load, add, update, remove } = useTasbeehsStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTasbeeh, setSelectedTasbeeh] = useState<
    TasbeehDoc | undefined
  >();
  const [removedTasbeeh, setRemovedTasbeeh] = useState<
    TasbeehDoc | undefined
  >();
  const [tasbeehName, setTasbeehName] = useState("");

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!modalVisible) {
      handleResetForm();
    }
  }, [modalVisible]);

  const tasbeehExists = useCallback(
    (name: string) => {
      return (
        tasbeehs.find(
          (tasbeeh) => tasbeeh.name.toLowerCase() === name.toLowerCase()
        ) !== undefined
      );
    },
    [tasbeehs]
  );

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
      update(selectedTasbeeh.$id, {
        name: tasbeehName.trim(),
        count: selectedTasbeeh.count,
      });
    }

    setModalVisible(false);
  };

  const handleResetForm = () => {
    setTasbeehName("");
    setSelectedTasbeeh(undefined);
  };

  const handleRemoveTasbeeh = async () => {
    vibrate("light");
    setRemovedTasbeeh(await remove(selectedTasbeeh!.$id));
    setModalVisible(false);
  };

  // const handleUndoRemoveTasbeeh = () => {
  //   vibrate("light");
  //   add(removedTasbeeh!.tasbeeh, removedTasbeeh?.atIndex);
  // };

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
        <ScrollView>
          <>
            {tasbeehs.map((tasbeeh) => (
              <List.Item
                key={tasbeeh.$id}
                title={tasbeeh.name}
                description={
                  tasbeeh.usedAt
                    ? "Digunakan pada " +
                      moment(tasbeeh.usedAt).format("D MMM YYYY")
                    : "Belum pernah digunakan"
                }
                right={({ color, style }) => (
                  <Text style={{ ...style, color }}>{tasbeeh.count}</Text>
                )}
                onPress={() => router.push(`/(private)/counter/${tasbeeh.$id}`)}
                onLongPress={() => {
                  setModalVisible(true);
                  setSelectedTasbeeh(tasbeeh);
                  setTasbeehName(tasbeeh.name);
                }}
              />
            ))}
            <BannerAdsInHome containerStyle={{ marginTop: 500 }} />
          </>
        </ScrollView>
      )}
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
        // action={{ label: "Urungkan", onPress: handleUndoRemoveTasbeeh }}
      >
        {`${removedTasbeeh?.name} dihapus`}
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
