import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useWeatherContext } from '@/hooks/useWeatherContext';

import React from 'react';

export default function TabThreeScreen() {
  const { text } = useWeatherContext();
  return (
    <ThemedView style={styles.viewContainer}>
      <ThemedText>Weekly</ThemedText>
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
