import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect } from 'react';
import { useWeatherContext } from '@/hooks/useWeatherContext';

export default function HomeScreen() {
  const { location, weatherConditions} = useWeatherContext();

  useEffect(() => {
  }, [weatherConditions]);
  console.log(location);
  return (
    <>
      {location && weatherConditions ? (
        <ThemedView style={styles.viewContainer}>
          <ThemedText>{location}</ThemedText>
          <ThemedText>{weatherConditions.currentWeather.description}</ThemedText>
          <ThemedText>{weatherConditions.currentWeather.temperature} °C</ThemedText>
          <ThemedText>{weatherConditions.currentWeather.windSpeed} km/h</ThemedText>
        </ThemedView>
      ) : (
        <ThemedView style={styles.viewContainer}>
          <ThemedText>Waiting...</ThemedText>
        </ThemedView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
