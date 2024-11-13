import type { Models } from "react-native-appwrite";

export type TasbeehsCollectionAttributes = {
  userId: string;
  name: string;
  count: number;
  usedAt?: number;
  createdAt: number;
  updatedAt?: number;
  deletedAt?: number;
};
export type TasbeehDoc = ExcludeIndex<
  Models.Document & TasbeehsCollectionAttributes
>;
