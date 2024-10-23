import { View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import React, { useState } from "react";
import { useAuth } from "@/src/contexts/AuthContext";

export default function SignInScreen() {
  const { signIn, signInWithGoogle, signUp, signOut } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Button onPress={signInWithGoogle}>Login with Google</Button>
      <Button onPress={() => signIn(email, password)}>Login</Button>
      <Button onPress={() => signUp(email, password, name)}>Register</Button>
      <Button onPress={signOut}>Logout</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});
