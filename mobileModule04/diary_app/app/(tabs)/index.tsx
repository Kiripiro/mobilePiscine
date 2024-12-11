import React from "react";
import { View } from "react-native";
import GoogleSignInButton from "../../components/GoogleSignInButton";
import { useAuth } from "@/context/authContext";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const { user } = useAuth();
  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      {!user ? (
        <GoogleSignInButton />
      ) : (
        <ThemedText>Bonjour {user.displayName}</ThemedText>
      )}
    </ThemedView>
  );
}
