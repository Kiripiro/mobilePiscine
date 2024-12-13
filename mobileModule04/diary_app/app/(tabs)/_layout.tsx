import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { TabView } from "react-native-tab-view";
import { SafeAreaView } from "react-native-safe-area-context";

import ThemedTabBar from "@/components/ui/ThemedTabBar";
import { IconSymbolName } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider, useAuth } from "@/context/authContext";

import HomeScreen from "./home";

export default function TabLayout() {
  const { user } = useAuth();
  const [index, setIndex] = useState(0);
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? "light"].background;

  const routes = [
    {
      key: "home",
      title: "Home",
      icon: "house" as IconSymbolName,
    },
  ];

  const renderScene = ({
    route,
  }: {
    route: { key: string; title: string; icon: IconSymbolName };
  }) => {
    switch (route.key) {
      case "home":
        return <HomeScreen />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <TabView
        swipeEnabled={user ? true : false}
        tabBarPosition="bottom"
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={(props) =>
          user ? (
            <ThemedTabBar
              navigationState={props.navigationState}
              index={index}
              onTabPress={setIndex}
            />
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
