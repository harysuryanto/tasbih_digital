import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { ID } from "react-native-appwrite";
import { account } from "../../../src/constants/Appwrite";
import { useAuth } from "../../../src/contexts/AuthContext";

export default function SignInScreen() {
  const { authState, signIn, signOut } = useAuth();

  // const [loggedInUser, setLoggedInUser] =
  //   useState<Models.User<Models.Preferences> | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function login(email: string, password: string) {
    await signIn(email, password);
    // await account.createEmailPasswordSession(email, password);
    // setLoggedInUser(await account.get());
  }

  async function register(email: string, password: string, name: string) {
    await account.create(ID.unique(), email, password, name);
    await signIn(email, password);
    // await login(email, password);
    // setLoggedInUser(await account.get());
  }

  return (
    <View style={styles.root}>
      <Text>
        {authState ? `Logged in as ${authState.name}` : "Not logged in"}
      </Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => login(email, password)}
        >
          <Text>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => register(email, password, name)}
        >
          <Text>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            signOut();
            // await account.deleteSession("current");
          }}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginTop: 40,
    marginBottom: 40,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "gray",
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
  },
});
