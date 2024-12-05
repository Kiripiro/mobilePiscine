import React, { useEffect, useState, useCallback } from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator, View } from 'react-native';
import { ThemedView } from './ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedSafeAreaView } from './ThemedSafeArea';
import { ThemedTextInput } from './ThemedTextInput';
import { ThemedText } from './ThemedText';
import { useWeatherContext } from '@/hooks/useWeatherContext';
import { FlatList, Pressable } from 'react-native-gesture-handler';
import { functionFindLocation } from '@/services/findLocation';
import { Portal } from 'react-native-portalize';

const Header = () => {
  const { inputText, setGeolocationText, saveText, setInputText, updateWeatherConditions } =
    useWeatherContext();
  const [data, setData] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCities = useCallback(async () => {
    if (!inputText.trim()) {
      setData([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const results = await functionFindLocation(inputText);
      setData(results);
    } catch (err) {
      setError("An error occurred while fetching locations.");
    } finally {
      setLoading(false);
    }
  }, [inputText]);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  const handleSelectCity = async (location: Location) => {
    const formattedText = `${location.name}, ${location.admin1}, ${location.country}`;
    console.log('Selected city:', formattedText);
    saveText(formattedText);
    try {
      await updateWeatherConditions(location);
    } catch (err) {
      console.error('Failed to update weather conditions:', err);
    }
  };

  return (
    <ThemedSafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.searchContainer}>
          <ThemedTextInput
            style={styles.searchBar}
            placeholder="Search location..."
            value={inputText}
            onSubmitEditing={() => {
              if (data.length > 0) {
                handleSelectCity(data[0]);
              }
            }}
          />
          {loading && <ActivityIndicator size="small" color="#03dac6" />}
          {error && (
            <ThemedText style={styles.errorText}>
              {error}
            </ThemedText>
          )}
          {!loading && data.length > 0 && (
            <Portal>
              <FlatList
                pointerEvents="box-none"
                style={styles.list}
                data={data}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Pressable onPress={() => handleSelectCity(item)}>
                    <ThemedText style={styles.text}>{`${item.name}, ${item.admin1}, ${item.country}`}</ThemedText>
                  </Pressable>
                )}
              />
            </Portal>
          )}
        </ThemedView>
        <TouchableOpacity style={styles.geoButton} onPress={setGeolocationText}>
          <IconSymbol size={28} name="location.fill" color={'white'} />
        </TouchableOpacity>
      </ThemedView>
    </ThemedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  searchContainer: {
    flex: 1,
  },
  searchBar: {
    borderRadius: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    height: 50,
  },
  list: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    marginTop: 110,
    height: 200,
    elevation: 1,
    paddingHorizontal: 10,
    backgroundColor: '#9c9c9c',
  },
  text: {
    paddingVertical: 10,
  },
  geoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#03dac6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  weatherContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  weatherText: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default Header;
