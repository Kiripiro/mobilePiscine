import React, { useEffect, useState, useCallback } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
  View,
  SafeAreaView,
} from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { ThemedSafeAreaView } from "./ThemedSafeArea";
import { ThemedTextInput } from "./ThemedTextInput";
import { ThemedText } from "./ThemedText";
import { useWeatherContext } from "@/hooks/useWeatherContext";
import { FlatList, Pressable } from "react-native-gesture-handler";
import { findLocation } from "@/services/findLocation";
import { Portal } from "react-native-portalize";

const Header = () => {
  const {
    inputLocation,
    setGeolocationText,
    saveLocation,
    setinputLocation,
    updateWeatherConditions,
    error,
    setError,
  } = useWeatherContext();
  const [data, setData] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchBarBottom, setSearchBarBottom] = useState(0);

  const fetchCities = useCallback(async () => {
    if (!inputLocation.trim()) {
      setData([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const results = await findLocation(inputLocation);
      setData(results);
    } catch (err) {
      setError("An error occurred while fetching locations.");
    } finally {
      setLoading(false);
    }
  }, [inputLocation]);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  const handleSelectCity = async (location: Location) => {
    const formattedLocation = `${location.name}, ${location.admin1}, ${location.country}`;
    saveLocation(formattedLocation);
    try {
      await updateWeatherConditions(location);
    } catch (err) {
      console.error("Failed to update weather conditions:", err);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <IconSymbol size={28} name="magnifyingglass" color={"white"} />
        <ThemedTextInput
          style={styles.searchBar}
          placeholder="Search location..."
          value={inputLocation}
          onChangeText={setinputLocation}
          onSubmitEditing={() => {
            if (data.length > 0) {
              handleSelectCity(data[0]);
            }
          }}
          onLayout={(event) => {
            const { height, y } = event.nativeEvent.layout;
            setSearchBarBottom(y + height);
          }}
        />
        <TouchableOpacity style={styles.geoButton} onPress={setGeolocationText}>
          <IconSymbol size={28} name="location.fill" color={"white"} />
        </TouchableOpacity>
      </View>

      {!loading && data.length > 0 && (
        <Portal>
          <FlatList
            pointerEvents="box-none"
            style={[
              styles.list,
              { top: searchBarBottom + (Platform.OS === "ios" ? 50 : 10) },
            ]}
            data={data}
            keyExtractor={(item, index) => `${item.latitude}-${index}`}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable onPress={() => handleSelectCity(item)}>
                <ThemedText
                  style={styles.text}
                >{`${item.name}, ${item.admin1}, ${item.country}`}</ThemedText>
              </Pressable>
            )}
          />
        </Portal>
      )}

      {loading && <ActivityIndicator size="small" color="#03dac6" />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 0.2,
    position: "relative",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    zIndex: 2,
  },
  searchBar: {
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    height: 50,
    zIndex: 2,
  },
  geoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#03dac6",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    zIndex: 2,
  },
  list: {
    position: "absolute",
    left: 10,
    right: 10,
    maxHeight: 200,
    backgroundColor: "#cfcdcc",
    borderRadius: 10,
    zIndex: 1,
    elevation: 5,
  },
  text: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});

export default Header;
