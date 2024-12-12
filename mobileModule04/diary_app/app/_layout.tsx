import React, { useEffect } from "react";
import { router, Stack } from "expo-router";
import { AuthProvider, useAuth } from "@/context/authContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Layout />
      </GestureHandlerRootView>
    </AuthProvider>
  );
}

function Layout() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="login"
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen name="+not-found" options={{ title: "Not Found" }} />
      </Stack>
    );
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen name="+not-found" options={{ title: "Not Found" }} />
    </Stack>
  );
}
