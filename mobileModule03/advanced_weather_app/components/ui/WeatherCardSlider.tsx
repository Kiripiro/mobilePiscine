import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import WeatherIconDisplay from "@/components/ui/weatherIconDisplay";
import { IconSymbol } from "./IconSymbol";

interface WeatherCardProps {
  date: Date[];
  temperature: number[];
  maxTemperature?: number[];
  weatherCode: number[];
  windSpeed?: number[];
  type: "todayWeather" | "weekly";
}

const WeatherCardSlider = ({
  date,
  temperature,
  maxTemperature,
  weatherCode,
  windSpeed,
  type,
}: WeatherCardProps) => {
  const convertedDates = date.map((dateString) => new Date(dateString));
  console.log(temperature);

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {convertedDates.map((d, index) => (
          <View key={index} style={styles.cardContainer}>
            <ThemedText style={styles.dateText}>
              {type === "todayWeather"
                ? d.toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : d.toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                  })}
            </ThemedText>

            <WeatherIconDisplay weatherCode={weatherCode[index]} size={32} />

            <View style={styles.temperatureContainer}>
              {type === "weekly" &&
              maxTemperature &&
              maxTemperature[index] !== undefined ? (
                <>
                  <ThemedText style={styles.minTemperatureText}>
                    Min: {temperature[index]} °C
                  </ThemedText>
                  <ThemedText style={styles.maxTemperatureText}>
                    Max: {maxTemperature[index]} °C
                  </ThemedText>
                </>
              ) : (
                <ThemedText style={styles.temperatureText}>
                  {temperature[index]} °C
                </ThemedText>
              )}
            </View>

            {windSpeed && windSpeed[index] !== undefined && (
              <View>
                <ThemedText style={styles.windSpeedText}>
                  <IconSymbol name="wind" size={12} color={"gray"} />{" "}
                  {windSpeed[index]} km/h
                </ThemedText>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    marginVertical: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 8,
    marginLeft: 0,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
  },
  dateText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  temperatureContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  temperatureText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffbf00",
    marginRight: 8,
  },
  maxTemperatureText: {
    fontSize: 14,
    color: "#ff6347",
    fontWeight: "bold",
  },
  minTemperatureText: {
    fontSize: 14,
    color: "#1E90FF",
    fontWeight: "bold",
  },
  windSpeedText: {
    fontSize: 14,
    color: "#555",
  },
});

export default WeatherCardSlider;
