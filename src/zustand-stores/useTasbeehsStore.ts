import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import * as Crypto from "expo-crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Store = {
  tasbeehs: Tasbeeh[];
  add: (nameOrTasbeeh: string | Tasbeeh, atIndex?: number) => void;
  edit: (tasbih: Tasbeeh) => void;
  remove: (id: string) => { tasbeeh: Tasbeeh; atIndex: number };
  setCount: (id: string, count: number) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  reset: (id: string) => void;
};

const getCurrentDateTime = (): number => {
  const currentDatetime = new Date();
  return currentDatetime.getTime();
};

const useTasbeehsStore = create<Store>()(
  persist(
    (set, get) => ({
      tasbeehs: [
        {
          id: Crypto.randomUUID(),
          name: "SubhanAllah",
          count: 0,
          usedAt: 0,
          updatedAt: 0,
        },
      ] satisfies Tasbeeh[],
      add: (value, atIndex) => {
        const newTasbeehs = [...get().tasbeehs];
        const newItem =
          typeof value === "string"
            ? ({
                id: Crypto.randomUUID(),
                name: value,
                count: 0,
                usedAt: 0,
                updatedAt: 0,
              } satisfies Tasbeeh)
            : value;

        if (atIndex === undefined) {
          newTasbeehs.push(newItem);
        } else {
          newTasbeehs.splice(atIndex, 0, newItem);
        }

        set((state) => ({ tasbeehs: newTasbeehs }));
      },
      edit: (tasbeeh) =>
        set((state) => ({
          tasbeehs: state.tasbeehs.map((value) => {
            if (tasbeeh.id === value.id) {
              return {
                ...tasbeeh,
                updatedAt: getCurrentDateTime(),
              } satisfies Tasbeeh;
            }
            return value;
          }),
        })),
      remove: (id) => {
        let deletedData: Tasbeeh | undefined;
        const newTasbeehs = [...get().tasbeehs];

        const indexToRemove = get().tasbeehs.findIndex(
          (value) => value.id === id
        );

        if (indexToRemove !== -1) {
          deletedData = get().tasbeehs[indexToRemove];
          newTasbeehs.splice(indexToRemove, 1);
        }

        set((state) => ({ tasbeehs: newTasbeehs }));

        return { tasbeeh: deletedData!, atIndex: indexToRemove };
      },
      setCount: (id, count) =>
        set((state) => ({
          tasbeehs: state.tasbeehs.map((value) => {
            if (id === value.id) {
              return {
                ...value,
                count: count,
                usedAt: getCurrentDateTime(),
                updatedAt: getCurrentDateTime(),
              } satisfies Tasbeeh;
            }
            return value;
          }),
        })),
      increment: (id) =>
        set((state) => ({
          tasbeehs: state.tasbeehs.map((value) => {
            if (id === value.id) {
              return {
                ...value,
                count: value.count + 1,
                usedAt: getCurrentDateTime(),
                updatedAt: getCurrentDateTime(),
              } satisfies Tasbeeh;
            }
            return value;
          }),
        })),
      decrement: (id) =>
        set((state) => ({
          tasbeehs: state.tasbeehs.map((value) => {
            if (id === value.id) {
              const newCount = value.count > 0 ? value.count - 1 : 0;
              return {
                ...value,
                count: newCount,
                usedAt: getCurrentDateTime(),
                updatedAt: getCurrentDateTime(),
              } satisfies Tasbeeh;
            }
            return value;
          }),
        })),
      reset: (id) =>
        set((state) => ({
          tasbeehs: state.tasbeehs.map((value) => {
            if (id === value.id) {
              return {
                ...value,
                count: 0,
                usedAt: getCurrentDateTime(),
                updatedAt: getCurrentDateTime(),
              } satisfies Tasbeeh;
            }
            return value;
          }),
        })),
    }),
    {
      name: "tasbeehs-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useTasbeehsStore;
