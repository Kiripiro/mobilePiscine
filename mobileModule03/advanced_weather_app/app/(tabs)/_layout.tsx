import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import Header from '@/components/Header';
import ThemedTabBar from '@/components/ui/ThemedTabBar';
import { IconSymbolName } from '@/components/ui/IconSymbol';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useWeatherContext } from '@/hooks/useWeatherContext';

import HomeScreen from './index';
import TabTwoScreen from './today';
import TabThreeScreen from './weekly';

export default function TabLayout() {
  const { geoLocationPermission, setLocationPermission, setGeolocationText } = useWeatherContext();
  const [index, setIndex] = useState(0);
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? 'light'].background;

  const routes = [
    { key: 'index', title: 'Currently', icon: 'calendar.day.timeline.leading' as IconSymbolName },
    { key: 'today', title: 'Today', icon: 'calendar.circle' as IconSymbolName},
    { key: 'weekly', title: 'Weekly', icon: 'calendar' as IconSymbolName},
  ];

  const renderScene = SceneMap({
    index: HomeScreen,
    today: TabTwoScreen,
    weekly: TabThreeScreen,
  });

  return (
    <ImageBackground
      source={require('@/assets/images/background.webp')}
      style={styles.background} 
      resizeMode="cover"
    >
    <SafeAreaView style={[styles.container]}>
      <Header />
      <TabView
        tabBarPosition="bottom"
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={(props) => (
          <ThemedTabBar
            navigationState={props.navigationState}
            index={index}
            onTabPress={setIndex}
          />
        )}
      />
    </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  }
});
