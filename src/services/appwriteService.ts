import { Account, Client } from "react-native-appwrite";

export const client = new Client()
  .setProject("6710b5a600394e11084c")
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setPlatform("com.harysuryanto.tasbihdigital");
export const account = new Account(client);
