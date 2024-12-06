import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useWeatherContext } from '@/hooks/useWeatherContext';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

export default function TabTwoScreen() {
  const { location, weatherConditions, error} = useWeatherContext();

  const combinedData = weatherConditions.todayWeather.time?.map((time, index) => {
    const date = new Date(time);
    const readableTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return {
      time: readableTime,
      temperature: weatherConditions.todayWeather.temperature[index],
      description: weatherConditions.todayWeather.description[index],
      windSpeed: weatherConditions.todayWeather.windSpeed[index],
    };
  }) || [];

  const renderItem = ({ item }: { item: { time: string; temperature: number; description: string; windSpeed: number } }) => {
    return (
      <ThemedView style={styles.row}>
        <ThemedText style={styles.cell}>{item.time}</ThemedText>
        <ThemedText style={styles.cell}>{item.temperature}°C</ThemedText>
        <ThemedText style={styles.cell}>{item.description}</ThemedText>
        <ThemedText style={styles.cell}>{item.windSpeed} km/h</ThemedText>
      </ThemedView>
    );
  };

  return (
    <ThemedView style={error ? styles.errorContainer : styles.viewContainer}>
      {location && weatherConditions ? (
        <ThemedView style={styles.weatherContainer}>
          <ThemedText style={styles.locationText}>{location}</ThemedText>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={combinedData}
            keyExtractor={(item, index) => item.time ? item.time.toString() : Math.random().toString()}
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
