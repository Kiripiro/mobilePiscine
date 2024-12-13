import React from "react";
import { Button, Text } from "react-native";
import { useAuth } from "@/context/authContext";
import { ThemedView } from "./ThemedView";
import { router } from "expo-router";
import { useEntries } from "@/context/entriesContext";

export default function Logout() {
  const { logout } = useAuth();
  const { clearEntries } = useEntries();

  const handleLogout = async () => {
    await logout();
    router.dismissAll();
    router.replace("/");
    clearEntries();
  };

  return (
    <ThemedView
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Déconnexion</Text>
      <Button title="Se déconnecter" onPress={handleLogout} />
    </ThemedView>
  );
}
