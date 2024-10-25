import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  account,
  addTasbeeh,
  deleteTasbeeh,
  getTasbeehs,
  TasbeehDoc,
  type TasbeehsCollectionAttributes,
  updateTasbeeh,
} from "@/src/services/appwriteService";
import catchError from "@/src/utils/catchError";
import { Query } from "react-native-appwrite";

type Store = {
  tasbeehs: TasbeehDoc[];
  load: () => Promise<TasbeehDoc[]>;
  add: (name: string) => Promise<void>;
  update: (
    id: string,
    tasbeeh: {
      name: string;
      count: number;
    }
  ) => Promise<void>;
  remove: (id: string, name: string) => Promise<TasbeehDoc>;
  setCount: (id: string, count: number) => Promise<void>;
  increment: (id: string) => Promise<void>;
  decrement: (id: string) => Promise<void>;
  reset: (id: string) => Promise<void>;
};

const getCurrentDateTime = (): number => {
  const currentDatetime = new Date();
  return currentDatetime.getTime();
};

const getQueries = async () => [
  Query.equal("userId", (await account.getSession("current")).$id),
  Query.isNull("deletedAt"),
];

const useTasbeehsStore = create<Store>()(
  persist(
    (set, get) => ({
      tasbeehs: [],
      load: async (): ReturnType<Store["load"]> => {
        const [error, data] = await catchError(getTasbeehs(await getQueries()));

        if (error) {
          console.log("Error in load:", error);
          return [];
        }

        set(() => ({ tasbeehs: data.documents }));

        return data.documents;
      },
      add: async (value) => {
        const userId = (await account.getSession("current")).$id;
        const newTasbeeh =
          typeof value === "string"
            ? ({
                userId,
                name: value,
                count: 0,
                createdAt: getCurrentDateTime(),
              } satisfies TasbeehsCollectionAttributes)
            : value;

        // if (atIndex === undefined) {
        //   tasbeehs.push(newTasbeeh);
        // } else {
        //   tasbeehs.splice(atIndex, 0, newTasbeeh);
        // }

        const [errorAdding] = await catchError(addTasbeeh(newTasbeeh));
        if (errorAdding) {
          console.log("Error in add:", errorAdding);
          return;
        }

        const [errorGetting, tasbeehs] = await catchError(
          getTasbeehs(await getQueries())
        );
        if (errorGetting) {
          console.log("Error in add:", errorGetting);
          return;
        }

        set(() => ({ tasbeehs: tasbeehs.documents }));
      },
      update: async (id, { name, count }) => {
        const [errorUpdating] = await catchError(
          updateTasbeeh(id, {
            name: name,
            count: count,
            updatedAt: getCurrentDateTime(),
          })
        );

        if (errorUpdating) {
          console.log("Error in update:", errorUpdating);
          return;
        }

        const [errorGetting, tasbeehs] = await catchError(
          getTasbeehs(await getQueries())
        );
        if (errorGetting) {
          console.log("Error in add:", errorGetting);
          return;
        }

        set(() => ({ tasbeehs: tasbeehs.documents }));

        // set((state) => ({
        //   tasbeehs: state.tasbeehs.map((value) => {
        //     if (value.$id === id) {
        //       return {
        //         ...value,
        //         name,
        //         count,
        //         updatedAt: getCurrentDateTime(),
        //       };
        //     }
        //     return value;
        //   }),
        // }));
      },
      remove: async (id, name): ReturnType<Store["remove"]> => {
        console.log(id, name);

        const indexToRemove = get().tasbeehs.findIndex(({ $id }) => $id === id);
        let deletedData: TasbeehDoc;
        const newTasbeehs = [...get().tasbeehs];

        if (indexToRemove !== -1) {
          deletedData = get().tasbeehs[indexToRemove];
          newTasbeehs.splice(indexToRemove, 1);
        }

        set(() => ({ tasbeehs: newTasbeehs }));

        const [errorDeleting] = await catchError(deleteTasbeeh(id));
        if (errorDeleting) {
          console.log("Error in remove:", errorDeleting);
          throw errorDeleting;
        }

        return deletedData!;
      },
      setCount: async (id, count) => {
        set((state) => ({
          tasbeehs: state.tasbeehs.map((value) => {
            if (id === value.$id) {
              return {
                ...value,
                count: count,
                usedAt: getCurrentDateTime(),
                updatedAt: getCurrentDateTime(),
              } satisfies typeof value;
            }
            return value;
          }),
        }));

        const [error] = await catchError(
          updateTasbeeh(id, {
            count: count,
            usedAt: getCurrentDateTime(),
            updatedAt: getCurrentDateTime(),
          })
        );
        if (error) {
          console.log("Error in setCount:", error);
          return;
        }
      },
      increment: async (id) => {
        let count = 0;

        set((state) => ({
          tasbeehs: state.tasbeehs.map((value) => {
            if (id === value.$id) {
              count = value.count + 1;

              return {
                ...value,
                count,
                usedAt: getCurrentDateTime(),
                updatedAt: getCurrentDateTime(),
              } satisfies typeof value;
            } else {
              return value;
            }
          }),
        }));

        const [error] = await catchError(
          updateTasbeeh(id, {
            count,
            usedAt: getCurrentDateTime(),
            updatedAt: getCurrentDateTime(),
          })
        );
        if (error) {
          console.log("Error in increment:", error);
          return;
        }
      },
      decrement: async (id) => {
        let count = 0;

        set((state) => ({
          tasbeehs: state.tasbeehs.map((value) => {
            if (id === value.$id) {
              count = value.count > 0 ? value.count - 1 : 0;

              return {
                ...value,
                count,
                usedAt: getCurrentDateTime(),
                updatedAt: getCurrentDateTime(),
              } satisfies typeof value;
            } else {
              return value;
            }
          }),
        }));

        const [error] = await catchError(
          updateTasbeeh(id, {
            count,
            usedAt: getCurrentDateTime(),
            updatedAt: getCurrentDateTime(),
          })
        );
        if (error) {
          console.log("Error in decrement:", error);
          return;
        }
      },
      reset: async (id) => {
        set((state) => ({
          tasbeehs: state.tasbeehs.map((value) => {
            if (id === value.$id) {
              return {
                ...value,
                count: 0,
                usedAt: getCurrentDateTime(),
                updatedAt: getCurrentDateTime(),
              } satisfies typeof value;
            }
            return value;
          }),
        }));

        const [error] = await catchError(
          updateTasbeeh(id, {
            count: 0,
            usedAt: getCurrentDateTime(),
            updatedAt: getCurrentDateTime(),
          })
        );
        if (error) {
          console.log("Error in reset:", error);
          return;
        }
      },
    }),
    {
      name: "tasbeehs-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useTasbeehsStore;
