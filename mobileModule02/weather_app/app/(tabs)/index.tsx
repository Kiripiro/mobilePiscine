import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect } from 'react';
import { useWeatherContext } from '@/hooks/useWeatherContext';

export default function HomeScreen() {
  const { inputLocation, location, weatherConditions, error } = useWeatherContext();

  useEffect(() => {
  }, [weatherConditions]);
  return (
    <>
      {location && weatherConditions && !error ? (
        <ThemedView style={styles.viewContainer}>
          <ThemedText style={{paddingHorizontal: 30}}>{location}</ThemedText>
          <ThemedText>{weatherConditions.currentWeather.description}</ThemedText>
          <ThemedText>{weatherConditions.currentWeather.temperature} °C</ThemedText>
          <ThemedText>{weatherConditions.currentWeather.windSpeed} km/h</ThemedText>
        </ThemedView>
      ) : (
        <ThemedView style={styles.viewContainer}>
          {(error && inputLocation ) ? <ThemedText style={{color:'red'}}>{error}</ThemedText> : <ThemedText>Waiting...</ThemedText>}
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
