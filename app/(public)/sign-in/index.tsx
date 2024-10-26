import { View, StyleSheet } from "react-native";
import { Button, SegmentedButtons, TextInput } from "react-native-paper";
import React, { useState } from "react";
import { useAuth } from "@/src/contexts/AuthContext";

export default function SignInScreen() {
  const { signIn, signUp } = useAuth();

  const [activeTab, setActiveTab] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
      <SegmentedButtons
        value={activeTab}
        onValueChange={setActiveTab}
        buttons={[
          {
            value: "signin",
            label: "Sign In",
          },
          {
            value: "signup",
            label: "Sign Up",
          },
        ]}
      />
      {activeTab === "signin" ? (
        <>
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            mode="outlined"
            secureTextEntry
          />
          <Button onPress={() => signIn(email, password)}>Sign In</Button>
          {/* <Button onPress={signInWithGoogle}>Sign In with Google</Button> */}
        </>
      ) : (
        <>
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            mode="outlined"
            secureTextEntry
          />
          <TextInput
            label="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            mode="outlined"
            keyboardType="default"
            autoCapitalize="words"
          />
          <Button onPress={() => signUp(email, password, name)}>Sign Up</Button>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    backgroundColor: "white",
    flex: 1,
    gap: 8,
    justifyContent: "center",
    padding: 20,
  },
});
