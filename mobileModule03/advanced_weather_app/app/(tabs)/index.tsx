import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import React, { useEffect } from 'react';
import { useWeatherContext } from '@/hooks/useWeatherContext';

export default function HomeScreen() {
  const { inputLocation, location, weatherConditions, error } = useWeatherContext();

  useEffect(() => {
  }, [weatherConditions]);
  return (
    <>
      {location && weatherConditions && !error ? (
        <View style={styles.viewContainer}>
          <ThemedText style={{paddingHorizontal: 30}}>{location}</ThemedText>
          <ThemedText>{weatherConditions.currentWeather.description}</ThemedText>
          <ThemedText>{weatherConditions.currentWeather.temperature} °C</ThemedText>
          <ThemedText>{weatherConditions.currentWeather.windSpeed} km/h</ThemedText>
        </View>
      ) : (
        <View style={styles.viewContainer}>
          {(error && inputLocation ) ? <ThemedText style={{color:'red'}}>{error}</ThemedText> : <ThemedText>Waiting...</ThemedText>}
        </View>
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
