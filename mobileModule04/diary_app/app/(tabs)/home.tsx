import React from "react";
import { View, Text, Button } from "react-native";
import { useAuth } from "@/context/authContext";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    logout();
    router.replace("/");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to your Diary App</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
