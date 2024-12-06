import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '../ThemedText';

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

  return (
    <SafeAreaView style={[styles.tabBar]}>
      {navigationState.routes.map((route, i) => {
        const color = index === i ? Colors[colorScheme ?? 'light'].tint : 'gray';
        return (
            <TouchableOpacity key={i} onPress={() => onTabPress(i)} style={styles.tabItem}>
              <IconSymbol size={28} name={route.icon} color={color} />
              <ThemedText>{route.title}</ThemedText>
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
    paddingBottom: Platform.OS === 'ios' ? -20 : 10,
    marginTop: 10,
  },
  tabItem: {
    alignItems: 'center',
  },
});
