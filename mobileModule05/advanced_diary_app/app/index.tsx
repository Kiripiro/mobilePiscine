import React from "react";
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/authContext";

export default function IndexScreen() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLoginPress = () => {
    if (user) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to your Diary App</Text>
      <Button title="Login" onPress={handleLoginPress} />
    </View>
  );
}
