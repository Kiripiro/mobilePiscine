import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';

type ThemedTabBarProps = {
  navigationState: {
    routes: { key: string; title: string; icon: IconSymbolName }[];
  };
  index: number;
  onTabPress: (index: number) => void;
};

export default function ThemedTabBar({
  navigationState,
  index,
  onTabPress,
}: ThemedTabBarProps) {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? 'light'].background;

  return (
    <SafeAreaView style={[styles.tabBar, { backgroundColor }]}>
      {navigationState.routes.map((route, i) => {
        const color = index === i ? Colors[colorScheme ?? 'light'].tint : 'gray';
        return (
          <TouchableOpacity key={i} onPress={() => onTabPress(i)}>
            <IconSymbol size={28} name={route.icon} color={color} />
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10
  },
});
