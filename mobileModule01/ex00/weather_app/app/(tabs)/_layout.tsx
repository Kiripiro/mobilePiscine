import { Tabs } from 'expo-router';
import { Platform, View, StyleSheet } from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Header from '@/components/Header';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <View style={[styles.container, {backgroundColor: Colors[colorScheme ?? 'light'].tint}]}>
      <Header
        onSearch={(text: string) => console.log('Recherche :', text)}
        onGeoLocate={() => console.log('Géolocalisation en cours...')}
      />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Currently',
            tabBarIcon: ({ color }: { color: string }) => (
              <IconSymbol size={28} name="calendar.day.timeline.leading" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="today"
          options={{
            title: 'Today',
            tabBarIcon: ({ color }: { color: string }) => (
              <IconSymbol size={28} name="calendar.circle" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="weekly"
          options={{
            title: 'Weekly',
            tabBarIcon: ({ color }: { color: string }) => (
              <IconSymbol size={28} name="calendar" color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
