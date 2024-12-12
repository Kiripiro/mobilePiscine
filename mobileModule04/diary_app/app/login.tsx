import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { useAuth } from "@/context/authContext";
import { ThemedView } from "@/components/ThemedView";
import GithubSignInButton from "@/components/GithubSignInButton";
import { ThemedText } from "@/components/ThemedText";

export default function LoginScreen() {
  const router = useRouter();
  const { user } = useAuth();
  console.log("lgin screen", user);

  useEffect(() => {
    if (user) router.replace("/(tabs)/home");
  }, [user]);

  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ThemedText type="subtitle" style={styles.text}>
        Authentification
      </ThemedText>
      <View style={{ height: 130 }}>
        <GoogleSignInButton />
        <GithubSignInButton />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  text: {
    marginBottom: 80,
    marginTop: -60,
  },
});
