import { Account, Client, Databases, ID, Models } from "react-native-appwrite";

export const client = new Client()
  .setProject("6710b5a600394e11084c")
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setPlatform("com.harysuryanto.tasbihdigital");
export const account = new Account(client);
export const databases = new Databases(client);

export const DATABASE_ID = "67191c4d0038e3b3d71b";
export const TASBEEHS_COLLECTION_ID = "67191c63001dfe73156a";

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

export const getTasbeehs = async (
  queries?: string[]
): Promise<Models.DocumentList<TasbeehDoc>> => {
  return await databases.listDocuments(
    DATABASE_ID,
    TASBEEHS_COLLECTION_ID,
    queries
  );
};

export const addTasbeeh = async (
  data: TasbeehsCollectionAttributes
): Promise<TasbeehDoc> => {
  return await databases.createDocument(
    DATABASE_ID,
    TASBEEHS_COLLECTION_ID,
    ID.unique(),
    data
  );
};

export const updateTasbeeh = async (
  documentId: string,
  data?: Partial<TasbeehsCollectionAttributes>,
  permissions?: string[]
): Promise<TasbeehDoc> => {
  return await databases.updateDocument(
    DATABASE_ID,
    TASBEEHS_COLLECTION_ID,
    documentId,
    data,
    permissions
  );
};

export const deleteTasbeeh = async (documentId: string): Promise<{}> => {
  return await databases.deleteDocument(
    DATABASE_ID,
    TASBEEHS_COLLECTION_ID,
    documentId
  );
};
