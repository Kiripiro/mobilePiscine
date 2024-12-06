import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useWeatherContext } from '@/hooks/useWeatherContext';
import { FlatList } from 'react-native-gesture-handler';

import React from 'react';

export default function TabThreeScreen() {
  const { location, weatherConditions, error } = useWeatherContext();

  const combinedData = weatherConditions.weeklyWeather.date?.map((date, index) => {
    return {
      date: date.toString(),
      minTemperature: weatherConditions.weeklyWeather.minTemperature[index].toString(),
      maxTemperature: weatherConditions.weeklyWeather.maxTemperature[index].toString(),
      description: weatherConditions.weeklyWeather.description[index],
    };
  }) || [];

  const renderItem = ({ item }: { item: { date: string; minTemperature: string, maxTemperature: string, description: string } }) => {
    const description = item.description.split(':')[0];
    return (
      <ThemedView style={styles.row}>
        <ThemedText style={styles.cell}>{item.date}</ThemedText>
        <ThemedText style={styles.cell}>{item.minTemperature}°C</ThemedText>
        <ThemedText style={styles.cell}>{item.maxTemperature}°C</ThemedText>
        <ThemedText style={styles.cell}>{description}</ThemedText>
      </ThemedView>
    );
  };

  return (
    <ThemedView style={error ? styles.errorContainer : styles.viewContainer}>
      {location && weatherConditions ? (
        <ThemedView style={styles.weatherContainer}>
          <ThemedText style={styles.locationText}>{location}</ThemedText>
          <ThemedView style={styles.row}>
            <ThemedText style={styles.cell}>Date</ThemedText>
            <ThemedText style={styles.cell}>Min Temp</ThemedText>
            <ThemedText style={styles.cell}>Max Temp</ThemedText>
            <ThemedText style={styles.cell}>Description</ThemedText>
          </ThemedView>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={combinedData}
            keyExtractor={(item, index) => item.date ? item.date.toString() : Math.random().toString()}
            renderItem={renderItem}
          />
        </ThemedView>
      ) : (
        <ThemedView style={error && !location ? styles.errorContainer : styles.viewContainer}>
          {error ? <ThemedText style={{color:'red'}}>{error}</ThemedText> : <ThemedText>Waiting...</ThemedText>}
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  weatherContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
