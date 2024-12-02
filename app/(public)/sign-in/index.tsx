import { View, StyleSheet, Alert } from "react-native";
import { Button, SegmentedButtons, TextInput } from "react-native-paper";
import React, { useState } from "react";
import { useAuth } from "@/src/contexts/AuthContext";
import catchError from "@/src/utils/catchError";

const getInitEmailValue = () => {
  return process.env.NODE_ENV === "development"
    ? "hary.suryanto01@gmail.com"
    : "";
};

const getInitPasswordValue = () => {
  return process.env.NODE_ENV === "development" ? "12345678" : "";
};

export default function SignInScreen() {
  const { signIn, signUp } = useAuth();

  const [activeTab, setActiveTab] = useState("signin");
  const [email, setEmail] = useState(getInitEmailValue);
  const [password, setPassword] = useState(getInitPasswordValue);
  const [name, setName] = useState("");

  const handleSignIn = async () => {
    const [error] = await catchError(signIn(email, password));

    if (error) {
      Alert.alert("", error.message);
    }
  };

  const handleSignUp = async () => {
    const [error] = await catchError(signUp(email, password, name));

    if (error) {
      Alert.alert("", error.message);
    }
  };

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
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
          />
          <Button onPress={handleSignIn}>Sign In</Button>
          {/* <Button onPress={signInWithGoogle}>Sign In with Google</Button> */}
        </>
      ) : (
        <>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
          />
          <TextInput
            label="Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            keyboardType="default"
            autoCapitalize="words"
          />
          <Button onPress={handleSignUp}>Sign Up</Button>
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
