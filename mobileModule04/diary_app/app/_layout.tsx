import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { AuthProvider } from "@/context/authContext";
import { ThemedSafeAreaView } from "@/components/ThemedSafeArea";
import { Colors } from "@/constants/Colors";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? "light"].background;

  SplashScreen.hideAsync();

  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <ThemedSafeAreaView
            style={[{ flex: 1 }, { backgroundColor: backgroundColor }]}
          >
            <Stack screenOptions={{ gestureEnabled: true }}>
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                  gestureEnabled: true,
                  gestureDirection: "horizontal",
                }}
              />
              <Stack.Screen
                name="+not-found"
                options={{
                  gestureEnabled: true,
                }}
              />
            </Stack>
          </ThemedSafeAreaView>
          <StatusBar style="auto" />
        </ThemeProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
