import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import React, { useEffect } from "react";
import { useWeatherContext } from "@/hooks/useWeatherContext";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { weatherIconMapping } from "@/constants/weatherCodeMapper";
import WeatherIconDisplay from "@/components/ui/weatherIconDisplay";

export default function HomeScreen() {
  const { inputLocation, location, weatherConditions, error } =
    useWeatherContext();
  const [city, region, country] = location ? location.split(",") : [];

  useEffect(() => {}, [weatherConditions]);

  return (
    <>
      {location && weatherConditions && !error ? (
        <View style={styles.viewContainer}>
          <View style={styles.subviewContainer}>
            <ThemedText style={styles.cityText}>
              {city || "Unknown City"}
            </ThemedText>
            <ThemedText style={styles.regionText}>
              {region || "Unknown Region"}, {country || "Unknown Country"}
            </ThemedText>
            <ThemedText style={styles.temperatureText}>
              {weatherConditions.currentWeather.temperature} °C
            </ThemedText>
            <ThemedText style={styles.weatherDescription}>
              <WeatherIconDisplay
                weatherCode={weatherConditions.currentWeather.weatherCode}
              />
              {weatherConditions.currentWeather.description}
            </ThemedText>
            <ThemedText style={styles.windSpeedText}>
              <IconSymbol size={16} name="wind" color={"#777"} />
              {weatherConditions.currentWeather.windSpeed} km/h
            </ThemedText>
          </View>
        </View>
      ) : (
        <View style={styles.viewContainer}>
          {error && inputLocation ? (
            <ThemedText style={styles.errorText}>{error}</ThemedText>
          ) : (
            <ThemedText>Waiting...</ThemedText>
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    margin: 16,
  },
  subviewContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  cityText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  regionText: {
    fontSize: 18,
    color: "#777",
    marginBottom: 12,
  },
  temperatureText: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#ffbf00",
    marginVertical: 20,
    textAlign: "center",
    lineHeight: 60,
  },
  weatherDescription: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 4,
    color: "#777",
    textAlign: "center",
  },
  windSpeedText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});
