import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { NavigationState } from '@react-navigation/native';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function CustomTabBar({ navigationState, jumpTo }: { navigationState: NavigationState; jumpTo: (key: string) => void; }) {
  const lightColor = Colors.light.background;
  const darkColor = Colors.dark.background; // 
  const colorScheme = 'light';
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <View style={[styles.tabBar, {backgroundColor: backgroundColor}]}>
      {navigationState.routes.map((route, idx) => (
        <TouchableOpacity
          key={route.key}
          style={styles.tabItem}
          onPress={() => jumpTo(route.key)}
        >
          <IconSymbol
            name={route.icon}
            size={28}
            color={
              navigationState.index === idx
                ? Colors[colorScheme ?? 'light'].tabIconSelected
                : Colors[colorScheme ?? 'light'].tabIconDefault
            }
          />
          <Text
            style={
              navigationState.index === idx
                ? styles.activeTabText
                : styles.tabText
            }
          >
            {route.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 56,
    justifyContent: 'space-around',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      },
      android: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      },
      default: {},
    }),
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    color: '#888',
    fontSize: 12,
  },
  activeTabText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
