import React from "react";
import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "@/context/authContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { EntriesProvider } from "@/context/entriesContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <EntriesProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Layout />
        </GestureHandlerRootView>
      </EntriesProvider>
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
        <Stack.Screen
          name="+not-found"
          options={{ headerShown: false, title: "Not Found" }}
        />
      </Stack>
    );
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen name="+not-found" options={{ title: "Not Found" }} />
    </Stack>
  );
}
