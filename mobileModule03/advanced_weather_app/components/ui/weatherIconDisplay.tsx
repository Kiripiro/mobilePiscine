import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { getWeatherIcon } from '@/constants/weatherCodeMapper';

export default function WeatherIconDisplay({ weatherCode }: { weatherCode: number }) {
  const iconName = getWeatherIcon(weatherCode);

  return (
    <View style={styles.iconContainer}>
      <IconSymbol name={iconName} size={48} color="#777" />
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
