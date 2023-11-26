import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import useTasbeehsStore from "../../src/zustand-stores/useTasbeehsStore";
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
import ScreenWrapper from "../../src/components/ScreenWrapper";
import { vibrate } from "../../src/utils/vibrate";
import appJson from "../../app.json";

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

  const handleSubmitForm = () => {
    if (selectedTasbeeh === undefined) {
      add(tasbeehName);
    } else {
      edit({
        ...selectedTasbeeh!,
        name: tasbeehName,
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
      <Text variant="bodySmall" style={{ padding: 8, textAlign: "center" }}>
        Versi {appJson.expo.version}
      </Text>
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
