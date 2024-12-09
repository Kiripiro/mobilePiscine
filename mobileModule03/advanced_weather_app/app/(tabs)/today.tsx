import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useWeatherContext } from "@/hooks/useWeatherContext";
import React, { useEffect, useState } from "react";
import WeatherCardSlider from "@/components/ui/WeatherCardSlider";
import { CartesianChart, Area } from "victory-native";
import { useFont } from "@shopify/react-native-skia";
import spaceMono from "@/assets/fonts/SpaceMono-Regular.ttf";

export default function TabTwoScreen() {
  const { location, weatherConditions, error } = useWeatherContext();
  const [city, region, country] = location ? location.split(",") : [];
  const font = useFont(spaceMono, 10);

  const temperatures = weatherConditions?.todayWeather?.temperature || [];
  const [data, setData] = useState<{ hour: string; tmp: number }[]>([]);

  useEffect(() => {
    if (temperatures.length > 0 && weatherConditions?.todayWeather?.time) {
      const DATA = temperatures.map((temp, index) => ({
        hour: weatherConditions.todayWeather.time
          ? [index]?.toString() + "h"
          : "",
        tmp: temp,
      }));
      setData(DATA);
    }
  }, [temperatures, weatherConditions]);

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
          </View>

          {data.length > 0 ? (
            <View style={styles.chart}>
              <CartesianChart
                data={data}
                xKey="hour"
                yKeys={["tmp"]}
                xAxis={{
                  font,
                  labelColor: "black",
                  lineColor: "lightgrey",
                  tickCount: 12,
                }}
                yAxis={[
                  {
                    font,
                    labelColor: "black",
                    lineColor: "lightgrey",
                    tickCount: 5,
                  },
                ]}
              >
                {({ points, chartBounds }) => (
                  <Area
                    points={points.tmp}
                    y0={chartBounds.bottom}
                    color="#03dac6"
                    opacity={0.5}
                    animate={{ type: "timing", duration: 300 }}
                  />
                )}
              </CartesianChart>
            </View>
          ) : (
            <ThemedText>Loading chart...</ThemedText>
          )}

          <WeatherCardSlider
            date={weatherConditions.todayWeather.time || []}
            temperature={temperatures}
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
    alignItems: "center",
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    justifyContent: "center",
  },
  chart: {
    flex: 1,
    width: "100%",
    height: 300,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
    paddingInline: 5,
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
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
