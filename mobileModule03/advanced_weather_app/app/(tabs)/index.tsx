import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import React, { useEffect } from "react";
import { useWeatherContext } from "@/hooks/useWeatherContext";
import { IconSymbol } from "@/components/ui/IconSymbol";
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
            <View style={styles.weatherDescriptionContainer}>
              <ThemedText style={styles.weatherDescription}>
                <WeatherIconDisplay
                  weatherCode={weatherConditions.currentWeather.weatherCode}
                  size={64}
                />
              </ThemedText>
              <ThemedText style={styles.weatherDescription}>
                {weatherConditions.currentWeather.description}
              </ThemedText>
            </View>
            <ThemedText style={styles.windSpeedText}>
              <IconSymbol size={16} name="wind" color={"#777"} />
              {weatherConditions.currentWeather.windSpeed} km/h
            </ThemedText>
          </View>
        </View>
      ) : (
        <View style={styles.viewContainer}>
          <View style={styles.subviewContainer}>
            {error && !inputLocation ? (
              <ThemedText style={styles.errorText}>{error}</ThemedText>
            ) : error && inputLocation ? (
              <ThemedText style={styles.errorText}>{error}</ThemedText>
            ) : (
              <ThemedText style={styles.waitingText}>Waiting...</ThemedText>
            )}
          </View>
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
    width: "100%",
    height: "100%",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  cityText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    lineHeight: 32,
    textAlign: "center",
    flexWrap: "wrap",
    maxWidth: "100%",
  },

  regionText: {
    fontSize: 24,
    color: "#777",
    marginBottom: 12,
    textAlign: "center",
    flexWrap: "wrap",
    maxWidth: "100%",
  },
  temperatureText: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#ffbf00",
    marginVertical: 40,
    textAlign: "center",
    lineHeight: 60,
  },
  weatherDescriptionContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  weatherDescription: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 8,
    color: "#777",
    textAlign: "center",
  },
  windSpeedText: {
    paddingTop: 16,
    fontSize: 24,
    color: "#777",
    textAlign: "center",
    lineHeight: 24,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  waitingText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
  },
});
