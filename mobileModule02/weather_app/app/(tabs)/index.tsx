import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect } from 'react';
import { useWeatherContext } from '@/hooks/useWeatherContext';

export default function HomeScreen() {
  const { text, weatherConditions} = useWeatherContext();

  useEffect(() => {
  }, [weatherConditions]);

  return (
    <ThemedView style={styles.viewContainer}>
      <ThemedText>Currently</ThemedText>
      <ThemedText>{text}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
