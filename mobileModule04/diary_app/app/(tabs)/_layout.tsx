import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

import ThemedTabBar from "@/components/ui/ThemedTabBar";
import { IconSymbolName } from "@/components/ui/IconSymbol";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import HomeScreen from "./index";
import { useAuth } from "@/context/authContext";

export default function TabLayout() {
  const { user } = useAuth();
  const [index, setIndex] = useState(0);
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? "light"].background;

  const routes = [
    {
      key: "index",
      title: "Currently",
      icon: "calendar.day.timeline.leading" as IconSymbolName,
    },
  ];

  const renderScene = SceneMap({
    index: HomeScreen,
  });

  return (
    <TabView
      tabBarPosition="bottom"
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get("window").width }}
      renderTabBar={(props) => (
        <ThemedTabBar
          navigationState={props.navigationState}
          index={index}
          onTabPress={setIndex}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
  },
});
