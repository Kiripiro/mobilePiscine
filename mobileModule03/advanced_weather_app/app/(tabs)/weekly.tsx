import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useWeatherContext } from "@/hooks/useWeatherContext";

import React from "react";
import WeatherCardSlider from "@/components/ui/WeatherCardSlider";
import { LineChart } from "react-native-gifted-charts";

export default function TabThreeScreen() {
  const { location, weatherConditions, error } = useWeatherContext();

  console.log(Math.min(...weatherConditions.weeklyWeather.minTemperature));

  return (
    <View style={error ? styles.errorContainer : styles.viewContainer}>
      {location && weatherConditions ? (
        <View style={styles.weatherContainer}>
          <View style={styles.subContainer}>
            <ThemedText style={styles.locationText}>{location}</ThemedText>
            <LineChart
              dataSet={[
                {
                  data: weatherConditions.weeklyWeather.minTemperature.map(
                    (temp, index) => ({ value: temp, label: `${index}` })
                  ),
                  color: "#0BA5A4",
                },
                {
                  data: weatherConditions.weeklyWeather.maxTemperature.map(
                    (temp, index) => ({ value: temp + 5, label: `${index}` })
                  ),
                  color: "#FFC700",
                },
              ]}
              initialSpacing={0}
              hideOrigin
              thickness={3}
              curved={true}
              yAxisColor="#0BA5A4"
              xAxisColor="#0BA5A4"
              hideDataPoints
              yAxisLabelSuffix="°C"
              mostNegativeValue={Math.min(
                ...weatherConditions.weeklyWeather.minTemperature
              )}
              xAxisLabelTextStyle={{ color: "#0BA5A4", paddingLeft: 15 }}
              showYAxisIndices
              yAxisTextStyle={{ color: "#0BA5A4" }}
              hideRules
              color="#0BA5A4"
              trimYAxisAtTop
            />
          </View>

          <WeatherCardSlider
            date={weatherConditions.weeklyWeather.date}
            temperature={weatherConditions.weeklyWeather.minTemperature}
            maxTemperature={weatherConditions.weeklyWeather.maxTemperature}
            weatherCode={weatherConditions.weeklyWeather.weatherCode}
            type="weekly"
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
  locationText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
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
