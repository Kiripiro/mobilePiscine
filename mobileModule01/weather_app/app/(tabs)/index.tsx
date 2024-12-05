import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTextContext } from '@/hooks/useTextContext';
import React from 'react';

export default function HomeScreen() {
  const { text } = useTextContext();
  return (
    <ThemedView style={styles.viewContainer}>
      <ThemedText>Currently</ThemedText>
      <ThemedText>{text}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});