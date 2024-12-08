import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useWeatherContext } from "@/hooks/useWeatherContext";
import React from "react";
import { LineChart } from "react-native-gifted-charts";
import WeatherCardSlider from "@/components/ui/WeatherCardSlider";

export default function TabTwoScreen() {
  const { location, weatherConditions, error } = useWeatherContext();
  const [city, region, country] = location ? location.split(",") : [];

  const formatData = (temperature: number[]): { value: number }[] => {
    return temperature.map((temp, index) => {
      return {
        value: temp,
      };
    });
  };

  const formatTime = (time: Date[]): string[] => {
    if (!time) {
      return [];
    }
    return time.map((time) => {
      const date = new Date(time);
      const hours = date.toLocaleTimeString([], { hour: "2-digit" });
      return (hours.startsWith("0") ? hours.slice(1) : hours) + "h";
    });
  };

  const getFocusedDataPointIndex = () => {
    if (!weatherConditions || !weatherConditions.todayWeather.time) return 0;

    const now = new Date();
    return now.getHours();
  };

  return (
    <View style={error ? styles.errorContainer : styles.viewContainer}>
      {location && weatherConditions ? (
        <View style={styles.weatherContainer}>
          <View style={styles.subContainer}>
            <ThemedText style={styles.cityText}>
              {city || "Unknown City"}
            </ThemedText>
            <ThemedText style={styles.regionText}>
              {region || "Unknown Region"}, {country || "Unknown Country"}
            </ThemedText>
            <ThemedText style={styles.text}>Today's temperatures</ThemedText>
            <LineChart
              data={formatData(weatherConditions.todayWeather.temperature)}
              curved={true}
              initialSpacing={0}
              hideDataPoints
              hideOrigin
              thickness={5}
              hideRules
              yAxisColor="#0BA5A4"
              xAxisColor="#0BA5A4"
              yAxisLabelSuffix="°C"
              yAxisTextStyle={{ color: "#0BA5A4" }}
              xAxisLabelTexts={formatTime(
                weatherConditions.todayWeather.time || []
              )}
              focusEnabled
              scrollToIndex={getFocusedDataPointIndex()}
              xAxisLabelTextStyle={{ color: "#0BA5A4", paddingLeft: 15 }}
              showYAxisIndices
              areaChart
              yAxisIndicesColor="#0BA5A4"
              color="#0BA5A4"
              trimYAxisAtTop
              mostNegativeValue={Math.min(
                ...weatherConditions.todayWeather.temperature
              )}
            />
          </View>
          <WeatherCardSlider
            date={weatherConditions.todayWeather.time || []}
            temperature={weatherConditions.todayWeather.temperature}
            weatherCode={weatherConditions.todayWeather.weatherCode}
            windSpeed={weatherConditions.todayWeather.windSpeed}
            type="todayWeather"
          />
        </View>
      ) : (
        <View
          style={
            error && !location ? styles.errorContainer : styles.viewContainer
          }
        >
          {error ? (
            <ThemedText style={{ color: "red" }}>{error}</ThemedText>
          ) : (
            <ThemedText>Waiting...</ThemedText>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  subContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  weatherContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 10,
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
  text: {
    fontSize: 24,
    color: "#777",
    marginBottom: 12,
    lineHeight: 24,
    paddingVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
